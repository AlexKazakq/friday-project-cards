import { combineReducers, configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { cardsReducer } from './cards-reducer'
import { packsReducer } from './packs-reducer'
import { packUserDataReducer } from './packUserData-reducer'
import { passwordChangerReducer } from './passwordChanger-reducer'
import { passwordRecoveryReducer } from './passwordRecovery-reducer'
import { profileReducer } from './profile-reducer'
import { regReducer } from './register-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
  register: regReducer,
  passwordRecovery: passwordRecoveryReducer,
  sendNewPassword: passwordChangerReducer,
  packs: packsReducer,
  cards: cardsReducer,
  packUserData: packUserDataReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type TypedThunk = ThunkAction<void, AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
