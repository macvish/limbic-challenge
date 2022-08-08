import { Client, Questions } from "../../shared/models"

export interface AdminState {
    questionnaires: Questionnaire[]
    clients: Client[]
}

export interface Questionnaire {
    id: number
    name: string
    questions: Questions[]
    createdAt: string
    updatedAt: string
}

export enum ActionType {
    SET_QUESTIONNAIRES = '[ADMIN] GET_QUESTIONNAIRES',
    ADD_QUESTIONNAIRE = '[ADMIN] ADD_QUESTIONNAIRE',
    SET_CLIENTS = '[ADMIN] SET_CLIENTS',
    ADD_CLIENT = '[ADMIN] SET_CLIENTS'
}
