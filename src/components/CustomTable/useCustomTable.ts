import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { CustomTableProps, OrderParam } from "./types";
import { useStyles } from "./styles";
import { Null } from "@typing/generic";

export const useCustomTable = <
  T extends Record<string, any>
>({
  pageSize = 20,
  totalCount,
  filterColumns,
  ...props
}: CustomTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [orderParam, setOrderParam] = useState<Null<OrderParam<T>>>(null);
  const [columns, setColumns] = useState(props.columns);

  const classes = useStyles(props.onClickRow);

  const paginatedData = useMemo(() => {
    if (!!props.handlePageRequest) return props.data;

    return props.data.slice((page - 1) * pageSize, page * pageSize);
  }, [page, props.data, props.handlePageRequest, pageSize]);

  const getOrderParams = (field: keyof T): Null<OrderParam<T>> => {
    if (!orderParam || field !== orderParam?.field) {
      return {
        field,
        order: "asc",
      };
    }
    const newOrder = orderParam?.order === "asc" ? "desc" : null;
    return newOrder ? { field, order: newOrder } : null;
  };

  const handleSort = (field: keyof T) => {
    const newParam = getOrderParams(field);
    setOrderParam(newParam);
    props.handleSortRequest?.(newParam);
  };

  const handleFilterColumns = (listFields: Array<keyof T>) => {
    setColumns((state) =>
      state.filter(({ field }) => !listFields.includes(field))
    );
  };

  const onChangePage = (_event: ChangeEvent<unknown>, page: number) => {
    if (props.handlePageRequest) {
      setPage(page);
      return props.handlePageRequest(page);
    }
    return setPage(page);
  };
  const count = totalCount ?? props.data?.length ?? 0;

  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  return {
    count,
    data: paginatedData,
    page: props.page ?? page,
    pageSize,
    classes,
    onChangePage,
    handleSort,
    orderParam,
    columns,
    handleFilterColumns,
  };
};
