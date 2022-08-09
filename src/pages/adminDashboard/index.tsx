import React from 'react'

import DashboardLayout from '../../layouts/dashboardLayout'
import QuestionnaireListing from '../../modules/admin/components/questionnaireListing'

const AdminDashboard: React.FC = () => (
    <DashboardLayout>
        <QuestionnaireListing />
    </DashboardLayout>
)

export default AdminDashboard
