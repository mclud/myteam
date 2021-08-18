import { configureStore } from '@reduxjs/toolkit'
import AlertMsgSlice from "../features/AlertMsg/AlertMsgSlice.js"
import NewsSlice from '../features/News/NewsSlice.js'
import AppWraperSlice from '../features/AppWraper/AppWraperSlice.js'
import NavLayerSlice from '../features/NavLayer/NavLayerSlice.js'

export default configureStore({
  reducer: {
    navlayer: NavLayerSlice,
    alertMsg: AlertMsgSlice,
    news : NewsSlice,
    appwrap: AppWraperSlice
  }
})