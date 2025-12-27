import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyProfile, updateMyProfile } from '../api/usersApi';
import type { UpdateUserProfileRequest } from '../types';

// Query key factory
export const userKeys = {
    all: ['users'] as const,
    me: () => [...userKeys.all, 'me'] as const,
};

/**
 * Hook for fetching current user's profile
 */
export const useMyProfile = () => {
    return useQuery({
        queryKey: userKeys.me(),
        queryFn: fetchMyProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook for updating current user's profile
 */
export const useUpdateMyProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserProfileRequest) => updateMyProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.me() });
        },
    });
};
