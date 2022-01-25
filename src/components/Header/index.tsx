import { Box, Center, Flex, Icon, Image, useDisclosure } from '@chakra-ui/react'
import logo from '../../assets/saberBorgarLogo.png'
import { useAuth } from '../../contexts/AuthContext'
import { FaSignOutAlt, FaShoppingCart, FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SearchBox } from '../Form/SearchBox'
import { ModalCart } from '../Modal/ModalCart'

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

  const {
    isOpen: isModalCartOpen,
    onOpen: onModalCartOpen,
    onClose: onModalCartClose
  } = useDisclosure()

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      h="80px"
      w="100%"
      padding="5"
      bg="gray.50"
      marginBottom="8"
    >
      <Image maxH="50px" src={logo} />
      <ModalCart
        isOpen={isModalCartOpen}
        onClose={onModalCartClose}
        mess="oi"
      />

      <Center>
        {isDesktop ? (
          <SearchBox />
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
          <Box
            as="button"
            color="gray.100"
            _hover={{ color: 'gray.300' }}
            cursor="pointer"
            mr="4"
            ml="4"
            onClick={onModalCartOpen}
          >
            <FaShoppingCart size="38px" />
          </Box>
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
