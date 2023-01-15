import React, { useCallback, useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'

import {
  isLoggedInSelector,
  profileInfoSelector,
  statusSelector,
} from '../../../bll/selectors/selectors'
import { logoutTC } from '../../../bll/store/auth-reducer'
import { getUserProfileTC, updateProfileDataTC } from '../../../bll/store/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'
import { ButtonForm } from '../common/ButtonForm/ButtonForm'
import s from '../Profile/profile.module.css'

import BadgeAvatars from './Avatar'
import s from './profile.module.css'
import { ProfileName } from './ProfileName'

export const Profile = () => {
  const profileInfo = useAppSelector(state => state.profile.profile)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      dispatch(logoutTC())
    },
  })

  let updateNickname = useCallback((nickname: string) => {
    dispatch(updateProfileDataTC({ name: nickname }))
  }, [])

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'} className={styleForm.form}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <h3>Personal Information</h3>
            <div className={s.avatar}>
              <BadgeAvatars name={profileInfo.name} avatar={profileInfo.avatar} />
            </div>
            <ProfileName nickname={profileInfo.name} updateNickname={updateNickname} />
            <p>{profileInfo.email}</p>
            <ButtonForm buttonName={'Log out'} />
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
