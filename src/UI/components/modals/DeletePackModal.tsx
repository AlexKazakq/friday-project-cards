import * as React from 'react'
import { FC, FormEvent, useState } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { addNewPackTC, deletePackTC } from '../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'
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
  packId: string
}

export const DeletePackModal: FC<PropsType> = ({ packId }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(true)

  const onInputHandler = (e: FormEvent<HTMLInputElement>) => {}
  const onButtonClickHandler = () => {
    dispatch(deletePackTC({ id: packId }))
  }

  return (
    <BasicModal
      name={<DeleteForeverIcon />}
      confirmButtonName={'Delete pack'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Do you really want to remove Pack Name? All cards will be deleted.
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
    </BasicModal>
  )
}
