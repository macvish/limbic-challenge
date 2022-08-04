import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons' 
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import { AppDispatch, GenericObject } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import { setQuestionnaires } from '../../store/actions'
import { RouteURL } from '../../../../helpers/path'
import DashboardHeader from '../../../../shared/components/DashboardHeader'

const dummyData = [
    {
        name: 'Questionnaire 1',
        createdAt: moment().format('MMM D, YYYY'),
        updatedAt: moment().format('MMM D, YYYY'),
        actions: <HStack>
            <EditIcon color='blue.400' />
            <DeleteIcon color='red' />
        </HStack>,
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
    },
    {
        title: 'Actions',
        dataIndex: 'actions'
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

    useEffect(() => setData(questionnaires.map((item) => ({
        key: item?.id,
        name: item?.name,
        createdAt: item?.createdAt,
        updatedAt: item?.updatedAt,
        actions: <Flex>
            <EditIcon color='blue.400' />
            <DeleteIcon color='red' />
        </Flex>
    }))), [questionnaires])
    
    return (
        <Box>
            <DashboardHeader title="Questionnaires" />
            <Flex justify="space-between">
                <Box>  
                    <Link to={RouteURL.AddQuestionnaire}><Button title="Create Questionnaire" /></Link>
                </Box>
                <Box>
                    <Input onChangeText={onSearch} placeholder="Search" leftElement={<SearchIcon />} />
                </Box>
            </Flex>
            <Box>
                <Table column={column} data={dummyData} />
            </Box>
        </Box>
    )
}

export default QuestionListing
