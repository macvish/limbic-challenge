import React from 'react'
import { Select as CUSelect, SelectProps } from '@chakra-ui/react'

interface Props extends SelectProps {
    onChangeText: (text: string) => void
    options?: {
        value: string
        label: string
    }[]
}

const Select: React.FC<Props> = ({ onChangeText, options, ...props}) => {
    return <CUSelect {...props} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChangeText(event.target.value)}>
        {options?.map(({ label, value }, index) => (
            <option key={index} value={value}>{label}</option>
        ))}
    </CUSelect>
}

export default Select
