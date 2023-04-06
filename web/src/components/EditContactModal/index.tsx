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
import { useForm } from "react-hook-form"
import { useMain } from "../../contexts/mainContext/mainContext"

export const EditModal = () => {
  const {
    isOpen,
    onOpen,
    onClose,
    handleEditContact,
    loading,
    handleEditUser,
  } = useMain()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <ModalHeader>Editar contato</ModalHeader>
      <ModalCloseButton />

      <form onSubmit={handleSubmit(handleEditContact)}>
        <ModalBody>
          <FormControl>
            <FormLabel>Novo nome:</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>

          <FormControl>
            <FormLabel>Novo email:</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>

          <FormControl>
            <FormLabel>Novo número:</FormLabel>
            <Input type="number" {...register("number")} />
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
