import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { infoSelector } from '../../bll/selectors/selectors'
import { setAppInfo } from '../../bll/store/app-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function InfoSnackbar() {
  const dispatch = useAppDispatch()
  const info = useAppSelector(infoSelector)

  console.log(info)
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppInfo({ info: null }))
  }

  return (
    <Snackbar open={info !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
        {info}
      </Alert>
    </Snackbar>
  )
}
