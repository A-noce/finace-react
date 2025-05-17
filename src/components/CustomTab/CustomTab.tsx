import { Box, Tab, Tabs } from "@mui/material";
import {
  Children,
  PropsWithChildren,
  createElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CustomTabPanelProps,
  CustomTabProps,
  TabData,
  TabPanelProps,
} from "./types";
import { usebStyles } from "./styles";

export const CustomTab = ({
  index,
  onChange,
  children,
  tabsProps,
  mode = "default",
  enableQueryIndex,
}: PropsWithChildren<CustomTabProps>) => {
  const classes = usebStyles();

  const [value, setValue] = useState(0);
  const tabFiltered = useMemo<TabData[]>(() => {
    const tabDataTemp: TabData[] = [];
    Children.forEach(children, (el, i) => {
      if (
        !isValidElement(el) ||
        typeof el.type !== "function"
      ) {
        throw new Error("Not valid element");
      }
      tabDataTemp.push({
        index: i,
        ...el.props as any,
      });
    });

    return tabDataTemp.filter((t) => !t.hidden);
  }, [children]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    const data = tabFiltered.find((t) => t.index === newValue);
    if (data) {
      onChange?.({
        index: data.index,
        label: data.label,
        name: data.name,
      });
    }
  };

  useEffect(() => {
    if (index !== undefined) {
      handleChange(index);
    } else if (!enableQueryIndex) {
      handleChange(0);
    }
  }, [index]);

  return (
    <Box sx={classes("container")}>
      <Tabs
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons={"auto"}
        {...tabsProps}
        sx={classes("tabs", mode)}
        value={value}
        onChange={(_, value) => handleChange(value)}
        slotProps={{
          indicator: {
            children: <span className="MuiTabs-indicatorSpan" />,
          },
        }}
      >
        {tabFiltered.map((l, i) => {
          if (l.customTab) {
            return createElement(l.customTab, {
              key: l.name,
              label: l.label,
              ...a11yProps(i),
            });
          }
          return (
            <Tab
              key={`${i}:${l.name}`}
              label={l.label}
              disabled={l.disabled}
              sx={classes("tab", mode)}
            />
          );
        })}
      </Tabs>
      <Box
        display={"flex"}
        height={"inherit"}
        width={"100%"}
        overflow={"auto"}
        sx={classes("tabContainer")}
      >
        {tabFiltered.map((el, i) => {
          return (
            <TabPanel key={el.name} value={value} index={i}>
              {el.children}
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
};

export function CustomTabPanel({
  children,
}: PropsWithChildren<CustomTabPanelProps>) {
  return <>{children}</>;
}

CustomTabPanel.displayName = "CustomTabPanel";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      role="tabpanel"
      height={"100%"}
      width={"100%"}
      overflow={"auto"}
      hidden={value !== index}
    >
      {value === index && children}
    </Box>
  );
}
