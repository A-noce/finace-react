import { useEffect } from "react";

export const useWindow = () => {
  const setPreventClose = (value: number) => {
    window.onbeforeunload = function () {
      console.log("executei!!!", value);
      console.log("executei!!!", value);
      console.log("executei!!!", value);
      console.log("executei!!!", value);
      return undefined;
    };
  };

  useEffect(
    () => () => {
      window.onbeforeunload = null;
    },
    []
  );

  return {
    setPreventClose,
  };
};
