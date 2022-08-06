import React from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import './dashboardLayout.css'
import { RouteURL } from '../../lib/path'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Flex direction="column" flex={1} minH="100vh">
            <Box w="100%" h={10} className="dashboard-header"></Box>
            <Flex h="100%" flex={1}>
                <Flex w="25%" flex={1} backgroundColor="#F98BA4"  p={5} pt={10}>
                    <List w="100%" spacing={3}>
                        <ListItem className='menu-list-item'><Link to={RouteURL.AdminDashboard}>Questions</Link></ListItem>
                        <ListItem className='menu-list-item'><Link to=''>Clients</Link></ListItem>
                        <ListItem className='menu-list-item'><Link to=''>Answers</Link></ListItem>
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