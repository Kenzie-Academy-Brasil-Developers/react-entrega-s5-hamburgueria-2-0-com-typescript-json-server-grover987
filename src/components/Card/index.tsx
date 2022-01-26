import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

interface ProductData {
  productId: number
  name: string
  category: string
  imgUrl: string
  price: number
  userId: number
}

export const Card = ({ product }: any) => {
  const { addCart, loadCart, getTotal, cart } = useCart()
  const { user, accessToken } = useAuth()

  const handleAddCart = () => {
    const newProduct = { ...product, userId: user.id }
    addCart(newProduct, accessToken)
  }

  return (
    <Box
      alignItems="center"
      margin={['2', '3']}
      minW="230px"
      maxW="230px"
      h="310px"
      border="2px"
      bgColor="white"
      borderColor="gray.100"
      borderStyle="solid"
      _hover={{ borderColor: 'primary.100' }}
      boxShadow="lg"
    >
      <Image margin="0" h="150px" w="100%" src={product.imgUrl} />
      <VStack textAlign="center" mt="3" spacing="14px">
        <Text fontSize="18px" color="gray.600" fontWeight="bold" as="h3">
          {product.name}
        </Text>
        <Text color="#27AE60" fontSize="14px">
          $ {Intl.NumberFormat('us-EN').format(product.price)}
        </Text>
        <Button
          color="white"
          background="#BDBDBD"
          _hover={{ background: 'primary.100' }}
          w="106px"
          h="40px"
          onClick={handleAddCart}
        >
          Add
        </Button>
      </VStack>
    </Box>
  )
}
