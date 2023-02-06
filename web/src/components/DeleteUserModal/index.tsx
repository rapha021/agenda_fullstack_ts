import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ButtonGroup,
  Heading,
} from "@chakra-ui/react"
import { useMain } from "../../contexts/mainContext/mainContext"

export const DeleteUserModal = () => {
  const { onClose, loading, handleDeleteUser } = useMain()

  return (
    <>
      <ModalHeader>Deletar Perfil</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleDeleteUser}>
        <ModalBody>
          <Heading size="md">Tem certeza que quer deletar sua conta?</Heading>
          <Text color="red" fontWeight="bold">
            Todos os seus dados serão perdidos!
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button colorScheme="whatsapp" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" type="submit" isLoading={loading}>
              Deletar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </form>
    </>
  )
}
