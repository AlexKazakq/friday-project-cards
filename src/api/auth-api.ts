import axios from 'axios'

import { LoginDataType } from '../bll/store/auth-reducer'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  logIn(payload: LoginDataType) {
    return instance.post('auth/login', payload)
  },
  logOut() {
    return instance.delete('/auth/me')
  },
  me() {
    return instance.post('/auth/me')
  },
}
