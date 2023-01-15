import React, { useCallback, useEffect } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

import {
  isLoggedInSelector,
  profileInfoSelector,
  statusSelector,
} from '../../../bll/selectors/selectors'
import { logoutTC } from '../../../bll/store/auth-reducer'
import { getUserProfileTC, updateProfileDataTC } from '../../../bll/store/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'

import BadgeAvatars from './Avatar'
import s from './profile.module.css'
import { ProfileName } from './ProfileName'

export const Profile = () => {
  const profileInfo = useAppSelector(profileInfoSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const status = useAppSelector(statusSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getUserProfileTC())
  }, [])

  let logoutOnClick = () => {
    dispatch(logoutTC())
  }

  let updateNickname = useCallback((nickname: string) => {
    dispatch(updateProfileDataTC({ name: nickname }))
  }, [])

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <FormControl>
          <h3>Personal Information</h3>
          <div className={s.avatar}>
            <BadgeAvatars name={profileInfo.name} avatar={profileInfo.avatar} />
          </div>
          <ProfileName nickname={profileInfo.name} updateNickname={updateNickname} />
          <p>{profileInfo.email}</p>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logoutOnClick}
            disabled={status === 'loading'}
          >
            Log out
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}