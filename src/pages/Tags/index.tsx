import {  Grid } from "@mui/material";
import { useTag } from "./useTag";
import { CustomTable } from "@components/CustomTable";
import FilterTag from "./FilterTags";
import ModalFilter from "./ModalFilterTag";
import ModalTag from "./ModalTag";
import { FaPlus } from "react-icons/fa";
import CustomFab from "@components/input/CustomFab";

const Tags = () => {
  const {
    data,
    columns,
    handleChangePage,
    handleChangeOrder,
    action,
    modalData,
    closeModal,
    createTag,
    reSearch,
    ...rest
  } = useTag();
  return (
    <Grid container rowGap={1} direction="column">
      <Grid>
        <FilterTag {...rest} />
      </Grid>
      <Grid
        size={{ xs: "grow" }}
        display={"flex"}
        flex={"1 1 0"}
        sx={{ overflowY: "auto" }}
      >
        <CustomTable
          id="table-tag"
          data={data.data}
          totalCount={data.total}
          columns={columns}
          actionColumn={action}
          handlePageRequest={handleChangePage}
          handleSortRequest={handleChangeOrder}
        />
        <CustomFab
          onClick={createTag}
          color="primary"
        >
          <FaPlus />
        </CustomFab>
      </Grid>
      <ModalFilter
        open={modalData === "filter"}
        control={rest.control}
        submit={rest.submit}
        onCloseFilter={closeModal}
      />
      {modalData !== "filter" && (
        <ModalTag id={modalData} onClose={closeModal} reSearch={reSearch} />
      )}
    </Grid>
  );
};

export default Tags;
