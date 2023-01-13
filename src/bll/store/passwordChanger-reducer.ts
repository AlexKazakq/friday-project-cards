import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

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

export const sendNewPasswordTC = (data: NewPasswordResponseType) => (dispatch: Dispatch) => {
  newPasswordAPI
    .sendNewPassword(data)
    .then(res => {
      dispatch(setPasswordChanger({ changed: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
      dispatch(setAppInfo({ info: res.data.info }))
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
