import * as React from 'react'
import { ChangeEvent, FC, FormEvent, useState } from 'react'

import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { cardPacksSelector } from '../../../../bll/selectors/selectors'
import { addNewCardTC } from '../../../../bll/store/cards-reducer'
import { setPackUserData } from '../../../../bll/store/packUserData-reducer'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { BasicModal } from '../BasicModal'

type PropsType = {
  cardsPack_id: string
}

export const AddCardModal: FC<PropsType> = ({ cardsPack_id }) => {
  const cardPacks = useAppSelector(cardPacksSelector)
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onInputQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onInputAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
            packName: packData.name,
          },
        })
      )
  }

  return (
    <BasicModal
      headerText={'Add new card'}
      name={'Add new card'}
      confirmButtonName={'Add new card'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-description" sx={{ mt: 1 }}>
        <div>
          <TextField
            onChange={onInputQuestionHandler}
            fullWidth
            variant="standard"
            label="Question"
          />
        </div>
        <div>
          <TextField
            onChange={onInputAnswerHandler}
            fullWidth
            variant="standard"
            label="Answer"
            sx={{ mt: 1 }}
          />
        </div>
      </Typography>
    </BasicModal>
  )
}
