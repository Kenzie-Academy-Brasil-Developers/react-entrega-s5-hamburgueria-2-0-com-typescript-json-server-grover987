import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

interface ModalCartProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const { cart, loadCart, removeCart } = useCart()
  const { user, accessToken } = useAuth()

  const handleDelete = (product: any) => {
    removeCart(product, accessToken)
    loadCart(user, accessToken)
  }

  const finishCart = () => {
    cart.forEach(item => removeCart(item, accessToken))
    loadCart(user, accessToken)
    onClose()
  }

  useEffect(() => {
    loadCart(user, accessToken)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="feed.201">
          Your Cart
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Box w="100%" fontWeight="bold" fontSize="lg">
              {cart.map(product => (
                <Flex
                  width="100%"
                  dir="column"
                  justifyContent="space-around"
                  key={product.name}
                >
                  <HStack spacing="8">
                    <Image w="32px" src={product.imgUrl} />
                    <Text>{product.name}</Text>
                    <Text>${product.price}</Text>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(product)}
                    >
                      X
                    </Button>
                  </HStack>
                </Flex>
              ))}
            </Box>
            <Text>
              Total:{' '}
              {
                (cart
                  .map(product => product.price)
                  .reduce((acc, cur: number) => acc + cur),
                0)
              }
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={finishCart}>
            Finish Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
