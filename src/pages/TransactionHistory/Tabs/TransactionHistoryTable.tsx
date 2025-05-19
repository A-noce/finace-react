import { CustomTable } from "@components/CustomTable";
import {
  ColumnAction,
  ColumnsProps,
  OrderParam,
} from "@components/CustomTable/types";
import { Grid } from "@mui/material";
import { Paginated } from "@typing/generic";
import { TransactionHistoryResponse } from "@typing/transaction-history.type";

interface TransactionHistoryTableProps {
  data: Paginated<TransactionHistoryResponse>;
  handleChangeOrder: (
    sort: OrderParam<TransactionHistoryResponse> | null
  ) => void;
  handleChangePage: (page: number) => void;
  columns: ColumnsProps<TransactionHistoryResponse>[];
  action: ColumnAction<TransactionHistoryResponse>[];
}

export const TransactionHistoryTable = ({
  data,
  handleChangeOrder,
  handleChangePage,
  columns,
  action,
}: TransactionHistoryTableProps) => {
  return (
    <Grid
      size={{ xs: "grow" }}
      display={"flex"}
      flex={"1 1 0"}
      sx={{ overflowY: "auto" }}
      height="100%"
    >
      <CustomTable
        id="table-transaction-history"
        data={data.data}
        totalCount={data.total}
        columns={columns}
        actionColumn={action}
        handlePageRequest={handleChangePage}
        handleSortRequest={handleChangeOrder}
      />
    </Grid>
  );
};
