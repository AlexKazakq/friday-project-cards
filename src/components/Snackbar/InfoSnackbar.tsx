import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'

import { setAppInfo } from '../../bll/store/app-reducer'
import { AppRootStateType } from '../../bll/store/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function InfoSnackbar() {
  const dispatch = useDispatch()
  const info = useSelector<AppRootStateType, string | null>(state => state.app.info)

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
