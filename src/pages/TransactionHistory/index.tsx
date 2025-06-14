import CustomFab from "@components/input/CustomFab";
import { Grid } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useTransactionHistory } from "./useTransactionHistory";
import TransactionFilterHistory from "./TransactionHistoryFilter";
import Tabs from "./Tabs";
import ModalTransactionHistory from "./ModalTransactionHistory";

const TransactionHistory = () => {
  const { filterProps, create, tableProps, modalProps } =
    useTransactionHistory();
  return (
    <Grid container rowGap={1} direction="column">
      <Grid>
        <TransactionFilterHistory {...filterProps} />
      </Grid>
      <Grid
        container
        size={{ xs: "grow" }}
        display={"flex"}
        flex={"1 1 0"}
        sx={{ overflowY: "auto" }}
        height="100%"
      >
        <Tabs tableProps={tableProps} />
        <CustomFab
          onClick={create}
          color="primary"
          title="Create Transaction History"
        >
          <FaPlus />
        </CustomFab>
      </Grid>
      <ModalTransactionHistory {...modalProps} />
    </Grid>
  );
};

export default TransactionHistory;
