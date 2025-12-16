import { Chip, ChipProps, Grid } from "@mui/material";
import { FilterChipProps } from "@typing/generic";

interface RendeFilterChipProps<T extends Record<string, any>> {
  filterChip: FilterChipProps<T>[];
  handleRemove: (key: keyof T) => () => void;
  chipProps?: Omit<ChipProps, "label" | "onDelete">;
}

const RenderFilterChip = <T extends Record<string, any>>({
  filterChip,
  handleRemove,
  chipProps,
}: RendeFilterChipProps<T>) => {
  return (
    <Grid container spacing={2}>
      {filterChip.map(({ key, label }, index) => (
        <Grid key={`${index}: ${key.toString()}`}>
          <Chip
            variant="outlined"
            color="primary"
            {...chipProps}
            onDelete={handleRemove(key)}
            label={label}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default RenderFilterChip
