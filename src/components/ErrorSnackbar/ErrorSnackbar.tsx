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
  const typeError = error == 'you are not authorized /ᐠ-ꞈ-ᐟ\\' ? 'warning' : 'error'

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={typeError} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}