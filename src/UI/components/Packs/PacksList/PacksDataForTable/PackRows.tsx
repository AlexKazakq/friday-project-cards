import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../../assets/Routes/path'
import { cardPacksSelector, profileInfoSelector } from '../../../../../bll/selectors/selectors'
import {
  PackUserDataType,
  setPackUserData,
  setUserCardsTotalCount,
} from '../../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../../utils/dateFormat/dateFormatUtils'
import { DeletePackModal } from '../../../Modals/PacksModals/DeletePackModal'
import { UpdatePackModal } from '../../../Modals/PacksModals/UpdatePackModal'
import s from '../packList.module.css'

export interface DataPacks {
  name: JSX.Element
  cardsCount: number
  updated: string
  created: string
  actions: JSX.Element
  id: string
}
export const PackRows = () => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const profileInfo = useAppSelector(profileInfoSelector)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showCardByIdHandler = (userData: PackUserDataType, cardsCount: number) => {
    dispatch(setPackUserData({ userData }))
    dispatch(setUserCardsTotalCount({ cardsCount: cardsCount }))
  }
  const goToLearnHandler = (userData: PackUserDataType, cardsCount: number) => {
    showCardByIdHandler(userData, cardsCount)

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
          <IconButton
            className={s.button}
            disabled={pack.cardsCount === 0}
            onClick={() =>
              goToLearnHandler(
                {
                  packId: pack._id,
                  packUserId: pack.user_id,
                  packUserName: pack.user_name,
                  packName: pack.name,
                },
                pack.cardsCount
              )
            }
          >
            <Tooltip title="Learn cards">
              <SchoolIcon />
            </Tooltip>
          </IconButton>
          <IconButton className={s.button}>
            <UpdatePackModal packId={pack._id} packName={pack.name} />
          </IconButton>
          <IconButton className={s.button}>
            <DeletePackModal packId={pack._id} packName={pack.name} />
          </IconButton>
        </div>
      ) : (
        <div key={pack._id}>
          <IconButton
            className={s.button}
            disabled={pack.cardsCount === 0}
            onClick={() =>
              goToLearnHandler(
                {
                  packId: pack._id,
                  packUserId: pack.user_id,
                  packUserName: pack.user_name,
                  packName: pack.name,
                },
                pack.cardsCount
              )
            }
          >
            <Tooltip title="Learn cards">
              <SchoolIcon />
            </Tooltip>
          </IconButton>
        </div>
      )
    const name = (
      <NavLink
        to={PATH.CARDS}
        onClick={() =>
          showCardByIdHandler(
            {
              packId: pack._id,
              packUserId: pack.user_id,
              packUserName: pack.user_name,
              packName: pack.name,
            },
            pack.cardsCount
          )
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

  return rows
}
