import { AxiosError } from "axios";
import { create } from "zustand";
import axios from "../lib/axios";

type User = {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  password?: string;
};

type userStoreType = {
  user: User | null;
  loading: boolean;

  login: (email: User["email"], password: User["password"]) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user });
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
    } finally {
      set({ loading: false });
    }
  },
}));
