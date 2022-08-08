import React, { useEffect } from 'react'
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import './dashboardLayout.css'
import { RouteURL } from '../../lib/path'
import { setQuestionnaires } from '../../modules/admin/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../shared/models'
import { adminSelector } from '../../modules/admin/store/reducer'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { questionnaires } = useSelector(adminSelector)

    const renderMenuItem = (title: string, route: string) => (
        <ListItem className='menu-list-item'>
            <Link to={route}><Text w="100%">{title}</Text></Link>
        </ListItem>
    )
    
    useEffect(() => {
        const result = localStorage.getItem('questionnaires')
        if (result && questionnaires.length < 1) dispatch(setQuestionnaires(JSON.parse(result)))
    }, [])

    return (
        <Flex direction="column" flex={1} minH="100vh">
            <Box w="100%" h={10} className="dashboard-header"></Box>
            <Flex h="100%" flex={1}>
                <Flex w="25%" flex={1} backgroundColor="#F98BA4"  p={5} pt={10}>
                    <List w="100%" spacing={3}>
                        {renderMenuItem('Questionnaires', RouteURL.AdminDashboard)}
                        {renderMenuItem('Clients', RouteURL.Clients)}
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