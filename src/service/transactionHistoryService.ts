import { makeService } from "@components/makeService/makeService";
import { Paginated, PaginatedFilter } from "@typing/generic";
import { FormFilterTransactionHistory, generateTransactionHistoryRequest, TransactionHistoryRequest, TransactionHistoryResponse } from "@typing/transaction-history.type";
import { parseResponseData } from "@utils/parseResponseData";

export const transactionHistoryService = makeService('/transaction-history', ({ get, post, patch }) => {
    const filterTransaction = async (filter: PaginatedFilter<FormFilterTransactionHistory>) => {
        const { response } = get<Paginated<TransactionHistoryResponse
        >>('/filter', filter)
        return response.then(parseResponseData)
    }

    const generateTransaction = async (request: generateTransactionHistoryRequest) => {
        const { response } = post<Paginated<TransactionHistoryResponse
        >>('/generate', request)
        return response.then(parseResponseData)
    }

    const getTransaction = async (id: number | string) => {
        const { response } = get<TransactionHistoryResponse>(`/${id}`)
        return response.then(parseResponseData)
    }

    const createTransaction = async (form: TransactionHistoryRequest) => {
        const { response } = post<TransactionHistoryResponse>('', form)
        return response.then(parseResponseData)
    }

    const updateTransaction = async (id: number | string, form: Partial<TransactionHistoryRequest>) => {
        const { response } = patch<TransactionHistoryResponse>(`/${id}`, form)
        return response.then(parseResponseData)
    }

    return {
        filterTransaction,
        getTransaction,
        createTransaction,
        updateTransaction,
        generateTransaction
        
    }
})