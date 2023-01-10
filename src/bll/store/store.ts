import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { authReducer } from './auth-reducer'
import { profileReducer } from './profile-reducer'
import { regReducer } from './register-reducer'

const rootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  register: regReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
