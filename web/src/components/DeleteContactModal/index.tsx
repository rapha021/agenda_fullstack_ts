import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react"
import { useMain } from "../../contexts/mainContext"

export const DeleteModal = () => {
  const { isOpen, onOpen, onClose, handleEdit, loading, handleDelete } =
    useMain()

  return (
    <>
      <ModalHeader>Deletar contato</ModalHeader>
      <ModalCloseButton />

      <ModalBody as="form" onSubmit={handleEdit}>
        <Text>Tem certeza que quer deletar esse contato?</Text>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button colorScheme="whatsapp" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={handleDelete} isLoading={loading}>
            Deletar
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  )
}
