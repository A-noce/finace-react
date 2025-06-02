import CustomChip from "@components/CustomChip";
import { ColumnAction, ColumnsProps } from "@components/CustomTable/types";
import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { useFetchData } from "@hooks/useFetchData";
import { useModal } from "@hooks/useModal";
import { usePaginatedList } from "@hooks/usePaginatedList";
import useService from "@hooks/useServicw";
import { Box } from "@mui/material";
import { tagHistoryService } from "@service/tagHistoryService";
import { transactionHistoryService } from "@service/transactionHistoryService";
import {
  FormFilterTransactionHistory,
  TransactionHistoryResponse,
} from "@typing/transaction-history.type";
import { convertToCurrency } from "@utils/converterutils";
import { formatDate } from "@utils/dateUtils";
import { HTMLAttributes } from "react";
import { FaPen } from "react-icons/fa";
import zod from "zod";

export const useTransactionHistory = () => {
  const { onClose, onOpen, data: modalData } = useModal<"new" | number>({});
  const { control, handleSubmit, reset } =
    useFormElement<FormFilterTransactionHistory>({
      defaultValues: {
        startDate: "",
        endDate: "",
        description: "",
        title: "",
        maximumValue: null,
        minimumValue: null,
        tag: undefined,
      },
      validation: zod.object({
        startDate: zod.string(),
        endDate: zod.string(),
        description: zod.string(),
        title: zod.string(),
        maximumValue: zod.number().nullable(),
        minimumValue: zod.number().nullable(),
        tag: zod.array(zod.number()).optional()
      }),
    });
  const filterTransactionTag = useService(
    transactionHistoryService
  ).filterTransaction;
  const filterTagHistory = useService(tagHistoryService).filterTags;

  const { data: tagHistoryList } = useFetchData(() => filterTagHistory(), []);

  const {
    data,
    handleChangeParams,
    loading,
    handleChangeOrder,
    handleChangePage,
  } = usePaginatedList({ fetchFn: filterTransactionTag });

  const handleFilterSubmit = (filter: FormFilterTransactionHistory) => {
    handleChangeParams(filter);
  };

  const submit = handleSubmit(handleFilterSubmit);

  const handleEdit = ({ id }: TransactionHistoryResponse) => {
    onOpen(id);
  };

  const columns: ColumnsProps<TransactionHistoryResponse>[] = [
    {
      field: "title",
      title: "Title",
      enableSort: true,
    },
    {
      field: "date",
      title: "Date",
      enableSort: true,
      render: ({ date }) => formatDate(date),
    },
    {
      field: "value",
      title: "Value",
      enableSort: true,
      render: ({ value }) => convertToCurrency(value),
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

  const action: ColumnAction<TransactionHistoryResponse>[] = [
    {
      icon: FaPen,
      onClick: handleEdit,
      tooltip: "Editar",
    },
  ];

  const getTagProps = (tagIdList: number[]) => {
    const tagList = (tagHistoryList?.data ?? []).filter((tag) =>
      tagIdList.includes(tag.id)
    );
    return tagList.map((tag) => (
      <CustomChip label={tag.name} color={tag.color} size="small" />
    ));
  };

  const getTagOptionProps = (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => {
    const tag = tagHistoryList?.data?.find(({ id }) => option === id);
    if (!tag) return;
    return (
      <Box component="li" {...props} padding={0.5}>
        <CustomChip label={tag.name} color={tag.color} size="small" />
      </Box>
    );
  };

  return {
    create: () => onOpen("new"),
    filterProps: {
      control,
      tagList: tagHistoryList?.data ?? [],
      getTagOptionProps,
      getTagProps,
      submit,
      loading,
      onClear: reset,
    },
    tableProps: {
      handleChangeOrder,
      handleChangePage,
      data,
      columns,
      action,
    },
  };
};
