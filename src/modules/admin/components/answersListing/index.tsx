import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { DeleteIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'

import { Answers, AppDispatch, GenericObject, Questions } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import { RouteURL } from '../../../../lib/path'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import AlertModal from '../../../../shared/components/AlertModal'
import Modal from '../../../../shared/components/Modal'
import { setQuestionnaires } from '../../store/actions'

interface Props {
    questions: Questions[]
}

const column = [
    {
        title: 'Client\'s Name',
        dataIndex: 'clientName'
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

const AnswersListingContent: React.FC<Props> = ({ questions }) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<Answers>({} as Answers)
    const [tableData, setTableData] = useState<GenericObject[]>([])
    const [answers, setAnswers] = useState<Answers[]>([])
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires, clients } = useSelector(adminSelector)
    const params = useParams()
    const navigate = useNavigate()

    const tableDataFormat = (item: Answers, index: number) => ({
        clientName: clients.find(data => data.id === item.clientId)?.fullName,
        createdAt: moment(item.createdAt).format('MMM D YYYY, h:mm a'),
        updatedAt: moment(item.updatedAt).format('MMM D YYYY, h:mm a'),
        actions: <HStack spacing={5}>
            <ViewIcon
                color="blackAlpha.500"
                cursor="pointer"
                onClick={() => navigate(`${RouteURL.Quetionnaire}${item.id}`)}
            />
            <DeleteIcon
                color="red"
                cursor="pointer"
                onClick={() => {
                    setSelectedAnswerIndex(index)
                    setAlertIsOpen(true)
                }}
            />
        </HStack>
    })

    const onSearch = (text: string) => {
        const newAnswers = answers.filter(item => {
            return String(clients.find(data => data.id === item.clientId)?.fullName).toLowerCase().includes(text.toLowerCase())
        })
        setTableData(newAnswers.map(tableDataFormat))
    }

    const deleteQuestion = () => {
        const newQuestionnaires = questionnaires.map(item => {
            if (item.id === Number(params.id)) {
                const newAnswers = [...answers]
                newAnswers.splice(selectedAnswerIndex, 1)

                return {...item, answers: newAnswers}
            }

            return item
        })

        localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
        dispatch(setQuestionnaires(newQuestionnaires))
        setAlertIsOpen(false)
    }

    const renderAnswerItem = () => {
        return selectedAnswer.answerData?.map((item, index) => {
            const question = questions.find(question => item.questionId === question.id)
            const renderMultiAnswers = () => {
                if (Array.isArray(item.answer)) {
                    return item.answer?.map((item, index) => (
                        <Text>{item}</Text>
                    ))
                }

                return item.answer
            }
            
            if (question) {
                return <Stack key={index} spacing={7}>
                    <Text>{question.name}</Text>
                    {renderMultiAnswers()}
                </Stack>
            }
                
        })
    }

    const renderAnswers = () => {
        return <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="View Answers"
            hideOkButton
            isCentered
        >
            {renderAnswerItem()}
        </Modal>
    }

    useEffect(() => {
        if (params.id) {
            const questionnaire = questionnaires.find((item) => item.id === Number(params.id))
            if (questionnaire && questionnaire.answers) {
                setAnswers(questionnaire.answers)
                setTableData(questionnaire.answers.map(tableDataFormat))
            }
        }
    }, [questionnaires, params.id])

    return (
        <Box>
            <Flex justify="space-between">
                <Box><Text fontWeight="medium" fontSize="lg">Answers</Text></Box>
                <Box>
                    <Input onChangeText={onSearch} placeholder="Search" leftElement={<SearchIcon />} />
                </Box>
            </Flex>
            <Box>
                <Table column={column} data={tableData} />
            </Box>
            <AlertModal
                isOpen={alertIsOpen}
                title="Delete Answer"
                message="Are you sure? You can't undo this action afterwards."
                showCancelButton
                okText='Delete'
                onOk={deleteQuestion}
                onClose={() => setAlertIsOpen(false)}
            />
            {renderAnswers()}
        </Box>
    )
}

export default AnswersListingContent
