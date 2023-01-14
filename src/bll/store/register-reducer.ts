import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authAPI } from '../../api/auth-api'

import { setAppError, setAppStatus } from './app-reducer'

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

export const RegisterTC = (data: RegisterDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.register(data)

    dispatch(isRegistered({ registered: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppError({ error: error }))
      dispatch(setAppStatus({ status: 'failed' }))
    }
  }
}

export type RegisterDataType = {
  email: string
  password: string
}
