import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'

import { addNewCardTC, updateCardTC } from '../../../bll/store/cards-reducer'
import { updatePackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'
import { SuperCheckbox } from '../common/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../common/SuperInputText/SuperInputText'

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
  _id: string
  primaryQuestion: string
  primaryAnswer: string
}

export const UpdateCardModal: FC<PropsType> = ({ _id, primaryQuestion, primaryAnswer }) => {
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
    dispatch(updateCardTC({ card: { _id, answer, question } }))
  }

  return (
    <BasicModal
      name={<EditIcon />}
      confirmButtonName={'Edit'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new card
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Question
        <SuperInputText placeholder={primaryQuestion} onInput={onInputQuestionHandler} />
        Answer
        <div>
          <SuperInputText placeholder={primaryAnswer} onInput={onInputAnswerHandler} />
        </div>
      </Typography>
    </BasicModal>
  )
}
