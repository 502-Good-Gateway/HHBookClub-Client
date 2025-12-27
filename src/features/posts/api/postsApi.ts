import api from '../../../api/axios';
import type { ApiResponse } from '../../../types/api';
import type {
    PostSummary,
    PostDetail,
    PostListParams,
    CreatePostRequest,
    UpdatePostRequest,
    PaginatedResponse,
} from '../types';

/**
 * Fetches paginated list of posts
 */
export const fetchPosts = async (
    params: PostListParams = {}
): Promise<PaginatedResponse<PostSummary>> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await api.get<ApiResponse<any>>(
        '/api/posts',
        { params }
    );
    const data = response.data.data;
    return {
        ...data,
        content: data.content || data.posts || [],
    };
};

/**
 * Fetches a single post by ID
 */
export const fetchPostById = async (id: number): Promise<PostDetail> => {
    const response = await api.get<ApiResponse<PostDetail>>(`/api/posts/${id}`);
    return response.data.data;
};

/**
 * Creates a new post
 */
export const createPost = async (
    data: CreatePostRequest
): Promise<PostDetail> => {
    const response = await api.post<ApiResponse<PostDetail>>('/api/posts', data);
    return response.data.data;
};

/**
 * Updates an existing post
 */
export const updatePost = async (
    id: number,
    data: UpdatePostRequest
): Promise<PostDetail> => {
    const response = await api.patch<ApiResponse<PostDetail>>(
        `/api/posts/${id}`,
        data
    );
    return response.data.data;
};

/**
 * Deletes a post by ID
 */
export const deletePost = async (id: number): Promise<void> => {
    await api.delete(`/api/posts/${id}`);
};
