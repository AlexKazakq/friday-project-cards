import React, { useCallback, useEffect } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Button, FormControl, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { getUserProfileTC, updateProfileDataTC } from '../../bll/store/profile-reducer'
import { AppRootStateType } from '../../bll/store/store'
import styleForm from '../../styles/form.module.css'
import s from '../Profile/profile.module.css'

import { ProfileName } from './ProfileName'

export const Profile = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector<AppRootStateType, any>(state => state.profile.profile)

  useEffect(() => {
    // @ts-ignore
    dispatch(getUserProfileTC())
  }, [])

  let updateNickname = useCallback((nickname: string) => {
    // @ts-ignore
    return dispatch(updateProfileDataTC({ name: nickname }))
  }, [])

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form className={styleForm.form}>
          <FormControl>
            <h3>Personal Information</h3>
            <img
              src={
                profileInfo.avatar
                  ? profileInfo.avatar
                  : 'http://cinewest.ru/wp-content/uploads/2014/06/leonardo-di-kaprio-Copy.jpg'
              }
              className={s.avatar}
            />
            <ProfileName nickname={profileInfo.name} updateNickname={updateNickname} />
            <p>{profileInfo.email}</p>
            <Button variant="outlined" startIcon={<LogoutIcon />}>
              Log out
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
