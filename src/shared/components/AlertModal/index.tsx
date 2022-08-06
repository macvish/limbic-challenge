import React, { forwardRef, useImperativeHandle, useRef } from "react"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react"

interface Props {
    title?: string
    message: string
    onOk?: () => void
    okText?: string
    cancelText?: string
    showCancelButton?: boolean
    isOpen: boolean
    onClose: () => void
}

const AlertModal: React.FC<Props> = ({ cancelText, isOpen, message, onClose, onOk, okText, showCancelButton, title }, ref) => {
    const cancelRef = useRef(null)

    return <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {title}
                </AlertDialogHeader>

                <AlertDialogBody>
                    {message}
                </AlertDialogBody>

                <AlertDialogFooter>
                    {showCancelButton && <Button ref={cancelRef} onClick={onClose}>
                        {cancelText ?? 'Cancel'}
                    </Button>}
                    <Button colorScheme='red' onClick={onOk} ml={3}>
                        {okText ?? 'Ok'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
}

export default AlertModal
