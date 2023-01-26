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
  getPacksWithParams(params: PacksParamsType) {
    return instance.get<getPacksResponseType>('cards/pack', {
      params: { ...params },
    })
  },
  addPack(params: AddPacksParamsType) {
    return instance.post<AddPacksResponseType>('/cards/pack', params)
  },
  deletePack(params: DeletePacksParamsType) {
    return instance.delete<deletePacksResponseType>(`/cards/pack?id=${params.id}`)
  },
  updatePack(params: UpdatePacksParamsType) {
    return instance.put('/cards/pack', params)
  },
}

export type getPacksResponseType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
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

export type updatePacksResponseType = {
  updatedCardsPack: {}
}

export type DeletePacksParamsType = {
  id: string
}

export type UpdatePacksParamsType = {
  cardsPack: {
    _id: string
    name: string
  }
}
