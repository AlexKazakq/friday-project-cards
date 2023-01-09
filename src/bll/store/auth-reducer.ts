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
  },
})

export const authReducer = slice.reducer

export const { setIsLoggedIn } = slice.actions

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
  authAPI
    .login(data)
    .then(res => {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    })
    .catch(e => {})
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
