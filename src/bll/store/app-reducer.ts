import { createSlice, Dispatch } from '@reduxjs/toolkit'

import { authAPI } from '../../api/auth-api'

import { setIsLoggedIn } from './auth-reducer'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const appReducer = slice.reducer

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    dispatch(setIsLoggedIn({ isLoggedIn: true }))
  })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}
