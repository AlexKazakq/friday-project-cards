import React from 'react'

import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { errorSelector, infoSelector } from '../../../bll/selectors/selectors'
import { setAppError, setAppInfo } from '../../../bll/store/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function InfoSnackbar() {
  const dispatch = useAppDispatch()
  const info = useAppSelector(infoSelector)
  let error = useAppSelector(errorSelector)

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppInfo({ info: null }))
    dispatch(setAppError({ error: null }))
  }
  let severityType: AlertColor | undefined
  let text: string | null

  if (info) {
    severityType = 'success'
    text = info
    error = null
  } else if (error) {
    severityType = 'error'
    text = error
  } else {
    text = null
  }

  return (
    <Snackbar
      open={(error !== null || info !== null) && error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\'}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severityType} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  )
}
