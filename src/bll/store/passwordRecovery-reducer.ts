import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { passwordRecoveryAPI, profileAPI } from '../../api/auth-api'

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
      console.log(res.data)
      dispatch(setInstructionForRecovery({ email: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      debugger
      dispatch(setAppStatus({ status: 'failed' }))
    })
}
