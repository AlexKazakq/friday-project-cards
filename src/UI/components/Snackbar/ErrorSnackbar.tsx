import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { errorSelector } from '../../../bll/selectors/selectors'
import { setAppError } from '../../../bll/store/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const dispatch = useAppDispatch()
  const error = useAppSelector(errorSelector)
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
