import { createAction } from "@reduxjs/toolkit"

import { ActionType, Questionnaire } from "../models"

export const setQuestionnaires = createAction<Questionnaire[]>(ActionType.SET_QUESTIONNAIRES)

export const addQuestionnaire = createAction<Questionnaire>(ActionType.ADD_QUESTIONNAIRE)
