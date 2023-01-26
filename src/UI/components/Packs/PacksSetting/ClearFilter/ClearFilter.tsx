import React from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices'

import { cardPacksTotalCountSelector } from '../../../../../bll/selectors/selectors'
import {
  setCardPacksTotalCount,
  setCardsCount,
  setMyPacks,
  setSearchPack,
} from '../../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import s from '../packsSetting.module.css'

export const ClearFilter = () => {
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const dispatch = useAppDispatch()
  const handlerClearFilter = () => {
    dispatch(setCardsCount({ value: [] }))
    dispatch(setMyPacks({ myId: undefined }))
    dispatch(setSearchPack({ value: '' }))
    dispatch(setCardPacksTotalCount({ cardPacksTotalCount: cardPacksTotalCount }))
  }

  return (
    <div className={s.items}>
      <CleaningServicesIcon onClick={handlerClearFilter} />
    </div>
  )
}
