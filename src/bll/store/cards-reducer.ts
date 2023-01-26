import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import {
  AddedCardParamsType,
  cardsAPI,
  DeleteCardParamsType,
  getCardsResponseType,
  UpdatedCardParamsType,
} from '../../api/cards-api'

import { setAppError, setAppStatus } from './app-reducer'
import { setSearchStatus } from './packUserData-reducer'
import { AppDispatch, TypedThunk } from './store'

const initialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 0,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  searchByAnswer: '' as string,
  searchByQuestion: '' as string,
}

export const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ res: getCardsResponseType }>) {
      state.cards = action.payload.res.cards
      state.cardsTotalCount = action.payload.res.cardsTotalCount
      state.page = action.payload.res.page
      state.pageCount = action.payload.res.pageCount
    },
    setCardsList(state, action: PayloadAction<{ cards: CardsType[] }>) {
      state.cards = action.payload.cards
    },
    setSearchCardsByAnswer(state, action: PayloadAction<{ value: string }>) {
      state.searchByAnswer = action.payload.value
    },
    setSearchCardsByQuestion(state, action: PayloadAction<{ value: string }>) {
      state.searchByQuestion = action.payload.value
    },
    setCardsTotalCount(state, action: PayloadAction<{ cardsTotalCount: number }>) {
      state.cardsTotalCount = action.payload.cardsTotalCount
    },
  },
})
export const cardsReducer = slice.reducer

export const {
  setCards,
  setCardsList,
  setSearchCardsByAnswer,
  setSearchCardsByQuestion,
  setCardsTotalCount,
} = slice.actions

export const setCardsTC =
  (cardsPack_id: string): TypedThunk =>
  async (dispatch, getState) => {
    const { searchByAnswer, searchByQuestion } = getState().cards

    const cardList = {
      cardsPack_id: cardsPack_id,
      cardAnswer: searchByAnswer,
      cardQuestion: searchByQuestion,
    }

    dispatch(setCardsList({ cards: [] as CardsType[] }))
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(setSearchStatus({ status: 'Wait...' }))
    try {
      const res = await cardsAPI.getCardsWithParams(cardList)

      dispatch(setCards({ res: res.data }))
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
  dispatch(setCardsList({ cards: [] as CardsType[] }))
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
  dispatch(setCardsList({ cards: [] as CardsType[] }))
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
