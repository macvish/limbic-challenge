import React from "react"
import DashboardLayout from "../../layouts/dashboardLayout"
import AddQuestionnaireContent from "../../modules/admin/components/addQuestionnaire"

const AddQuestionnaire: React.FC = () => {
    return <DashboardLayout>
        <AddQuestionnaireContent />
    </DashboardLayout>
}

export default AddQuestionnaire
