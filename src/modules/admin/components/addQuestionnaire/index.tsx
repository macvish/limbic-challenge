import React, { useState } from 'react'
import { Box, FormControl, Heading, HStack, Stack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons' 
import { useDispatch, useSelector } from 'react-redux'

import DashboardHeader from '../../../../shared/components/DashboardHeader'
import Input from '../../../../shared/components/Input'
import Button from '../../../../shared/components/Button'
import { AppDispatch, Questions } from '../../../../shared/models'
import './addQuestionnaire.css'
import Select from '../../../../shared/components/Select'
import { adminSelector } from '../../store/reducer'
import { addQuestionnaire } from '../../store/actions'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { RouteURL } from '../../../../lib/path'
import { getId } from '../../../../lib/helper'

const responseTypes = [
    {
        value: 'input',
        label: 'Input Field'
    },
    {
        value: 'select',
        label: 'Select Field'
    },
    {
        value: 'radio',
        label: 'Radio Field'
    },
    {
        value: 'checkbox',
        label: 'Checkbox Field'
    },
    {
        value: 'textarea',
        label: 'TextArea Field'
    }
]

const AddQuestionnaireContent: React.FC = () => {
    const [name, setName] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires } = useSelector(adminSelector)

    const handleAddQuestion = () => {
        setQuestions(prevState => ([...prevState,
            { id: getId(questions), name: '', type: '', options: [] }
        ]))
    }

    const handleDeleteQuestion = (index: number) => {
        setQuestions(prevState => {
            prevState.splice(index, 1)
            return [...prevState]
        })
    }

    const handleAddOption = (id: number) => {
        const newQuestion = questions.map((item) => {
            if (item.id === id) {
                if (item?.options) {
                    return {
                        ...item,
                        options: [
                            ...item.options, { id: getId(item.options), value: '' }
                        ]
                    }
                } else {
                    return {...item, options: [{id: 1, value: ''}]}
                }
            }

            return item
        })

        setQuestions([...newQuestion])
    }
    
    const handleDeleteOption = (index: number, questionId: number) => {
        const newQuestion = questions.map((item) => {
            if (item.id === questionId && item?.options) {
                const newOptions = item?.options
                newOptions?.splice(index, 1)

                return {...item, options: newOptions}
            }

            return item
        })

        setQuestions([...newQuestion])
    }

    const onChangeInput = (key: string, value: string, id: number) => {
        const newQuestion = questions.map((item) => {
            if (item.id === id) {
                return { ...item, [key]: value }
            }

            return item
        })
        
        setQuestions(newQuestion)
    }

    const onChangeOptionInput = (value: string, id: number, index: number) => {
        const newQuestion = questions.map((item) => {
            if (item.id === id && item?.options) {
                item.options[index].value = value

                return item
            }

            return item
        })
        
        setQuestions(newQuestion)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('It got here')
        event.preventDefault()

        const result = localStorage.getItem('questionnaires')
        const properForm = {
            name,
            questions,
            createdAt: moment().format(),
            updatedAt: moment().format()
        }

        if (result) {
            const resultJson = JSON.parse(result)
            localStorage.setItem('questionnaires', JSON.stringify([...resultJson, { id: getId(resultJson), ...properForm}]))
        } else {
            localStorage.setItem('questionnaires', JSON.stringify([{ id: 1, ...properForm}]))
        }

        dispatch(addQuestionnaire({id: getId(questionnaires), ...properForm}))

        navigate(RouteURL.AdminDashboard)
    }

    const renderForm = () => {
        return questions.map(({ id, name, type, options }, index) => {
            const showOptions = () => {
                if (type === '' || type === 'input' || type === 'textarea') {
                    return
                }

                return <Stack>
                    {options?.map((item, index) => (
                        <HStack key={index}>
                            <Input
                                value={item.value}
                                isRequired
                                onChangeText={(text) => onChangeOptionInput(text, id, index)}
                            />
                            <Button onClick={() => handleDeleteOption(index, id)}>
                                <DeleteIcon color="red.300" />
                            </Button>
                        </HStack>
                    ))}
                    <Button title="Add option" onClick={() => handleAddOption(id)} />
                </Stack>
            }

            return <Stack key={index}>
                <HStack spacing={5}>
                    <Input
                        placeholder="Enter Question"
                        isRequired
                        value={name}
                        onChangeText={(value) => onChangeInput('name', value, id)}
                    />
                    <Select
                        placeholder='Question response type'
                        isRequired value={type}
                        onChangeText={(value) => onChangeInput('type', value, id)}
                        options={responseTypes}
                    />
                    <Button onClick={() => handleDeleteQuestion(index)}><DeleteIcon color="red.300" /></Button>
                </HStack>
                {showOptions()}
            </Stack>
        })
    }
    
    return <Box>
        <DashboardHeader title="Create Questionnaire" />
        <Box className=''>
            <form onSubmit={onSubmit}>
                <FormControl>
                    <Stack>
                        <Input placeholder="Questionnaire name" isRequired onChangeText={setName} value={name} />
                        <Box p={5}>
                            <Heading as="h6" size="md">Questions</Heading>
                            <Stack spacing={5} p={5}>
                                {renderForm()}
                            </Stack>
                            <Button title="Add Question" onClick={handleAddQuestion} />
                        </Box>
                        <Button
                            title="Submit"
                            type="submit"
                            disabled={questions.length < 1}
                        />
                    </Stack>
                </FormControl>
            </form>
        </Box>
    </Box>
}

export default AddQuestionnaireContent
