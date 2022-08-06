import { Questions } from "../../shared/models"

export interface AdminState {
    questionnaires: Questionnaire[]
}

export interface Questionnaire {
    id: number
    name: string
    questions: Questions[]
    createdAt: string
    updatedAt: string
}

export enum ActionType {
    GET_QUESTIONNAIRES = '[ADMIN] GET_QUESTIONNAIRES',
    SET_QUESTIONNAIRES = '[ADMIN] GET_QUESTIONNAIRES',
    ADD_QUESTIONNAIRE = '[ADMIN] ADD_QUESTIONNAIRE',
    EDIT_QUESTIONNAIRE = '[ADMIN] EDIT_QUESTIONNAIRE'
}
