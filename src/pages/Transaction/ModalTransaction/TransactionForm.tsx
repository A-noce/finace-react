import { Grid } from "@mui/material";
import FormTextField from "@components/form/inputs/FormTextField";
import { FormTransaction } from "@typing/transaction.type";
import { TagResponse } from "@typing/tag.type";
import { HTMLAttributes, ReactNode } from "react";
import FormAutoComplete from "@components/form/inputs/FormAutocomplete";
import { SelectOptionProp } from "@components/input/CustomSelect";
import { TransactionPeriodEnum } from "@typing/enums";
import FormSelect from "@components/form/inputs/FormSelect";
import FormNumberField from "@components/form/inputs/FormNumberField";
import { useFormContext } from "react-hook-form";
import PeriodValueField from "./PeriodiValueField";

interface TransactionFormProps {
  handleSubmit: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => ReactNode[];
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
  transactionPeriodicityOptions: SelectOptionProp<TransactionPeriodEnum>[];
}

const TransactionForm = ({
  handleSubmit,
  tagList,
  getTagProps,
  getTagOptionProps,
  transactionPeriodicityOptions,
}: TransactionFormProps) => {
  const { control } = useFormContext<FormTransaction>();
  return (
    <Grid
      container
      spacing={2}
      alignContent="flex-start"
      padding={2}
      component="form"
      onSubmit={handleSubmit}
      id="transaction-modal"
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
      <Grid size={{ xs: 12}}>
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
        <FormSelect
          id="form-transaction-periodicity"
          label="Periodicity"
          control={control}
          name="periodicity"
          options={transactionPeriodicityOptions}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <PeriodValueField />
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
          multiple
        />
      </Grid>
    </Grid>
  );
};

export default TransactionForm;
