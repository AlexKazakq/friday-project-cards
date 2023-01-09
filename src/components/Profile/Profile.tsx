import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Button, FormControl, Grid } from '@mui/material'

import styleForm from '../../styles/form.module.css'
import s from '../Profile/profile.module.css'

import { ProfileName } from './ProfileName'

export const Profile = () => {
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form className={styleForm.form}>
          <FormControl>
            <h3>Personal Information</h3>
            <img
              src={'http://cinewest.ru/wp-content/uploads/2014/06/leonardo-di-kaprio-Copy.jpg'}
              className={s.avatar}
            />
            <ProfileName nickname={'Ivan'} updateNickname={() => {}} />
            <p>j&johnson@gmail.com</p>
            <Button variant="outlined" startIcon={<LogoutIcon />}>
              Log out
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
