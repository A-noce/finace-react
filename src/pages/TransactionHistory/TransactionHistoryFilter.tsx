import FormAutoComplete from "@components/form/inputs/FormAutocomplete";
import FormDatePicker from "@components/form/inputs/FormDatePicker";
import FormNumberField from "@components/form/inputs/FormNumberField";
import FormTextField from "@components/form/inputs/FormTextField";
import { CustomIconButton } from "@components/input";
import { CustomIconButtonProps } from "@components/input/CustomIconButton";
import { Box, Button, Collapse, Grid, Paper } from "@mui/material";
import { TagResponse } from "@typing/tag.type";
import { FormFilterTransactionHistory } from "@typing/transaction-history.type";
import { HTMLAttributes, ReactNode, useState } from "react";
import { Control } from "react-hook-form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface TransactionFilterHistoryProps {
  loading: boolean;
  control: Control<FormFilterTransactionHistory>;
  submit: () => void;
  onClear: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => ReactNode[];
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
}

const TransactionFilterHistory = ({
  control,
  loading,
  submit,
  getTagOptionProps,
  getTagProps,
  tagList,
  onClear,
}: TransactionFilterHistoryProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const props: CustomIconButtonProps = {
    id: "expend-transaction-history-button",
    title: isCollapsed ? "Collapse" : "Expand",
    icon: isCollapsed ? FaArrowUp : FaArrowDown,
    onClick: () => setIsCollapsed((s) => !s),
  };

  return (
    <Paper component={Box} paddingLeft={1} paddingBottom={1} paddingRight={1}>
      <Grid
        container
        spacing={1}
        component="form"
        onSubmit={submit}
        justifyContent="flex-end"
        alignItems="center"
        direction="column"
      >
        <Grid container justifyContent="flex-end" size={{ xs: 12 }}>
          <Grid>
            <CustomIconButton {...props} />
          </Grid>
        </Grid>
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormDatePicker
              id="filter-transaction-filter-start-date"
              label="start date"
              type="localDate"
              control={control}
              name="startDate"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormDatePicker
              id="filter-transaction-filter-end-date"
              label="end date"
              type="localDate"
              control={control}
              name="endDate"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormAutoComplete
              id="filter-transaction-input-tag"
              label="Tag"
              control={control}
              name="tag"
              fullWidth
              options={tagList.map(({ id }) => id)}
              renderValue={getTagProps}
              renderOption={getTagOptionProps}
              multiple
            />
          </Grid>
        </Grid>
        <Grid
          container
          component={Collapse}
          in={isCollapsed}
          size={{ xs: 12 }}
          spacing={2}
        >
          <Grid container>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormTextField
                id="filter-transaction-title"
                label="Name"
                control={control}
                name="title"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormTextField
                id="filter-transaction-description"
                label="Description"
                control={control}
                name="description"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" size={{ xs: 12 }}>
          <Grid>
            <Button
              variant="outlined"
              disabled={loading}
              size="small"
              onClick={onClear}
            >
              Clear filters
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
      </Grid>
    </Paper>
  );
};

export default TransactionFilterHistory;
