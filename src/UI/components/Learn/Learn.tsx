import React, { ChangeEvent, useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { NavLink } from 'react-router-dom'

import { cardsAPI } from '../../../api/cards-api'
import { PATH } from '../../../assets/Routes/path'
import { cardsSelector, packUserDataSelector } from '../../../bll/selectors/selectors'
import { setCardsTC } from '../../../bll/store/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getCard } from '../../../utils/getCards/getCards'
import tableStyle from '../../styles/table.module.css'
import styleBack from '../Cards/cards.module.css'

import s from './learn.module.css'

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
        <div>
          <NavLink to={PATH.PACKS} className={styleBack.back}>
            Back to Packs List
          </NavLink>
        </div>
        <div className={s.block}>
          <h2 className={s.title}>{`Learn "${packUserData.packUserName}"`}</h2>
          <p>{`Number of attempts to answer this question: ${card.shots}`}</p>
          <p className={s.question}>Question:</p>
          <p className={s.questionText}>{card.question}</p>
          {open && (
            <div>
              <p className={s.question}>Answer:</p>
              <p className={s.questionText}>{card.answer}</p>
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
              <Button
                variant="contained"
                fullWidth
                style={{ marginTop: '20px' }}
                onClick={nextHandler}
              >
                Next
              </Button>
            </div>
          )}
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
      </div>
    )
  } else {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }
}
