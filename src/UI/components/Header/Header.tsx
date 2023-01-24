import React, { useEffect } from 'react'

import '../../../App.css'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../assets/Routes/path'
import { isLoggedInSelector } from '../../../bll/selectors/selectors'
import { useAppSelector } from '../../../hooks/hooks'
import SuperButton from '../common/SuperButton/SuperButton'

import { MenuHeader } from './menu/Menu'

export function Header() {
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
  }, [])

  let HeaderRight = () => {
    if (!isLoggedIn) {
      return <SuperButton onClick={() => navigate(PATH.LOGIN)}>Sign in</SuperButton>
    } else {
      return <MenuHeader />
    }
  }

  return (
    <div className={'App__header'}>
      <span style={{ fontSize: '30px', fontStyle: 'italic', opacity: '0.7' }}>Friday Project</span>
      <HeaderRight />
    </div>
  )
}
