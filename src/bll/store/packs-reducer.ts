import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { packsAPI, PacksParamsType } from '../../api/packs-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 4,
}

export const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ packs: CardPacksType[] }>) {
      state.cardPacks = action.payload.packs
    },
    addPack(state, action: PayloadAction<{ pack: CardPacksType }>) {
      state.cardPacks.unshift(action.payload.pack)
    },
    setMaxPacksCount(state, action: PayloadAction<{ maxCardsCount: number }>) {
      state.maxCardsCount = action.payload.maxCardsCount
    },
    setMinPacksCount(state, action: PayloadAction<{ minCardsCount: number }>) {
      state.minCardsCount = action.payload.minCardsCount
    },
    setCardPacksTotalCount(state, action: PayloadAction<{ cardPacksTotalCount: number }>) {
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
    },
  },
})
export const packsReducer = slice.reducer

export const { setPacks, setMaxPacksCount, setMinPacksCount, setCardPacksTotalCount } =
  slice.actions

export const setPacksWithParamsTC = (params: PacksParamsType) => async (dispatch: Dispatch) => {
  debugger
  dispatch(setPacks({ packs: [] as CardPacksType[] }))
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.getPacksWithParams(params)

    dispatch(setPacks({ packs: res.data.cardPacks }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(setMaxPacksCount({ maxCardsCount: res.data.maxCardsCount }))
    dispatch(
      setMinPacksCount({ minCardsCount: res.data.minCardsCount ? res.data.minCardsCount : 0 })
    )
    dispatch(
      setCardPacksTotalCount({
        cardPacksTotalCount: res.data.cardPacksTotalCount ? res.data.cardPacksTotalCount : 0,
      })
    )
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
