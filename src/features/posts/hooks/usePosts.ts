import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost,
} from '../api/postsApi';
import type {
    PostListParams,
    CreatePostRequest,
    UpdatePostRequest,
} from '../types';

// Query key factory for consistent key management
export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
    list: (params: PostListParams) => [...postKeys.lists(), params] as const,
    details: () => [...postKeys.all, 'detail'] as const,
    detail: (id: number) => [...postKeys.details(), id] as const,
};

/**
 * Hook for fetching paginated post list
 */
export const usePostList = (params: PostListParams = {}) => {
    return useQuery({
        queryKey: postKeys.list(params),
        queryFn: () => fetchPosts(params),
    });
};

/**
 * Hook for fetching a single post detail
 */
export const usePostDetail = (id: number) => {
    return useQuery({
        queryKey: postKeys.detail(id),
        queryFn: () => fetchPostById(id),
        enabled: id > 0, // Only fetch if valid ID
    });
};

/**
 * Hook for creating a new post
 */
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePostRequest) => createPost(data),
        onSuccess: () => {
            // Invalidate list queries to refetch
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
        },
    });
};

/**
 * Hook for updating a post
 */
export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdatePostRequest }) =>
            updatePost(id, data),
        onSuccess: (_data, variables) => {
            // Invalidate both list and specific detail
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: postKeys.detail(variables.id),
            });
        },
    });
};

/**
 * Hook for deleting a post
 */
export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: (_data, id) => {
            // Invalidate list and remove specific detail from cache
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
            queryClient.removeQueries({ queryKey: postKeys.detail(id) });
        },
    });
};
