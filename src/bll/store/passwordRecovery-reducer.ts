import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { newPasswordAPI, passwordRecoveryAPI, profileAPI } from '../../api/auth-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  email: ' ',
}

const slice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setInstructionForRecovery(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email
    },
  },
})

export const passwordRecoveryReducer = slice.reducer

export const { setInstructionForRecovery } = slice.actions

export const sendInstructionForRecoveryTC = (email: string) => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  passwordRecoveryAPI
    .sendInstructionForRecovery(email)
    .then(res => {
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppStatus({ status: 'failed' }))
    })
}

export const sendNewPasswordTC = (data: NewPasswordResponseType) => (dispatch: Dispatch) => {
  newPasswordAPI
    .sendNewPassword(data)
    .then(res => {
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppError({ error: e.response.data.error }))
      dispatch(setAppStatus({ status: 'failed' }))
    })
}

export type NewPasswordResponseType = {
  password: string
  resetPasswordToken: string
}
