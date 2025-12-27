import type { Author } from '../../posts/types';

/**
 * Comment data structure
 */
export interface Comment {
    id: number;
    postId: number;
    author: Author;
    content: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Request body for creating a comment
 */
export interface CreateCommentRequest {
    content: string;
}

/**
 * Request body for updating a comment
 */
export interface UpdateCommentRequest {
    content: string;
}
