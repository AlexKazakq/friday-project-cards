import React from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { sendNewPasswordTC } from '../../bll/store/passwordChanger-reducer'
import { AppRootStateType } from '../../bll/store/store'
import { useAppDispatch } from '../../hooks/hooks'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import { PasswordTextField } from '../common/PasswordTextField/PasswordTextField'

import styleForm from './../../styles/form.module.css'

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isPasswordChanged = useSelector<AppRootStateType, boolean>(
    state => state.sendNewPassword.changed
  )

  const NewPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
  })

  const token = window.location.href.split('/')[5]
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: NewPasswordValidationSchema,
    onSubmit: values => {
      dispatch(sendNewPasswordTC({ password: values.password, resetPasswordToken: token }))
    },
  })

  if (isPasswordChanged) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <h3>Create new password</h3>

            <PasswordTextField
              passwordErrors={formik.errors.password}
              passwordTouched={formik.touched.password}
              getFieldProps={formik.getFieldProps('password')}
              label={'Password'}
            />

            <p>Create new password and we will send you further instructions to email</p>
            <ButtonForm buttonName={'Create new password'} />
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
