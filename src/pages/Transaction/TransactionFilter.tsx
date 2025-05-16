import FormTextField from "@components/form/inputs/FormTextField";
import { Button, Grid } from "@mui/material";
import { FormFilterTransaction } from "@typing/transaction.type";
import { Control } from "react-hook-form";
import { FaFilter } from "react-icons/fa";

interface TransactionFilterProps {
  loading: boolean;
  control: Control<FormFilterTransaction>;
  openFilter: () => void;
  submit: () => void;
}

const TransactionFilter = ({
  control,
  loading,
  openFilter,
  submit,
}: TransactionFilterProps) => {
  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={submit}
      justifyContent="flex-end"
      alignItems="center"
    >
      <Grid size={{ xs: "grow" }}>
        <FormTextField
          id="filter-transaction-title"
          label="Title"
          control={control}
          name="title"
          fullWidth
        />
      </Grid>
      <Grid>
        <Button
          variant="contained"
          onClick={openFilter}
          disabled={loading}
          startIcon={<FaFilter />}
          size="small"
        >
          Advanced search
        </Button>
      </Grid>
      <Grid>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          size="small"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransactionFilter;
