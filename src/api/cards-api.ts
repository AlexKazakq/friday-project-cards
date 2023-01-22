import axios from 'axios'

import { CardsType } from '../bll/store/cards-reducer'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  // 'https://neko-back.herokuapp.com/2.0/',
  // 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getCardsWithParams(params: CardsParamsType) {
    return instance.get<getCardsResponseType>('cards/card', {
      params: {
        cardAnswer: params.cardAnswer,
        cardQuestion: params.cardQuestion,
        cardsPack_id: params.cardsPack_id,
        min: params.min,
        max: params.max,
        sortCards: params.sortCards,
        page: params.page,
        pageCount: params.pageCount,
      },
    })
  },
  sendGrade(data: GradeParamsType) {
    return instance.put<GradeRequestType>('cards/grade', {
      card_id: data.card_id,
      grade: data.grade,
    })
  },
}

type getCardsResponseType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type GradeParamsType = {
  card_id: string
  grade: number
}

type GradeRequestType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
