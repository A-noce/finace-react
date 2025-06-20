import { makeService } from "@components/makeService/makeService";
import { User, UserResponse } from "@typing/user.type";
import { parseResponseData } from "@utils/parseResponseData";

export const authService = makeService('/auth', ({ get, post }) => {
    const login = async (request: User) => {
        const { response } = post<User>('/login', request)
        return response.then(parseResponseData)
    }

    const singUp = async (request: User) => {
        const { response } = post<UserResponse>('/sign-up', request)
        return response.then(parseResponseData)
    }

    const session = async () => {
        const { response } = get<User>('/session')
        return response.then(parseResponseData)
    }
    
        const logout = async () => {
        const { response } = post<void>('/logout')
        return response.then(parseResponseData)
    }
    return {
        login,
        singUp,
        session,
        logout
    }
})