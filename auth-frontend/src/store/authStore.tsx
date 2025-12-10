import { create } from "zustand";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    user: null | { id: string; fullName: string; email: string, isVerified: boolean };
    error: null | string;
    isLoading: boolean;
    isCheckingAuth: boolean;
    signup: (fullName: string, email: string, password: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    checkAuth: () => Promise<void>;
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
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Signup failed", isLoading: false });
            throw errorResponse;
        }
    },

    verifyEmail: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {
                code
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Email verification failed", isLoading: false });
            throw errorResponse;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false, error: null });
        }
    },
}));