import React from 'react'

import Rating from '@mui/material/Rating'

import { cardsSelector, profileInfoSelector } from '../../../../../bll/selectors/selectors'
import { useAppSelector } from '../../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../../utils/dateFormat/dateFormatUtils'
import { DeleteCardModal } from '../../../Modals/DeleteCardModal'
import { UpdateCardModal } from '../../../Modals/UpdateCardModal'

import s from './../cardsList.module.css'

export interface DataCards {
  question: string
  answer: string
  updated: string
  grade: JSX.Element
  id: string
}
export const CardsRows = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const cards = useAppSelector(cardsSelector)

  function createData(
    question: string,
    answer: string,
    updated: string,
    grade: JSX.Element,
    id: string
  ): DataCards {
    return { question, answer, updated, grade, id }
  }

  const rows: DataCards[] = cards.map(card => {
    let grade

    profileInfo._id === card.user_id
      ? (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
            <button className={s.button}>
              <UpdateCardModal
                _id={card._id}
                primaryQuestion={card.question}
                primaryAnswer={card.answer}
              />
            </button>
            <button className={s.button}>
              <DeleteCardModal id={card._id} cardName={card.question} />
            </button>
          </div>
        ))
      : (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
          </div>
        ))

    return createData(card.question, card.answer, dateFormatUtils(card.updated), grade, card._id)
  })

  return rows
}
