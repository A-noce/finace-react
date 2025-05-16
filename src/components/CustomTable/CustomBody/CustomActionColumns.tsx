import { CustomActionColumnProps } from "../types";
import CustomIconButton from "@components/input/CustomIconButton";

const CustomActionColumn = <T extends Record<string, any>>(props: CustomActionColumnProps<T>) => {

    const { actionColunm, data, rowIndex} = props
    const actionProps = typeof actionColunm === 'function' ? actionColunm(data) : actionColunm 

    return (
        <CustomIconButton
          id={`action-button-rowIndex:${rowIndex}`}
          key={actionProps.tooltip}
          icon={actionProps.icon}
          onClick={(e) => actionProps.onClick(data, e)}
          title={actionProps.tooltip}
          iconProps={actionProps.iconProps}
          />
        )
}

export default CustomActionColumn