import { combineReducers, configureStore } from '@reduxjs/toolkit'
import contactReducer from '../app/reducer/contactReducer'
import allhistoryReducer from '../app/reducer/allhistoryReducer'
import reduxThunk from 'redux-thunk'



const rootReducer = combineReducers({ contact: contactReducer, allHistory: allhistoryReducer })

export const store = configureStore({ reducer: rootReducer, middleware: [reduxThunk] })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


