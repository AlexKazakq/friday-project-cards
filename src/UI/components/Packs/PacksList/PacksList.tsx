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
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'
import {
  cardPacksSelector,
  cardPacksTotalCountSelector,
  packStatusSelector,
  profileInfoSelector,
} from '../../../../bll/selectors/selectors'
import { PackUserDataType, setPackUserData } from '../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'
import SuperSort from '../../common/SuperSort/SuperSort'

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
  name: JSX.Element
  cards: number
  updated: string
  created: string
  actions: JSX.Element
  id: string
}

type PacksListType = {
  page: number
  cardsPerPage: number
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  changePage: (event: unknown, newPage: number) => void
  sort: string
  onChangeSort: (newSort: string) => void
}
export const PacksList = (props: PacksListType) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const packUserStatus = useAppSelector(packStatusSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showCardByIdHandler = (userData: PackUserDataType) => {
    dispatch(setPackUserData({ userData }))
  }

  const goToLearnHandler = (userData: PackUserDataType) => {
    showCardByIdHandler(userData)

    navigate(PATH.LEARN)
  }

  function createData(
    name: JSX.Element,
    cards: number,
    updated: string,
    created: string,
    actions: JSX.Element,
    id: string
  ): Data {
    return { name, cards, updated, created, actions, id }
  }

  const rows: Data[] = cardPacks.map(pack => {
    const actions =
      profileInfo._id === pack.user_id ? (
        <div key={pack._id} className={s.icons}>
          <button
            className={s.button}
            disabled={pack.cardsCount === 0}
            onClick={() =>
              goToLearnHandler({
                packId: pack._id,
                packUserId: pack.user_id,
                packUserName: pack.user_name,
                cardsCount: pack.cardsCount,
              })
            }
          >
            <SchoolIcon />
          </button>
          <button className={s.button}>
            <EditIcon />
          </button>
          <button className={s.button}>
            <DeleteForeverIcon />
          </button>
        </div>
      ) : (
        <div key={pack._id}>
          <button
            className={s.button}
            disabled={pack.cardsCount === 0}
            onClick={() =>
              goToLearnHandler({
                packId: pack._id,
                packUserId: pack.user_id,
                packUserName: pack.user_name,
                cardsCount: pack.cardsCount,
              })
            }
          >
            <SchoolIcon />
          </button>
        </div>
      )

    const name = (
      <NavLink
        to={PATH.CARDS}
        onClick={() =>
          showCardByIdHandler({
            packId: pack._id,
            packUserId: pack.user_id,
            packUserName: pack.user_name,
            cardsCount: pack.cardsCount,
          })
        }
        className={s.navLink}
      >
        {pack.name}
      </NavLink>
    )

    return createData(
      name,
      pack.cardsCount,
      dateFormatUtils(pack.updated),
      pack.user_name,
      actions,
      pack._id
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
                  <SuperSort sort={props.sort} value={column.id} onChange={props.onChangeSort} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
      {(cardPacksTotalCount === 0 || packUserStatus === 'Wait...') && (
        <div className={s.notFound}>{packUserStatus}</div>
      )}
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
        showFirstButton={true}
        showLastButton={true}
      />
    </Paper>
  )
}
