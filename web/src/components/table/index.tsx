import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/react"
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useMain } from "../../contexts/mainContext"
import { IContact } from "../../interface/contacts.interface"

export const ContactsTable = () => {
  const { contacts, onOpen, setContactId, setTabs } = useMain()

  return (
    <TableContainer>
      <Flex justify="flex-end">
        <IconButton
          size="sm"
          aria-label="delete contact"
          icon={<AddIcon />}
          onClick={() => {
            setTabs("add")
            onOpen()
          }}
        />
      </Flex>
      <Table size="sm">
        <TableCaption>
          {contacts.length > 0 ? "Seus Contatos" : "Sem Contatos"}
        </TableCaption>

        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Número</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {contacts.length > 0 &&
            contacts.map((contact: IContact) => (
              <Tr key={contact.id}>
                <Td>{contact.name}</Td>
                <Td>{contact.email}</Td>
                <Td isNumeric>{contact.number}</Td>
                <Td>
                  <Flex gap="10px">
                    <IconButton
                      size="sm"
                      aria-label="edit contact"
                      icon={<EditIcon />}
                      onClick={() => {
                        setTabs("edit")
                        onOpen()
                        setContactId(contact.id)
                      }}
                    />
                    <IconButton
                      size="sm"
                      aria-label="delete contact"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        setTabs("delete")
                        onOpen()
                        setContactId(contact.id)
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
