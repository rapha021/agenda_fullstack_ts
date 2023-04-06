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
} from "@chakra-ui/react";
import { useMain } from "../../contexts/mainContext/mainContext";
import { useAuth } from "../../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, onOpen, setTabs } = useMain();
  const { setAuthenticated } = useAuth();

  const navigate = useNavigate();

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
          <ButtonGroup
            flexWrap="wrap"
            justifyContent="center"
            maxW="260px"
            h="95px"
          >
            <Button
              variant="solid"
              onClick={() => {
                setTabs("editUser");
                onOpen();
              }}
            >
              Editar perfil
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTabs("deleteUser");
                onOpen();
              }}
            >
              Deletar conta
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.localStorage.removeItem("@agenda:token");
                setAuthenticated.off();
                window.location.reload();
              }}
            >
              Sair
            </Button>
          </ButtonGroup>
        </CardFooter>
      </CardBody>
    </Card>
  );
};
