import store, { rootReducer } from "../store"

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
    
export interface GenericObject {
    [key: string]: any
}

export interface Questions {
    id: string
    name: string
    type: string
    value?: string[]
}
