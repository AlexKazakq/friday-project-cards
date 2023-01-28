import React from 'react'

import Button from '@mui/material/Button'

import { CardsType } from '../../../bll/store/cards-reducer'
import { PackUserDataType } from '../../../bll/store/packUserData-reducer'

import s from './learn.module.css'

type QuestionPropsType = {
  packUserData: PackUserDataType
  card: CardsType
  setOpen: (open: boolean) => void
  open: boolean
}

export const Question = ({ packUserData, card, setOpen, open }: QuestionPropsType) => {
  return (
    <div>
      <h2 className={s.title}>{`Learn "${packUserData.packName}"`}</h2>
      <p>{`Number of attempts to answer this question: ${card.shots}`}</p>
      <p className={s.question}>{`Question: ${card.question}`}</p>
      {!open && (
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={() => setOpen(true)}
        >
          Show answer
        </Button>
      )}
    </div>
  )
}
