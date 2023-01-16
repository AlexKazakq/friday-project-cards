import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { packsAPI } from '../../api/packs-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: null as null | number,
  maxCardsCount: null as null | number,
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
    addPack(state, action: PayloadAction<{ pack: CardPacksType }>) {
      state.cardPacks.unshift(action.payload.pack)
    },
  },
})

export const packsReducer = slice.reducer

export const { setPacks } = slice.actions

export const setPacksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await packsAPI.getPacks()

    dispatch(setPacks({ packs: res.data.cardPacks }))
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
}