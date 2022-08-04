import { GenericObject } from "../../shared/models"

export interface AdminState {
    questionnaires: GenericObject[]
}

export enum ActionType {
    GET_QUESTIONNAIRES = '[ADMIN] GET_QUESTIONNAIRES',
    SET_QUESTIONNAIRES = '[ADMIN] GET_QUESTIONNAIRES',
    ADD_QUESTIONNAIRE = '[ADMIN] ADD_QUESTIONNAIRE',
    EDIT_QUESTIONNAIRE = '[ADMIN] EDIT_QUESTIONNAIRE'
}
