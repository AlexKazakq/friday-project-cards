import React from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { sendInstructionForRecoveryTC } from '../../bll/store/passwordRecovery-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import { EmailTextField } from '../common/EmailTextField/EmailTextField'

import styleForm from './../../styles/form.module.css'
import s from './PasswordRecovery.module.css'

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const isEmailSend = useAppSelector(state => state.passwordRecovery.isEmailSend)
  const RecoveryValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
  })

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
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <h3>Forgot your password?</h3>
          <EmailTextField
            emailErrors={formik.errors.email}
            emailTouched={formik.touched.email}
            getFieldProps={formik.getFieldProps('email')}
          />

          <FormControl>
            <p className={s.description}>
              Enter your email address and we will send you further instructions
            </p>
            <ButtonForm buttonName={'Send instructions'} />

            <p>Did you remember your password?</p>
            <NavLink to={PATH.LOGIN} className={styleForm.linkForm}>
              Try login
            </NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
