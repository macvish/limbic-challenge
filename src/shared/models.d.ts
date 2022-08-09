import store, { rootReducer } from "../store"

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
    
export interface GenericObject {
    [key: string]: any
}

export interface Questionnaire {
    id: number
    name: string
    questions: Questions[]
    answers?: Answers[]
    createdAt: string
    updatedAt: string
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

export interface Answers {
    id: number
    clientId: number
    answerData: AnswerData[]
    createdAt: string
    updatedAt: string
}

export interface AnswerData {
    questionId: number
    answer: string | string[]
}

export interface Client {
    id: number
    fullName: string
    age: number
    createdAt: string
    updatedAt: string
}
