import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import moment from 'moment'

import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'

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
    const [data, setData] = useState([])
    
    const onSearch = (text: string) => {}

    useEffect(() => {}, [])
    
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
