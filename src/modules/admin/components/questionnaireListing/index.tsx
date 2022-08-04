import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import { AppDispatch, GenericObject } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import { setQuestionnaires } from '../../store/actions'

const dummyData = [
    {
        name: 'Questionnaire 1',
        createdAt: moment().format('MMM D, YYYY'),
        updatedAt: moment().format('MMM D, YYYY')
    }
]

const column = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Date Created',
        dataIndex: 'createdAt'
    },
    {
        title: 'Date Updated',
        dataIndex: 'updatedAt'
    }
]

const QuestionListing: React.FC = () => {
    const [data, setData] = useState<GenericObject[]>([])
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires } = useSelector(adminSelector)
    
    const onSearch = (text: string) => {
        const newQuestionnaires = questionnaires.filter(item => String(item?.name).toLowerCase().includes(text))
        setData(newQuestionnaires)
    }

    useEffect(() => {
        const result = localStorage.getItem('questionnaires')
        if (result) dispatch(setQuestionnaires(JSON.parse(result)))
    }, [])

    useEffect(() => setData(questionnaires), [questionnaires])
    
    return (
        <Box>
            <Heading size="lg" mb={4}>Questionnaires</Heading>
            <Flex justify="space-between">
                <Box>  
                    <Button title="Create Questionnaire" />
                </Box>
                <Box>
                    <Input onChangeText={onSearch} placeholder="Search" />
                </Box>
            </Flex>
            <Box>
                <Table column={column} data={dummyData} />
            </Box>
        </Box>
    )
}

export default QuestionListing
