
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex
} from '@chakra-ui/react'

export default function DirtyTables (): JSX.Element
{
    return (
        <>
            <TableContainer>
  <Table variant= {'striped'} size={'sm'} p = {5}>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th textAlign={'center'} >TIME</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
        <Th textAlign={'center'} >10:00 - 100</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Monday</Td>
        <Td colSpan={3} backgroundColor = {'blue.800'}>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>

        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>
      </Tr>
      <Tr>
        <Td>Monday</Td>
        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>

        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>
      </Tr>
      <Tr>
        <Td>Monday</Td>
        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>

        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>
      </Tr>
      <Tr>
        <Td>Monday</Td>
        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>

        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>
      </Tr>
      <Tr>
        <Td>Monday</Td>
        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>

        <Td>
            <Flex flexDir = {'column'} textAlign = {'center'} p = {5}>
                <h1>10:00 to 10:00</h1>
                <h1>Multivariate Calculus</h1>
                <h1>Room 18 NB </h1>
                <h1>Muhammad Basit Ali Gillani</h1>
            </Flex>
        </Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
        </>
    )
}