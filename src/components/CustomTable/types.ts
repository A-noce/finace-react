import { Null } from "@typing/generic";
import { ChangeEvent, CSSProperties, ReactNode } from "react";
import { IconBaseProps, IconType } from "react-icons";

type ColumnTitle<T> =
  | string
  | ReactNode
  | ((data: T, columnId: string) => React.ReactNode);

export type ColumnAction<T> =
  | CustomActionProps<T>
  | ((rowData: T) => CustomActionProps<T>);

export interface OrderParam<T extends Record<string, any>> {
  field: keyof T;
  order: Null<"asc" | "desc">;
}

export interface CustomActionProps<T> {
  tooltip: string;
  onClick: (data: T, e?: any) => void;
  iconProps?: IconBaseProps;
  hidden?: boolean;
  disabled?: boolean;
  icon: IconType | (() => React.ReactElement<any>);
}

export interface ColumnsProps<D> {
  title: ColumnTitle<D>;
  field: keyof D;
  render?: (data: D, rowIndex?: number) => ReactNode;
  enableSort?: boolean;
  cellStyle?: CSSProperties;
}

export interface CustomTableProps<T extends Record<string, any>> {
  id: string
  data: T[];
  totalCount?: number;
  onClickRow?: (data: T, rowIndex?: number) => void;
  handlePageRequest?: (page: number) => void;
  handleSortRequest?: (data: Null<OrderParam<T>>) => void;
  columns: ColumnsProps<T>[];
  actionColumn?: ColumnAction<T>[];
  pageSize?: number;
  page?: number
  filterColumns?: boolean
}

export interface CustomHeaderProps<T extends Record<string, any>>
  extends Pick<CustomTableProps<T>, "columns" | "data"> {
  hasActions: boolean;
  orderParam?: Null<OrderParam<T>>;
  handleSort?: (field: keyof T) => void;
}

export type CustomBodyProps<T extends Record<string, any>> = Pick<
  CustomTableProps<T>,
  "columns" | "data" | "actionColumn" | "onClickRow"
>;

export interface CustomActionColumnProps<T extends Record<string, any>> {
  actionColunm: ColumnAction<T>;
  data: T;
  rowIndex: number;
  actionIndex: number
}

export interface CustomColumnHeaderCellProps<T extends Record<string, any>> {
  column: ColumnsProps<T>;
  columnIndex: number;
  data: T;
  orderParam?: Null<OrderParam<T>>;
  handleSort?: (field: keyof T) => void;
}

export interface CustomPaginationProps<T extends Record<string, any>> {
  page: number;
  count: number;
  pageSize: number;
  onChangePage: (e: ChangeEvent<unknown>, page: number) => void;
  originalColumns: ColumnsProps<T>[],
  handleFilterColumn?: (list: Array<keyof T>) => void
  filterColumns?: boolean
}

export type FilterMenuProps<T extends Record<string, any>> = Pick<CustomPaginationProps<T>, 'handleFilterColumn' | 'originalColumns'>