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

export const AddModal = () => {
  const { loading, handleCreateContact } = useMain()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <ModalHeader>Adicionar contato na agenda</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(handleCreateContact)}>
        <ModalBody>
          <FormControl>
            <FormLabel>Nome completo:</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>

          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>

          <FormControl>
            <FormLabel>Número:</FormLabel>
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
