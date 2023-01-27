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
      params: { ...params },
    })
  },
  addNewCard(params: AddedCardParamsType) {
    return instance.post<getCardsResponseType>('cards/card', params)
  },
  deleteCard(params: DeleteCardParamsType) {
    // @ts-ignore
    return instance.delete<DeleteCardResponseType>(`/cards/card?id=${params.id}`, params)
  },
  updateCard(params: UpdatedCardParamsType) {
    return instance.put<updatedCardsResponseType>('cards/card', params)
  },
  sendGrade(data: GradeParamsType) {
    return instance.put<GradeRequestType>('cards/grade', {
      card_id: data.card_id,
      grade: data.grade,
    })
  },
}

export type getCardsResponseType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  cardsPack_id: string
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

export type AddedCardParamsType = {
  card: {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
    grade?: 0 // 0..5, не обязателен
    shots?: 0
    answerImg?: string // "url or base 64"  не обязателен
    questionImg?: string // "url or base 64"  не обязателен
    questionVideo?: string // "url or base 64"  не обязателен
    answerVideo?: string // "url or base 64"  не обязателен
  }
}

export type DeleteCardResponseType = {
  deletedCard?: {}
}

export type DeleteCardParamsType = {
  id: string
}

export type UpdatedCardParamsType = {
  card: {
    _id: string
    question?: string
    answer?: string
  }
}

export type updatedCardsResponseType = {
  newCard: {}
}
