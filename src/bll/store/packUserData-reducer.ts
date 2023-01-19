import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let storrageUserData: PackUserDataType

if (localStorage.getItem('packUserData') !== null) {
  storrageUserData = JSON.parse(localStorage.getItem('packUserData') as string) as PackUserDataType
  debugger
} else {
  storrageUserData = {} as PackUserDataType
  debugger
}

const initialState = {
  packUserData: storrageUserData,
}

export const slice = createSlice({
  name: 'packUserData',
  initialState,
  reducers: {
    setPackUserData(state, action: PayloadAction<{ userData: PackUserDataType }>) {
      state.packUserData = action.payload.userData
      localStorage.setItem('packUserData', JSON.stringify(state.packUserData))
    },
  },
})
export const packUserDataReducer = slice.reducer

export const { setPackUserData } = slice.actions

export type PackUserDataType = {
  packUserId: string
  packId: string
  packUserName: string
}
