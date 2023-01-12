import React from 'react'

import { Button, FormControl, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'

import { sendInstructionForRecoveryTC } from '../../bll/store/passwordRecovery-reducer'
import { useAppDispatch } from '../../hooks/hooks'

import styleForm from './../../styles/form.module.css'
export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      dispatch(sendInstructionForRecoveryTC(values.email))
      // window.location.href = '/friday-project-cards/checkEmail'
    },
  })

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit} className={styleForm.form}>
          <FormControl>
            <h3>Forgot your password?</h3>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              {...formik.getFieldProps('email')}
            />
            <p>Enter your email address and we will send you further instructions</p>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Send instructions
            </Button>
            <p>Did you remember your password?</p>
            <a href={'/friday-project-cards/login'}>Try loging in </a>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
