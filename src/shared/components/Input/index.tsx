import React from 'react'
import {
    Input as CUInput,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputElementProps,
    InputProps,
    InputRightAddon,
    InputRightElement
} from '@chakra-ui/react'

interface Props extends InputProps {
    leftElement?: React.ReactElement
    leftElementProps?: InputElementProps
    rightElementProps?: InputElementProps
    leftAddon?: string
    rightElement?: React.ReactElement
    rightAddon?: string
    onChangeText: (text: string) => void
}

const Input: React.FC<Props> = ({
    leftAddon,
    leftElement,
    leftElementProps,
    rightAddon,
    rightElement,
    rightElementProps,
    onChangeText,
    ...props
}) => {
    return <>
        <InputGroup>
            {leftElement ? <InputLeftElement {...leftElementProps} children={leftElement} /> : null}
            {leftAddon ? <InputLeftAddon children={leftAddon} /> : null}
            <CUInput
                {...props}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeText?.(event.target.value)}
            />
            {rightElement ? <InputRightElement {...rightElementProps} children={rightElement} /> : null}
            {rightAddon ? <InputRightAddon children={rightAddon} /> : null}
        </InputGroup>
    </>
}

export default Input
