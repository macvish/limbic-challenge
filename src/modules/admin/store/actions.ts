import { createAction } from "@reduxjs/toolkit"

import { GenericObject } from "../../../shared/models"
import { ActionType } from "../models"

export const setQuestionnaires = createAction<GenericObject[]>(ActionType.SET_QUESTIONNAIRES)
