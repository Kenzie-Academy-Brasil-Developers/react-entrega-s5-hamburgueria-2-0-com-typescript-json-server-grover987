import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react'
import logo from '../../assets/saberBorgarLogo.png'
import { Input } from '../../components/Form/input'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import alter from '../../assets/alter.jpg'
import { useAuth } from '../../contexts/AuthContext'

const signInSchema = yup.object().shape({
  email: yup.string().required('Must have a Name').email('Invalid e-mail'),
  password: yup.string().required('Must have a password')
})

type SignInData = {
  [key: string]: string
}

export const Login = () => {
  const { signIn, user } = useAuth()

  console.log(user)

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const handleSignIn = ({ email, password }: SignInData) => {
    signIn({ email, password })
  }

  return (
    <Flex
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      textAlign="center"
      padding={['10px 15px', '10px 15px', '0', '0']}
      h={['auto', 'auto', '100vh', '100vh']}
      background="white"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
    >
      <Flex
        w={['100%', '100%', '90%', '70%']}
        flexDir={['column', 'column', 'row', 'row']}
        alignItems="center"
        justifyContent="center"
      >
        <Grid w={['100%', '100%', '50%', '50%']}>
          <Image w="80%" margin="0 auto" src={logo} alt="Logo" />
          <Heading mt="2" fontSize={['10', '10', '20', '20']} as="h1">
            Life is like a sandwich and you have to fill it with the best
            ingredients.
          </Heading>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handleSignIn)}
          as="form"
          margin="4"
          w={['100%', '100%', '50%', '50%']}
          padding="30px 15px"
          border="3px solid black"
          bg="white"
          backgroundImage={alter}
          bgRepeat="no-repeat"
          color="gray.600"
          textAlign="left"
        >
          <Heading size="3">Login</Heading>
          <VStack spacing="5" mt="5">
            <Box w="100%">
              <Input
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </Box>
            <Input
              label="Password"
              type="password"
              error={errors.password}
              {...register('password')}
            />
            <Button
              mt="4"
              bg="primary.100"
              w="100%"
              color="white"
              h="60px"
              borderRadius="10px"
              _hover={{ bg: 'primary.200' }}
              type="submit"
            >
              SignIn
            </Button>

            <Button
              bg="gray.100"
              w="100%"
              color="gray.300"
              h="60px"
              borderRadius="10px"
              _hover={{ bg: 'gray.300', color: 'gray.100' }}
            >
              SignUp
            </Button>
            <Text color="gray.600">
              Create your account to taste many delights and satisfy your
              hunger!
            </Text>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  )
}
