import React, { useEffect, useState } from 'react'

import {
  cardPacksCountSelector,
  cardPacksMaxCountSelector,
  cardPacksMinCountSelector,
} from '../../../../../bll/selectors/selectors'
import { setCardsCount } from '../../../../../bll/store/packs-reducer'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks'
import SuperRange from '../../../common/SuperRange/SuperRange'

import s from './SliderCountsCards.module.css'

export const SliderCountsCards = () => {
  const cardPacksMaxCount = useAppSelector(cardPacksMaxCountSelector)
  const cardPacksMinCount = useAppSelector(cardPacksMinCountSelector)
  const cardsCount = useAppSelector(cardPacksCountSelector)

  const [value, setValue] = useState<number[]>([cardPacksMinCount, cardPacksMaxCount])

  const dispatch = useAppDispatch()

  useEffect(() => {
    setValue([cardPacksMinCount, cardPacksMaxCount])
  }, [cardPacksMaxCount, cardPacksMinCount])

  useEffect(() => {
    cardsCount.length === 0 && setValue([cardPacksMinCount, cardPacksMaxCount])
  }, [cardsCount])
  const changeNumberOfCards = (event: Event, value: number | number[]) => {
    setValue(value as number[])
  }

  const handleSpendRequest = () => {
    dispatch(setCardsCount({ value }))
  }

  return (
    <div className={s.items}>
      <span className={s.title}>Number of cards</span>

      <div>
        <span className={s.leftCount}>{value[0]}</span>
        <SuperRange
          onChange={changeNumberOfCards}
          onChangeCommitted={handleSpendRequest}
          value={value}
          max={cardPacksMaxCount}
          min={cardPacksMinCount}
        />
        <span className={s.rightCount}>{value[1]}</span>
      </div>
    </div>
  )
}
