import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

import Button from '../../../../shared/components/Button'

const QuestionListing: React.FC = () => {
    return (
        <Box>
            <Heading size="lg" mb={4}>Questionnaires</Heading>
            <Flex>
                <Box>
                    <Button title='Create Questionnaire' />
                </Box>
            </Flex>
        </Box>
    )
}

export default QuestionListing
