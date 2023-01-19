import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let storrageUserData: PackUserDataType

console.log(localStorage.getItem('packUserData'))

if (localStorage.getItem('packUserData') !== null) {
  storrageUserData = JSON.parse(localStorage.getItem('packUserData') as string) as PackUserDataType
} else {
  storrageUserData = {} as PackUserDataType
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
