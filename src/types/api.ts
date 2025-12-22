// Standard API response structure from backend

export interface ApiResponse<T> {
    status: 'SUCCESS' | 'FAIL' | 'ERROR';
    message: string;
    data: T;
}
