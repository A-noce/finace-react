import { Fragment, useState } from "react";
import { FilterMenuProps } from "../types";
import CustomIconButton from "@components/input/CustomIconButton";
import { HiDotsVertical } from "react-icons/hi";
import { Popover } from "@mui/material";

export const FilterMenu = <T extends Record<string, any>>({
  handleFilterColumn,
  originalColumns,
}: FilterMenuProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const [list, setList] = useState(
    originalColumns.map(({ field, title }) => ({
      title,
      field,
      hidden: false,
    }))
  );

  return (
    <Fragment>
      <CustomIconButton icon={HiDotsVertical} id="filte-rmenu-button" onClick={handleClick}/>
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        oioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioioi
      </Popover>
    </Fragment>
  );
};
