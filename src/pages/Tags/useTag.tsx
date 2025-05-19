import CustomChip from "@components/CustomChip";
import { ColumnAction, ColumnsProps } from "@components/CustomTable/types";
import useFormElement from "@components/form/CustomFormElements/useFormElement";
import { usePaginatedList } from "@hooks/usePaginatedList";
import useService from "@hooks/useServicw";
import { tagService } from "@service/tagService";
import { FormFilterTag, TagResponse } from "@typing/tag.type";
import { useMemo } from "react";
import { FaPen } from "react-icons/fa";
import zod from "zod";
import useThemeBreakPoints from "@hooks/useThemeBreakPoints";
import { useModal } from "@hooks/useModal";

export const useTag = () => {
  const filterTags = useService(tagService).filterTags;
  const {
    onClose,
    onOpen,
    data: modalData,
  } = useModal<"new" | number | "filter" >({ });
  const { isMatch: isDownSm } = useThemeBreakPoints(["down", "sm"]);
  const {
    data,
    loading,
    reset,
    handleChangePage,
    handleChangeParams,
    handleChangeOrder,
  } = usePaginatedList<FormFilterTag, TagResponse>({
    fetchFn: filterTags,
  });

  const {
    control,
    reset: resetForm,
    handleSubmit,
    getValues
  } = useFormElement<FormFilterTag>({
    defaultValues: {
      name: "",
      color: "",
      startDate: "",
      endDate: "",
      description:"",
      userCreatorId: null
    },
    validation: zod.object({
      name: zod.string(),
      color: zod.string(),
      startDate: zod.string(),
      endDate: zod.string(),
      description: zod.string(),
      userCreatorId: zod.number().nullable()
    }),
  });

  const handleEdit = ({ id }: TagResponse) => {
    onOpen(id);
  };

  const handleFilterSubmit = (filter: FormFilterTag) => {
    handleChangeParams(filter);
    onClose();
  };

  const submit = handleSubmit(handleFilterSubmit);

  const resetFilter = () => {
    reset();
    resetForm();
  };

  const reSearch = () => {
    handleChangeParams(getValues())
  }

  const columns: ColumnsProps<TagResponse>[] = useMemo(() => {
    const tempColumns: ColumnsProps<TagResponse>[] = [
      {
        field: "name",
        title: "Nome",
        enableSort: true
      },
      {
        field: "color",
        title: "Cor",
      },
      {
        field: "id",
        title: "Tag",
        render: (data) => <CustomChip label={data.name} color={data.color} />,
        cellStyle: { textAlign: "center" },
      },
    ];
    if (!isDownSm) return tempColumns;
    return tempColumns.splice(2)
  }, [isDownSm]);

  const action: ColumnAction<TagResponse>[] = [
    {
      icon: FaPen,
      onClick: handleEdit,
      tooltip: "Editar",
    },
  ];

  return {
    data,
    loading,
    resetFilter,
    submit,
    handleChangePage,
    handleChangeOrder,
    control,
    columns,
    action,
    modalData,
    formId: "tag-form-filter",
    openFilter: () => onOpen("filter"),
    closeModal: () => onClose(),
    createTag: () => onOpen('new'),
    reSearch
  };
};
