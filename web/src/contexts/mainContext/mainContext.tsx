import { useDisclosure, useToast } from "@chakra-ui/react"
import { createContext, FormEvent, useContext, useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IContact, IContactEdit } from "../../interface/contacts.interface"
import { api } from "../../services/axios"
import { useAuth } from "../authContext/authContext"
import { IMain, IMainProviderProps } from "./main.interfaces"

export const mainContext = createContext<IMain>({} as IMain)

const MainProvider = ({ children }: IMainProviderProps) => {
  const { error, setError, loading, setLoading, contacts, user, token } =
    useAuth()

  const [contactId, setContactId] = useState<string>("")
  const [tabs, setTabs] = useState<string>("edit")

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top-right",
  })
  const navigate = useNavigate()

  const handleEditContact: SubmitHandler<FieldValues> = async (data) => {
    const dataResponse: IContactEdit = {} as IContactEdit

    if (data.name.length > 0) {
      dataResponse["name"] = data.name
    }

    if (data.email.length > 0) {
      dataResponse["email"] = data.email
    }

    if (data.number.length > 0) {
      dataResponse["number"] = data.number
    }

    setLoading.on()

    await api
      .patch(`/contact/${contactId}`, dataResponse, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        onClose()
        toast({
          title: "Contato editado com sucesso!",
          description: `${res.data.name} foi editado(a) com sucesso`,
        })
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: "Não foi possivel editar",
          description: "Tente novamente mais tarde.",
          status: "error",
        })
      })

    setLoading.off()
  }

  const handleEditUser: SubmitHandler<FieldValues> = async (data) => {
    const dataResponse: IContactEdit = {} as IContactEdit

    if (data.name.length > 0) {
      dataResponse["name"] = data.name
    }

    if (data.email.length > 0) {
      dataResponse["email"] = data.email
    }

    if (data.number.length > 0) {
      dataResponse["number"] = data.number
    }

    setLoading.on()

    await api
      .patch("/user", dataResponse, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        onClose()
        toast({
          title: "Perfil editado com sucesso!",
        })
      })
      .catch((err) => {
        toast({
          title: "Não foi possivel editar",
          description: "Tente novamente mais tarde.",
          status: "error",
        })
      })

    setLoading.off()
  }

  const handleDeleteContact = async (e: any) => {
    e.preventDefault()

    setLoading.on()

    await api
      .delete(`/contact/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast({
          title: "Contato deletado!",
          status: "success",
        })
        onClose()
      })

    setLoading.off()
  }

  const handleCreateContact: SubmitHandler<FieldValues> = async (data) => {
    const dataResponse: IContactEdit = {} as IContactEdit

    if (data.name.length > 0) {
      dataResponse["name"] = data.name
    }

    if (data.email.length > 0) {
      dataResponse["email"] = data.email
    }

    if (data.number.length > 0) {
      dataResponse["number"] = data.number
    }

    setLoading.on()

    await api
      .post<IContact>("/contact", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLoading.off()
        onClose()
        toast({
          title: "Novo contato criado!",
          description: `${res.data.name} foi adicionado(a) na agenda`,
        })
      })
  }

  const handleDeleteUser = async (e: FormEvent) => {
    e.preventDefault()

    await api
      .delete("/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        navigate("/login")
        toast({
          title: "Conta deletada!",
          status: "info",
        })
      })
  }

  return (
    <mainContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        contacts,
        isOpen,
        onClose,
        onOpen,
        handleEditContact,
        setContactId,
        tabs,
        setTabs,
        handleDeleteContact,
        user,
        handleEditUser,
        handleCreateContact,
        handleDeleteUser,
      }}
    >
      {children}
    </mainContext.Provider>
  )
}

export const useMain = () => useContext(mainContext)

export default MainProvider
