import React, { useEffect, useState } from 'react'

import {
  cardPacksMaxCountSelector,
  cardPacksMinCountSelector,
  getMyIdSelector,
  profileInfoSelector,
} from '../../../../../bll/selectors/selectors'
import { setCardsCount, setMyPacks } from '../../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import { SupperToggleButton } from '../../../common/ToggleButton/ToggleButton'
import s from '../packsSetting.module.css'

export const MyOrAllPacks = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const cardPacksMaxCount = useAppSelector(cardPacksMaxCountSelector)
  const cardPacksMinCount = useAppSelector(cardPacksMinCountSelector)
  const myId = useAppSelector(getMyIdSelector)
  const [isMyPacks, SetIsMyPacks] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    myId === undefined && SetIsMyPacks(false)
  }, [myId])

  const showMyOrAllPacks = (isMyPacks: boolean) => {
    dispatch(setCardsCount({ value: [cardPacksMinCount, cardPacksMaxCount] }))
    SetIsMyPacks(isMyPacks)
    isMyPacks
      ? dispatch(setMyPacks({ myId: profileInfo._id }))
      : dispatch(setMyPacks({ myId: undefined }))
  }

  return (
    <div className={s.items}>
      <span className={s.title}>Show packs card</span>
      <div>
        <SupperToggleButton
          firstValue={'My'}
          secondValue={'All'}
          isMyPacks={isMyPacks}
          showMyOrAllPacks={showMyOrAllPacks}
        />
      </div>
    </div>
  )
}
