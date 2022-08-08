import React from 'react'
import { Heading } from '@chakra-ui/react'

interface Props {
    title: string
}

const DashboardHeader: React.FC<Props> = ({ title }) => (
    <Heading size="lg" mb={4}>{title}</Heading>
)

export default DashboardHeader
