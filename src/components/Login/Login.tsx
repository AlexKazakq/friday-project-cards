import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { loginTC } from '../../bll/store/auth-reducer'
import { useAppDispatch } from '../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import { EmailTextField } from '../common/EmailTextField/EmailTextField'
import { PasswordTextField } from '../common/PasswordTextField/PasswordTextField'

import style from './Login.module.scss'

export const Login = () => {
  const dispatch = useAppDispatch()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      dispatch(loginTC(values))
    },
  })

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={styleForm.formContainer}>
            <h3>Sign in</h3>
            <EmailTextField
              emailErrors={formik.errors.email}
              emailTouched={formik.touched.email}
              getFieldProps={formik.getFieldProps('email')}
            />
            <PasswordTextField
              passwordErrors={formik.errors.password}
              passwordTouched={formik.touched.password}
              getFieldProps={formik.getFieldProps('password')}
              label={'Password'}
            />

            <FormControlLabel
              label={'Remember me'}
              control={
                <Checkbox
                  {...formik.getFieldProps('rememberMe')}
                  checked={formik.values.rememberMe}
                />
              }
            />
            <NavLink to={PATH.RECOVERY} className={style.forgot}>
              Forgot Password?
            </NavLink>
            <ButtonForm buttonName={'Login'} />

            <p>Already have an account?</p>
            <NavLink to={PATH.REGISTER} className={styleForm.linkForm}>
              Sign Up
            </NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
