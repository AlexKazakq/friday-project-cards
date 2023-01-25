import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  AddedCardParamsType,
  cardsAPI,
  CardsParamsType,
  DeleteCardParamsType,
  UpdatedCardParamsType,
} from '../../api/cards-api'

import { setAppError, setAppStatus } from './app-reducer'
import { setPackUserData, setSearchStatus } from './packUserData-reducer'
import { AppDispatch } from './store'

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

export const setCardsWithParamsTC = (params: CardsParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setCards({ cards: [] as CardsType[] }))
  dispatch(setAppStatus({ status: 'loading' }))
  dispatch(setSearchStatus({ status: 'Wait...' }))
  try {
    const res = await cardsAPI.getCardsWithParams(params)

    dispatch(setCards({ cards: res.data.cards }))
    dispatch(setAppStatus({ status: 'succeeded' }))
    dispatch(
      setCardsTotalCount({
        cardsTotalCount: res.data.cardsTotalCount ? res.data.cardsTotalCount : 0,
      })
    )
    if (initialState.cardsTotalCount === 0) {
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

export const deleteCardTC = (params: DeleteCardParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await cardsAPI.deleteCard(params)

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

export const addNewCardTC = (params: AddedCardParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setCards({ cards: [] as CardsType[] }))
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await cardsAPI.addNewCard(params)

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

export const updateCardTC = (params: UpdatedCardParamsType) => async (dispatch: AppDispatch) => {
  dispatch(setCards({ cards: [] as CardsType[] }))
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await cardsAPI.updateCard(params)

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

export type PackUserDataType = {
  packUserId: string
  packId: string
  packUserName: string
}
