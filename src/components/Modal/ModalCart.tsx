import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useCart } from '../../contexts/CartContext'

interface ModalCartProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const { cart } = useCart()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="feed.404">
          AAAAAHHHHHHHhh!!!!
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Text fontWeight="bold" fontSize="lg">
              Produtos Aqui
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={onClose}>
            Try Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
