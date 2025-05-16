import CustomModal from "@components/CustomModal";
import TagForm from "./TagForm";
import { useFormTag } from "./useFormTag";

interface ModalTagProps {
  id: "new" | number | undefined;
  onClose: () => void;
}

const ModalTag = (props: ModalTagProps) => {
  const { title, loading, handleClose, ...hookProps } = useFormTag(props);
  return (
    <CustomModal
      open={!!props.id}
      handleClose={handleClose}
      title={title}
      confirmButtonProp={{ type: "submit", form: "tag-modal", loading }}
      maxWidth="lg"
      fullWidth
    >
      <TagForm {...hookProps} />
    </CustomModal>
  );
};

export default ModalTag;
