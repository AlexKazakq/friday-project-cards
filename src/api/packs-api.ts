import { resolveObjectURL } from 'buffer'

import axios from 'axios'

import { CardPacksType } from '../bll/store/packs-reducer'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    // process.env.NODE_ENV ===
    // 'development'
    // ? 'http://localhost:7542/2.0/'
    // : 'https://neko-back.herokuapp.com/2.0/',
    'https://neko-back.herokuapp.com/2.0/',
  // 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const packsAPI = {
  // getPacks() {
  //   return instance.get<getPacksResponseType>('cards/pack')
  // },
  getPacksWithParams(params: PacksParamsType) {
    return instance.get<getPacksResponseType>('cards/pack', {
      params: {
        packName: params.packName,
        min: params.min,
        max: params.max,
        sortPacks: params.sortPacks,
        page: params.page,
        pageCount: params.pageCount,
        user_id: params.user_id,
        block: params.block,
      },
    })
  },
  addPack(params: AddPacksParamsType) {
    return instance.post<AddPacksResponseType>('/cards/pack', params)
  },
  deletePack(params: string) {
    return instance.delete<deletePacksResponseType>('/cards/pack', params)
  },
}

type getPacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: null | number
  maxCardsCount: number
  minCardsCount: null | number
  page: null | number
  pageCount: null | number
}

export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}

export type AddPacksParamsType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type AddPacksResponseType = {
  newCardsPack: any
}

export type deletePacksResponseType = {
  deletedCardsPack: {}
}
