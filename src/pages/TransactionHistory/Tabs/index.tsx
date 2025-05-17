import CustomTabPanel from "@components/CustomTab";
import { CustomTab } from "@components/CustomTab/CustomTab";
import {
  ColumnAction,
  ColumnsProps,
  OrderParam,
} from "@components/CustomTable/types";
import { Paginated } from "@typing/generic";
import { TransactionHistoryResponse } from "@typing/transaction-history.type";
import { TransactionHistoryTable } from "./TransactionHistoryTable";
import { TransactionHistoryLineChart } from "./TransactionHiistoryLineChart";

interface TabsProps {
  tableProps: {
    data: Paginated<TransactionHistoryResponse>;
    handleChangeOrder: (
      sort: OrderParam<TransactionHistoryResponse> | null
    ) => void;
    handleChangePage: (page: number) => void;
    columns: ColumnsProps<TransactionHistoryResponse>[];
    action: ColumnAction<TransactionHistoryResponse>[];
  };
}

const Tabs = ({ tableProps }: TabsProps) => {
  return (
    <CustomTab id="transaction-history-tabs">
      <CustomTabPanel label="Table" name="table">
        <TransactionHistoryTable {...tableProps} />
      </CustomTabPanel>
      <CustomTabPanel label="Table" name="table">
        <TransactionHistoryLineChart data={tableProps.data.data} />
      </CustomTabPanel>
    </CustomTab>
  );
};

export default Tabs;
