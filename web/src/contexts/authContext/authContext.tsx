import { useBoolean, useToast } from "@chakra-ui/react"
import { createContext, useContext, useEffect, useState } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IContact } from "../../interface/contacts.interface"
import {
  IUserLoginResponse,
  IUserLoginCreate,
  IUser,
} from "../../interface/user.interface"
import { api } from "../../services/axios"
import { IAuthContext, IAuthProps } from "./auth.interfaces"

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider = ({ children }: IAuthProps) => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [contacts, setContacts] = useState<IContact[]>([] as IContact[])
  const [token, setToken] = useState<string>()

  const [loading, setLoading] = useBoolean()
  const [authenticated, setAuthenticated] = useBoolean()
  const [error, setError] = useBoolean()

  const toast = useToast({
    position: "top-right",
    duration: 3000,
  })
  const navigate = useNavigate()

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    setLoading.on()

    await api
      .post<IUserLoginResponse>("/user/login", data)
      .then((res) => {
        setLoading.off()
        localStorage.setItem("@agenda:token", res.data.token)
        setAuthenticated.on()
        navigate("/dashboard")
      })
      .catch((err) => {
        setLoading.off()
      })
  }

  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.repassword) {
      return setError.on()
    }

    setError.off()

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
      navigate("/dashboard")
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
    navigate("/login")
  }, [token, authenticated, loading])

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        loading,
        setLoading,
        error,
        setError,
        authenticated,
        setAuthenticated,
        user,
        setUser,
        contacts,
        setContacts,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
