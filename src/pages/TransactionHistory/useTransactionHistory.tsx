import CustomChip from "@components/CustomChip";
import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { useFetchData } from "@hooks/useFetchData";
import { usePaginatedList } from "@hooks/usePaginatedList";
import useService from "@hooks/useServicw";
import { Box } from "@mui/material";
import { tagHistoryService } from "@service/tagHistoryService";
import { transactionHistoryService } from "@service/transactionHistoryService";
import { FormFilterTransactionHistory } from "@typing/transaction-history.type";
import { HTMLAttributes, useState } from "react";
import zod from "zod";

export const useTransactionHistory = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const methods = useFormElement<FormFilterTransactionHistory>({
    defaultValues: {
      startDate: "",
      endDate: "",
      description: "",
      title: "",
      maximumValue: null,
      minimumValue: null,
    },
    validation: zod.object({
      startDate: zod.string(),
      endDate: zod.string(),
      description: zod.string(),
      title: zod.string(),
      maximumValue: zod.number().nullable(),
      minimumValue: zod.number().nullable(),
    }),
  });

  const filterTransactionTag = useService(
    transactionHistoryService
  ).filterTransaction;
  const filterTagHistory = useService(tagHistoryService).filterTags;

  const { data: tagHistoryList} = useFetchData(() => filterTagHistory(), []);

  const { data } = usePaginatedList({ fetchFn: filterTransactionTag });

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
    methods,
    data,
    tagHistoryList,
    getTagOptionProps,
    getTagProps
  };
};
