import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useMain } from "../../contexts/mainContext"
import { Form } from "./style"

export const LoginPage = () => {
  const [password, setPassword] = useState(true)

  const { handleLogin, loading } = useMain()

  const handleClick = () => setPassword(!password)

  return (
    <Flex justifyContent="center">
      <Form onSubmit={handleLogin}>
        <FormControl isRequired>
          <FormLabel>Seu email:</FormLabel>
          <Input type="email" id="email" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sua senha:</FormLabel>

          <InputGroup size="md">
            <Input type={password ? "password" : "text"} id="password" />

            <InputRightElement w="90px">
              <Button size="sm" onClick={handleClick}>
                {password ? "Mostrar" : "Ocultar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Flex justifyContent="space-between">
          <Text>Não tem uma conta ainda?</Text>

          <Link to="/register">
            <Button variant="link">Cadastre-se</Button>
          </Link>
        </Flex>

        <Button type="submit" w="100%" isLoading={loading}>
          Logar
        </Button>
      </Form>
    </Flex>
  )
}
