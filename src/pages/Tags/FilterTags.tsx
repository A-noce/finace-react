import FormTextField from "@components/form/inputs/FormTextField";
import { Button, Grid } from "@mui/material";
import { FormFilterTag } from "@typing/tag.type";
import { Control } from "react-hook-form";
import { FaFilter } from "react-icons/fa";

interface FilterTagProps {
  loading: boolean;
  control: Control<FormFilterTag>;
  openFilter: () => void;
  submit: () => void;
}

const FilterTag = ({
  control,
  loading,
  openFilter,
  submit,
}: FilterTagProps) => {
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
          id="filter-tag-name"
          label="Name"
          control={control}
          name="name"
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

export default FilterTag;
