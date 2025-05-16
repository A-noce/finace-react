import { TableCell, TableSortLabel } from "@mui/material";
import { CustomColumnHeaderCellProps } from "../types";
import { useStyles } from "./styles";
import { FaAngleDown } from "react-icons/fa6";

const CustomHeaderCell = <T extends Record<string, any>>({
  column,
  orderParam,
  handleSort,
  data,
  columnIndex,
}: CustomColumnHeaderCellProps<T>) => {
  const { enableSort, ...rest } = column;
  const classes = useStyles();

  const renderTilte = () => {
    const title =
      typeof rest.title === "function"
        ? rest.title(data, String(column.field))
        : rest.title;

    if (enableSort) {

      return (
        <TableSortLabel
          id={`${String(rest.field)}--table-sort-label`}
          style={rest?.cellStyle}
          active={orderParam?.field === rest.field}
          direction={orderParam?.order ?? undefined}
          onClick={() => handleSort?.(rest.field)}
          sx={classes("headerCell")}
          IconComponent={FaAngleDown}
        >
          {title}
        </TableSortLabel>
      );
    }
    return title;
  };

  return (
    <TableCell
      id={`column-${String(rest.field)}`}
      key={String(columnIndex)}
      style={rest.cellStyle}
      sx={classes("headerCell")}
      padding={"none"}
      sortDirection={
        orderParam?.field === rest.field ? orderParam.order ?? false : false
      }
    >
      {renderTilte()}
    </TableCell>
  );
};

export default CustomHeaderCell
