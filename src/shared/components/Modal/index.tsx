import React from "react"
import {
    Button,
    Modal as CUModal,
    ModalProps,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"

interface Props extends ModalProps {
    title?: string
    onOk?: () => void
    okText?: string
    cancelText?: string
    showCancelButton?: boolean
    onClose: () => void
    hideOkButton?: boolean
}

const Modal: React.FC<Props> = ({ cancelText, children, hideOkButton, isOpen, onClose, okText, onOk, showCancelButton, title, ...props }) => {

    return <CUModal {...props} scrollBehavior={ props.scrollBehavior ?? "inside"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children}
            </ModalBody>

            <ModalFooter>
                {!hideOkButton && <Button
                    colorScheme='blue'
                    mr={3}
                    onClick={onOk}
                >
                    {okText ?? 'Ok'}
                </Button>}
                {showCancelButton && <Button
                    onClick={onClose}
                >
                    {cancelText ?? 'Cancel'}
                </Button>}
            </ModalFooter>
        </ModalContent>
    </CUModal>
}

export default Modal
