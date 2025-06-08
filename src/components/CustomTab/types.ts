import { TabProps,TabsProps } from '@mui/material';
import {
  ReactNode
} from 'react';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export type TabInfo = Omit<TabData, 'children'>;
export type TabMode = 'default' | 'overlay';

export interface CustomTabProps {
  id: string
  onChange?: (tab: TabInfo) => void;
  index?: number;
  loading?: boolean;
  tabsProps?: TabsProps;
  enableQueryIndex?: boolean;
  queryIndexName?: string;
  mode?: TabMode;
}

export interface CustomTabPanelProps {
  label: string;
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  customTab?: (props: TabProps) => ReactNode;
}

export interface TabData extends CustomTabPanelProps {
  index: number;
  children: ReactNode;
}