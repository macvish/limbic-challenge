import React from "react"
import { Route, Routes } from 'react-router-dom'

import { RouteURL } from '../helpers/path'
import App from "../App"
import AdminDashboard from "../pages/adminDashboard"

export const IndexRouter: React.FC = () => (
    <Routes>
        <Route path={RouteURL.AdminDashboard} element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
    </Routes>
)