import React, { useState } from 'react'

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
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'
import { cardPacksSelector, profileInfoSelector } from '../../../../bll/selectors/selectors'
import { deletePackTC, updatePackTC } from '../../../../bll/store/packs-reducer'
import { PackUserDataType, setPackUserData } from '../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'
import { DeletePackModal } from '../../modals/DeletePackModal'
import { UpdatePackModal } from '../../modals/UpdatePackModal'

import s from './packList.module.css'

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
  actions: JSX.Element
}

export const PacksList = () => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)

  const [page, setPage] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const dispatch = useAppDispatch()

  const showCardByIdHandler = (userData: PackUserDataType) => {
    dispatch(setPackUserData({ userData }))
  }

  const UpdatePackByIdHandler = (_id: string, name: string) => {
    dispatch(updatePackTC({ cardsPack: { _id, name } }))
  }

  function createData(
    name: string,
    cards: number,
    updated: string,
    created: string,
    actions: JSX.Element
  ): Data {
    return { name, cards, updated, created, actions }
  }

  const rows: Data[] = cardPacks.map(pack => {
    const actions =
      profileInfo._id === pack.user_id ? (
        <div key={pack._id} className={s.icons}>
          <div>
            <NavLink
              to={PATH.CARDS}
              onClick={() =>
                showCardByIdHandler({
                  packId: pack._id,
                  packUserId: pack.user_id,
                  packUserName: pack.user_name,
                })
              }
              className={s.navLink}
            >
              <SchoolIcon />
            </NavLink>
          </div>
          <NavLink
            to={PATH.PACKS}
            onClick={() =>
              showCardByIdHandler({
                packId: pack._id,
                packUserId: pack.user_id,
                packUserName: pack.user_name,
              })
            }
            className={s.navLink}
          >
            <UpdatePackModal packId={pack._id} />
          </NavLink>
          <div>
            <NavLink
              to={PATH.PACKS}
              onClick={() =>
                showCardByIdHandler({
                  packId: pack._id,
                  packUserId: pack.user_id,
                  packUserName: pack.user_name,
                })
              }
              className={s.navLink}
            >
              {/*<DeleteForeverIcon onClick={() => DeletePackByIdHandler} />*/}
              <DeletePackModal packId={pack._id} />
            </NavLink>
          </div>
        </div>
      ) : (
        <div key={pack._id}>
          <NavLink
            to={PATH.CARDS}
            onClick={() =>
              showCardByIdHandler({
                packId: pack._id,
                packUserId: pack.user_id,
                packUserName: pack.user_name,
              })
            }
            className={s.navLink}
          >
            <SchoolIcon />
          </NavLink>
        </div>
      )

    return createData(
      pack.name,
      pack.cardsCount,
      dateFormatUtils(pack.updated),
      pack.user_name,
      actions
    )
  })

  console.log(rows)
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
        rowsPerPageOptions={[2, 6, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={cardsPerPage}
        page={page}
        labelRowsPerPage={'Cards per page'}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
