import React, { useEffect, useRef, useState } from 'react'
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
import AlertModal from '../../../../shared/components/AlertModal'
import { Questionnaire } from '../../models'

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

const QuestionnaireListing: React.FC = () => {
    const [selectedQuestionnaireIndex, setSelectedQuestionnaireIndex] = useState<number>(0)
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<GenericObject[]>([])
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires } = useSelector(adminSelector)

    const tableData = (item: Questionnaire, index: number) => ({
        key: item.id,
        name: item.name,
        createdAt: moment(item.createdAt).format('MMM D YYYY, h:mm a'),
        updatedAt: moment(item.updatedAt).format('MMM D YYYY, h:mm a'),
        actions: <HStack spacing={5}>
            <ViewIcon
                color="blackAlpha.500"
                cursor="pointer"
                onClick={() => navigate(`${RouteURL.Quetionnaire}${item.id}`)}
            />
            <EditIcon
                color="blue.400"
                onClick={() => navigate(`${RouteURL.EditQuestionnaire}${item.id}`)}
                cursor="pointer"
            />
            <DeleteIcon
                color="red"
                cursor="pointer"
                onClick={() => {
                    setSelectedQuestionnaireIndex(index)
                    setAlertIsOpen(true)
                }}
            />
        </HStack>
    })
    
    const onSearch = (text: string) => {
        const newQuestionnaires = questionnaires.filter(item => String(item?.name).toLowerCase().includes(text.toLowerCase()))
        setData(newQuestionnaires.map(tableData))
    }

    const deleteQuestionnaire = () => {
        const newQuestionnaires = [...questionnaires]
        newQuestionnaires.splice(selectedQuestionnaireIndex, 1)

        localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
        dispatch(setQuestionnaires([...newQuestionnaires]))
        setAlertIsOpen(false)
    }

    useEffect(() => setData(questionnaires.map(tableData)), [questionnaires])
    
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
            <AlertModal
                isOpen={alertIsOpen}
                title="Delete Questionnaire"
                message="Are you sure? You can't undo this action afterwards."
                showCancelButton
                okText='Delete'
                onOk={deleteQuestionnaire}
                onClose={() => setAlertIsOpen(false)}
            />
        </Box>
    )
}

export default QuestionnaireListing
