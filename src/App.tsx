import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

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
        <Route path={'friday-project-cards/'} element={<Login />} />
        <Route path={'friday-project-cards/login'} element={<Login />} />
        <Route path={'friday-project-cards/registration'} element={<Registration />} />
        <Route path={'friday-project-cards/profile'} element={<Profile />} />
        <Route path={'friday-project-cards/404'} element={<NotFound />} />
        <Route path={'friday-project-cards/passRecovery'} element={<PasswordRecovery />} />
        <Route path={'friday-project-cards/checkEmail'} element={<CheckEmail />} />
        <Route path={'friday-project-cards/newPassword/:token'} element={<NewPassword />} />
        <Route path={'friday-project-cards/*'} element={<Navigate to={'/404'} />} />
      </Routes>
      <ErrorSnackbar />
      <InfoSnackbar />
    </div>
  )
}

export default App
