import React from 'react'

import { Button, FormControl, Grid, TextField } from '@mui/material'
// eslint-disable-next-line import/order
import { useFormik } from 'formik'

// eslint-disable-next-line import/no-unresolved

import { useSelector } from 'react-redux'

import { sendNewPasswordTC } from '../../bll/store/passwordChanger-reducer'
import { AppRootStateType } from '../../bll/store/store'

import styleForm from './../../styles/form.module.css'

export const NewPassword = () => {
  const status = useSelector<AppRootStateType, boolean>(state => state.sendNewPassword.changed)
  const token = window.location.href.split('/')[5]
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values))
      console.log({ password: values.password, resetPasswordToken: token })
      sendNewPasswordTC({ password: values.password, resetPasswordToken: token })
      console.log(status)
      // window.location.href = '/friday-project-cards/profile'
    },
  })

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
