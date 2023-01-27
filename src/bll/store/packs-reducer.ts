import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  AddPacksParamsType,
  DeletePacksParamsType,
  getPacksResponseType,
  packsAPI,
  UpdatePacksParamsType,
} from '../../api/packs-api'

import { setAppError, setAppStatus } from './app-reducer'
import { setSearchStatus } from './packUserData-reducer'
import { AppDispatch, TypedThunk } from './store'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  cardsCount: [] as number[],
  myId: '' as string | undefined,
  searchPackName: '' as string,
  sort: '' as string,
  page: 0,
  pageCount: 4,
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ res: getPacksResponseType }>) {
      state.cardPacks = action.payload.res.cardPacks
      state.cardPacksTotalCount = action.payload.res.cardPacksTotalCount
      state.maxCardsCount = action.payload.res.maxCardsCount
      state.minCardsCount = action.payload.res.minCardsCount
      state.page = action.payload.res.page
      state.pageCount = action.payload.res.pageCount
    },
    setAddPack(state, action: PayloadAction<{ pack: CardPacksType }>) {
      state.cardPacks.unshift(action.payload.pack)
    },
    setMaxPacksCount(state, action: PayloadAction<{ maxCardsCount: number }>) {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    setMinPacksCount(state, action: PayloadAction<{ minCardsCount: number }>) {
      state.minCardsCount = action.payload.minCardsCount
    },
    setCardsCount(state, action: PayloadAction<{ value: number[] }>) {
      state.cardsCount = action.payload.value
    },
    setMyPacks(state, action: PayloadAction<{ myId: string | undefined }>) {
      state.myId = action.payload.myId
    },
    setSearchPack(state, action: PayloadAction<{ value: string }>) {
      state.searchPackName = action.payload.value
    },
    setCardPacksTotalCount(state, action: PayloadAction<{ cardPacksTotalCount: number }>) {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
    setPagePack(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    setPageCountPack(state, action: PayloadAction<{ pageCount: number }>) {
      state.pageCount = action.payload.pageCount
    },
    setSortPack(state, action: PayloadAction<{ sort: string }>) {
      state.sort = action.payload.sort
    },
    deletePack(state, action: PayloadAction<{ pack: CardPacksType }>) {},
  },
})
export const packsReducer = slice.reducer

export const {
  setPacks,
  setMaxPacksCount,
  setMinPacksCount,
  setCardPacksTotalCount,
  setCardsCount,
  setMyPacks,
  setSearchPack,
  setPagePack,
  setPageCountPack,
  setSortPack,
} = slice.actions

export const setPacksTC = (): TypedThunk => async (dispatch, getState) => {
  const { page, pageCount, cardsCount, myId, searchPackName, sort } = getState().packs

  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(setSearchStatus({ status: 'Wait...' }))
  const packList = {
    page: page,
    pageCount: pageCount,
    min: cardsCount[0],
    max: cardsCount[1],
    user_id: myId,
    packName: searchPackName,
    sortPacks: sort,
  }

  try {
    const res = await packsAPI.getPacksWithParams(packList)

    dispatch(setPacks({ res: res.data }))
    dispatch(setAppStatus({ status: 'succeeded' }))

    dispatch(
      setCardPacksTotalCount({
        cardPacksTotalCount: res.data.cardPacksTotalCount ? res.data.cardPacksTotalCount : 0,
      })
    )
    if (initialState.cardPacks.length === 0) {
      dispatch(setSearchStatus({ status: 'No matches found...' }))
    } else {
      dispatch(setSearchStatus({ status: null }))
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
      dispatch(setSearchStatus({ status: null }))
    }
  }
}
export const addNewPackTC = (params: AddPacksParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.addPack(params)

    dispatch(setPacksTC())

    // dispatch(setAddPack({ pack: res.data.newCardsPack }))
    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}
export const deletePackTC = (params: DeletePacksParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.deletePack(params)

    dispatch(setPacksTC())

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}

export const updatePackTC = (params: UpdatePacksParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.updatePack(params)

    dispatch(setPacksTC())

    dispatch(setAppStatus({ status: 'succeeded' }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}

export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
}
