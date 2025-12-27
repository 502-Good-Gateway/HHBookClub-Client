import api from '../../../api/axios';
import type { ApiResponse } from '../../../types/api';
import type { UserProfile, UpdateUserProfileRequest } from '../types';

/**
 * Fetches current user's profile
 */
export const fetchMyProfile = async (): Promise<UserProfile> => {
    const response = await api.get<ApiResponse<UserProfile>>('/api/users/me');
    return response.data.data;
};

/**
 * Updates current user's profile
 */
export const updateMyProfile = async (
    data: UpdateUserProfileRequest
): Promise<void> => {
    await api.patch('/api/users/me', data);
};
