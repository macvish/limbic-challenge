import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, FormControl, HStack, Stack, Text } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons' 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import { AnswerData, AppDispatch, Client, GenericObject, Questions } from '../../../../shared/models'
import { adminSelector } from '../../../admin/store/reducer'
import { RouteURL } from '../../../../lib/path'
import DashboardHeader from '../../../../shared/components/DashboardHeader'
import AlertModal from '../../../../shared/components/AlertModal'
import { Questionnaire } from '../../../../shared/models'
import Modal from '../../../../shared/components/Modal'
import DynamicField from '../../../../shared/components/DynamicField'
import { getId } from '../../../../lib/helper'
import { setQuestionnaires } from '../../../admin/store/actions'

const column = [
    {
        title: 'Questionnaire Name',
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

const ClientDashboard: React.FC = () => {
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire>({} as Questionnaire)
    const [client, setClient] = useState<Client>({} as Client)
    const [isFillModalOpen, setIsFillModalOpen] = useState<boolean>(false)
    const [answerData, setAnswerData] = useState<AnswerData[]>([])
    const [data, setData] = useState<GenericObject[]>([])
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { clients, questionnaires } = useSelector(adminSelector)

    const tableData = (item: Questionnaire) => ({
        key: item.id,
        name: item.name,
        createdAt: moment(item.createdAt).format('MMM D YYYY, h:mm a'),
        updatedAt: moment(item.updatedAt).format('MMM D YYYY, h:mm a'),
        actions: <HStack spacing={5}>
            <EditIcon
                color="blue.400"
                cursor="pointer"
                onClick={() => {
                    setSelectedQuestionnaire(item)
                    setIsFillModalOpen(true)
                }}
            />
        </HStack>
    })
    
    const onSearch = (text: string) => {
        const newQuestionnaires = questionnaires.filter(item => String(item?.name).toLowerCase().includes(text.toLowerCase()))
        setData(newQuestionnaires.map(tableData))
    }

    const onChange = (text: string, questionId: number) => {
        const response = answerData?.find(item => item.questionId === questionId)
        if (response) {
            const newAnswers = answerData?.map((item) => {
                if (item.questionId === questionId) {
                    return {...item, answer: text}
                }

                return item
            })

            setAnswerData(newAnswers)
        } else {
            setAnswerData(prevState => ([...prevState, { answer: text, questionId }]))
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const properForm = {
            answers: [
                ...selectedQuestionnaire?.answers ?? [],
                {
                    id: getId(selectedQuestionnaire?.answers ?? []),
                    clientId: Number(params?.id),
                    answerData: answerData,
                    createdAt: moment().format(),
                    updatedAt: moment().format(),
                }
            ]
        }

        const newQuestionnaires = questionnaires.map((item) => {
            if (item.id === selectedQuestionnaire.id) {
                return {...item, ...properForm}
            }

            return item
        })

        localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
        dispatch(setQuestionnaires(newQuestionnaires))
        setIsFillModalOpen(false)
    }

    const renderFormItem = (item: Questions, index: number) => {
        return <Stack key={index}>
            <Text fontWeight="medium">{item.name}</Text>
            <DynamicField
                type={item.type}
                onChangeText={(text) => onChange(text, item.id)}
                isRequired
                options={item.options?.map(item => (item.value))}
                placeholder={item.name}
            />
        </Stack>
    }

    const renderForm = () => {
        return <Modal
            isOpen={isFillModalOpen}
            onClose={() => setIsFillModalOpen(false)}
            title={selectedQuestionnaire?.name}
            hideOkButton
            size="xl"
            isCentered
        >
            <form onSubmit={onSubmit}>
                <FormControl>
                    <Stack spacing={5}>
                        {selectedQuestionnaire?.questions?.map(renderFormItem)}
                        <Button type="submit" title="Submit" />
                    </Stack>
                </FormControl>
            </form>
        </Modal>
    }

    useEffect(() => {
        if (params.id) {
            const client = clients.find((item) => item.id === Number(params.id))
            if (client) {
                setClient(client)
            } else {
                navigate(RouteURL.AdminDashboard)
            }
        }
    }, [clients, params.id])

    useEffect(() => setData(questionnaires.map(tableData)), [questionnaires])
    
    return (
        <Box>
            <DashboardHeader title="Questionnaires" />
            <Flex justify="flex-end">
                <Box>
                    <Input onChangeText={onSearch} placeholder="Search" leftElement={<SearchIcon />} />
                </Box>
            </Flex>
            <Box>
                <Table column={column} data={data} />
            </Box>
            {renderForm()}
        </Box>
    )
}

export default ClientDashboard
