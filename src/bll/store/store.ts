import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { appReducer } from './app-reducer'
import { authReducer } from './auth-reducer'
import { profileReducer } from './profile-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
