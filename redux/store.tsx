import { configureStore } from '@reduxjs/toolkit'
import listReducer from './actions/list'
import watchlist from './actions/watchlist'

export default configureStore({
  reducer: {
    list:listReducer,
    watchlist:watchlist,
  }
})