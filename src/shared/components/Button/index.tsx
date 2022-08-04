import React from 'react'
import { Button as CUButton, ButtonProps, Text } from '@chakra-ui/react'

interface Props extends ButtonProps {
    title?: string
}

const Button: React.FC<Props> = ({ backgroundColor, bgColor, children, className, color, title, ...props }) => {
    return <CUButton
        {...props}
        className={``}
        bgColor={bgColor ?? backgroundColor ?? '#6A6983'}
    >
        {title ? <Text color={color ?? 'white'}>{title}</Text> : (children)}
    </CUButton>
}

export default Button
