import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import { useMain } from "../../contexts/mainContext"

export const EditModal = () => {
  const {
    isOpen,
    onOpen,
    onClose,
    handleEditContact,
    loading,
    handleEditUser,
  } = useMain()

  return (
    <>
      <ModalHeader>Editar contato</ModalHeader>
      <ModalCloseButton />

      <ModalBody as="form" onSubmit={handleEditContact}>
        <FormControl>
          <FormLabel>Novo nome:</FormLabel>
          <Input type="text" id="name" />
        </FormControl>

        <FormControl>
          <FormLabel>Novo email:</FormLabel>
          <Input type="email" id="email" />
        </FormControl>

        <FormControl>
          <FormLabel>Novo número:</FormLabel>
          <Input type="number" id="number" />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="whatsapp" type="submit" isLoading={loading}>
          Salvar
        </Button>
      </ModalFooter>
    </>
  )
}
