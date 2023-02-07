import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Box,
  Stack,
  StackDivider,
  Avatar,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react"
import { useMain } from "../../contexts/mainContext/mainContext"
import { useAuth } from "../../contexts/authContext/authContext"

export const Profile = () => {
  const { user, onOpen, setTabs } = useMain()
  const { setAuthenticated } = useAuth()
  return (
    <Card>
      <CardHeader pb="0">
        <Heading size="md">Meu perfil</Heading>
      </CardHeader>

      <CardBody>
        <Flex justifyContent="center" pb="20px">
          <Avatar name={user.name} size="xl" />
        </Flex>

        <Stack divider={<StackDivider />}>
          <Box display="flex" flexDir="row" alignItems="center" gap="5px">
            <Heading size="sm">Nome:</Heading>
            <Text>{user.name}</Text>
          </Box>

          <Box display="flex" flexDir="row" alignItems="center" gap="5px">
            <Heading size="sm">Email:</Heading>
            <Text>{user.email}</Text>
          </Box>

          <Box display="flex" flexDir="row" alignItems="center" gap="5px">
            <Heading size="sm">Número:</Heading>
            <Text>{user.number}</Text>
          </Box>
        </Stack>

        <CardFooter>
          <ButtonGroup>
            <Button
              variant="solid"
              onClick={() => {
                setTabs("editUser")
                onOpen()
              }}
            >
              Editar perfil
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTabs("deleteUser")
                onOpen()
              }}
            >
              Deletar conta
            </Button>
          </ButtonGroup>
          <Button
            variant="outline"
            onClick={() => {
              window.localStorage.removeItem("@agenda:token")
              setAuthenticated.off()
            }}
          >
            Sair
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  )
}
