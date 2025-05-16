import { makeService } from "@components/makeService/makeService";
import { Paginated, PaginatedFilter } from "@typing/generic";
import { FormFilterTransaction, TransactionRequest, TransactionResponse } from "@typing/transaction.type";
import { parseResponseData } from "@utils/parseResponseData";

export const transactionService = makeService('/transaction', ({ get, post, patch }) => {
    const filterTransaction = async (filter: PaginatedFilter<FormFilterTransaction>) => {
        const { response } = get<Paginated<TransactionResponse>>('/filter', filter)
        return response.then(parseResponseData)
    }

    const getTransaction = async (id: number | string) => {
        const { response } = get<TransactionResponse>(`/${id}`)
        return response.then(parseResponseData)
    }

    const createTransaction = async (form: TransactionRequest) => {
        const { response } = post<TransactionResponse>('', form)
        return response.then(parseResponseData)
    }

    const updateTransaction = async (id: number | string, form: Partial<TransactionRequest>) => {
        const { response } = patch<TransactionResponse>(`/${id}`, form)
        return response.then(parseResponseData)
    }

    return {
        filterTransaction,
        getTransaction,
        createTransaction,
        updateTransaction
        
    }
})