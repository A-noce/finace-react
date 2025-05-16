import { makeService } from "@components/makeService/makeService";
import { LoginResponse, User, UserResponse } from "@typing/user.type";
import { parseResponseData } from "@utils/parseResponseData";

export const authService = makeService('/auth', ({ get, post }) => {
    const login = async (request: User) => {
        const { response } = post<LoginResponse>('/login', request)
        return response.then(parseResponseData)
    }

    const singUp = async (request: User) => {
        const { response } = post<UserResponse>('/sign-up', request)
        return response.then(parseResponseData)
    }

    const session = async () => {
        const { response } = get('/session')
        return response.then(parseResponseData)
    }
    
    return {
        login,
        singUp,
        session
    }
})