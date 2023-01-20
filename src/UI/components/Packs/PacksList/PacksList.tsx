import React from 'react'

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
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'
import {
  cardPacksSelector,
  cardPacksTotalCountSelector,
  profileInfoSelector,
} from '../../../../bll/selectors/selectors'
import { PackUserDataType, setPackUserData } from '../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'

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

type PacksListType = {
  page: number
  cardsPerPage: number
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  changePage: (event: unknown, newPage: number) => void
}
export const PacksList = (props: PacksListType) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const dispatch = useAppDispatch()

  const showCardByIdHandler = (userData: PackUserDataType) => {
    dispatch(setPackUserData({ userData }))
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
            <EditIcon />
          </NavLink>
          <div>
            <DeleteForeverIcon />
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

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   props.handleChangeRowsPerPage(+event.target.value)
  // }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
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
            {rows.map(row => {
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
        rowsPerPageOptions={[4, 6, 10]}
        component="div"
        count={cardPacksTotalCount}
        rowsPerPage={props.cardsPerPage}
        page={props.page}
        labelRowsPerPage={'Cards per page'}
        onPageChange={props.changePage}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Paper>
  )
}
