import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { passwordRecoveryAPI, profileAPI } from '../../api/auth-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  email: ' ',
  isEmailSend: false,
}

const slice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setInstructionForRecovery(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
    setIsEmailSend(state, action: PayloadAction<{ isEmailSend: boolean }>) {
      state.isEmailSend = action.payload.isEmailSend
    },
  },
})

export const passwordRecoveryReducer = slice.reducer

export const { setInstructionForRecovery, setIsEmailSend } = slice.actions

export const sendInstructionForRecoveryTC = (email: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await passwordRecoveryAPI.sendInstructionForRecovery(email)

    dispatch(setInstructionForRecovery({ email: res.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(setIsEmailSend({ isEmailSend: true }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setIsEmailSend({ isEmailSend: false }))
      dispatch(setAppError({ error: error }))
    }
  }
}
