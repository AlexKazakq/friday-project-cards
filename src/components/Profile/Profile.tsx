import React, { useCallback, useEffect } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, FormControl, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { logoutTC } from '../../bll/store/auth-reducer'
import { getUserProfileTC, updateProfileDataTC } from '../../bll/store/profile-reducer'
import { AppRootStateType } from '../../bll/store/store'
import styleForm from '../../styles/form.module.css'
import s from '../Profile/profile.module.css'

import BadgeAvatars from './Avatar'
import { ProfileName } from './ProfileName'

export const Profile = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector<AppRootStateType, any>(state => state.profile.profile)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/friday-project-cards/login'} />
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getUserProfileTC())
  }, [])

  let logoutOnClick = () => {
    // @ts-ignore
    return dispatch(logoutTC())
  }

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
            <div className={s.avatar}>
              <BadgeAvatars name={profileInfo.name} avatar={profileInfo.avatar} />
            </div>
            <ProfileName nickname={profileInfo.name} updateNickname={updateNickname} />
            <p>{profileInfo.email}</p>
            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={logoutOnClick}>
              Log out
            </Button>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
