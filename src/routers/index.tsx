import React from "react"
import { Route, Routes } from 'react-router-dom'

import { RouteURL } from '../lib/path'
import App from "../App"
import AdminDashboard from "../pages/adminDashboard"
import AddQuestionnaire from "../pages/addQuestionnaire"
import QuestionsListing from "../pages/questionsListing"
import ClientListing from "../pages/clientsListing"
import ClientDashboard from "../pages/clientDashboard"

export const IndexRouter: React.FC = () => (
    <Routes>
        <Route path={`${RouteURL.ClientDashboard}:id`} element={<ClientDashboard />} />
        <Route path={`${RouteURL.Clients}`} element={<ClientListing />} />
        <Route path={`${RouteURL.Quetionnaire}:id`} element={<QuestionsListing />} />
        <Route path={`${RouteURL.EditQuestionnaire}:id`} element={<AddQuestionnaire />} />
        <Route path={RouteURL.AddQuestionnaire} element={<AddQuestionnaire />} />
        <Route path={RouteURL.AdminDashboard} element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
    </Routes>
)