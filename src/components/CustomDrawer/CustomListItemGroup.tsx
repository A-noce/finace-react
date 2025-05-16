import { Fragment, useState } from "react";
import { Collapse, List } from "@mui/material";
import { useLocation } from "react-router-dom";
import { MenuSubItem } from "@typing/router";
import CustomListItem from "./CustomListItem";

interface CustomListItemGroupProps {
  item: MenuSubItem;
}

const CustomListItemGroup = ({
  item: { icon, name, path, subItem },
}: CustomListItemGroupProps) => {
  const { pathname: pathnameLocation } = useLocation();
  const [collapseOpen, setCollapseOpen] = useState(false);

  const regxMatch = pathnameLocation.match(/(\/[\w|-]+)(?=[/|?])?/);
  const isSelected = regxMatch?.includes(path ?? "") ?? false;

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <Fragment>
      <CustomListItem
        id={name}
        name={name}
        icon={icon}
        path={path}
        basepath="/"
        isCollapse={collapseOpen}
        onClick={toggleCollapse}
        isSelected={isSelected}
      />
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          {subItem.map((item,index) => (
            <CustomListItem
              id={name + "-" + item.name}
              key={name + "-" + item.name+ index}
              name={item.name}
              basepath={`/${path}/`}
              path={item.path}
              icon={item.icon}
              isSubItem
            />
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default CustomListItemGroup;
