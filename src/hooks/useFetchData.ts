import configStore from "@store/configStore";
import { ServerData, StatusEnum } from "@typing/generic";
import { DependencyList, useCallback, useEffect, useState } from "react";

export const useFetchData = <T>(
  promise: (() => Promise<ServerData<T>>) | undefined,
  dep: DependencyList
) => {
  const setSnack = configStore.actions.setSnackProps;
  const [status, setStatus] = useState(StatusEnum.IDLE);
  const [data, setData] = useState<T>();
  const fetchData = useCallback(async (mount: boolean) => {
    if (!promise || !mount) return;
    setStatus(StatusEnum.LOADING);
    const response = await promise();
    if (!response.success) {
      setSnack(response.message ?? "Erro ao buscar dados", "error");
      setStatus(StatusEnum.ERROR);
    }
    if (response.success) {
      setStatus(StatusEnum.DONE);
      setData(response.body);
    }
  }, dep);

  useEffect(() => {
    let mount = true;
    fetchData(true);
    return () => {
      mount = false;
    };
  }, [fetchData]);

  const loading = status === StatusEnum.LOADING;

  return {
    data,
    loading,
  };
};
