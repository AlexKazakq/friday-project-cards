import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from './assets/Routes/path'
import { PrivateRoutesLogin } from './assets/Routes/PrivateRoutesLogin'
import { PrivateRoutesLogout } from './assets/Routes/PrivateRoutesLogout'
import { initializeAppTC } from './bll/store/app-reducer'
import { Header } from './components/Header/Header'
import { Login } from './components/Login/Login'
import { NewPassword } from './components/NewPassword/NewPassword'
import { NotFound } from './components/NotFound/NotFound'
import { CheckEmail } from './components/PasswordRecovery/CheckEmail'
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery'
import { Profile } from './components/Profile/Profile'
import { Registration } from './components/Registration/Registration'
import { ErrorSnackbar } from './components/Snackbar/ErrorSnackbar'
import { InfoSnackbar } from './components/Snackbar/InfoSnackbar'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

function App() {
  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      {status === 'loading' && <LinearProgress />}
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
        <Route path={PATH.ERROR404} element={<NotFound />} />
        <Route path={'/*'} element={<Navigate to={PATH.ERROR404} />} />

        <Route element={<PrivateRoutesLogout />}>
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>

        <Route element={<PrivateRoutesLogin />}>
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Registration />} />
          <Route path={PATH.RECOVERY} element={<PasswordRecovery />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.SET_NEW_PASSWORD} element={<NewPassword />} />
        </Route>
      </Routes>
      <ErrorSnackbar />
      <InfoSnackbar />
    </div>
  )
}

export default App
