import { TransactionPeriodEnum, WeekdaysEnum } from "./enums";
import { TagResponse } from "./tag.type";

export interface Transaction {
  title: string;
  description: string;
  periodicity: TransactionPeriodEnum;
  periodValue: string | WeekdaysEnum[];
  value: number;
  inputTagList: TagResponse[];
  outputTagList: TagResponse[];
}

export interface TransactionResponse extends Transaction {
  id: number;
  createdAt: string;
}
export interface FormTransaction
  extends Omit<Transaction, "inputTagList" | "outputTagList"> {
  listInputTagId: number[];
  listOutputTagId: number[];
}

export interface TransactionRequest extends Omit<FormTransaction, 'periodValue'> {
  userId: number;
  periodValue: string
}

export interface FormFilterTransaction
  extends Omit<FormTransaction, "periodValue" | "periodicity" | "value"> {
  periodicity?: TransactionPeriodEnum[];
  startDate?: string;
  endDate?: string;
  minimumValue?: number;
  maximumValue?: number;
}

export const periodicityEnumToString: Record<TransactionPeriodEnum, string> = {
  [TransactionPeriodEnum.NONE]: "None",
  [TransactionPeriodEnum.MONTHLY]: "Monthly",
  [TransactionPeriodEnum.WEEKLY]: "Weekly",
};

export const weekdayEnumToString: Record<WeekdaysEnum, string> = {
  [WeekdaysEnum.SUNDAY]: "Sunday",
  [WeekdaysEnum.MONDAY]: "Monday",
  [WeekdaysEnum.TUESDAY]: "Tuesday",
  [WeekdaysEnum.WEDNESDAY]: "Wednesday",
  [WeekdaysEnum.THUSRDAY]: "Thusrday",
  [WeekdaysEnum.FRIDAY]: "Friday",
  [WeekdaysEnum.SATURDAY]: "Saturday",
};
