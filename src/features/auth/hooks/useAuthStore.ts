import { useState, useCallback } from 'react';
import type { User, AuthState } from '../types';

const AUTH_STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    USER: 'user',
} as const;

/**
 * Custom hook for managing authentication state.
 * Persists accessToken and user to localStorage.
 */
export function useAuthStore() {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        const userJson = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
        const user = userJson ? (JSON.parse(userJson) as User) : null;

        return {
            isAuthenticated: !!accessToken,
            user,
            accessToken,
        };
    });

    const login = useCallback((accessToken: string, user?: User) => {
        localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
        }

        setAuthState({
            isAuthenticated: true,
            user: user ?? null,
            accessToken,
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);

        setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
        });
    }, []);

    const updateTokens = useCallback((accessToken: string) => {
        localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

        setAuthState((prev) => ({
            ...prev,
            accessToken,
        }));
    }, []);

    return {
        ...authState,
        login,
        logout,
        updateTokens,
    };
}
