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
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/authContext/authContext"
import { useMain } from "../../contexts/mainContext/mainContext"
import { Form } from "./style"

export const LoginPage = () => {
  const [password, setPassword] = useState(true)

  const { loading } = useMain()

  const { handleLogin } = useAuth()

  const handleClick = () => setPassword(!password)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Flex justifyContent="center">
      <Form onSubmit={handleSubmit(handleLogin)}>
        <FormControl isRequired>
          <FormLabel>Seu email:</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sua senha:</FormLabel>

          <InputGroup size="md">
            <Input
              type={password ? "password" : "text"}
              {...register("password")}
            />

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
