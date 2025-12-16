import { formatDate } from "@utils/dateUtils";

export interface Tag {
  name: string;
  color: string;
  description: string;
  userCreatorId: number;
}

export interface TagResponse extends Tag {
  id: number;
  createdAt: string;
}

export interface FormFilterTag extends Partial<Tag> {
  startDate?: string;
  endDate?: string;
}

export type FormTag = Omit<Tag, "userCreatorId">;

export const formFilterTagChipUtil: Record<
  string,
  {
    label: string;
    formater?: (value: FormFilterTag[keyof FormFilterTag]) => string;
  }
> = {
  color: { label: "Color" },
  description: { label: "Description" },
  endDate: { label: "End Date", formater: formatDate },
  startDate: { label: "Start Date", formater: formatDate },
};
