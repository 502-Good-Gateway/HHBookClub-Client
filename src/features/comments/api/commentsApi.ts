import api from '../../../api/axios';
import type { ApiResponse } from '../../../types/api';
import type { Comment, CreateCommentRequest, UpdateCommentRequest } from '../types';



/**
 * Fetches all comments for a post
 */
/**
 * Fetches all comments for a post
 */
export const fetchComments = async (postId: number): Promise<Comment[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.get<ApiResponse<any>>(
        `/api/posts/${postId}/comments`
    );
    return response.data.data.comments || [];
};

/**
 * Creates a new comment on a post
 */
export const createComment = async (
    postId: number,
    data: CreateCommentRequest
): Promise<Comment> => {
    const response = await api.post<ApiResponse<Comment>>(
        `/api/posts/${postId}/comments`,
        data
    );
    return response.data.data;
};

/**
 * Updates an existing comment
 */
export const updateComment = async (
    commentId: number,
    data: UpdateCommentRequest
): Promise<Comment> => {
    const response = await api.patch<ApiResponse<Comment>>(
        `/api/comments/${commentId}`,
        data
    );
    return response.data.data;
};

/**
 * Deletes a comment
 */
export const deleteComment = async (commentId: number): Promise<void> => {
    await api.delete(`/api/comments/${commentId}`);
};
