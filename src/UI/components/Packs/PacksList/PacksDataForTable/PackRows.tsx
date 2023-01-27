import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../../assets/Routes/path'
import { cardPacksSelector, profileInfoSelector } from '../../../../../bll/selectors/selectors'
import { PackUserDataType, setPackUserData } from '../../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../../utils/dateFormat/dateFormatUtils'
import { DeletePackModal } from '../../../modals/DeletePackModal'
import { UpdatePackModal } from '../../../modals/UpdatePackModal'
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

  return rows
}
