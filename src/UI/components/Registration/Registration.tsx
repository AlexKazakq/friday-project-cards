import React from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'

import { PATH } from '../../../assets/Routes/path'
import { RegisterTC } from '../../../bll/store/register-reducer'
import { useAppDispatch } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import { EmailTextField } from '../common/EmailTextField/EmailTextField'
import { PasswordTextField } from '../common/PasswordTextField/PasswordTextField'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(2, 'Password should be more then 2 characters').required('Required'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password and confirmation password do not match')
      .required('Required'),
  })

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
      // @ts-ignore
      dispatch(RegisterTC(values))
      formik.resetForm()
    },
  })

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl className={styleForm.formContainer}>
            <h3>Sign UP</h3>
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
            <PasswordTextField
              passwordErrors={formik.errors.confirm}
              passwordTouched={formik.touched.confirm}
              getFieldProps={formik.getFieldProps('confirm')}
              label={'Confirm'}
            />

            <ButtonForm buttonName={'Sign Up'} />

            <p>Already have an account?</p>
            <NavLink to={PATH.LOGIN} className={styleForm.linkForm}>
              Sign In
            </NavLink>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
