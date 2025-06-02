import { TransactionHistoryResponse } from "@typing/transaction-history.type";
import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo } from "react";
import { Grid, Paper } from "@mui/material";
import { convertToCurrency } from "@utils/converterutils";
import { formatDate } from "@utils/dateUtils";
import { parseISO } from "date-fns";

interface TransactionHistoryLineChartPorps {
  data: TransactionHistoryResponse[];
}

export const TransactionHistoryLineChart = ({
  data,
}: TransactionHistoryLineChartPorps) => {
  const { xAxis, yAxis } = useMemo(() => {
    const yAxis: number[] = [];
    const xAxis: Date[] = [];
    data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(({ value, date }) => {
        yAxis.push(value);
        xAxis.push(parseISO(date));
      });
    return { yAxis, xAxis };
  }, [data]);

  return (
    <Grid
      size={{ xs: "grow" }}
      display={"flex"}
      flex={"1 1 0"}
      sx={{ overflowY: "auto" }}
      height="100%"
      component={Paper}
      padding={2}
    >
      <LineChart
        xAxis={[
          {
            data: xAxis,
            scaleType: "time",
            valueFormatter: (d: number) => formatDate(d),
            tickLabelStyle: {
              angle: 45,
              fontSize: 10,
            },
            height: 65,
          },
        ]}
        yAxis={[{ valueFormatter: convertToCurrency, width: 120 }]}
        series={[{ data: yAxis }]}
      />
      ;
    </Grid>
  );
};
