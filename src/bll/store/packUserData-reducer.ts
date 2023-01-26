import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let storageUserData: PackUserDataType

console.log(localStorage.getItem('packUserData'))

if (localStorage.getItem('packUserData') !== null) {
  storageUserData = JSON.parse(localStorage.getItem('packUserData') as string) as PackUserDataType
} else {
  storageUserData = {} as PackUserDataType
}

const initialState = {
  packUserData: storageUserData,
  status: null as null | searchStatusType,
}

export const slice = createSlice({
  name: 'packUserData',
  initialState,
  reducers: {
    setPackUserData(state, action: PayloadAction<{ userData: PackUserDataType }>) {
      debugger
      state.packUserData = action.payload.userData
      localStorage.setItem('packUserData', JSON.stringify(state.packUserData))
    },
    setSearchStatus(state, action: PayloadAction<{ status: searchStatusType | null }>) {
      state.status = action.payload.status
    },
  },
})
export const packUserDataReducer = slice.reducer

export const { setPackUserData, setSearchStatus } = slice.actions

export type PackUserDataType = {
  packUserId: string
  packId: string
  packUserName: string
  cardsCount: number
}

export type searchStatusType = 'Wait...' | 'No matches found...' | null
