import store, { rootReducer } from "../store"

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
    
export interface GenericObject {
    [key: string]: any
}

export interface Questions {
    id: number
    name: string
    type: string
    options?: {
        id: number,
        value: string
    }[]
}

export interface Client {
    id: number
    fullName: string
    age: number
    createdAt: string
    updatedAt: string
}
