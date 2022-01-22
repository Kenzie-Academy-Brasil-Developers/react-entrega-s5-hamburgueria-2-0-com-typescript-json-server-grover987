import { Box, Center, Flex, Icon, Image } from '@chakra-ui/react'
import logo from '../../assets/saberBorgarLogo.png'
import { useAuth } from '../../contexts/AuthContext'
import { FaSignOutAlt, FaShoppingCart, FaSearch } from 'react-icons/fa'
import { HeaderInput } from './HeaderInput'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { signOut } = useAuth()

  const [isDesktop, setDesktop] = useState(window.innerWidth > 750)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 750)
  }

  const searchOpen = () => {
    setDesktop(true)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      h="80px"
      w="100%"
      bg="gray.50"
    >
      <Image maxH="50px" src={logo} />

      <Center>
        {isDesktop ? (
          <HeaderInput />
        ) : (
          <Icon
            color="gray.100"
            _hover={{ color: 'gray.300' }}
            cursor="pointer"
            mr="4"
            ml="4"
            w="8"
            h="8"
            as={FaSearch}
            onClick={searchOpen}
          />
        )}

        <Box>
          <Center
            w="15px"
            h="15px"
            fontSize="sm"
            borderRadius="5px"
            color="white"
            background="green.400"
            position="relative"
            left="10"
            top="3"
          >
            1
          </Center>
          <Icon
            color="gray.100"
            _hover={{ color: 'gray.300' }}
            cursor="pointer"
            mr="4"
            ml="4"
            w="8"
            h="8"
            as={FaShoppingCart}
          />
        </Box>

        <Icon
          onClick={signOut}
          color="gray.100"
          _hover={{ color: 'gray.300' }}
          cursor="pointer"
          mr="4"
          w="8"
          h="8"
          as={FaSignOutAlt}
        />
      </Center>
    </Flex>
  )
}
