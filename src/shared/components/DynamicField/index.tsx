import { Box, InputProps, SelectProps, Textarea } from '@chakra-ui/react'
import React from 'react'
import Input from '../Input'
import Select from '../Select'

interface Props {
    type: 'text' | 'options' | 'multiOptions' | 'textArea' | string
    placeholder?: string
    isRequired?: boolean
    value?: string
    options?: string[]
    onChangeText: (e: string) => void
}
const DynamicField: React.FC<Props> = ({ isRequired, onChangeText, options, placeholder, type, value }) => {
    const renderProperField = () => {
        switch (type) {
            case 'text': 
                return (
                    <Input
                        isRequired={isRequired}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        value={value}
                    />
                )
            case 'options':
                return (
                    <Select
                        isRequired={isRequired}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        value={value}
                        options={options?.map(item => ({ label: item, value: item }))}
                    />
                )
            case 'multiOptions':
                return (
                    <Select
                        isRequired={isRequired}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        value={value}
                        options={options?.map(item => ({ label: item, value: item }))}
                        multiple
                    />
                )
            case 'textArea':
                return <Textarea
                    isRequired={isRequired}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChangeText(event.target.value)}
                    placeholder={placeholder}
                    value={value}
                />
        }
    }
        
    return (
        <Box>
            {renderProperField()}
        </Box>
    )
}

export default DynamicField
