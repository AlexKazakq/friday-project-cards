import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export const profileReducer = slice.reducer
