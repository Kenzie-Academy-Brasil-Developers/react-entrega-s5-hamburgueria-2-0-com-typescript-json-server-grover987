import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export const HeaderInput = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleClick = () => console.log(value)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        placeholder="Search Item"
        value={value}
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button
          colorScheme="whatsapp"
          h="1.75rem"
          size="sm"
          onClick={handleClick}
        >
          <Icon as={FaSearch} />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
