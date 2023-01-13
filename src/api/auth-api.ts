import axios from 'axios'

import { LoginDataType } from '../bll/store/auth-reducer'
import { NewPasswordResponseType } from '../bll/store/passwordChanger-reducer'
import { UpdateProfileDataType } from '../bll/store/profile-reducer'
import { RegisterDataType } from '../bll/store/register-reducer'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  // 'https://neko-back.herokuapp.com/2.0/',
  // 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  logIn(payload: LoginDataType) {
    return instance.post('auth/login', payload)
  },
  register(payload: RegisterDataType) {
    return instance.post('/auth/register', payload)
  },
  logOut() {
    return instance.delete('/auth/me')
  },
  me() {
    return instance.post('/auth/me')
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

export const newPasswordAPI = {
  sendNewPassword(payload: NewPasswordResponseType) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password', payload)
  },
}

export const passwordRecoveryAPI = {
  sendInstructionForRecovery(email: string) {
    console.log('passwordRecoveryAPI')

    return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
      email: email,
      message: `<div style="padding: 15px;
                            color: black;
                            background-color: aliceblue">
                <p>You have requested to recover your password on the FridayProject website</p>
                <br/>
                <p>If you hane not done so, please ignore this letter</p>
                <br/>
                <h2>Password recovery link: </h2>
                <a href="http://localhost:3000/#/set-new-password/$token$" style="font-size: 25px;">
                link</a>
                </div>`,
    })
  },
}
