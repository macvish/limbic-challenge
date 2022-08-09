import React from 'react'
import DashboardLayout from '../../layouts/dashboardLayout'
import ClientDashboardContent from '../../modules/users/components/userQuestionnaires'

const ClientDashboard: React.FC = () => {
    return <DashboardLayout>
        <ClientDashboardContent />
    </DashboardLayout>
}

export default ClientDashboard
