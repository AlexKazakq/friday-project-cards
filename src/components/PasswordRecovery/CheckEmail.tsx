import React from 'react'

import { Button, FormControl, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../assets/Routes/path'

import letterIcon from './../../assets/images/letter.png'
import styleForm from './../../styles/form.module.css'
import s from './checkEmail.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form className={styleForm.form}>
          <FormControl>
            <h3>Check Email</h3>
            <div className={s.letterIconWrapper}>
              <img src={letterIcon} className={s.letterIcon} />
            </div>
            <p>We’ve sent an Email with instructions to example@mail.com</p>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => {
                navigate(PATH.LOGIN)
              }}
            >
              Back to login
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
