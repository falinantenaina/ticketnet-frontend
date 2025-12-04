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
  errorMessage: string;

  login: (email: User["email"], password: User["password"]) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  user: null,
  loading: false,
  errorMessage: "",

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ errorMessage: err.response?.data.message || null });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
