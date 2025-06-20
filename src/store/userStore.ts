import { createStore } from "zustand-x";
import { Null, StatusEnum } from "@typing/generic";
import { User } from "@typing/user.type";

interface UserStore {
  isLogged: boolean;
  pageStatus: StatusEnum;
  user: User | null;
}

const userStore = createStore<UserStore>(
  {
    isLogged: false,
    pageStatus: StatusEnum.IDLE,
    user: null,
  },
  {
    name: "user-store",
  }
).extendActions(({ set }) => ({
  changePageStatus: (newStatus: StatusEnum) => set("pageStatus", newStatus),
  setUser: (user: Null<User>) => {
    set("user", user);
    console.log({user})
    set("isLogged", !!user);
  },
}));

export default userStore;
