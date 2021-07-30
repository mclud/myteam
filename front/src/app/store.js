import { configureStore } from '@reduxjs/toolkit'
import AlertMsgSlice from "../features/AlertMsg/AlertMsgSlice.js"
import HeaderSlice from '../features/Header/HeaderSlice.js'
import NewsSlice from '../features/News/NewsSlice.js'
import AppWraperSlice from '../features/AppWraper/AppWraperSlice.js'

export default configureStore({
  reducer: {
    alertMsg: AlertMsgSlice,
    header: HeaderSlice,
    news : NewsSlice,
    appwrap: AppWraperSlice
  }
})