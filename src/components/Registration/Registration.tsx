import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { RegisterTC } from '../../bll/store/register-reducer'
import { AppRootStateType } from '../../bll/store/store'
import { ErrorSnackbar } from '../ErrorSnackbar/ErrorSnackbar'

export const Registration = () => {
  const registered = useSelector<AppRootStateType, boolean>(state => state.register.registered)
  const responseError = useSelector<AppRootStateType, string | null>(state => state.app.error)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickConfShowPassword = () => setShowConfPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
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

      if (!values.confirm) {
        errors.confirm = 'Required'
      } else if (values.confirm !== values.password) {
        errors.confirm = 'Password and confirmation password do not match'
      }

      return errors
    },
    onSubmit: values => {
      // @ts-ignore
      delete values.confirm
      console.log(values)
      // @ts-ignore
      dispatch(RegisterTC(values))
      formik.resetForm()
    },
  })

  if (registered) {
    return <Navigate to={'/friday-project-cards/profile'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <h2 style={{ color: 'black', textAlign: 'center', marginTop: '50px' }}>Sign UP</h2>
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
                <span
                  style={{
                    color: 'red',
                    fontSize: '13px',
                    position: 'absolute',
                    top: '257px',
                    left: '15px',
                  }}
                >
                  {formik.errors.password}
                </span>
              ) : (
                ''
              )}
              <FormControl sx={{ width: '400px', height: '80px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                <OutlinedInput
                  type={showConfPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('confirm')}
                  // error={!!formik.errors.confirm && !!formik.touched.confirm}
                  error={!!formik.errors.confirm}
                  label="Confirm"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickConfShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {formik.errors.confirm && formik.touched.confirm ? (
                <span
                  style={{
                    color: 'red',
                    fontSize: '13px',
                    position: 'absolute',
                    top: '332px',
                    left: '10px',
                  }}
                >
                  {formik.errors.confirm}
                </span>
              ) : (
                ''
              )}

              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Sign Up
              </Button>
              <a
                href={'/friday-project-cards/login'}
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  color: 'black',
                  textDecoration: 'none',
                  opacity: '0.7',
                  fontSize: '13px',
                }}
              >
                Already have an account?
              </a>
              <a
                href={'/friday-project-cards/login'}
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  color: '#0066cc',
                  fontSize: '20px',
                }}
              >
                Sign In
              </a>
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
  confirm?: string
  rememberMe?: boolean
}
