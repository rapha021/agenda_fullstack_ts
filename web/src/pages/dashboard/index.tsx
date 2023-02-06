import { Flex } from "@chakra-ui/react"
import { ModalDashboard } from "../../components/modal"
import { ContactsTable } from "../../components/table"
import { Profile } from "../../components/profile"

export const Dashboard = () => {
  return (
    <>
      <Flex w="90%" gap="30px" justifyContent="space-evenly" wrap="wrap">
        <Profile />
        <ContactsTable />
      </Flex>
      <ModalDashboard />
    </>
  )
}
