import React, { useState } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

import DashboardHeader from '../../../../shared/components/DashboardHeader'
import Input from '../../../../shared/components/Input'
import Button from '../../../../shared/components/Button'
import { Questions } from '../../../../shared/models'

const AddQuestionnaireContent: React.FC = () => {
    const [name, setName] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])

    const renderForm = () => {
        return questions.map((item) => {
            return <HStack>
                <Input placeholder="Question" onChangeText={() => {}} />
            </HStack>
        })
    }

    const handleAddQuestion = () => {
        setQuestions(prevState => ([...prevState, {id: '', name: '', type: '', value: []}]))
    }
    
    return <Box>
        <DashboardHeader title="Create Questionnaire" />
        <Box>
            <Input placeholder="Questionnaire name" onChangeText={setName} value={name} />
            <Text>Questions</Text>
            <Box p={5}>
                {renderForm()}
            </Box>
            <Button title="Add Question" onClick={handleAddQuestion} />
        </Box>
    </Box>
}

export default AddQuestionnaireContent
