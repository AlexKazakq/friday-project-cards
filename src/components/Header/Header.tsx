import React from 'react'

import '../../App.css'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutTC } from '../../bll/store/auth-reducer'
import { AppRootStateType } from '../../bll/store/store'
import SuperButton from '../common/SuperButton/SuperButton'
import { AvatarImg } from '../Profile/Avatar'

import s from './header.module.css'

export function Header() {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const profileInfo = useSelector<AppRootStateType, any>(state => state.profile.profile)
  const navigate = useNavigate()
  const logOutHandler = () => {
    navigate('friday-project-cards/login')
    // @ts-ignore
    dispatch(logoutTC())
  }

  let HeaderRight = () => {
    if (!isLoggedIn) {
      return (
        <SuperButton onClick={() => navigate('friday-project-cards/login')}>Sign in</SuperButton>
      )
    } else if (location.pathname === '/friday-project-cards/profile') {
      return (
        <div>
          <div className={s.headerName}> {profileInfo.name}</div>
          <div className={s.headerAvatar}>
            <AvatarImg name={profileInfo.name} avatar={profileInfo.avatar} />
          </div>
        </div>
      )
    } else return <SuperButton onClick={logOutHandler}>Log Out</SuperButton>
  }

  return (
    <div className={'App__header'}>
      <span style={{ fontSize: '30px', fontStyle: 'italic', opacity: '0.7' }}>Friday Project</span>
      <HeaderRight />
    </div>
  )
}
