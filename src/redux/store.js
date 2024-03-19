import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer.js'

export default configureStore({
    reducer: reducer
})