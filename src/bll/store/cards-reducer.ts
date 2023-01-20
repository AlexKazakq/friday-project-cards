import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { cardsAPI, CardsParamsType } from '../../api/cards-api'

import { setAppError, setAppStatus } from './app-reducer'

const initialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 0,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
}

export const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: CardsType[] }>) {
      state.cards = action.payload.cards
    },
    setCardsTotalCount(state, action: PayloadAction<{ cardsTotalCount: number }>) {
      state.cardsTotalCount = action.payload.cardsTotalCount
    },
  },
})
export const cardsReducer = slice.reducer

export const { setCards, setCardsTotalCount } = slice.actions

export const setCardsWithParamsTC = (params: CardsParamsType) => async (dispatch: Dispatch) => {
  dispatch(setCards({ cards: [] as CardsType[] }))
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await cardsAPI.getCardsWithParams(params)

    dispatch(setCards({ cards: res.data.cards }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(
      setCardsTotalCount({
        cardsTotalCount: res.data.cardsTotalCount ? res.data.cardsTotalCount : 0,
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
