import api from '../../../api/axios';
import type { AuthResponse } from '../types';
import type { ApiResponse } from '../../../types/api';

/**
 * Requests a new access token using the refresh token (sent via cookie).
 */
export const refreshTokenApi = async (): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/refresh');
    return response.data.data;
};

/**
 * Logs out the user. Client should discard tokens after this call.
 */
export const logoutApi = async (): Promise<void> => {
    await api.post('/api/auth/logout');
};
