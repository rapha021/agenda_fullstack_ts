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
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/authContext/authContext"
import { useMain } from "../../contexts/mainContext/mainContext"
import { Form } from "../login/style"

export const RegisterPage = () => {
  const [password, setPassword] = useState("")

  const { handleRegister, loading, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <Flex justifyContent="center">
      <Form onSubmit={handleSubmit(handleRegister)}>
        <FormControl isRequired>
          <FormLabel>Seu nome:</FormLabel>
          <Input type="text" {...register("name")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Seu email:</FormLabel>
          <Input type="email" {...register("email")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Seu número:</FormLabel>
          <Input type="number" {...register("number")} />
        </FormControl>

        <FormControl isRequired isInvalid={error}>
          <FormLabel>Digite uma senha:</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>Senha não estão iguais.</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={error}>
          <FormLabel>Repita a senha:</FormLabel>
          <Input type="password" {...register("repassword")} />
          <FormErrorMessage>Senha não estão iguais.</FormErrorMessage>
        </FormControl>

        <Flex justifyContent="space-between">
          <Text>Já tem uma conta?</Text>

          <Link to="/login">
            <Button variant="link">Ir para login</Button>
          </Link>
        </Flex>

        <Button type="submit" w="100%" isLoading={loading}>
          Registrar
        </Button>
      </Form>
    </Flex>
  )
}
