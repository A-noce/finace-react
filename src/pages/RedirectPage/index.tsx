import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface RedirectPageProps {
    redirectUrl: string
}

const RedirectPage = ({ redirectUrl }: RedirectPageProps) => {
    const navigate = useNavigate()

    useEffect(() => {
            navigate(redirectUrl)
    },[redirectUrl])

    return null
}

export default RedirectPage