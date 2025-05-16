import { makeSx } from "@styles/makeSx";

export const useStyles = makeSx(({ palette }) => {
  return {
    paginationBox: {
      height: 45,
      borderTop: `1px solid ${palette.grey[300]}`,
    },
  };
});
