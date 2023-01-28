import * as React from 'react'
import { FC } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Typography from '@mui/material/Typography'

import { deleteCardTC } from '../../../bll/store/cards-reducer'
import { useAppDispatch } from '../../../hooks/hooks'

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
  id: string
  cardName: string
}

export const DeleteCardModal: FC<PropsType> = ({ id, cardName }) => {
  const dispatch = useAppDispatch()

  const onButtonClickHandler = () => {
    dispatch(deleteCardTC({ id }))
  }

  return (
    <BasicModal
      name={<DeleteForeverIcon />}
      confirmButtonName={'Delete card'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Do you really want to remove {cardName}? All cards will be deleted?
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
    </BasicModal>
  )
}
