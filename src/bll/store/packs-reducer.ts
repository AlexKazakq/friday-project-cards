import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  AddPacksParamsType,
  DeletePacksParamsType,
  packsAPI,
  PacksParamsType,
  UpdatePacksParamsType,
} from '../../api/packs-api'

import { setAppError, setAppStatus } from './app-reducer'
import { AppDispatch } from './store'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: null as null | number,
  maxCardsCount: 0,
  minCardsCount: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ packs: CardPacksType[] }>) {
      state.cardPacks = action.payload.packs
    },
    setAddPack(state, action: PayloadAction<{ pack: CardPacksType }>) {
      state.cardPacks.unshift(action.payload.pack)
    },
    setMaxPacksCount(state, action: PayloadAction<{ maxCardsCount: number }>) {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    deletePack(state, action: PayloadAction<{ pack: CardPacksType }>) {},
  },
})
export const packsReducer = slice.reducer

export const { setPacks, setMaxPacksCount, setAddPack } = slice.actions

export const setPacksWithParamsTC = (params: PacksParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.getPacksWithParams(params)

    dispatch(setPacks({ packs: res.data.cardPacks }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(setMaxPacksCount({ maxCardsCount: res.data.maxCardsCount }))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message

      dispatch(setAppStatus({ status: 'failed' }))
      dispatch(setAppError({ error: error }))
    }
  }
}

export const addNewPackTC = (params: AddPacksParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.addPack(params)

    dispatch(setPacksWithParamsTC({}))

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

    dispatch(setPacksWithParamsTC({}))

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

    dispatch(setPacksWithParamsTC({}))

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
