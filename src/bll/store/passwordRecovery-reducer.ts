import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { passwordRecoveryAPI } from '../../api/auth-api'

import { setAppStatus } from './app-reducer'

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
