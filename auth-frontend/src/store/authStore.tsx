import { create } from "zustand";
import axios from "axios";

interface AuthState {
    isAuthenticated: boolean;
    user: null | { id: string; name: string; email: string, isVerified: boolean, lastLogin: string, createdAt: string };
    error: null | string;
    isLoading: boolean;
    isCheckingAuth: boolean;
    signup: (fullName: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, email: string, newPassword: string) => Promise<void>;
}

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
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
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

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email,
                password,
            });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Login failed", isLoading: false });
            throw errorResponse;
        }
    },

    verifyEmail: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify-email`, {
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
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false, error: null });
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Logout failed", isLoading: false });
            throw errorResponse;
        }
    },

    forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, {
                email,
            });
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Failed to send reset link", isLoading: false });
            throw errorResponse;
        }
    },

    resetPassword: async (token: string, email: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/reset-password?token=${token}&email=${email}`, {
                newPassword,
            });
            set({ isLoading: false });
        } catch (error: unknown) {
            const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
            set({ error: errorResponse?.message || "Password reset failed", isLoading: false });
            throw errorResponse;
        }
    },
}));