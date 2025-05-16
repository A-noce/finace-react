import useFormElement from "@components/form/CustomFormElements/useFormElement"
import { FormLogin } from "./type"
import { z } from "zod"
import { authService } from "@service/authService"
import configStore from "@store/configStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userStore from "@store/userStore"

export const useLogin = () => {
    const { login } = authService()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const setSnackProps = configStore.actions.setSnackProps
    const setLogged = userStore.actions.setLogged
        const {handleSubmit, watch, ...methods} = useFormElement<FormLogin>({
        defaultValues: { email: '', password: ''},
        validation: z.object({
            email: z.string().min(1, 'Campo obrigatório'),
            password: z.string().min(1, 'Campo obrigatório'),
        })
    })

    const submit = async (form: FormLogin) => {
      setIsLoading(true)
        const response = await login(form)
        if(response.success){
          setLogged(true)
            setSnackProps('Logado com sucesso', 'success')
            navigate('/home')
            return
        }
        setSnackProps('Usuário ou senha errado', 'error')
          setIsLoading(false)
    }

    const isValid = Object.values(watch()).every(Boolean)

    return {
        ...methods,
        handleSubmit: handleSubmit(submit),
        isLoading,
        isValid
    }
}