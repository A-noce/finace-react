import CustomModal from "@components/CustomModal";
import { useTransactionForm } from "./useTransactionForm";
import TransactionForm from "./TransactionForm";
import { TagResponse } from "@typing/tag.type";
import { HTMLAttributes, ReactNode } from "react";
import FormElementProvider from "@components/form/CustomFormElements/FormElementProvider";

interface ModalTransactionProps {
  id: "new" | number | undefined;
  closeModal: () => void;
  tagList: TagResponse[];
  getTagProps: (id: number[]) => ReactNode[];
  getTagOptionProps: (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: number
  ) => ReactNode;
}

const ModalTransaction = ({ id, ...props }: ModalTransactionProps) => {
  const { title, loading, handleClose, methods, ...hookProps } =
    useTransactionForm({
      id,
      ...props,
    });
  return (
    <CustomModal
      open={!!id}
      handleClose={handleClose}
      title={title}
      confirmButtonProp={{ type: "submit", form: "transaction-modal", loading }}
      maxWidth="lg"
      fullWidth
    >
      <FormElementProvider formMethods={methods}>
        <TransactionForm {...hookProps} {...props} />
      </FormElementProvider>
    </CustomModal>
  );
};

export default ModalTransaction;
