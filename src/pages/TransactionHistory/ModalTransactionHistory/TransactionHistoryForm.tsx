import { Grid } from "@mui/material";
import FormTextField from "@components/form/inputs/FormTextField";
import { TagResponse } from "@typing/tag.type";
import { HTMLAttributes, ReactNode } from "react";
import FormAutoComplete from "@components/form/inputs/FormAutocomplete";
import FormNumberField from "@components/form/inputs/FormNumberField";
import { useFormContext } from "react-hook-form";
import { Null } from "@typing/generic";
import { FormTransactionHistory } from "@typing/transaction-history.type";
import FormDatePicker from "@components/form/inputs/FormDatePicker";

interface TransactionHistoryFormProps {
  handleSubmit: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => Null<ReactNode[]>;
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
  getOptionLabel: (option: number) => string;
}

const TransactionHistoryForm = ({
  handleSubmit,
  tagList,
  getTagProps,
  getTagOptionProps,
  getOptionLabel,
}: TransactionHistoryFormProps) => {
  const { control } = useFormContext<FormTransactionHistory>();
  return (
    <Grid
      container
      spacing={2}
      alignContent="flex-start"
      padding={2}
      component="form"
      onSubmit={handleSubmit}
      id="transaction-history-modal"
    >
      <Grid size={{ xs: 12 }}>
        <FormTextField
          id="form-transaction-title"
          label="Title"
          control={control}
          name="title"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormTextField
          id="form-transaction-description"
          label="Description"
          control={control}
          name="description"
          rows={4}
          multiline
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormNumberField
          id="form-transaction-value"
          label="Value*"
          control={control}
          name="value"
          currency
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormDatePicker
          id="form-transaction-history-date"
          label="Date*"
          control={control}
          name="date"
          type="localDate"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormAutoComplete
          id="form-transaction-input-tag"
          label="Input tag"
          control={control}
          name="listInputTagId"
          fullWidth
          options={tagList.map(({ id }) => id)}
          renderValue={getTagProps}
          renderOption={getTagOptionProps}
          getOptionLabel={getOptionLabel}
          multiple
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormAutoComplete
          id="form-transaction-outputtag"
          label="Output tag"
          control={control}
          name="listOutputTagId"
          fullWidth
          options={tagList.map(({ id }) => id)}
          renderValue={getTagProps}
          renderOption={getTagOptionProps}
          getOptionLabel={getOptionLabel}
          multiple
        />
      </Grid>
    </Grid>
  );
};

export default TransactionHistoryForm;
