import React from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { sendInstructionForRecoveryTC } from '../../bll/store/passwordRecovery-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import styleForm from './../../styles/form.module.css'
import s from './PasswordRecovery.module.css'

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const isEmailSend = useAppSelector(state => state.passwordRecovery.isEmailSend)
  const RecoveryValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
  })
  const status = useAppSelector(state => state.app.status)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: RecoveryValidationSchema,
    onSubmit: values => {
      dispatch(sendInstructionForRecoveryTC(values.email))
    },
  })

  if (isEmailSend) {
    return <Navigate to={PATH.CHECK_EMAIL} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit} className={styleForm.form}>
          <FormControl>
            <h3>Forgot your password?</h3>
            {formik.errors.email && formik.touched.email ? (
              <TextField
                {...formik.getFieldProps('email')}
                error
                label="Email"
                variant="standard"
                helperText={formik.errors.email}
              />
            ) : (
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                {...formik.getFieldProps('email')}
              />
            )}
            <p className={s.description}>
              Enter your email address and we will send you further instructions
            </p>
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              disabled={status === 'loading'}
            >
              Send instructions
            </Button>
            <p>Did you remember your password?</p>
            <NavLink to={PATH.LOGIN} className={s.linkLogin}>
              Try login
            </NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
