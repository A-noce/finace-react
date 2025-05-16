import { TableCell, TableHead, TableRow } from "@mui/material";
import { CustomHeaderProps } from "../types";
import { useStyles } from "./styles";
import CustomHeaderCell from "./CustomHeaderCell";

const CustomHeader = <T extends Record<string, any>>(
  props: CustomHeaderProps<T>
) => {
  const classes = useStyles();
  return (
    <TableHead sx={classes("header")} style={{textAlign: 'center'}}>
      <TableRow>
        {props.columns.map((column, columnIndex) => (
          <CustomHeaderCell
            key={`column-index:${columnIndex}-column:${column.title}`}
            column={column}
            columnIndex={columnIndex}
            data={props.data[columnIndex]}
            handleSort={props.handleSort}
            orderParam={props.orderParam}
          />
        ))}
        {props.hasActions ? (
          <TableCell
            key={`column-index:${props.columns.length + 1}-column:action`}
            align={"center"}
            padding={"checkbox"}
            sx={classes("headerCell")}
          >
            Ações
          </TableCell>
        ) : null}
      </TableRow>
    </TableHead>
  );
};
export default CustomHeader;
