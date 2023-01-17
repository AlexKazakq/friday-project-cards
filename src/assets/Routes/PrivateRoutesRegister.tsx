import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../hooks/hooks'

import { PATH } from './path'

export const PrivateRoutesRegister = () => {
  const isRegister = useAppSelector(state => state.register.registered)

  return !isRegister ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
