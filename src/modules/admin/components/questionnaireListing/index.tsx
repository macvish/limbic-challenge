import React, { useEffect, useState } from 'react'
import { Box, Flex, HStack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons' 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import { AppDispatch, GenericObject } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import { setQuestionnaires } from '../../store/actions'
import { RouteURL } from '../../../../lib/path'
import DashboardHeader from '../../../../shared/components/DashboardHeader'

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
    const navigate = useNavigate()
    const { questionnaires } = useSelector(adminSelector)
    
    const onSearch = (text: string) => {
        const newQuestionnaires = questionnaires.filter(item => String(item?.name).toLowerCase().includes(text))
        setData(newQuestionnaires)
    }

    const deletQuestionnaire = (index: number) => {}

    useEffect(() => setData(questionnaires.map((item, index) => ({
        key: item.id,
        name: item.name,
        createdAt: moment(item.createdAt).format('MMM D, YYYY'),
        updatedAt: moment(item.updatedAt).format('MMM D, YYYY'),
        actions: <HStack spacing={5}>
            <ViewIcon color="blackAlpha.500" cursor="pointer" />
            <EditIcon
                color="blue.400"
                onClick={() => navigate(`${RouteURL.EditQuestionnaire}${item.id}`)}
                cursor="pointer"
            />
            <DeleteIcon color="red" cursor="pointer" />
        </HStack>
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
                <Table column={column} data={data} />
            </Box>
        </Box>
    )
}

export default QuestionListing
