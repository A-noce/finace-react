import { useState } from "react";

interface UseModalProps<T> {
  initialState?: T;
}

export const useModal = <T>({ initialState }: UseModalProps<T>) => {
  const [modal, setModal] = useState({
    open: false,
    data: initialState,
  });

  const onOpen = (data?: T) => {
    setModal({
      open: true,
      data,
    });
  };

  const onClose = (data?: T) => {
    setModal({
      open: true,
      data,
    });
  };

  return {
    onOpen,
    onClose,
    ...modal
  }
};
