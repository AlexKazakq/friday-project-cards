import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { Simulate } from 'react-dom/test-utils'

import { authAPI } from '../../api/auth-api'

import { setAppError } from './app-reducer'

const initialState = {
  registered: false,
}

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    isRegistered(state, action: PayloadAction<{ registered: boolean }>) {
      state.registered = action.payload.registered
    },
  },
})

export const regReducer = slice.reducer

export const { isRegistered } = slice.actions

export const RegisterTC = (data: RegisterDataType) => (dispatch: Dispatch) => {
  authAPI
    .register(data)
    .then(res => {
      dispatch(isRegistered({ registered: true }))
    })
    .catch(e => {
      dispatch(setAppError({ error: e.response.data.error }))
    })
}

export type RegisterDataType = {
  email: string
  password: string
}
