import React, { useEffect } from 'react'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { initializeAppTC, RequestStatusType } from './bll/store/app-reducer'
import { logoutTC } from './bll/store/auth-reducer'
import { AppRootStateType } from './bll/store/store'
import SuperButton from './components/common/SuperButton/SuperButton'
import { Login } from './components/Login/Login'
import { NewPassword } from './components/NewPassword/NewPassword'
import { NotFound } from './components/NotFound/NotFound'
import { CheckEmail } from './components/PasswordRecovery/CheckEmail'
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery'
import { Profile } from './components/Profile/Profile'
import { Registration } from './components/Registration/Registration'
import Test from './components/Test/Test'

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    // @ts-ignore
    dispatch(initializeAppTC())
  }, [])

  const logOutHandler = () => {
    // @ts-ignore
    dispatch(logoutTC())
  }

  return (
    <div className="App">
      <div className={'App__header'}>
        <span style={{ fontSize: '30px', fontStyle: 'italic', opacity: '0.7' }}>
          Friday Project
        </span>
        {!isLoggedIn ? (
          <SuperButton>Sign in</SuperButton>
        ) : (
          <SuperButton onClick={logOutHandler}>Log Out</SuperButton>
        )}
      </div>
      <Routes>
        <Route path={'friday-project-cards/'} element={<Test />} />
        <Route path={'friday-project-cards/login'} element={<Login />} />
        <Route path={'friday-project-cards/registration'} element={<Registration />} />
        <Route path={'friday-project-cards/profile'} element={<Profile />} />
        <Route path={'friday-project-cards/404'} element={<NotFound />} />
        <Route path={'friday-project-cards/passRecovery'} element={<PasswordRecovery />} />
        <Route path={'friday-project-cards/checkEmail'} element={<CheckEmail />} />
        <Route path={'friday-project-cards/newPassword'} element={<NewPassword />} />
        <Route path={'friday-project-cards/*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}

export default App
