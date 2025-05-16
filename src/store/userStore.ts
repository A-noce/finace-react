
import { createStore } from "zustand-x";
import { StatusEnum } from "../typing/generic";

interface UserStore {
  isLogged: boolean;
  pageStatus: StatusEnum;
  data: any;
}

const userStore = createStore<UserStore>({
  isLogged: true,
  pageStatus: StatusEnum.IDLE,
  data: null,
},{
  name: 'user-store'
}).extendActions(({ set,  }) => ({
  setLogged: (state: boolean) => set('isLogged', state),
  changePageStatus: (newStatus: StatusEnum) => set('pageStatus', newStatus)
}))

export default userStore;
