import React, { useEffect, useState } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { PacksParamsType } from '../../../../api/packs-api'
import { cardPacksSelector, profileInfoSelector } from '../../../../bll/selectors/selectors'
import { setPacksWithParamsTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { useDebounce } from '../../../../hooks/useDebounce'

interface Column {
  id: 'name' | 'cards' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'cards', label: 'Cards' },
  {
    id: 'updated',
    label: 'Last Updated',
  },
  {
    id: 'created',
    label: 'Created by',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
]

interface Data {
  name: string
  cards: number
  updated: string
  created: string
  actions: any
}

export const PacksList = (props: PacksParamsType) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const debouncedValue = useDebounce<string>(props.packName, 500)
  const [page, setPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPacksWithParamsTC({ packName: props.packName, user_id: props.user_id }))
  }, [debouncedValue])

  useEffect(() => {
    dispatch(setPacksWithParamsTC({ packName: props.packName, user_id: props.user_id }))
  }, [props.user_id])

  function createData(
    name: string,
    cards: number,
    updated: string,
    created: string,
    actions: any
  ): Data {
    return { name, cards, updated, created, actions }
  }

  const rows: Data[] = cardPacks.map(pack => {
    const actions =
      profileInfo._id === pack.user_id ? (
        <div>
          <SchoolIcon />
          <span> </span>
          <EditIcon />
          <span> </span>
          <DeleteForeverIcon />
        </div>
      ) : (
        <div>
          <SchoolIcon />
        </div>
      )

    return createData(pack.name, pack.cardsCount, pack.updated, pack.created, actions)
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.cards}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{}}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={cardsPerPage}
        page={page}
        labelRowsPerPage={'Card per page'}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
