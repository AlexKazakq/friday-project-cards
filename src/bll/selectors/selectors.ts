import { createSelector } from '@reduxjs/toolkit'

import { AppRootStateType } from '../store/store'

const state = (state: AppRootStateType) => state

export const statusSelector = createSelector(state, state => state.app.status)
export const isInitializedSelector = createSelector(state, state => state.app.isInitialized)
export const errorSelector = createSelector(state, state => state.app.error)
export const infoSelector = createSelector(state, state => state.app.info)

export const isLoggedInSelector = createSelector(state, state => state.auth.isLoggedIn)

export const profileInfoSelector = createSelector(state, state => state.profile.profile)

export const isPasswordChangedSelector = createSelector(
  state,
  state => state.sendNewPassword.changed
)

export const isEmailSendSelector = createSelector(
  state,
  state => state.passwordRecovery.isEmailSend
)

export const cardPacksSelector = createSelector(state, state => state.packs.cardPacks)
export const cardPacksMaxCountSelector = createSelector(state, state => state.packs.maxCardsCount)
export const cardPacksMinCountSelector = createSelector(state, state => state.packs.minCardsCount)
export const cardPacksCountSelector = createSelector(state, state => state.packs.cardsCount)

export const getMyIdSelector = createSelector(state, state => state.packs.myId)
export const searchPackSelector = createSelector(state, state => state.packs.searchPackName)
export const cardPacksTotalCountSelector = createSelector(
  state,
  state => state.packs.cardPacksTotalCount
)

export const sortPacksSelector = createSelector(state, state => state.packs.sort)
export const pagePackSelector = createSelector(state, state => state.packs.page)
export const pageCountPackSelector = createSelector(state, state => state.packs.pageCount)
export const cardsSelector = createSelector(state, state => state.cards.cards)
export const cardsTotalCountSelector = createSelector(state, state => state.cards.cardsTotalCount)
export const searchCardsByAnswerSelector = createSelector(
  state,
  state => state.cards.searchByAnswer
)

export const searchCardsByQuestionSelector = createSelector(
  state,
  state => state.cards.searchByQuestion
)
export const sortCardsSelector = createSelector(state, state => state.cards.sort)
export const pageCardSelector = createSelector(state, state => state.cards.page)
export const pageCountCardSelector = createSelector(state, state => state.cards.pageCount)

export const packUserDataSelector = createSelector(state, state => state.packUserData.packUserData)

export const packStatusSelector = createSelector(state, state => state.packUserData.status)

export const packUserCountCardsSelector = createSelector(
  state,
  state => state.packUserData.cardsTotalCount
)
