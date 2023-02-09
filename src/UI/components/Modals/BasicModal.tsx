import * as React from 'react'
import { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import s from './basicModal.module.css'

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// }

type PropsType = {
  headerText?: string
  children: any
  name?: ReactNode
  onClickConfirmHandler?: () => void
  onClickCancelHandler?: () => void
  confirmButtonName?: string
}

export const BasicModal: FC<PropsType> = ({
  headerText,
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
        {/*<Box sx={s.style} className={s.style}>*/}
        <Box className={s.style}>
          <div className={s.main}>
            <div className={s.header}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {headerText ? headerText : name}
              </Typography>
              <CloseIcon onClick={handleOpen} />
            </div>
            <div className={s.children}>{children}</div>
            <div className={s.button}>
              <Button onClick={onClickHandler}>{confirmButtonName}</Button>
              <Button onClick={handleOpen}>Cancel</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
