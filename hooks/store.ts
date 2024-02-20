import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

interface UserState {
  user: User;
  setUserData: (data: User) => void;
  deleteUserData: () => void;
}

export const useStore = create(
  persist<UserState>(
    (set) => ({
      user: {
        id: "",
        name: "",
        username: "",
        email: "",
      },
      setUserData: (data) => set({ user: data }),
      deleteUserData: () =>
        set({
          user: {
            id: "",
            name: "",
            username: "",
            email: "",
          },
        }),
    }),
    {
      name: "auth",
    }
  )
);
