import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import Typography from '@mui/material/Typography'

import { cardPacksSelector } from '../../../bll/selectors/selectors'
import { addNewCardTC } from '../../../bll/store/cards-reducer'
import { setPackUserData } from '../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
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
  cardsPack_id: string
}

export const AddCardModal: FC<PropsType> = ({ cardsPack_id }) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onInputQuestionHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onInputAnswerHandler = (e: FormEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }
  const packData = cardPacks.find(pack => pack._id === cardsPack_id)
  const onButtonClickHandler = () => {
    dispatch(addNewCardTC({ card: { cardsPack_id, question, answer } }))
    packData &&
      dispatch(
        setPackUserData({
          userData: {
            packUserId: packData.user_id,
            packId: packData._id,
            packUserName: packData.user_name,
            cardsCount: packData.cardsCount,
          },
        })
      )
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
