import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { SelectOptionProp } from "@components/input/CustomSelect";
import { useFetchData } from "@hooks/useFetchData";
import useService from "@hooks/useServicw";
import { transactionService } from "@service/transactionService";
import configStore from "@store/configStore";
import { TransactionPeriodEnum, WeekdaysEnum } from "@typing/enums";
import { PartialNullable, StatusEnum } from "@typing/generic";
import {
  FormTransaction,
  periodicityEnumToString,
  TransactionRequest,
} from "@typing/transaction.type";
import { compareObjectsAndFormat } from "@utils/manipulateObjectUtils";
import { useEffect, useState } from "react";
import zod from "zod";

interface UseTransactionFormProps {
  id: "new" | number | undefined;
  closeModal: () => void;
  reSend: () => void
}

export const useTransactionForm = ({
  id,
  closeModal,
  reSend
}: UseTransactionFormProps) => {
  const [status, setStatus] = useState(StatusEnum.IDLE);
  const setSnack = configStore.actions.setSnackProps;
  const { getTransaction, createTransaction, updateTransaction } =
    useService(transactionService);
  const isNew = id === "new";

  const { data, loading: loadingTransaction } = useFetchData(
    id === "new" || !id ? undefined : () => getTransaction(id),
    [id]
  );

  const defaultValues: PartialNullable<FormTransaction> = {
    description: "",
    listInputTagId: [],
    listOutputTagId: [],
    title: "",
    value: null as any,
    periodicity: null as any,
    periodValue: null as any,
  };

  const methods = useFormElement<FormTransaction>({
    defaultValues,
    validation: zod.object({
      description: zod.string().min(1),
      listInputTagId: zod.array(zod.number()),
      listOutputTagId: zod.array(zod.number()).min(1),
      title: zod.string().min(1),
      periodicity: zod.nativeEnum(TransactionPeriodEnum),
      periodValue: zod.union([
        zod.string().min(1).max(31),
        zod.array(zod.nativeEnum(WeekdaysEnum)),
      ]),
      value: zod.number().min(0.01),
    }),
  });

  const handleSaveForm = async (form: FormTransaction) => {
    const periodValue = Array.isArray(form.periodValue)
      ? form.periodValue.join(",")
      : form.periodValue;
    const request: TransactionRequest = { ...form, userId: 1, periodValue };
    if (isNew) {
      return await createTransaction(request);
    }
    if (!data || !id) return;
    const periodValueResponse = Array.isArray(data.periodValue)
      ? data.periodValue.join(",")
      : data.periodValue;
    const filteredRequest = compareObjectsAndFormat(request, {
      ...data,
      periodValue: periodValueResponse,
    });
    return await updateTransaction(id, filteredRequest);
  };

  const submit = async (form: FormTransaction) => {
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
    methods.reset()
    reSend()
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
    const {
      description,
      inputTagList,
      outputTagList,
      periodValue,
      periodicity,
      title,
    } = data;
    methods.reset({
      title,
      description,
      periodicity,
      periodValue,
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
