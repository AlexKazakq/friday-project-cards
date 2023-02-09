import * as React from 'react'
import { FC } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Typography from '@mui/material/Typography'

import { deleteCardTC } from '../../../../bll/store/cards-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import { BasicModal } from '../BasicModal'

type PropsType = {
  id: string
  cardsName: string
}

export const DeleteCardModal: FC<PropsType> = ({ id, cardsName }) => {
  const dispatch = useAppDispatch()

  const onButtonClickHandler = () => {
    dispatch(deleteCardTC({ id }))
  }

  return (
    <BasicModal
      headerText={'Delete Card'}
      name={<DeleteForeverIcon />}
      confirmButtonName={'Delete card'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
        Do you really want to remove {cardsName}? All cards will be deleted?
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
    </BasicModal>
  )
}
