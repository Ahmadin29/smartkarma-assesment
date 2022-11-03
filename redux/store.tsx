import { configureStore } from '@reduxjs/toolkit'
import listReducer from './actions/list'

export default configureStore({
  reducer: {
    list:listReducer
  }
})