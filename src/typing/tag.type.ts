export interface Tag {
    name: string
    color: string
    description: string
    userCreatorId: number
}

export interface TagResponse extends Tag {
    id: number
    createdAt: string
}

export interface FormFilterTag extends Partial<Tag> {
    startDate?: string
    endDate?: string
}

export type FormTag = Omit<Tag, 'userCreatorId'>