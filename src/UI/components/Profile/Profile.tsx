import React, { useCallback } from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../assets/Routes/path'
import { profileInfoSelector, statusSelector } from '../../../bll/selectors/selectors'
import { logoutTC } from '../../../bll/store/auth-reducer'
import { updateProfileDataTC } from '../../../bll/store/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import styleForm from '../../styles/form.module.css'

import BadgeAvatars from './Avatar'
import s from './profile.module.css'
import { ProfileName } from './ProfileName'

export const Profile = () => {
  const navigate = useNavigate()
  const profileInfo = useAppSelector(profileInfoSelector)
  const status = useAppSelector(statusSelector)
  const dispatch = useAppDispatch()

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
          <div className={styleForm.buttonForm}>
            <Button
              variant={'contained'}
              color={'primary'}
              disabled={status === 'loading'}
              className={styleForm.button}
              onClick={() => {
                navigate(PATH.PACKS)
              }}
            >
              Go to packs
            </Button>
          </div>
          <a onClick={() => dispatch(logoutTC())} className={styleForm.linkForm}>
            Log out
          </a>
        </FormControl>
      </Grid>
    </Grid>
  )
}
