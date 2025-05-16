import { makeService } from "@components/makeService/makeService";
import { Paginated, PaginatedFilter } from "@typing/generic";
import { FormFilterTag, Tag, TagResponse } from "@typing/tag.type";
import { parseResponseData } from "@utils/parseResponseData";

export const tagHistoryService = makeService('/tag', ({ get, patch  }) => {
    const filterTags = async (params?: PaginatedFilter<FormFilterTag>) => {
        const { response } = get<Paginated<TagResponse>>('/filter', params )
        return response.then(parseResponseData)
    }

    const getTag = async (id: number | string) => {
        const { response } = get<TagResponse>(`/${id}`)
        return response.then(parseResponseData)
    }

    const updateTag = async (id: string | number,tag: Partial<Tag>) => {
        const { response } = patch<TagResponse>(`/${id}`, tag)
        return response.then(parseResponseData)
    }
    
    return {
        filterTags,
        getTag,
        updateTag
    }
})