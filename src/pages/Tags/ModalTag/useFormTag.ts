import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { useFetchData } from "@hooks/useFetchData";
import useService from "@hooks/useServicw";
import { tagService } from "@service/tagService";
import configStore from "@store/configStore";
import { StatusEnum } from "@typing/generic";
import { FormTag, Tag } from "@typing/tag.type";
import { compareObjectsAndFormat } from "@utils/manipulateObjectUtils";
import { useEffect, useState } from "react";
import zod from "zod";

interface UseFormTagProps {
  id: "new" | number | undefined;
  onClose: () => void;
}

export const useFormTag = ({ id, onClose }: UseFormTagProps) => {
  const isNew = id === "new";
  const setSnack = configStore.actions.setSnackProps;
  const [status, setStatus] = useState(StatusEnum.IDLE);
  const { getTag, updateTag, createTag } = useService(tagService);

  const { data } = useFetchData(
    id === "new" || !id ? undefined : () => getTag(id),
    [id]
  );

  const defaultValues: FormTag = {
    color: "",
    description: "",
    name: "",
  };

  const { control, reset, handleSubmit } = useFormElement<FormTag>({
    defaultValues,
    validation: zod.object({
      color: zod.string().min(1, "Required field"),
      description: zod.string().min(1, "Required field"),
      name: zod.string().min(1, "Required field"),
    }),
  });

  const handleSave = async (form: FormTag) => {
    if (isNew) {
      const tag: Tag = {
        ...form,
        userCreatorId: 1,
      };
      return await createTag(tag);
    }
    if (!data || !id) return;
    const tag = compareObjectsAndFormat(data, form);
    return await updateTag(id, tag);
  };

  const submit = async (form: FormTag) => {
    setStatus(StatusEnum.LOADING);
    const response = await handleSave(form);
    if (!response?.success) {
      setSnack(
        response?.message ?? `Unable ${isNew ? "create" : "update"} tag.`,
        "error"
      );
      setStatus(StatusEnum.ERROR);
      return;
    }
    setSnack(`Tag ${isNew ? "cration" : "update"} success.`, "success");
    setStatus(StatusEnum.IDLE);
    onClose();
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const title = `${isNew ? "Create" : "Update"} tag`;
  const loading = status === StatusEnum.LOADING;

  useEffect(() => {
    if (!data) return;
    const { name, color, description } = data;
    reset({
      name,
      color,
      description,
    });
  }, [data]);

  return {
    control,
    handleSubmit: handleSubmit(submit),
    loading,
    title,
    handleClose,
  };
};
