import { combineReducers, configureStore } from "@reduxjs/toolkit"

import adminReducer from "../modules/admin/store/reducer"

export const rootReducer = combineReducers({
    admin: adminReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store
