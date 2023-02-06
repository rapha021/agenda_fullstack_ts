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
import { AddModal } from "../AddModal"
import { DeleteContactModal } from "../DeleteContactModal"
import { DeleteUserModal } from "../DeleteUserModal"
import { EditModal } from "../EditContactModal"
import { EditUserModal } from "../EditUserModal"

export const ModalDashboard = () => {
  const { isOpen, onClose, tabs } = useMain()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        {tabs === "edit" ? (
          <EditModal />
        ) : tabs === "delete" ? (
          <DeleteContactModal />
        ) : tabs === "editUser" ? (
          <EditUserModal />
        ) : tabs === "deleteUser" ? (
          <DeleteUserModal />
        ) : (
          <AddModal />
        )}
      </ModalContent>
    </Modal>
  )
}
