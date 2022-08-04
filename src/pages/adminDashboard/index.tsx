import React from 'react'

import DashboardLayout from '../../layouts/dashboardLayout'
import QuestionListing from '../../modules/admin/components/questionnaireListing'

const AdminDashboard: React.FC = () => (
    <DashboardLayout>
        <QuestionListing />
    </DashboardLayout>
)

export default AdminDashboard
