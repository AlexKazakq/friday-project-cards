import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../assets/Routes/path'
import { RegisterTC } from '../../bll/store/register-reducer'
import { AppRootStateType } from '../../bll/store/store'

export const Registration = () => {
  const responseError = useSelector<AppRootStateType, string | null>(state => state.app.error)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password and confirmation password do not match')
      .required('Required'),
  })
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
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      // @ts-ignore
      delete values.confirm
      console.log(values)
      // @ts-ignore
      dispatch(RegisterTC(values))
      formik.resetForm()
    },
  })

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
                  error={!!formik.errors.confirm && !!formik.touched.confirm}
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
              <NavLink
                to={PATH.LOGIN}
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
              </NavLink>
              <NavLink
                to={PATH.LOGIN}
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  color: '#0066cc',
                  fontSize: '20px',
                }}
              >
                Sign In
              </NavLink>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
