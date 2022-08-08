import { createAction } from "@reduxjs/toolkit"
import { Client } from "../../../shared/models"

import { ActionType, Questionnaire } from "../models"

export const setQuestionnaires = createAction<Questionnaire[]>(ActionType.SET_QUESTIONNAIRES)

export const addQuestionnaire = createAction<Questionnaire>(ActionType.ADD_QUESTIONNAIRE)

export const setClients = createAction<Client[]>(ActionType.SET_CLIENTS)

export const addClients = createAction<Client>(ActionType.ADD_CLIENT)
