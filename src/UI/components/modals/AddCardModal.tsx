import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import Typography from '@mui/material/Typography'

import { addNewCardTC } from '../../../bll/store/cards-reducer'
import { addNewPackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'
import { SuperCheckbox } from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'
import SuperSelect from '../common/SuperSelect/SuperSelect'

import { BasicModal } from './BasicModal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type PropsType = {
  cardsPack_id: string
}

export const AddCardModal: FC<PropsType> = ({ cardsPack_id }) => {
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onInputQuestionHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onInputAnswerHandler = (e: FormEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }
  const onButtonClickHandler = () => {
    dispatch(addNewCardTC({ card: { cardsPack_id, question, answer } }))
  }

  return (
    <BasicModal
      name={'Add new card'}
      confirmButtonName={'Add new card'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new card
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Question
        <SuperInputText onInput={onInputQuestionHandler} />
        Answer
        <SuperInputText onInput={onInputAnswerHandler} />
      </Typography>
    </BasicModal>
  )
}
