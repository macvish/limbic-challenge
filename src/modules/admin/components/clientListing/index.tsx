import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Flex, FormControl, HStack, Stack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import moment from 'moment'

import { AppDispatch, Client, GenericObject } from '../../../../shared/models'
import { adminSelector } from '../../store/reducer'
import DashboardHeader from '../../../../shared/components/DashboardHeader'
import Button from '../../../../shared/components/Button'
import Input from '../../../../shared/components/Input'
import Table from '../../../../shared/components/Table'
import AlertModal from '../../../../shared/components/AlertModal'
import { addClients, setClients } from '../../store/actions'
import Modal from '../../../../shared/components/Modal'
import { getId } from '../../../../lib/helper'

const column = [
    {
        title: 'Full Name',
        dataIndex: 'fullName'
    },
    {
        title: 'Age',
        dataIndex: 'age'
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

const ClientListingContent: React.FC = () => {
    const [selectedClientIndex, setSelectedClientIndex] = useState<number>(0)
    const [selectedClient, setSelectedClient] = useState<Client>({} as Client)
    const [tableData, setTableData] = useState<GenericObject[]>([])
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const { clients } = useSelector(adminSelector)

    const tableDataFormat = (item: Client, index: number) => ({
        fullName: item.fullName,
        age: item.age,
        createdAt: moment(item.createdAt).format('MMM D YYYY, h:mm a'),
        updatedAt: moment(item.updatedAt).format('MMM D YYYY, h:mm a'),
        actions: <HStack spacing={5}>
            <EditIcon
                color="blue.400"
                onClick={() => {
                    setSelectedClient(item)
                    setIsEditModalOpen(true)
                }}
                cursor="pointer"
            />
            <DeleteIcon
                color="red"
                cursor="pointer"
                onClick={() => {
                    setSelectedClientIndex(index)
                    setAlertIsOpen(true)
                }}
            />
        </HStack>
    })

    const onSearch = (text: string) => {
        const newClients = clients.filter(item => String(item?.fullName).toLowerCase().includes(text.toLowerCase()))
        setTableData(newClients.map(tableDataFormat))
    }

    const deleteClient = () => {
        const newClients = [...clients]
        newClients.splice(selectedClientIndex, 1)

        localStorage.setItem('clients', JSON.stringify(newClients))
        dispatch(setClients([...newClients]))
        setAlertIsOpen(false)
    }

    const handleAddClient = () => {
        setSelectedClient({
            id: getId(clients),
            fullName: '',
            age: 0,
            createdAt: moment().format(),
            updatedAt: moment().format()
        })
        setIsAddModalOpen(true)
    }

    const onChangeInput = (key: string, value: string,) => {
        setSelectedClient(prevState => ({...prevState, [key]: value}))
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = localStorage.getItem('clients')

        if (isAddModalOpen) {
            if (result) {
                const resultJson = JSON.parse(result)
                localStorage.setItem('clients', JSON.stringify([...resultJson, selectedClient]))
            }
            dispatch(addClients(selectedClient))
            setIsAddModalOpen(false)
        } else {
            const properForm = {
                ...selectedClient,
                updatedAt: moment().format()
            }

            const newClients = clients.map((item) => {
                if (item.id === selectedClient.id) {
                    return {...item, ...properForm}
                }

                return item
            })
            
            localStorage.setItem('clients', JSON.stringify(newClients))
            dispatch(setClients(newClients))
            setIsEditModalOpen(false)
        }
    }

    const renderForm = () => {
        return <form onSubmit={onSubmit}>
            <FormControl>
                <Stack spacing={7}>
                    <Input
                        placeholder="Full Name"
                        isRequired
                        value={selectedClient?.fullName}
                        onChangeText={(value) => onChangeInput('fullName', value)}
                    />
                    <Input
                        placeholder='Age'
                        isRequired
                        value={selectedClient?.age}
                        onChangeText={(value) => onChangeInput('age', value)}
                        typeof='number'
                    />
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
            isCentered
        >
            {renderForm()}
        </Modal>
    }

    useEffect(() => {
        if (clients.length > 0) setTableData(clients.map(tableDataFormat))
    }, [clients])

    return (
        <Box>
            <DashboardHeader title="Clients" />
            <Flex justify="space-between">
                <Box>  
                    <Button title="Add Client" onClick={handleAddClient} />
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
                onOk={deleteClient}
                onClose={() => setAlertIsOpen(false)}
            />
            {renderAddQuestion()}
            {renderEditQuestion()}
        </Box>
    )
}

export default ClientListingContent
