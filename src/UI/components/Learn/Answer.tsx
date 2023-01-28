import React, { ChangeEvent } from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { CardsType } from '../../../bll/store/cards-reducer'

import s from './learn.module.css'

type AnswerPropsType = {
  card: CardsType
  setGradeValue: (grade: string) => void
  nextHandler: () => void
}

export const Answer = ({ card, setGradeValue, nextHandler }: AnswerPropsType) => {
  return (
    <div>
      <p className={s.question}>{`Answer: ${card.answer}`}</p>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Rate your self:</FormLabel>
        <RadioGroup
          name="radio-buttons-group"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setGradeValue(e.currentTarget.value)
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label={`Didn't know`} />
          <FormControlLabel value="2" control={<Radio />} label="Forgot" />
          <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
          <FormControlLabel value="4" control={<Radio />} label="Confused" />
          <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" fullWidth style={{ marginTop: '20px' }} onClick={nextHandler}>
        Next
      </Button>
    </div>
  )
}
