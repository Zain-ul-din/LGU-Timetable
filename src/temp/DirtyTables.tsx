
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
    Flex,
    Text
} from '@chakra-ui/react'

export default function DirtyTables (): JSX.Element
{
    return (
        <>
            <TableContainer>
  <Table variant= {'striped'} size={'sm'} p = {1}>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th textAlign={'center'} >TIME</Th>
        <Th textAlign={'center'} >
            <Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex>
        </Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
        <Th textAlign={'center'} ><Flex textAlign={'center'} flexDirection = {'column'} p = {0} m = {0}>
                <p>10:00</p> 
                <p>-</p>
                <p>10:00</p> 
            </Flex></Th>
      </Tr>
    </Thead>
    <Tbody>
        <Tr>
            <Td>Monday</Td>
            <Td colSpan={3}>
                <Flex flexDirection={'column'} alignItems = {'center'}>
                    <Text>Compiler Contruction</Text>
                    <Text>9:00 to 10:00</Text>
                    <Text>Miss .......</Text>
                    <Text>Room No 2 NB</Text>
                </Flex>
            </Td>
        </Tr>
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>
</TableContainer>
        </>
    )
}