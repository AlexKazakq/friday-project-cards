import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PATH } from './assets/Routes/path'
import { PrivateRoutesLogin } from './assets/Routes/PrivateRoutesLogin'
import { PrivateRoutesLogout } from './assets/Routes/PrivateRoutesLogout'
import { initializeAppTC } from './bll/store/app-reducer'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { Cards } from './UI/components/Cards/Cards'
import { Error404 } from './UI/components/Error404/Error404'
import { Header } from './UI/components/Header/Header'
import { Learn } from './UI/components/Learn/Learn'
import { Login } from './UI/components/Login/Login'
import { NewPassword } from './UI/components/NewPassword/NewPassword'
import { Packs } from './UI/components/Packs/Packs'
import { CheckEmail } from './UI/components/PasswordRecovery/CheckEmail'
import { PasswordRecovery } from './UI/components/PasswordRecovery/PasswordRecovery'
import { Profile } from './UI/components/Profile/Profile'
import { Registration } from './UI/components/Registration/Registration'
import { ErrorSnackbar } from './UI/components/Snackbar/ErrorSnackbar'
import { InfoSnackbar } from './UI/components/Snackbar/InfoSnackbar'

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
        <Route path={PATH.ERROR404} element={<Error404 />} />
        <Route path={'/*'} element={<Navigate to={PATH.ERROR404} />} />

        <Route element={<PrivateRoutesLogout />}>
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.CARDS} element={<Cards />} />
          <Route path={PATH.LEARN} element={<Learn />} />
        </Route>

        <Route element={<PrivateRoutesLogin />}>
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Registration />} />
          <Route path={PATH.RECOVERY} element={<PasswordRecovery />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.SET_NEW_PASSWORD} element={<NewPassword />} />
        </Route>
      </Routes>
      {/*<ErrorSnackbar />*/}
      <InfoSnackbar />
    </div>
  )
}

export default App
