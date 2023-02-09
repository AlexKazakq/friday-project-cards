import React from 'react'

import Rating from '@mui/material/Rating'

import { cardsSelector, profileInfoSelector } from '../../../../../bll/selectors/selectors'
import { useAppSelector } from '../../../../../hooks/hooks'
import { dateFormatUtils } from '../../../../../utils/dateFormat/dateFormatUtils'
import { DeleteCardModal } from '../../../Modals/CardsModals/DeleteCardModal'
import { UpdateCardModal } from '../../../Modals/CardsModals/UpdateCardModal'

import s from './../cardsList.module.css'
import { CardsImageSVGR } from './CardsImageSVG/CardsImageSVGR'

export interface DataCards {
  question: string
  answer: string
  updated: string
  grade: JSX.Element
  id: string
  cover: JSX.Element
}
export const CardsRows = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const cards = useAppSelector(cardsSelector)

  function createData(
    cover: JSX.Element,
    question: string,
    answer: string,
    updated: string,
    grade: JSX.Element,
    id: string
  ): DataCards {
    return { cover, question, answer, updated, grade, id }
  }

  const rows: DataCards[] = cards.map(card => {
    let cover = <CardsImageSVGR />
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
              <DeleteCardModal id={card._id} cardsName={card.question} />
            </button>
          </div>
        ))
      : (grade = (
          <div>
            <Rating name="disabled" value={card.grade} disabled />
          </div>
        ))

    return createData(
      cover,
      card.question,
      card.answer,
      dateFormatUtils(card.updated),
      grade,
      card._id
    )
  })

  return rows
}
