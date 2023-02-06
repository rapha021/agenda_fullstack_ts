import { useBoolean, useDisclosure, useToast } from "@chakra-ui/react"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import { IContact, IContactEdit } from "../interface/contacts.interface"
import {
  IUser,
  IUserLogin,
  IUserLoginCreate,
  IUserLoginResponse,
} from "../interface/user.interface"
import { api } from "../services/axios"

interface IMain {
  handleLogin: (e: any) => Promise<void>
  loading: boolean
  setLoading: IBoolean
  handleRegister: (e: any) => Promise<void>
  error: boolean
  setError: IBoolean
  contacts: IContact[]
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  handleEditContact: (e: any, user: boolean) => Promise<void>
  setContactId: React.Dispatch<React.SetStateAction<string>>
  tabs: string
  setTabs: React.Dispatch<React.SetStateAction<string>>
  handleDelete: (e: any) => Promise<void>
  user: IUser
  handleEditUser: (e: any) => Promise<void>
  handleCreateContact: (e: any) => Promise<void>
}

interface IBoolean {
  on: () => void
  off: () => void
  toggle: () => void
}

interface IMainProviderProps {
  children: ReactNode
}

export const mainContext = createContext<IMain>({} as IMain)

const MainProvider = ({ children }: IMainProviderProps) => {
  const [loading, setLoading] = useBoolean()
  const [error, setError] = useBoolean()
  const [authenticated, setAuthenticated] = useBoolean()

  const [contacts, setContacts] = useState<IContact[]>([] as IContact[])
  const [token, setToken] = useState<string>()
  const [contactId, setContactId] = useState<string>("")
  const [tabs, setTabs] = useState<string>("edit")
  const [user, setUser] = useState<IUser>({} as IUser)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top-right",
  })
  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const data = {
      email,
      password,
    }

    setLoading.on()

    await api
      .post<IUserLoginResponse>("/user/login", data)
      .then((res) => {
        setLoading.off()
        localStorage.setItem("@agenda:token", res.data.token)
        setAuthenticated.on()
      })
      .catch((err) => {
        setLoading.off()
      })
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()

    if (e.target.password.value !== e.target.repassword.value) {
      return setError.on()
    }

    setError.off()

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      number: e.target.number.value,
    }

    setLoading.on()

    await api.post<IUserLoginCreate>("/user", data).then((res) => {
      toast({
        title: "Conta criada com sucesso!",
        description: `Obrigado por usar nosso app, ${res.data.name}`,
        status: "success",
      })
      navigate("/login")
      setLoading.off()
    })
  }

  const handleEditContact = async (e: any, user?: boolean) => {
    e.preventDefault()

    const data: IContactEdit = {} as IContactEdit

    if (e.target.name.value.length > 0) {
      data["name"] = e.target.name.value
    }

    if (e.target.email.value.length > 0) {
      data["email"] = e.target.email.value
    }

    if (e.target.number.value.length > 0) {
      data["number"] = e.target.number.value
    }

    setLoading.on()

    await api
      .patch(!user ? `/contact/${contactId}` : "/user", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        onClose()
        toast({
          title: !user
            ? "Contato editado com sucesso!"
            : "Perfil editado com sucesso!",
          description: `${res.data.name} foi editado(a) com sucesso`,
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

  const handleEditUser = async (e: any) => {
    handleEditContact(e, true)
  }

  const handleDelete = async (e: any) => {
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

  const handleCreateContact = async (e: any) => {
    e.preventDefault()

    const data: IContactEdit = {} as IContactEdit

    if (e.target.name.value.length > 0) {
      data["name"] = e.target.name.value
    }

    if (e.target.email.value.length > 0) {
      data["email"] = e.target.email.value
    }

    if (e.target.number.value.length > 0) {
      data["number"] = e.target.number.value
    }

    console.log(data)
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

  useEffect(() => {
    const tokenStorage = window.localStorage.getItem("@agenda:token")

    if (tokenStorage) {
      setAuthenticated.on()
      navigate("/dashboard")
      return setToken(tokenStorage)
    }

    return setAuthenticated.off()
  }, [authenticated])

  useEffect(() => {
    if (authenticated) {
      api
        .get<IContact[]>("/contact", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setContacts(res.data)
        })

      api
        .get<IUser>("/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data)
        })
    }
  }, [token, authenticated, loading])

  return (
    <mainContext.Provider
      value={{
        handleLogin,
        loading,
        setLoading,
        handleRegister,
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
        handleDelete,
        user,
        handleEditUser,
        handleCreateContact,
      }}
    >
      {children}
    </mainContext.Provider>
  )
}

export const useMain = () => useContext(mainContext)

export default MainProvider
