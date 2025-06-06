import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { SelectOptionProp } from "@components/input/CustomSelect";
import { useFetchData } from "@hooks/useFetchData";
import useService from "@hooks/useServicw";
import { transactionHistoryService } from "@service/transactionHistoryService";
import configStore from "@store/configStore";
import { TransactionPeriodEnum } from "@typing/enums";
import { PartialNullable, StatusEnum } from "@typing/generic";
import {
  FormTransactionHistory,
  TransactionHistoryRequest,
} from "@typing/transaction-history.type";
import { periodicityEnumToString } from "@typing/transaction.type";
import { compareObjectsAndFormat } from "@utils/manipulateObjectUtils";
import { useEffect, useState } from "react";
import zod from "zod";

interface UseTransactionHistoryFormProps {
  id: "new" | number | undefined;
  closeModal: () => void;
  reSend: () => void;
}

export const useTransactionHistoryForm = ({
  id,
  closeModal,
  reSend,
}: UseTransactionHistoryFormProps) => {
  const [status, setStatus] = useState(StatusEnum.IDLE);
  const setSnack = configStore.actions.setSnackProps;
  const { getTransaction, createTransaction, updateTransaction } = useService(
    transactionHistoryService
  );
  const isNew = id === "new";

  const { data, loading: loadingTransaction } = useFetchData(
    id === "new" || !id ? undefined : () => getTransaction(id),
    [id]
  );

  const defaultValues: PartialNullable<FormTransactionHistory> = {
    description: "",
    listInputTagId: [],
    listOutputTagId: [],
    title: "",
    value: null as any,
    date: null as any,
  };

  const methods = useFormElement<FormTransactionHistory>({
    defaultValues,
    validation: zod.object({
      description: zod.string().min(1),
      listInputTagId: zod.array(zod.number()),
      listOutputTagId: zod.array(zod.number()).min(1),
      title: zod.string().min(1),
      value: zod.number().min(0.01),
      date: zod.string().date(),
    }),
  });

  const handleSaveForm = async (form: FormTransactionHistory) => {
    const request: TransactionHistoryRequest = { ...form, userId: 1 };
    if (isNew) {
      return await createTransaction(request);
    }
    if (!data || !id) return;
    const filteredRequest = compareObjectsAndFormat(request, {
      ...data,
    });
    return await updateTransaction(id, filteredRequest);
  };

  const submit = async (form: FormTransactionHistory) => {
    setStatus(StatusEnum.LOADING);
    const response = await handleSaveForm(form);
    if (!response?.success) {
      setSnack(
        response?.message ??
          `Unable ${isNew ? "create" : "update"} transaction.`,
        "error"
      );
      setStatus(StatusEnum.ERROR);
      return;
    }
    setSnack(`Transactiom ${isNew ? "cration" : "update"} success.`, "success");
    setStatus(StatusEnum.IDLE);
    closeModal();
    methods.reset();
    reSend();
  };
  const title = `${isNew ? "Create" : "Update"} transaction`;
  const loading = loadingTransaction || status === StatusEnum.LOADING;

  const transactionPeriodicityOptions: SelectOptionProp<TransactionPeriodEnum>[] =
    Object.values(TransactionPeriodEnum).map((value) => ({
      label: periodicityEnumToString[value],
      value,
    }));

  const handleClose = () => {
    methods.reset(defaultValues);
    closeModal();
  };

  useEffect(() => {
    if (!data) return;
    const { description, inputTagList, outputTagList, date, title } = data;
    methods.reset({
      title,
      description,
      date,
      listInputTagId: inputTagList.map(({ id }) => id),
      listOutputTagId: outputTagList.map(({ id }) => id),
    });
  }, [data]);

  return {
    loading,
    handleSubmit: methods.handleSubmit(submit),
    transactionPeriodicityOptions,
    title,
    handleClose,
    methods,
  };
};
