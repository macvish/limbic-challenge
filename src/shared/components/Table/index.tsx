import React from 'react'
import { Table as CUTable, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { GenericObject } from '../../models.d'

interface Props {
    column: ColumnData[]
    data: GenericObject[]
}

interface ColumnData {
    title: string
    dataIndex?: string
}

const Table: React.FC<Props> = ({ column, data }) => {
    const renderColumns = () => {
        return column.map(({ dataIndex, title }) => (<Th key={dataIndex}>{title}</Th>))
    }

    const renderData = () => {
        return data.map((item, index) => {
            return (
                <Tr key={index}>
                    {column.map(({ dataIndex }) => (<Td>{item[dataIndex!]}</Td>))}
                </Tr>       
            )
        })
    }
    
    return (
        <TableContainer>
            <CUTable>
                <Thead>
                    <Tr>
                        {renderColumns()}
                    </Tr>
                </Thead>
                <Tbody>
                    {renderData()}
                </Tbody>
            </CUTable>
        </TableContainer>
    )
}

export default Table