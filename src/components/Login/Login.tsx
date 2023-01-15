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
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { statusSelector } from '../../bll/selectors/selectors'
import { loginTC } from '../../bll/store/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

import style from './Login.module.scss'

export const Login = () => {
  const status = useAppSelector(statusSelector)
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
              <a href={'#'} className={style.account}>
                Already have an account?
              </a>
              <NavLink to={PATH.REGISTER} className={style.signIn}>
                Sign Up
              </NavLink>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
