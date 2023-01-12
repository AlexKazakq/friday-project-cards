import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { passwordRecoveryReducer } from './passwordRecovery-reducer'
import { profileReducer } from './profile-reducer'
import { regReducer } from './register-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
  register: regReducer,
  passwordRecovery: passwordRecoveryReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
