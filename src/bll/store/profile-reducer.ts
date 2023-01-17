import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { profileAPI, UserType } from '../../api/auth-api'

import { setAppStatus, setAppError } from './app-reducer'
import { AppDispatch } from './store'

// changed to ProfileType
// export type UserType = {
//   _id: string
//   email: string
//   name: string
//   avatar: string
//   publicCardPacksCount: number // количество колод
//
//   created: Date
//   updated: Date
//   isAdmin: boolean
//   verified: boolean // подтвердил ли почту
//   rememberMe: boolean
//
//   error?: string
// }

const initialState = {
  profile: {
    name: ' ',
    email: ' ',
    avatar: ' ',
    _id: ' ',
  },
}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile(state, action: PayloadAction<{ profile: UserType }>) {
      state.profile = action.payload.profile
    },
    setNewProfileData(
      state,
      action: PayloadAction<{ nickName: string; avatar?: string; email: string; id: string }>
    ) {
      state.profile.name = action.payload.nickName
      state.profile.email = action.payload.email
      state.profile._id = action.payload.id
      if (action.payload.avatar) {
        state.profile.avatar = action.payload.avatar
      }
    },
  },
})

export const profileReducer = slice.reducer

export const { setUserProfile, setNewProfileData } = slice.actions
export const updateProfileDataTC =
  (data: UpdateProfileDataType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({ status: 'loading' }))
    try {
      const res = await profileAPI.updateProfile(data)

      dispatch(
        setNewProfileData({
          nickName: res.data.updatedUser.name,
          avatar: res.data.updatedUser.avatar,
          email: res.data.updatedUser.email,
          id: res.data.updatedUser._id,
        })
      )
      dispatch(setAppStatus({ status: 'succeeded' }))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError({ error: error }))
        dispatch(setAppStatus({ status: 'failed' }))
      }
    }
  }

export type UpdateProfileDataType = {
  name?: string
  avatar?: string
}
