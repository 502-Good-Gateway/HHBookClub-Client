export interface Author {
    id: number;
    nickname: string;
    profileImage: string | null;
}

/**
 * Post item in list view (summary)
 */
export interface PostSummary {
    id: number;
    title: string;
    author: Author;
    createdAt: string;
    views: number;
    commentCount: number;
}

/**
 * Post detail view (full content)
 */
export interface PostDetail {
    id: number;
    title: string;
    author: Author;
    content: string;
    contentFormat: 'MD' | 'HTML';
    createdAt: string;
    views: number;
    upvotes: number;
    downvotes: number;
}

/**
 * Request body for creating a post
 */
export interface CreatePostRequest {
    title: string;
    content: string;
    contentFormat?: 'MD' | 'HTML';
}

/**
 * Request body for updating a post
 */
export interface UpdatePostRequest {
    title?: string;
    content?: string;
    contentFormat?: 'MD' | 'HTML';
}

/**
 * Query params for fetching post list
 */
export interface PostListParams {
    page?: number;
    limit?: number;
    sort?: 'latest' | 'oldest' | 'popular';
    search?: string;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}
