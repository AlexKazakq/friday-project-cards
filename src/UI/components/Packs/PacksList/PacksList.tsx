import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../assets/Routes/path'
import {
  cardPacksSelector,
  cardPacksTotalCountSelector,
  packStatusSelector,
  pageCountPackSelector,
  pagePackSelector,
  profileInfoSelector,
} from '../../../../bll/selectors/selectors'
import { setPageCountPack, setPagePack } from '../../../../bll/store/packs-reducer'
import { PackUserDataType, setPackUserData } from '../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../utils/dateFormat/dateFormatUtils'
import { PaginationComponent } from '../../common/Pagination/PaginationComponent'
import SuperSort from '../../common/SuperSort/SuperSort'
import { DeletePackModal } from '../../modals/DeletePackModal'
import { UpdatePackModal } from '../../modals/UpdatePackModal'

import s from './packList.module.css'

interface Column {
  id: 'name' | 'cardsCount' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
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
  cardsCount: number
  updated: string
  created: string
  actions: JSX.Element
  id: string
}

type PacksListType = {
  sort: string
  onChangeSort: (newSort: string) => void
}
export const PacksList = (props: PacksListType) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
  const packUserStatus = useAppSelector(packStatusSelector)
  const pagePack = useAppSelector(pagePackSelector)
  const pageCountPack = useAppSelector(pageCountPackSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
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
    cardsCount: number,
    updated: string,
    created: string,
    actions: JSX.Element,
    id: string
  ): Data {
    return { name, cardsCount, updated, created, actions, id }
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
            <UpdatePackModal packId={pack._id} packName={pack.name} />
          </button>
          <button className={s.button}>
            <DeletePackModal packId={pack._id} />
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

  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(setPagePack({ page: page }))
    dispatch(setPageCountPack({ pageCount: pageCount }))
  }

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
                  {(column.id === 'name' ||
                    column.id === 'cardsCount' ||
                    column.id === 'updated' ||
                    column.id === 'created') && (
                    <SuperSort sort={props.sort} value={column.id} onChange={props.onChangeSort} />
                  )}
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
      <PaginationComponent
        totalCount={cardPacksTotalCount ? cardPacksTotalCount : 0}
        currentPage={pagePack ?? 1}
        pageCount={pageCountPack}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage={'Packs per Page'}
      />
    </Paper>
  )
}
