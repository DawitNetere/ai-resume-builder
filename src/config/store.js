import { create } from "zustand";

const userStore = (set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) => set({ user: { ...get().user, ...data } }),
  reset: () => set({ user: null }),
});

const userDocStore = (set) => ({
  userDoc: null,
  setUserDoc: (userDoc) => set({ userDoc }),
  reset: () => set({ userDoc: null }),
});

export const useUserStore = create(userStore);
export const useUserDocStore = create(userDocStore);
