import { createReducer, PayloadAction } from '@reduxjs/toolkit'

import { AdminState } from '../../models'
import { RootState } from '../../../../shared/models'

const initialAdminState: AdminState = {
    questionnaires: []
}

const adminReducer = createReducer(initialAdminState, {
   
})

export const adminSelector = (state: RootState) => state.admin
export default adminReducer
