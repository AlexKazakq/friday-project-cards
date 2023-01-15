import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../api/auth-api'

import { setIsLoggedIn } from './auth-reducer'

const initialState = {
  status: 'idle',
  error: null as null | string,
  info: null as null | string,
  isInitialized: false,
}

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppError(state, action: PayloadAction<{ error: null | string }>) {
      state.error = action.payload.error
    },
    setAppInfo(state, action: PayloadAction<{ info: null | string }>) {
      state.info = action.payload.info
    },
  },
})

export const appReducer = slice.reducer

export const { setAppInitialized, setAppStatus, setAppError, setAppInfo } = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppInitialized({ isInitialized: true }))
    })
    .catch(e => {
      dispatch(setAppInitialized({ isInitialized: true }))
      dispatch(setAppError({ error: e.response.data.error }))
    })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
