import React from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../../assets/Routes/path'
import { isPasswordChangedSelector } from '../../../bll/selectors/selectors'
import { sendNewPasswordTC } from '../../../bll/store/passwordChanger-reducer'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import { PasswordTextField } from '../common/PasswordTextField/PasswordTextField'

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isPasswordChanged = useAppSelector(isPasswordChangedSelector)

  const NewPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
  })
  const lengthUrl = window.location.href.split('/').length
  const token = window.location.href.split('/')[lengthUrl - 1]
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
