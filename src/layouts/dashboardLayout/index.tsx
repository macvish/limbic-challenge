import React, { useEffect } from 'react'
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { Link, useLocation, useParams } from 'react-router-dom'

import './dashboardLayout.css'
import { RouteURL } from '../../lib/path'
import { setClients, setQuestionnaires } from '../../modules/admin/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../shared/models'
import { adminSelector } from '../../modules/admin/store/reducer'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { clients, questionnaires } = useSelector(adminSelector)
    const params = useParams()
    const location = useLocation()

    const isClient = location.pathname === `${RouteURL.ClientDashboard}${params.id}`

    const renderMenuItem = (title: string, route: string) => (
        <ListItem className='menu-list-item'>
            <Link to={route}><Text w="100%">{title}</Text></Link>
        </ListItem>
    )
    
    useEffect(() => {
        const clientResult = localStorage.getItem('clients')
        const questionnaireResult = localStorage.getItem('questionnaires')
        if (clientResult && clients.length < 1) dispatch(setClients(JSON.parse(clientResult)))
        if (questionnaireResult && questionnaires.length < 1) dispatch(setQuestionnaires(JSON.parse(questionnaireResult)))
    }, [])

    return (
        <Flex direction="column" flex={1} minH="100vh">
            <Box w="100%" h={10} className="dashboard-header"></Box>
            <Flex h="100%" flex={1}>
                <Flex w="25%" flex={1} backgroundColor="#F98BA4"  p={5} pt={10}>
                    <List w="100%" spacing={3}>
                        {!isClient && <>
                            {renderMenuItem('Questionnaires', RouteURL.AdminDashboard)}
                            {renderMenuItem('Clients', RouteURL.Clients)}
                        </>}
                        {renderMenuItem('Back to Login', '/')}
                    </List>
                </Flex>
                <Box w="75%" h="100%" p={5}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default DashboardLayout