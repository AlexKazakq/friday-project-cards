import axios from 'axios'

import { LoginDataType } from '../bll/store/auth-reducer'
import { UpdateProfileDataType } from '../bll/store/profile-reducer'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(payload: LoginDataType) {
    return instance.post('auth/login', payload)
  },
}

export const profileAPI = {
  getProfileInfo() {
    return instance.post('auth/me')
  },
  updateProfile(payload: UpdateProfileDataType) {
    return instance.put('auth/me', payload)
  },
}
