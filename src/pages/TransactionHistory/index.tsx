import CustomFab from "@components/input/CustomFab";
import { Grid } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useTransactionHistory } from "./useTransactionHistory";
import TransactionFilterHistory from "./TransactionHistoryFilter";

const TransactionHistory = () => {
    const {data, ...filterProps} = useTransactionHistory()
  return (
    <Grid container rowGap={1} direction="column">
      <Grid>
        <TransactionFilterHistory {...filterProps} />
      </Grid>
      <Grid
        size={{ xs: "grow" }}
        display={"flex"}
        flex={"1 1 0"}
        sx={{ overflowY: "auto" }}
      >
        <CustomFab onClick={() => console.log('oi')} color="primary">
          <FaPlus />
        </CustomFab>
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
