import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'

import { setAppError } from '../../bll/store/app-reducer'
import { AppRootStateType } from '../../bll/store/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const dispatch = useDispatch()
  const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar
      open={error !== null && error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\'}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
