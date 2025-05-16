import { Grid, Pagination } from "@mui/material";
import { CustomPaginationProps } from "../types";
import { useStyles } from "./styles";
import { FilterMenu } from "./FilterMenu";

const CustomPagination = <T extends Record<string, any>>(
  props: CustomPaginationProps<T>
) => {
  const { page, pageSize, onChangePage, count, filterColumns, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={filterColumns ? "flex-end" : "center"}
      alignItems={"center"}
      position={"relative"}
      sx={classes("paginationBox")}
    >
      <Grid justifyItems="center">
        <Pagination
          id={`pagination`}
          color={"primary"}
          count={Math.ceil(count / pageSize)}
          page={page}
          onChange={onChangePage}
        />
      </Grid>
        {filterColumns && (
          <Grid>
            <FilterMenu {...rest} />
          </Grid>
        )}
    </Grid>
  );
};
export default CustomPagination;
