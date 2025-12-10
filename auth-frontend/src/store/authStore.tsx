import { create } from "zustand";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    user: null | { id: string; fullName: string; email: string };
    error: null | string;
    isLoading: boolean;
    isCheckingAuth: boolean;
    signup: (fullName: string, email: string, password: string) => Promise<unknown>;
}

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,

    signup: async (fullName: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name: fullName,
                email,
                password,
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response ? error.response.data : null : null;
            set({ error: errorResponse?.message || "Signup failed", isLoading: false });
            throw errorResponse;
        }
    },
}));