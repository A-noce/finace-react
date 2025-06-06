import CustomChip from "@components/CustomChip";
import { ColumnAction, ColumnsProps } from "@components/CustomTable/types";
import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { useFetchData } from "@hooks/useFetchData";
import { useModal } from "@hooks/useModal";
import { usePaginatedList } from "@hooks/usePaginatedList";
import useService from "@hooks/useServicw";
import { Box } from "@mui/material";
import { tagService } from "@service/tagService";
import { transactionService } from "@service/transactionService";
import { TransactionPeriodEnum } from "@typing/enums";
import {
  FormFilterTransaction,
  periodicityEnumToString,
  TransactionResponse,
} from "@typing/transaction.type";
import { convertToCurrency } from "@utils/converterutils";
import { formatDate } from "@utils/dateUtils";
import { HTMLAttributes, useMemo } from "react";
import { FaPen } from "react-icons/fa6";
import zod from "zod";

export const useTransaction = () => {
  const filterTransaction = useService(transactionService).filterTransaction;
  const filterTags = useService(tagService).filterTags;
  const {
    onClose,
    onOpen,
    data: modalData,
  } = useModal<"new" | number | "filter">({});
  const {
    data,
    loading,
    reset,
    handleChangePage,
    handleChangeParams,
    handleChangeOrder,
  } = usePaginatedList<FormFilterTransaction, TransactionResponse>({
    fetchFn: filterTransaction,
  });

  const { data: tagData, loading: loadingTag } = useFetchData(
    () => filterTags(),
    []
  );

  const {
    control,
    reset: resetForm,
    handleSubmit,
    getValues,
  } = useFormElement<FormFilterTransaction>({
    defaultValues: {
      title: "",
      description: "",
      periodicity: [],
      listInputTagId: [],
      listOutputTagId: [],
      minimumValue: null as any,
      maximumValue: null as any,
      startDate: "",
      endDate: "",
    },
    validation: zod.object({
      title: zod.string(),
      description: zod.string(),
      periodicity: zod.array(zod.nativeEnum(TransactionPeriodEnum).optional()),
      minimumValue: zod.number().nullable(),
      maximumValue: zod.number().nullable(),
      listInputTagId: zod.array(zod.number().optional()),
      listOutputTagId: zod.array(zod.number().optional()),
      startDate: zod.string(),
      endDate: zod.string(),
    }),
  });

  const handleEdit = ({ id }: TransactionResponse) => {
    onOpen(id);
  };

  const handleFilterSubmit = (filter: FormFilterTransaction) => {
    handleChangeParams(filter);
    onClose();
  };

  const submit = handleSubmit(handleFilterSubmit);

  const resetFilter = () => {
    reset();
    resetForm();
  };

  const columns: ColumnsProps<TransactionResponse>[] = useMemo(() => {
    const tempColumns: ColumnsProps<TransactionResponse>[] = [
      {
        field: "title",
        title: "Title",
        enableSort: true,
      },
      {
        field: "periodicity",
        title: "Periodicity",
        enableSort: true,
        render: ({ periodicity }) => periodicityEnumToString[periodicity],
      },
      {
        field: "value",
        title: "Value",
        enableSort: true,
        render: ({ value }) => convertToCurrency(value),
      },
      {
        field: "createdAt",
        title: "Creation Date",
        enableSort: true,
        render: ({ createdAt }) => formatDate(createdAt),
      },
      {
        field: "inputTagList",
        title: "Input",
        render: ({ inputTagList }) =>
          inputTagList.map(({ name, color }) => (
            <CustomChip label={name} color={color} />
          )),
        cellStyle: { textAlign: "center" },
      },
      {
        field: "outputTagList",
        title: "Output",
        render: ({ outputTagList }) =>
          outputTagList.map(({ name, color }) => (
            <CustomChip label={name} color={color} />
          )),
        cellStyle: { textAlign: "center" },
      },
    ];
    return tempColumns;
  }, []);

  const action: ColumnAction<TransactionResponse>[] = [
    {
      icon: FaPen,
      onClick: handleEdit,
      tooltip: "Editar",
    },
  ];

  const reSend = () => {
    handleChangeParams(getValues());
  };

  const getTagProps = (tagIdList: number[]) => {
    const tagList = (tagData?.data ?? []).filter((tag) =>
      tagIdList.includes(tag.id)
    );
    if (!tagIdList.length) {
      return null;
    }
    return tagList.map((tag) => (
      <CustomChip label={tag.name} color={tag.color} size="small" />
    ));
  };

  const getTagOptionProps = (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => {
    const tag = tagData?.data?.find(({ id }) => option === id);
    if (!tag) return;
    return (
      <Box component="li" {...props} padding={0.5}>
        <CustomChip label={tag.name} color={tag.color} size="small" />
      </Box>
    );
  };

  const getOptionLabel = (option: number) => {
    return tagData?.data?.find(({ id }) => option === id)?.name ?? "";
  };

  const transactionPeriodicityOptions: TransactionPeriodEnum[] = Object.values(
    TransactionPeriodEnum
  ).map((value) => value);

  return {
    data,
    loading: loading || loadingTag,
    resetFilter,
    submit,
    handleChangePage,
    handleChangeOrder,
    control,
    columns,
    action,
    modalData,
    createTransaction: () => onOpen("new"),
    openFilter: () => onOpen("filter"),
    transactionPeriodicityOptions,
    modalProps: {
      closeModal: () => onClose(),
      tagList: tagData?.data ?? [],
      getTagProps,
      getTagOptionProps,
      getOptionLabel,
      reSend,
    },
  };
};
