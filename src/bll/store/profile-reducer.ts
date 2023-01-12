import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { profileAPI } from '../../api/auth-api'

import { setAppStatus, setAppError } from './app-reducer'

export type ProfileType = {
  _id: string
  email: string
  name: string
  avatar: string
  publicCardPacksCount: number // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}

const initialState = {
  profile: {
    name: ' ',
    email: ' ',
    avatar: ' ',
  },
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<{ profile: ProfileType }>) {
      state.profile = action.payload.profile
    },
    setNewProfileData(state, action: PayloadAction<{ nickName: string; avatar: string }>) {
      state.profile.name = action.payload.nickName
      state.profile.avatar = action.payload.avatar
    },
  },
})

export const profileReducer = slice.reducer

export const { setUserProfile, setNewProfileData } = slice.actions

export const getUserProfileTC = () => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  profileAPI
    .getProfileInfo()
    .then(res => {
      dispatch(setUserProfile({ profile: res.data }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: e.response.data.error }))
    })
}

export const updateProfileDataTC = (data: UpdateProfileDataType) => (dispatch: Dispatch) => {
  setAppStatus({ status: 'loading' })
  profileAPI
    .updateProfile(data)
    .then(res => {
      dispatch(
        setNewProfileData({
          nickName: res.data.updatedUser.name,
          avatar: res.data.updatedUser.avatar,
        })
      )
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
    .catch(e => {
      dispatch(setAppError({ error: e.response.data.error }))
      dispatch(setAppStatus({ status: 'failed' }))
    })
}

export type UpdateProfileDataType = {
  name?: string
  avatar?: string
}
