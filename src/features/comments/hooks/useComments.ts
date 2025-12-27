import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
} from '../api/commentsApi';
import type { CreateCommentRequest, UpdateCommentRequest } from '../types';

// Query key factory for consistent key management
export const commentKeys = {
    all: ['comments'] as const,
    lists: () => [...commentKeys.all, 'list'] as const,
    list: (postId: number) => [...commentKeys.lists(), postId] as const,
};

/**
 * Hook for fetching comments of a post
 */
export const useComments = (postId: number) => {
    return useQuery({
        queryKey: commentKeys.list(postId),
        queryFn: () => fetchComments(postId),
        enabled: postId > 0,
    });
};

/**
 * Hook for creating a new comment
 */
export const useCreateComment = (postId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCommentRequest) => createComment(postId, data),
        onSuccess: () => {
            // Refetch comments for this post
            queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
        },
    });
};

/**
 * Hook for updating a comment
 */
export const useUpdateComment = (postId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            commentId,
            data,
        }: {
            commentId: number;
            data: UpdateCommentRequest;
        }) => updateComment(commentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
        },
    });
};

/**
 * Hook for deleting a comment
 */
export const useDeleteComment = (postId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
        },
    });
};
