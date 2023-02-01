import * as React from 'react'
import { FC } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import Typography from '@mui/material/Typography'

import { deletePackTC } from '../../../../bll/store/packs-reducer'
import { useAppDispatch } from '../../../../hooks/hooks'
import { BasicModal } from '../BasicModal'

type PropsType = {
  packId: string
  packName: string
}

export const DeletePackModal: FC<PropsType> = ({ packId, packName }) => {
  const dispatch = useAppDispatch()

  const onButtonClickHandler = () => {
    dispatch(deletePackTC({ id: packId }))
  }

  return (
    <BasicModal
      headerText={'Delete Pack'}
      name={
        <Tooltip title="Delete cards">
          <DeleteForeverIcon />
        </Tooltip>
      }
      confirmButtonName={'Delete pack'}
      onClickConfirmHandler={onButtonClickHandler}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Do you really want to remove {packName}? All cards will be deleted.
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
    </BasicModal>
  )
}
