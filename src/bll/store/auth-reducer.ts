import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

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
    setLoggedOut(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      debugger
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer

export const { setIsLoggedIn, setLoggedOut } = slice.actions

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  authAPI
    .logIn(data)
    .then(res => {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: e.response.data.error }))
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  authAPI
    .logOut()
    .then(res => {
      debugger
      dispatch(setLoggedOut({ isLoggedIn: false }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: e.response.data.error }))
    })
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
