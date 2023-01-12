import React, { useCallback, useEffect } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, FormControl, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { logoutTC } from '../../bll/store/auth-reducer'
import { getUserProfileTC, updateProfileDataTC } from '../../bll/store/profile-reducer'
import { AppRootStateType, store } from '../../bll/store/store'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import s from '../Profile/profile.module.css'

import BadgeAvatars from './Avatar'
import { ProfileName } from './ProfileName'

export const Profile = () => {
  const profileInfo = useAppSelector(state => state.profile.profile)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    // @ts-ignore
    dispatch(getUserProfileTC())
  }, [])

  let logoutOnClick = () => {
    // @ts-ignore
    dispatch(logoutTC())
  }

  let updateNickname = useCallback((nickname: string) => {
    dispatch(updateProfileDataTC({ name: nickname }))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/friday-project-cards/login'} />
  }

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
