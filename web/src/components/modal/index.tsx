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
import { AddModal } from "../AddModal"
import { DeleteModal } from "../DeleteContactModal"
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
          <DeleteModal />
        ) : tabs === "editUser" ? (
          <EditUserModal />
        ) : (
          <AddModal />
        )}
      </ModalContent>
    </Modal>
  )
}
