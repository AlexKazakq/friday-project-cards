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
import { setSearchStatus, setUserCardsTotalCount } from './packUserData-reducer'
import { AppDispatch, TypedThunk } from './store'

const initialState = {
  cards: [] as CardsType[],
  cardsTotalCount: 0,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: 0,
  pageCount: 4,
  searchByAnswer: '' as string,
  searchByQuestion: '' as string,
  sort: '' as string,
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
    setSortCard(state, action: PayloadAction<{ sort: string }>) {
      state.sort = action.payload.sort
    },
    setPageCard(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    setPageCountCard(state, action: PayloadAction<{ pageCount: number }>) {
      state.pageCount = action.payload.pageCount
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
  setSortCard,
  setPageCard,
  setPageCountCard,
} = slice.actions

export const setCardsTC =
  (cardsPack_id: string): TypedThunk =>
  async (dispatch, getState) => {
    const { page, pageCount, searchByAnswer, searchByQuestion, sort, cardsTotalCount } =
      getState().cards

    const cardList = {
      cardsPack_id: cardsPack_id,
      cardAnswer: searchByAnswer,
      cardQuestion: searchByQuestion,
      sortCards: sort,
      page: page,
      pageCount: pageCount,
      cardsTotalCount: cardsTotalCount,
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
      searchByAnswer === '' &&
        searchByQuestion === '' &&
        dispatch(setUserCardsTotalCount({ cardsCount: res.data.cardsTotalCount }))
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

    dispatch(setCardsTC(res.data.deletedCard.cardsPack_id))
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

    dispatch(setCardsTC(res.data.newCard.cardsPack_id))
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

    dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
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
