import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { loginTC } from '../../bll/store/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import style from './Login.module.scss'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  console.log('Render login')

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
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Password should be more then 2 symbols'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/friday-project-cards/profile/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <h2 className={style.title}>Sign in</h2>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup sx={{ '& .MuiTextField-root': { width: '400px', height: '80px' } }}>
              {formik.errors.email && formik.touched.email ? (
                <TextField
                  {...formik.getFieldProps('email')}
                  error
                  margin="normal"
                  label="Email"
                  helperText={formik.errors.email}
                />
              ) : (
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              )}
              <FormControl sx={{ width: '400px', height: '80px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  error={!!formik.errors.password && !!formik.touched.password}
                  label="Password"
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
              {formik.errors.password && formik.touched.password ? (
                <span className={style.errorSpan}>{formik.errors.password}</span>
              ) : (
                ''
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
              <NavLink to={'/friday-project-cards/passRecovery'} className={style.forgot}>
                Forgot Password?
              </NavLink>
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
              <a href={'#'} className={style.account}>
                Already have an account?
              </a>
              <NavLink to={'/friday-project-cards/registration'} className={style.signIn}>
                Sign Up
              </NavLink>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
