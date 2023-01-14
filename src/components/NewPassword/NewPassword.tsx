import React from 'react'

import { Button, FormControl, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../assets/Routes/path'
import { sendNewPasswordTC } from '../../bll/store/passwordChanger-reducer'
import { AppRootStateType } from '../../bll/store/store'
import { useAppDispatch } from '../../hooks/hooks'

import styleForm from './../../styles/form.module.css'

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isPasswordChanged = useSelector<AppRootStateType, boolean>(
    state => state.sendNewPassword.changed
  )
  const token = window.location.href.split('/')[5]
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    onSubmit: values => {
      dispatch(sendNewPasswordTC({ password: values.password, resetPasswordToken: token }))
      // window.location.href = '/friday-project-cards/profile'
    },
  })

  if (isPasswordChanged) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit} className={styleForm.form}>
          <FormControl>
            <h3>Create new password</h3>
            <TextField
              type="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              {...formik.getFieldProps('password')}
            />
            <p>Create new password and we will send you further instructions to email</p>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Create new password
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
