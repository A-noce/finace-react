import { TransactionHistoryResponse } from "@typing/transaction-history.type";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo } from "react";

interface TransactionHistoryLineChartPorps {
  data: TransactionHistoryResponse[];
}

export const TransactionHistoryLineChart = ({
  data,
}: TransactionHistoryLineChartPorps) => {
  const { xAxis, yAxis } = useMemo(() => {
    const yAxis: number[] = [];
    const xAxis: string[] = [];
    data.forEach(({ value, date }) => {
      yAxis.push(value);
      xAxis.push(date);
    });
    return { yAxis, xAxis };
  }, [data]);

  return <LineChart xAxis={[{ data: xAxis }]} series={[{ data: yAxis }]} />;
};
