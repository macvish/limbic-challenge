import React from 'react'
import { Box, Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { RouteURL } from './lib/path'

function App() {
  return (
    <Flex>
      <Box w="55%" h="100vh" backgroundColor="#F98BA4"></Box>
      <Flex w="45%" h="100vh" alignItems="center" justifyContent="center">
        <Flex
          shadow="2xl"
          p="12"
          width='65%'
          direction="column"
          alignItems="center"
          justifyContent="center"
          rounded={5}
        >
          <Heading mb={5}>Log in</Heading>
          <Text mb={3} textAlign="center">Please Select An Account.</Text>
          <Link to='/'>
            <Button colorScheme="gray" w="100%">Client</Button>
          </Link>
          <Stack direction="row" p={3}>
            <Divider colorScheme="blackAlpha" />
            <Text>Or</Text>
            <Divider colorScheme="blackAlpha" />
          </Stack>
          <Link to={RouteURL.AdminDashboard}>
            <Button colorScheme="gray" w="100%">Admin</Button>
          </Link>
        </Flex>
      </Flex>
      </Flex>
  )
}

export default App
