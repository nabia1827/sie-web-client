import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authReducer'
import { appReducer } from './reducers/appReducer'
import { consultaLegajoReducer } from './reducers/consultaLegajosReducer'
export default configureStore({
  reducer: {
    auth: authReducer,
    app:appReducer,
    consultaLegajo:consultaLegajoReducer,
  },
})