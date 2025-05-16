import CustomModal from "@components/CustomModal";
import FormAutoComplete from "@components/form/inputs/FormAutocomplete";
import FormDatePicker from "@components/form/inputs/FormDatePicker";
import FormNumberField from "@components/form/inputs/FormNumberField";
import FormTextField from "@components/form/inputs/FormTextField";
import { Grid } from "@mui/material";
import { TransactionPeriodEnum } from "@typing/enums";
import { TagResponse } from "@typing/tag.type";
import { FormFilterTransaction } from "@typing/transaction.type";
import { HTMLAttributes, ReactNode } from "react";
import { Control } from "react-hook-form";

interface ModalFilterTransactionProps {
  open: boolean;
  submit: () => void;
  control: Control<FormFilterTransaction>;
  closeModal: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => ReactNode[];
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
  transactionPeriodicityOptions: TransactionPeriodEnum[];
}

const ModalFilterTransaction = ({
  control,
  open,
  closeModal,
  submit,
  getTagOptionProps,
  getTagProps,
  tagList,
  transactionPeriodicityOptions,
}: ModalFilterTransactionProps) => {
  return (
    <CustomModal
      open={open}
      title="Filtro avançado"
      handleClose={closeModal}
      maxWidth="md"
      fullWidth
      confirmButtonProp={{
        type: "submit",
        form: "transaction-advanced-filter",
      }}
    >
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={submit}
        id="transaction-advanced-filter"
        padding={3}
      >
        <Grid size={{ xs: 6, md: 4 }}>
          <FormTextField
            id="filter-transaction-title"
            label="Name"
            control={control}
            name="title"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormTextField
            id="filter-transaction-description"
            label="Description"
            control={control}
            name="description"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormAutoComplete
            id="filter-transaction-periodicity"
            label="Periodicity"
            control={control}
            name="periodicity"
            fullWidth
            options={transactionPeriodicityOptions}
            multiple
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <FormNumberField
            allowNull
            id="filter-transaction-minimumValue"
            label="Minimum value"
            control={control}
            name="minimumValue"
            fullWidth
            currency
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <FormNumberField
            allowNull
            id="filter-transaction-maximumValue"
            label="Maximum value"
            control={control}
            name="maximumValue"
            fullWidth
            currency
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormAutoComplete
            id="filter-transaction-input-tag"
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
        <Grid size={{ xs: 12, md: 6 }}>
          <FormAutoComplete
            id="filter-transaction-outputtag"
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
        <Grid size={{ xs: 12, md: 6 }}>
          <FormDatePicker
            id="filter-transaction-filter-start-date"
            label="start date"
            type="localDate"
            control={control}
            name="startDate"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormDatePicker
            id="filter-transaction-filter-end-date"
            label="end date"
            type="localDate"
            control={control}
            name="endDate"
            fullWidth
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ModalFilterTransaction;
