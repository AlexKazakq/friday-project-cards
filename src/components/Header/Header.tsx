import React from 'react'

import '../../App.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../assets/Routes/path'
import { AppRootStateType } from '../../bll/store/store'
import SuperButton from '../common/SuperButton/SuperButton'
import { AvatarImg } from '../Profile/Avatar'

import s from './header.module.css'

export function Header() {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const profileInfo = useSelector<AppRootStateType, any>(state => state.profile.profile)
  const navigate = useNavigate()

  let HeaderRight = () => {
    if (!isLoggedIn) {
      return <SuperButton onClick={() => navigate(PATH.LOGIN)}>Sign in</SuperButton>
    } else {
      return (
        <div>
          <div className={s.headerName}> {profileInfo.name}</div>
          <div className={s.headerAvatar}>
            <AvatarImg name={profileInfo.name} avatar={profileInfo.avatar} />
          </div>
        </div>
      )
    }
  }

  return (
    <div className={'App__header'}>
      <span style={{ fontSize: '30px', fontStyle: 'italic', opacity: '0.7' }}>Friday Project</span>
      <HeaderRight />
    </div>
  )
}
