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

export const AddModal = () => {
  const { loading, handleCreateContact } = useMain()
  return (
    <>
      <ModalHeader>Adicionar contato na agenda</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleCreateContact}>
        <ModalBody>
          <FormControl>
            <FormLabel>Nome completo:</FormLabel>
            <Input type="text" id="name" />
          </FormControl>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input type="email" id="email" />
          </FormControl>

          <FormControl>
            <FormLabel>Número:</FormLabel>
            <Input type="number" id="number" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="whatsapp" type="submit" isLoading={loading}>
            Salvar
          </Button>
        </ModalFooter>
      </form>
    </>
  )
}
