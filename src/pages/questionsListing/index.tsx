import React from 'react'
import DashboardLayout from '../../layouts/dashboardLayout'
import QuestionsListingContent from '../../modules/admin/components/questionsListing'

const QuestionsListing: React.FC = () => {
    return <DashboardLayout>
        <QuestionsListingContent />
    </DashboardLayout>
}

export default QuestionsListing
