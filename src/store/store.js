import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer'
import { appReducer } from './reducers/appReducer'
import { consultaLegajosReducer } from './reducers/consultaLegajosReducer'
export default configureStore({
  reducer: {
    auth: authReducer,
    app:appReducer,
    consultaLegajos:consultaLegajosReducer,
  },
})