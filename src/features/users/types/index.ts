// Users feature types

/**
 * User profile data
 */
export interface UserProfile {
    id: number;
    email: string;
    nickname: string;
    profileImage: string | null;
    favoriteGenres: string[];
}

/**
 * Request body for updating user profile
 */
export interface UpdateUserProfileRequest {
    nickname?: string;
    profileImage?: string;
    favoriteGenres?: string[];
}
