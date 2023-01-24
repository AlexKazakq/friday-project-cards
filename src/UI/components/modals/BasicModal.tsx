import * as React from 'react'
import { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

import SuperButton from '../common/SuperButton/SuperButton'

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
  children: any
  // name: string | JSX.Element
  name?: any
  onClickConfirmHandler?: () => void
  onClickCancelHandler?: () => void
  confirmButtonName?: string
}

export const BasicModal: FC<PropsType> = ({
  children,
  name,
  onClickConfirmHandler,
  confirmButtonName,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)
  const onClickHandler = () => {
    onClickConfirmHandler && onClickConfirmHandler()
    handleOpen()
  }

  return (
    <div>
      <Button onClick={handleOpen}>{name}</Button>
      <Modal open={open} onClose={handleOpen}>
        <Box sx={style}>
          <CloseIcon onClick={handleOpen} />
          {children}
          <SuperButton onClick={onClickHandler}>{confirmButtonName}</SuperButton>
          <SuperButton onClick={handleOpen}>Cancel</SuperButton>
        </Box>
      </Modal>
    </div>
  )
}
