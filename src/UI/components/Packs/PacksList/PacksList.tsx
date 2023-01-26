import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
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
import { TableBodyComponent } from '../../common/Table/TableBody/TableBody'
import { TableComponent } from '../../common/Table/TableComponent'
import { TableHeadComponent } from '../../common/Table/TableHead/TableHead'
import { DeletePackModal } from '../../modals/DeletePackModal'
import { UpdatePackModal } from '../../modals/UpdatePackModal'

import s from './packList.module.css'

export interface ColumnPacks {
  id: 'name' | 'cardsCount' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: ColumnPacks[] = [
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

export interface DataPacks {
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
  ): DataPacks {
    return { name, cardsCount, updated, created, actions, id }
  }

  const rows: DataPacks[] = cardPacks.map(pack => {
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

  let columnsWithSort = ['name', 'cardsCount', 'updated', 'created']
  const onChangePageHandler = (page: number, pageCount: number) => {
    dispatch(setPagePack({ page: page }))
    dispatch(setPageCountPack({ pageCount: pageCount }))
  }

  return (
    <TableComponent
      totalCount={cardPacksTotalCount ? cardPacksTotalCount : 0}
      currentPage={pagePack ?? 1}
      pageCount={pageCountPack}
      onPageChanged={onChangePageHandler}
      labelRowsPerPage={'Packs per Page'}
      packUserStatus={packUserStatus}
    >
      <TableHeadComponent
        columns={columns}
        columnsWithSort={columnsWithSort}
        sort={props.sort}
        onChangeSort={props.onChangeSort}
      />
      <TableBodyComponent rows={rows} columns={columns} />
    </TableComponent>
  )
}
