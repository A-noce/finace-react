import { Grid } from "@mui/material";
import FormTextField from "@components/form/inputs/FormTextField";
import CustomChip from "@components/CustomChip";
import { Control, useWatch } from "react-hook-form";
import { FormTag } from "@typing/tag.type";

interface TagFormProps {
  control: Control<FormTag>
  handleSubmit: () => void
}

const TagForm = ({control, handleSubmit}: TagFormProps) => {
  const [name, color] = useWatch({control, name: ['name', 'color']})
  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      width="100%"
      wrap="nowrap"
      spacing={2}
      id="tag-modal"
      padding={3}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormTextField
          id="form-tag-name"
          label="Name*"
          control={control}
          name="name"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormTextField
          id="form-tag-description"
          label="Description*"
          control={control}
          name="description"
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormTextField
          id="form-tag-color"
          label="Color"
          control={control}
          name="color"
          fullWidth
        />
      </Grid>
      <Grid container size={{ xs: 12, sm: 6 }} justifyContent='center'>
        <CustomChip
          id="form-tag-chip"
          label={name}
          color={color}
        />
      </Grid>
    </Grid>
  );
};

export default TagForm;
