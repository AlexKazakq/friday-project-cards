import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../api/auth-api'

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
      console.log(res)
      dispatch(isRegistered({ registered: true }))
    })
    .catch(e => {})
}

export type RegisterDataType = {
  email: string
  password: string
}
