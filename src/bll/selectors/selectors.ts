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