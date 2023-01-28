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
  cardsTotalCount: null as null | number,
  status: null as null | searchStatusType,
}

export const slice = createSlice({
  name: 'packUserData',
  initialState,
  reducers: {
    setPackUserData(state, action: PayloadAction<{ userData: PackUserDataType }>) {
      state.packUserData = action.payload.userData
      localStorage.setItem('packUserData', JSON.stringify(state.packUserData))
    },
    setSearchStatus(state, action: PayloadAction<{ status: searchStatusType | null }>) {
      state.status = action.payload.status
    },
    setUserCardsTotalCount(state, action: PayloadAction<{ cardsCount: number }>) {
      state.cardsTotalCount = action.payload.cardsCount
    },
  },
})
export const packUserDataReducer = slice.reducer

export const { setPackUserData, setSearchStatus, setUserCardsTotalCount } = slice.actions

export type PackUserDataType = {
  packUserId: string
  packId: string
  packUserName: string
  packName: string
}

export type searchStatusType = 'Wait...' | 'No matches found...' | null
