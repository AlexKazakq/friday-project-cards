import React from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

import letterIcon from '../../../assets/images/letter.png'
import { PATH } from '../../../assets/Routes/path'
import { statusSelector } from '../../../bll/selectors/selectors'
import { useAppSelector } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'

import s from './checkEmail.module.css'

export const CheckEmail = () => {
  const status = useAppSelector(statusSelector)

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
