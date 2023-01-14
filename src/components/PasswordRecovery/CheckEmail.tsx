import React from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

import { useAppSelector } from '../../hooks/hooks'

import letterIcon from './../../assets/images/letter.png'
import styleForm from './../../styles/form.module.css'
import s from './checkEmail.module.css'

export const CheckEmail = () => {
  const status = useAppSelector(state => state.app.status)

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
                window.location.href = '/friday-project-cards/login'
              }}
              disabled={status === 'loading'}
            >
              Back to login
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
