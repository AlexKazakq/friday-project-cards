import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../api/auth-api'

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
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer

export const { setIsLoggedIn, setLoggedOut } = slice.actions

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
  authAPI
    .logIn(data)
    .then(res => {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    })
    .catch(e => {})
}

export const logoutTC = () => (dispatch: Dispatch) => {
  authAPI.logOut().then(res => {
    dispatch(setLoggedOut({ isLoggedIn: false }))
  })
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
