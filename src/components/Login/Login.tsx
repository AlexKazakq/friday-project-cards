import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { loginTC } from '../../bll/store/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import { EmailTextField } from '../common/EmailTextField/EmailTextField'

import style from './Login.module.scss'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
  })

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
          <FormControl>
            <h3>Sign in</h3>
            <EmailTextField
              emailErrors={formik.errors.email}
              emailTouched={formik.touched.email}
              getFieldProps={formik.getFieldProps('email')}
            />

            <FormControl sx={{ height: '80px' }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                error={!!formik.errors.password && !!formik.touched.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {formik.errors.password && formik.touched.password && (
              <span className={style.errorSpan}>{formik.errors.password}</span>
            )}
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
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              disabled={status === 'loading'}
            >
              Login
            </Button>
            <p>Already have an account?</p>
            <NavLink to={PATH.REGISTER} className={style.signIn}>
              Sign Up
            </NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
