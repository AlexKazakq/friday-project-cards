import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { cardsAPI, CardsParamsType } from '../../api/cards-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  cards: [] as CardsType[],
  cardsTotalCount: null as null | number,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  packUserId: null as null | string,
  packId: null as null | string,
}

export const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: CardsType[] }>) {
      state.cards = action.payload.cards
    },
    setPackId(state, action: PayloadAction<{ packId: string }>) {
      state.packId = action.payload.packId
    },
  },
})
export const cardsReducer = slice.reducer

export const { setCards, setPackId } = slice.actions

export const setCardsWithParamsTC = (params: CardsParamsType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await cardsAPI.getCardsWithParams(params)

    dispatch(setCards({ cards: res.data.cards }))
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

export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
