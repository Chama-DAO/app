import { getDoc } from "@junobuild/core";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  getUser: async (id: any) => {
    const currentUser = await getDoc({
      collection: "users",
      key: id,
    });
    set((state: any) => ({
      user: {
        ...currentUser,
      },
    }));
  },
  setUser: (newUser: any) => {
    set((state: any) => ({
      user: {
        ...state,
        newUser,
      },
    }));
  },
}));
