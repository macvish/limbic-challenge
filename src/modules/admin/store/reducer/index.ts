import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { ActionType, AdminState, Questionnaire } from '../../models'
import { Client, RootState } from '../../../../shared/models'

const initialAdminState: AdminState = {
    questionnaires: [],
    clients: []
}

const adminReducer = createReducer(initialAdminState, {
    [ActionType.SET_QUESTIONNAIRES]: (state, action: PayloadAction<Questionnaire[]>) => {
        state.questionnaires = action.payload
    },
    [ActionType.ADD_QUESTIONNAIRE]: (state, action: PayloadAction<Questionnaire>) => {
        state.questionnaires = [...state.questionnaires, action.payload]
    },
    [ActionType.SET_CLIENTS]: (state, action: PayloadAction<Client[]>) => {
        state.clients = action.payload
    },
    [ActionType.ADD_CLIENT]: (state, action: PayloadAction<Client>) => {
        state.clients = [...state.clients, action.payload]
    }
})

export const adminSelector = (state: RootState) => state.admin
export default adminReducer
