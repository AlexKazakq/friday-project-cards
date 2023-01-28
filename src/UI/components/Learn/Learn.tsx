import React, { useEffect, useState } from 'react'

import { cardsAPI } from '../../../api/cards-api'
import { cardsSelector, packUserDataSelector } from '../../../bll/selectors/selectors'
import { setCardsTC } from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getCard } from '../../../utils/getCards/getCards'
import tableStyle from '../../styles/table.module.css'
import { BackArrow } from '../common/BackArrow/BackArrow'
import { CircularLoader } from '../common/Loader/CircularLoader'

import { Answer } from './Answer'
import s from './learn.module.css'
import { Question } from './Question'

export const Learn = () => {
  const packUserData = useAppSelector(packUserDataSelector)
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const cards = useAppSelector(cardsSelector)
  const [card, setCard] = useState(getCard(cards))
  const [gradeValue, setGradeValue] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
    setCard(getCard(cards))
  }, [cards])

  useEffect(() => {
    if (packUserData.packId) {
      dispatch(setCardsTC(packUserData.packId))
    }
  }, [counter])

  const nextHandler = () => {
    setOpen(false)
    setCard(getCard(cards))
    cardsAPI.sendGrade({ card_id: card._id, grade: +gradeValue })
    setCounter(counter + 1)
  }

  if (card) {
    return (
      <div className={tableStyle.wrapper}>
        <BackArrow />
        <div className={s.block}>
          <Question packUserData={packUserData} card={card} setOpen={setOpen} open={open} />
          {open && <Answer card={card} setGradeValue={setGradeValue} nextHandler={nextHandler} />}
        </div>
      </div>
    )
  } else {
    return <CircularLoader />
  }
}
