import React from 'react'
import DashboardLayout from '../../layouts/dashboardLayout'
import ClientListingContent from '../../modules/admin/components/clientListing'

const ClientListing: React.FC = () => {
    return <DashboardLayout>
        <ClientListingContent />
    </DashboardLayout>
}

export default ClientListing
