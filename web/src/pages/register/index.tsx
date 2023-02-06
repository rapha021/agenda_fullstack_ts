import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useMain } from "../../contexts/mainContext"
import { Form } from "../login/style"

export const RegisterPage = () => {
  const [password, setPassword] = useState("")

  const { loading, handleRegister, error } = useMain()

  return (
    <Flex justifyContent="center">
      <Form onSubmit={handleRegister}>
        <FormControl isRequired>
          <FormLabel>Seu nome:</FormLabel>
          <Input type="text" id="name" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Seu email:</FormLabel>
          <Input type="email" id="email" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Seu número:</FormLabel>
          <Input type="number" id="number" />
        </FormControl>

        <FormControl isRequired isInvalid={error}>
          <FormLabel>Digite uma senha:</FormLabel>
          <Input type="password" id="password" />
          <FormErrorMessage>Senha não estão iguais.</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={error}>
          <FormLabel>Repita a senha:</FormLabel>
          <Input type="password" id="repassword" />
          <FormErrorMessage>Senha não estão iguais.</FormErrorMessage>
        </FormControl>

        <Flex justifyContent="space-between">
          <Text>Já tem uma conta?</Text>

          <Link to="/register">
            <Button variant="link">Ir para login</Button>
          </Link>
        </Flex>

        <Button type="submit" w="100%" isLoading={loading}>
          Logar
        </Button>
      </Form>
    </Flex>
  )
}
