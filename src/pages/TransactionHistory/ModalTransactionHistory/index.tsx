import CustomModal from "@components/CustomModal";
import { useTransactionHistoryForm } from "./useTransactionHistoryForm";
import TransactionForm from "./TransactionHistoryForm";
import { TagResponse } from "@typing/tag.type";
import { HTMLAttributes, ReactNode } from "react";
import FormElementProvider from "@components/form/CustomFormElements/FormElementProvider";
import { Null } from "@typing/generic";

interface ModalTransactionHistoryProps {
  id: "new" | number | undefined;
  closeModal: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => Null<ReactNode[]>
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
  reSend: () => void
  getOptionLabel: (option: number) => string
}

const ModalTransactionHistory = ({ id, ...props }: ModalTransactionHistoryProps) => {
  const { title, loading, handleClose, methods, ...hookProps } =
    useTransactionHistoryForm({
      id,
      ...props,
    });
  return (
    <CustomModal
      open={!!id}
      handleClose={handleClose}
      title={title}
      confirmButtonProp={{ type: "submit", form: "transaction-history-modal", loading }}
      maxWidth="lg"
      fullWidth
    >
      <FormElementProvider formMethods={methods}>
        <TransactionForm {...hookProps} {...props} />
      </FormElementProvider>
    </CustomModal>
  );
};

export default ModalTransactionHistory;
