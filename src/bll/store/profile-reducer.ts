import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

import { profileAPI } from '../../api/auth-api'

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
  profileAPI
    .getProfileInfo()
    .then(res => {
      dispatch(setUserProfile({ profile: res.data }))
    })
    .catch(e => {})
}

export const updateProfileDataTC = (data: UpdateProfileDataType) => (dispatch: Dispatch) => {
  profileAPI
    .updateProfile(data)
    .then(res => {
      dispatch(setNewProfileData({ nickName: res.data.name, avatar: res.data.avatar }))
    })
    .catch(e => {})
}

export type UpdateProfileDataType = {
  name?: string
  avatar?: string
}
