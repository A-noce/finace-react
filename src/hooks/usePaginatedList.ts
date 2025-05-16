import configStore from "@store/configStore";
import {
  Null,
  Paginated,
  PaginatedFilter,
  ServerData,
  StatusEnum,
} from "@typing/generic";
import { useCallback, useEffect,  useState } from "react";
import { systemConfig } from '@utils/systemConfig'
import { OrderParam } from "@components/CustomTable/types";
import { removeEmptyValues } from "@utils/manipulateObjectUtils";

interface UsePaginatedListProps<
  T extends Record<string, any>,
  R extends Record<string, any>
> {
  fetchFn: (params: PaginatedFilter<T>) => Promise<ServerData<Paginated<R>>>;
  initialParams?: PaginatedFilter<T>;
  initialPage?: number
}

export const usePaginatedList = <
  T extends Record<string, any>,
  R extends Record<string, any>
>({
  fetchFn,
  initialParams,
initialPage = 1  
}: UsePaginatedListProps<T, R>) => {
  const [data, setData] = useState<Paginated<R>>({
    data: [],
    total: 0,
  });
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.IDLE);
  const [filterParams, setFilterParams] = useState<PaginatedFilter<T>>({
    skip: (initialPage -1) *systemConfig.paginationDefault.limit,
    limit: systemConfig.paginationDefault.limit,
    ...initialParams,
  } as PaginatedFilter<T>);
  const setSnack = configStore.actions.setSnackProps;

  const handleChangePage = (page: number) => {
    setFilterParams((state) => {
      const skip = (page -1) * state.limit
      const limit = page * state.limit
      return {...state, skip, limit}
  })
  }

  const handleChangeOrder = (sort: Null<OrderParam<T>> | Null<OrderParam<R>>) => {
    const order = sort ? {[sort.field]: sort.order} as  Record<keyof T, 'asc' | 'desc'>  : undefined
    setFilterParams((state) => ({...state, order}))
  }

  const handleChangeParams = (params: Partial<T>) => {
    setFilterParams((state) => ({...state, ...params}))
  }

  const handleSearch = useCallback( async (params: PaginatedFilter<T>) => {
    setStatus(StatusEnum.LOADING);
    const filteredParams = removeEmptyValues(params)
    const response = await fetchFn(filteredParams as PaginatedFilter<T>);
    if (response.success) {
      setData(response.body);
    }
    if (!response.success) {
      setSnack(response.message ?? "Erro buscar dados filtrados", 'error');
    }
    setStatus(StatusEnum.ERROR);
  },[setStatus, setSnack, fetchFn]);

  const reset = async () => {
    await handleSearch({
      skip: 0,
      limit: 10,
      ...initialParams
    } as PaginatedFilter<T>);
  };

  useEffect(() => {
    handleSearch(filterParams)
  }, [filterParams, handleSearch])

  const loading = status === StatusEnum.LOADING

  return {
    data,
    reset,
    loading,
    handleChangeParams,
    handleChangePage,
    handleChangeOrder
  };
};
