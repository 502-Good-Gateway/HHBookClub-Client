// Auth Types - aligned with backend User entity and AuthResponseDto

export interface User {
    id: number;
    email: string;
    nickname: string;
    profileImage?: string;
    provider: string;
    favoriteGenres?: string;
}

export interface AuthTokens {
    accessToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string; // Opt-out from manual management, still present in DTO if needed
    user: User;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
}
