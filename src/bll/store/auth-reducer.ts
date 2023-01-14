import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authAPI } from '../../api/auth-api'

import { setAppError, setAppStatus } from './app-reducer'

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

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    await authAPI.logIn(data)

    dispatch(setIsLoggedIn({ isLoggedIn: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
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
