import {
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  ButtonGroup,
} from "@chakra-ui/react"
import { useMain } from "../../contexts/mainContext/mainContext"

export const DeleteContactModal = () => {
  const { onClose, loading, handleDeleteContact } = useMain()

  return (
    <>
      <ModalHeader>Deletar contato</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleDeleteContact}>
        <ModalBody>
          <Text>Tem certeza que quer deletar esse contato?</Text>
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
