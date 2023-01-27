import * as React from 'react'
import { FC } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import Typography from '@mui/material/Typography'

import { deletePackTC } from '../../../bll/store/packs-reducer'
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
  packId: string
}

export const DeletePackModal: FC<PropsType> = ({ packId }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(true)

  const onButtonClickHandler = () => {
    dispatch(deletePackTC({ id: packId }))
  }

  return (
    <BasicModal
      name={
        <Tooltip title="Delete cards">
          <DeleteForeverIcon />
        </Tooltip>
      }
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
