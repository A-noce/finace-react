import { CustomTable } from "@components/CustomTable";
import { Grid } from "@mui/material";
import { useTransaction } from "./useTransaction";
import TransactionFilter from "./TransactionFilter";
import CustomFab from "@components/input/CustomFab";
import { FaPlus } from "react-icons/fa";
import ModalFilterTransaction from "./ModalFilterTransaction";
import ModalTransaction from "./ModalTransaction";

const Transaction = () => {
  const {
    data,
    columns,
    action,
    handleChangeOrder,
    handleChangePage,
    createTransaction,
    modalData,
    transactionPeriodicityOptions,
    modalProps,
    ...rest
  } = useTransaction();
  return (
    <Grid container rowGap={1} direction="column">
      <Grid>
        <TransactionFilter {...rest} />
      </Grid>
      <Grid
        size={{ xs: "grow" }}
        display={"flex"}
        flex={"1 1 0"}
        sx={{ overflowY: "auto" }}
      >
        <CustomTable
          id="table-transaction"
          data={data.data}
          totalCount={data.total}
          columns={columns}
          actionColumn={action}
          handlePageRequest={handleChangePage}
          handleSortRequest={handleChangeOrder}
        />
        <CustomFab onClick={createTransaction} color="primary">
          <FaPlus />
        </CustomFab>
      </Grid>
      <ModalFilterTransaction
        open={modalData === "filter"}
        control={rest.control}
        submit={rest.submit}
        transactionPeriodicityOptions={transactionPeriodicityOptions}
        {...modalProps}
      />
      {modalData !== "filter" && (
        <ModalTransaction
          id={modalData}
          {...modalProps}
        />
      )}
    </Grid>
  );
};

export default Transaction;
