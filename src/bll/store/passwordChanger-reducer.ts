import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { newPasswordAPI } from '../../api/auth-api'

import { setAppError, setAppInfo, setAppStatus } from './app-reducer'

const initialState = {
  changed: false,
}

const slice = createSlice({
  name: 'sendNewPassword',
  initialState,
  reducers: {
    setPasswordChanger(state, action: PayloadAction<{ changed: boolean }>) {
      state.changed = action.payload.changed
    },
  },
})

export const passwordChangerReducer = slice.reducer

export const { setPasswordChanger } = slice.actions

export const sendNewPasswordTC = (data: NewPasswordResponseType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await newPasswordAPI.sendNewPassword(data)

    dispatch(setPasswordChanger({ changed: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(setAppInfo({ info: res.data.info }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppError({ error: error }))
      dispatch(setAppStatus({ status: 'failed' }))
    }
  }
}

export type NewPasswordResponseType = {
  password: string
  resetPasswordToken: string
}
