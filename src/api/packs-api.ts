import axios from 'axios'

import { CardPacksType } from '../bll/store/packs-reducer'

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

export const packsAPI = {
  getPacks() {
    return instance.get<getPacksResponseType>('cards/pack')
  },
}

type getPacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: null | number
  maxCardsCount: null | number
  minCardsCount: null | number
  page: null | number
  pageCount: null | number
}
