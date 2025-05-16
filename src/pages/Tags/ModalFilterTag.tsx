import CustomModal from "@components/CustomModal";
import FormDatePicker from "@components/form/inputs/FormDatePicker";
import FormNumberField from "@components/form/inputs/FormNumberField";
import FormTextField from "@components/form/inputs/FormTextField";
import { Grid } from "@mui/material";
import { FormFilterTag } from "@typing/tag.type";
import { Control } from "react-hook-form";

interface ModalFilterTagProps {
  open: boolean;
  submit: () => void;
  control: Control<FormFilterTag>;
  onCloseFilter: () => void;
}

const ModalFilterTag = ({
  control,
  open,
  onCloseFilter,
  submit,
}: ModalFilterTagProps) => {
  return (
    <CustomModal
      open={open}
      title="Filtro avançado"
      handleClose={onCloseFilter}
      maxWidth='md'
      fullWidth
      confirmButtonProp={{
        type: 'submit',
        form: 'tag-advanced-filter'
      }}
    >
      <Grid container spacing={2} component="form" onSubmit={submit} id='tag-advanced-filter' padding={3}>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormTextField
            id="filter-tag-name"
            label="Name"
            control={control}
            name="name"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormTextField
            id="filter-tag-description"
            label="Description"
            control={control}
            name="description"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormTextField
            id="filter-tag-color"
            label="Color"
            control={control}
            name="color"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormNumberField
            id="filter-tag-userCreatorId"
            label="User Creator ID"
            allowNull
            control={control}
            name="userCreatorId"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormDatePicker
            id="tag-filter-start-date"
            label="start date"
            type="localDate"
            control={control}
            name="startDate"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <FormDatePicker
            id="tag-filter-end-date"
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

export default ModalFilterTag