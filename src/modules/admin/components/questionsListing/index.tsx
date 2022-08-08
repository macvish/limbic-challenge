import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch, GenericObject, Questions } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import { RouteURL } from '../../../../lib/path'
import { Box, Flex, FormControl, HStack, Stack } from '@chakra-ui/react'
import DashboardHeader from '../../../../shared/components/DashboardHeader'
import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import Table from '../../../../shared/components/Table'
import AlertModal from '../../../../shared/components/AlertModal'
import { setQuestionnaires } from '../../store/actions'
import Modal from '../../../../shared/components/Modal'
import Select from '../../../../shared/components/Select'
import { getId, responseTypes } from '../../../../lib/helper'
import moment from 'moment'

const column = [
    {
        title: 'Question',
        dataIndex: 'question'
    },
    {
        title: 'Response Type',
        dataIndex: 'type'
    },
    {
        title: 'Actions',
        dataIndex: 'actions'
    }
]

const QuestionsListingContent: React.FC = () => {
    const [questionnaireName, setQuestionnaireName] = useState('')
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)
    const [selectedQuestion, setSelectedQuestion] = useState<Questions>({} as Questions)
    const [tableData, setTableData] = useState<GenericObject[]>([])
    const [questions, setQuestions] = useState<Questions[]>([])
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires } = useSelector(adminSelector)
    const params = useParams()
    const navigate = useNavigate()

    const tableDataFormat = (item: Questions, index: number) => ({
        question: item.name,
        type: item.type,
        actions: <HStack spacing={5}>
            <EditIcon
                color="blue.400"
                onClick={() => {
                    setSelectedQuestion(questions.find((data) => data.id === item.id) as Questions)
                    setIsEditModalOpen(true)
                }}
                cursor="pointer"
            />
            <DeleteIcon
                color="red"
                cursor="pointer"
                onClick={() => {
                    setSelectedQuestionIndex(index)
                    setAlertIsOpen(true)
                }}
            />
        </HStack>
    })

    const onSearch = (text: string) => {
        const newQuestions = questions.filter(item => String(item?.name).toLowerCase().includes(text.toLowerCase()))
        setTableData(newQuestions.map(tableDataFormat))
    }

    const deleteQuestion = () => {
        const newQuestionnaires = questionnaires.map(item => {
            if (item.id === Number(params.id)) {
                const newQuestions = [...questions]
                newQuestions.splice(selectedQuestionIndex, 1)

                return {...item, questions: newQuestions}
            }

            return item
        })

        localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
        dispatch(setQuestionnaires(newQuestionnaires))
        setAlertIsOpen(false)
    }

    const handleAddQuestion = () => {
        setSelectedQuestion({ id: getId(questions), name: '', type: '', options: [] })
        setIsAddModalOpen(true)
    }

    const handleAddOption = () => {
        setSelectedQuestion(prevState => {
            if (prevState?.options) {
                return { ...prevState, options: [...prevState.options, { id: getId(prevState.options), value: '' }]}
            }

            return prevState
        })
    }
    
    const handleDeleteOption = (index: number) => {
        setSelectedQuestion(prevState => {
            if (prevState?.options) {
                const newOptions = prevState.options
                newOptions?.splice(index, 1)

                return {...prevState, options: newOptions}
            }

            return prevState
        })
    }

    const onChangeInput = (key: string, value: string,) => {
        setSelectedQuestion(prevState => ({...prevState, [key]: value}))
    }

    const onChangeOptionInput = (value: string, index: number) => {
        setSelectedQuestion(prevState => {
            if (prevState?.options) {
                prevState.options[index].value = value

                return prevState
            }

            return prevState
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (isAddModalOpen) {
            const properForm = {
                questions: [...questions, selectedQuestion],
                updatedAt: moment().format()
            }
            const newQuestionnaires = questionnaires.map((item) => {
                if (item.id === Number(params?.id)) {
                    return {...item, ...properForm}
                }

                return item
            })

            localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
            dispatch(setQuestionnaires(newQuestionnaires))
            setIsAddModalOpen(false)
        } else {
            const newQuestions = questions.map((item) => {
                if (item.id === selectedQuestion.id) {
                    return selectedQuestion
                }

                return item
            })

            const properForm = {
                questions: newQuestions,
                updatedAt: moment().format()
            }

            const newQuestionnaires = questionnaires.map((item) => {
                if (item.id === Number(params?.id)) {
                    return {...item, ...properForm}
                }

                return item
            })
            
            localStorage.setItem('questionnaires', JSON.stringify(newQuestionnaires))
            dispatch(setQuestionnaires(newQuestionnaires))
            setIsEditModalOpen(false)
        }
    }

    const renderForm = () => {
        const showOptions = () => {
            if (selectedQuestion?.type === '' || selectedQuestion?.type === 'input' || selectedQuestion?.type === 'textarea') {
                return
            }

            return <Stack p={5} spacing={5}>
                {selectedQuestion?.options?.map((item, index) => (
                    <HStack key={index} spacing={5}>
                        <Input
                            value={item.value}
                            isRequired
                            onChangeText={(text) => onChangeOptionInput(text, index)}
                        />
                        <Button onClick={() => handleDeleteOption(index)}>
                            <DeleteIcon color="red.300" />
                        </Button>
                    </HStack>
                ))}
                <Button title="Add option" onClick={() => handleAddOption()} />
            </Stack>
        }

        return <form onSubmit={onSubmit}>
            <FormControl>
                <Stack spacing={7}>
                    <HStack spacing={5}>
                        <Input
                            placeholder="Enter Question"
                            isRequired
                            value={selectedQuestion?.name}
                            onChangeText={(value) => onChangeInput('name', value)}
                        />
                        <Select
                            placeholder='Question response type'
                            isRequired
                            value={selectedQuestion?.type}
                            onChangeText={(value) => onChangeInput('type', value)}
                            options={responseTypes}
                        />
                    </HStack>
                    {showOptions()}
                    <Button title="Save" type="submit" />
            </Stack>
            </FormControl>
    </form>
    }

    const renderAddQuestion = () => {
        return <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add Question"
            hideOkButton
            size="xl"
            isCentered
        >
            {renderForm()}
        </Modal>
    }
    
    const renderEditQuestion = () => {
        return <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Question"
            hideOkButton
            size="xl"
            isCentered
        >
            {renderForm()}
        </Modal>
    }

    useEffect(() => {
        if (params.id) {
            const questionnaire = questionnaires.find((item) => item.id === Number(params.id))
            if (questionnaire) {
                setQuestionnaireName(questionnaire.name)
                setQuestions(questionnaire.questions)
                setTableData(questionnaire.questions.map(tableDataFormat))
            } else {
                navigate(RouteURL.AdminDashboard)
            }
        }
    }, [questionnaires, params.id])

    return (
        <Box>
            <DashboardHeader title={questionnaireName} />
            <Flex justify="space-between">
                <Box>  
                    <Button title="Add Question" onClick={handleAddQuestion} />
                </Box>
                <Box>
                    <Input onChangeText={onSearch} placeholder="Search" leftElement={<SearchIcon />} />
                </Box>
            </Flex>
            <Box>
                <Table column={column} data={tableData} />
            </Box>
            <AlertModal
                isOpen={alertIsOpen}
                title="Delete Questionnaire"
                message="Are you sure? You can't undo this action afterwards."
                showCancelButton
                okText='Delete'
                onOk={deleteQuestion}
                onClose={() => setAlertIsOpen(false)}
            />
            {renderAddQuestion()}
            {renderEditQuestion()}
        </Box>
    )
}

export default QuestionsListingContent
