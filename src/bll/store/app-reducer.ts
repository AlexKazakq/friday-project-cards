import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { authAPI } from '../../api/auth-api'

import { setIsLoggedIn } from './auth-reducer'
import { setUserProfile } from './profile-reducer'
import { AppDispatch } from './store'

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

export const initializeAppTC = () => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()

    dispatch(setUserProfile({ profile: res.data }))
    dispatch(setIsLoggedIn({ isLoggedIn: true }))
    dispatch(setAppInitialized({ isInitialized: true }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppInitialized({ isInitialized: true }))
      dispatch(setAppError({ error: error }))
      dispatch(setAppStatus({ status: 'failed' }))
    }
  }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
