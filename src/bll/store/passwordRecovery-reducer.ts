import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { passwordRecoveryAPI } from '../../api/auth-api'

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

export const sendInstructionForRecoveryTC = (email: string) => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  passwordRecoveryAPI
    .sendInstructionForRecovery(email)
    .then(res => {
      dispatch(setInstructionForRecovery({ email: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(setIsEmailSend({ isEmailSend: true }))
    })
    .catch(e => {
      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setIsEmailSend({ isEmailSend: false }))
      dispatch(setAppError({ error: e.response.data.error }))
    })
}
