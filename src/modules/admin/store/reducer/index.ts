import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { ActionType, AdminState } from '../../models'
import { GenericObject, RootState } from '../../../../shared/models'

const initialAdminState: AdminState = {
    questionnaires: []
}

const adminReducer = createReducer(initialAdminState, {
    [ActionType.SET_QUESTIONNAIRES]: (state, action: PayloadAction<GenericObject[]>) => {
        state.questionnaires = action.payload
   }
})

export const adminSelector = (state: RootState) => state.admin
export default adminReducer
