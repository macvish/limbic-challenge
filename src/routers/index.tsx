import React from "react"
import { Route, Routes } from 'react-router-dom'

import { RouteURL } from '../lib/path'
import App from "../App"
import AdminDashboard from "../pages/adminDashboard"
import AddQuestionnaire from "../pages/addQuestionnaire"
import QuestionsListing from "../pages/questionsListing"

export const IndexRouter: React.FC = () => (
    <Routes>
        <Route path={`${RouteURL.Quetionnaire}:id`} element={<QuestionsListing />} />
        <Route path={`${RouteURL.EditQuestionnaire}:id`} element={<AddQuestionnaire />} />
        <Route path={RouteURL.AddQuestionnaire} element={<AddQuestionnaire />} />
        <Route path={RouteURL.AdminDashboard} element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
    </Routes>
)