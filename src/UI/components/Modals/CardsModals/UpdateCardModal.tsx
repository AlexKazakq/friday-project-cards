import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { updateCardTC } from '../../../../bll/store/cards-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import { BasicModal } from '../BasicModal'

type PropsType = {
  _id: string
  primaryQuestion: string
  primaryAnswer: string
}

export const UpdateCardModal: FC<PropsType> = ({ _id, primaryQuestion, primaryAnswer }) => {
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState(primaryQuestion)
  const [answer, setAnswer] = useState(primaryAnswer)

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
      headerText={'Edit card'}
      name={<EditIcon />}
      confirmButtonName={'Edit'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <TextField
          value={question}
          onInput={onInputQuestionHandler}
          fullWidth
          label="Question"
          variant="standard"
        />
        <div>
          <TextField
            value={answer}
            onInput={onInputAnswerHandler}
            fullWidth
            label="Answer"
            variant="standard"
          />
        </div>
      </Typography>
    </BasicModal>
  )
}
