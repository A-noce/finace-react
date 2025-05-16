import { TagResponse } from "./tag.type";

export interface TransactionHistory {
  title: string;
  description: string;
  date: string;
  value: number;
  inputTagList: TagResponse[];
  outputTagList: TagResponse[];
}

export interface TransactionHistoryResponse extends TransactionHistory {
  id: number;
  createdAt: string;
}
export interface FormTransactionHistory
  extends Omit<TransactionHistory, "inputTagList" | "outputTagList"> {
  listInputTagId: number[];
  listOutputTagId: number[];
}

export interface TransactionHistoryRequest extends FormTransactionHistory {
  userId: number;
}

export interface FormFilterTransactionHistory
  extends Omit<
    TransactionHistory,
    "inputTagList" | "outputTagList" | "value" | "date"
  > {
  startDate?: string;
  endDate?: string;
  minimumValue?: number;
  maximumValue?: number;
}

export interface generateTransactionHistoryRequest {
  date: string;
  transactionId?: number;
}
