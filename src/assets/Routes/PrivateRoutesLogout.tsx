import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../hooks/hooks'

import { PATH } from './path'

export const PrivateRoutesLogout = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
