import React from 'react'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import './dashboardLayout.css'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Flex direction="column" h="100vh">
            <Box w="100%" h={10} className="dashboard-header"></Box>
            <Flex h="100%">
                <Box w="25%" h="100%" backgroundColor="#F98BA4" p={5} pt={10}>
                    <List spacing={3}>
                        <ListItem className='menu-list-item'><Link to=''>Questions</Link></ListItem>
                        <ListItem className='menu-list-item'><Link to=''>Clients</Link></ListItem>
                        <ListItem className='menu-list-item'><Link to=''>Answers</Link></ListItem>
                    </List>
                </Box>
                <Box w="75%" h="100%" p={5}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default DashboardLayout