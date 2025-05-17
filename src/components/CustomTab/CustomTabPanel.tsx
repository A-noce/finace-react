import { PropsWithChildren } from "react";
import { CustomTabPanelProps } from "./types";

export function CustomTabPanel({
  children,
}: PropsWithChildren<CustomTabPanelProps>) {
  return <>{children}</>;
}