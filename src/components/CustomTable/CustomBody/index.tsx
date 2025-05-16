import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { CustomBodyProps } from "../types";
import { useStyles } from "./styles";
import CustomActionColumn from "./CustomActionColumns";

const CustomBody = <T extends Record<string, any>>(
  props: CustomBodyProps<T>
) => {
  const { data, columns, actionColumn, onClickRow } = props;
  const classes = useStyles();
  return (
    <TableBody sx={{ whiteSpace: "nowrap" }} >
      {!data.length && (
        <TableCell
          key="empty-table"
          colSpan={actionColumn ? columns.length + 1 : columns.length}
        >
          <Typography textAlign="center">Lista vazia</Typography>
        </TableCell>
      )}
      {data.map((data, rowIndex) => (
        <TableRow
          key={`row-index:${rowIndex}`}
          onClick={() => onClickRow?.(data, rowIndex)}
          sx={classes("tableRow", !!onClickRow)}
        >
          {columns.map((column) => (
            <TableCell
              style={column.cellStyle}
              key={`row-index:${rowIndex}-column:${column.title}`}
            >
              {column.render
                ? column.render(data, rowIndex)
                : data[column.field] ?? ""}
            </TableCell>
          ))}
          {!!actionColumn && (
            <TableCell key={`row-index:${rowIndex}-column:action`}>
              {actionColumn?.map((action, actionIndex) => (
                <CustomActionColumn
                  key={`action-index:${actionIndex}`}
                  actionIndex={actionIndex}
                  actionColunm={action}
                  rowIndex={rowIndex}
                  data={data}
                />
              ))}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};
export default CustomBody;
