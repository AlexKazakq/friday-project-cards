import React from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../assets/Routes/path'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'

import letterIcon from './../../assets/images/letter.png'
import styleForm from './../../styles/form.module.css'
import s from './checkEmail.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      navigate(PATH.LOGIN)
    },
  })

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <h3>Check Email</h3>
            <div className={s.letterIconWrapper}>
              <img src={letterIcon} className={s.letterIcon} />
            </div>
            <p>We’ve sent an Email with instructions to example@mail.com</p>
            <ButtonForm buttonName={'Back to login'} />
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
