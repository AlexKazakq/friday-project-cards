import React from 'react'

import '../../App.css'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../assets/Routes/path'
import { isLoggedInSelector, profileInfoSelector } from '../../bll/selectors/selectors'
import { useAppSelector } from '../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'
import { AvatarImg } from '../Profile/Avatar'

import s from './header.module.css'

export function Header() {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const profileInfo = useAppSelector(profileInfoSelector)
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
