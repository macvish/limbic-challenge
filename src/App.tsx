import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { RouteURL } from './lib/path'
import { fakeUsers } from './lib/helper'
import Select from './shared/components/Select'
import { useDispatch, useSelector } from 'react-redux'
import { adminSelector } from './modules/admin/store/reducer'
import { setClients } from './modules/admin/store/actions'
import { AppDispatch } from './shared/models'

const App: React.FC = () => {
  const [client, setClient] = useState('')
  const { clients } = useSelector(adminSelector)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const result = localStorage.getItem('clients')

    if (!result) {
      localStorage.setItem('clients', JSON.stringify(fakeUsers))
      dispatch(setClients(fakeUsers))
    }
    
    if (result && clients.length < 1) dispatch(setClients(JSON.parse(result)))
  }, [])

  return (
    <Flex>
      <Box w="45%" h="100vh" backgroundColor="#F98BA4"></Box>
      <Flex w="55%" h="100vh" alignItems="center" justifyContent="center">
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
          <Text mb={3} textAlign="center">Please Select A client account.</Text>
          <Select
            w="40%"
            value={client}
            placeholder="Select Client"
            options={clients.map((item) => ({ value: String(item.id), label: item.fullName }))}
            onChangeText={setClient}
            mb={3}
          />
          <Link to={`${RouteURL.ClientDashboard}${client}`}>
            <Button colorScheme="gray" disabled={!client}>Login as client</Button>
          </Link>
          <Stack direction="row" p={3}>
            <Divider colorScheme="blackAlpha" />
            <Text>Or</Text>
            <Divider colorScheme="blackAlpha" />
          </Stack>
          <Link to={RouteURL.AdminDashboard}>
            <Button colorScheme="gray">Login as Admin</Button>
          </Link>
        </Flex>
      </Flex>
      </Flex>
  )
}

export default App
