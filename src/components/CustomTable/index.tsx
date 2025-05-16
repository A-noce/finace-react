import { CustomTableProps } from "./types";
import { Box, Paper, Table } from "@mui/material";
import CustomHeader from "./CustomHeader";
import CustomBody from "./CustomBody";
import CustomPagination from "./CustomPagination";
import { useCustomTable } from "./useCustomTable";

export const CustomTable = <T extends Record<string, any>>(
  props: CustomTableProps<T>
) => {
  const {
    classes,
    data,
    count,
    onChangePage,
    page,
    pageSize,
    orderParam,
    handleSort,
    columns,
  } = useCustomTable(props);
  return (
    <Paper sx={classes("tablePaper")}>
      <Box position="relative" sx={{ flex: 1, overflow: "auto" }}>
        <Table
          sx={{
            background: ({ palette }) => palette.background.paper,
            height: !data.length ? '100%' :undefined
          }}
        >
          <CustomHeader
            columns={columns}
            data={props.data}
            hasActions={!!props.actionColumn}
            orderParam={orderParam}
            handleSort={handleSort}
          />
          <CustomBody
            columns={props.columns}
            data={data}
            onClickRow={props.onClickRow}
            actionColumn={props.actionColumn}
          />
        </Table>
      </Box>
      <CustomPagination
        count={count}
        onChangePage={onChangePage}
        page={page}
        pageSize={pageSize}
        originalColumns={props.columns}
        filterColumns={props.filterColumns}
      />
    </Paper>
  );
};
