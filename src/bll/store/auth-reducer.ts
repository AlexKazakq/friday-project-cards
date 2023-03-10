import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authAPI } from '../../api/auth-api'

import { setAppError, setAppStatus } from './app-reducer'
import { setNewProfileData } from './profile-reducer'
import { AppDispatch } from './store'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer

export const { setIsLoggedIn } = slice.actions

export const loginTC = (data: LoginDataType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logIn(data)

    dispatch(setIsLoggedIn({ isLoggedIn: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(
      setNewProfileData({
        nickName: res.data.name,
        avatar: res.data.avatar,
        email: res.data.email,
        id: res.data._id,
      })
    )
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedIn({ isLoggedIn: false }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(setNewProfileData({ nickName: ' ', avatar: ' ', email: ' ', id: ' ' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
