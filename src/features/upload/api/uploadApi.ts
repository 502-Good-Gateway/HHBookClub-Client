import api from '../../../api/axios';
import type { ApiResponse } from '../../../types/api';
import type { PresignedUrlResponse } from '../types';

/**
 * Gets a presigned URL for uploading an image to S3
 */
export const getPresignedUrl = async (
    filename: string,
    contentType: string = 'image/png'
): Promise<PresignedUrlResponse> => {
    const response = await api.get<ApiResponse<PresignedUrlResponse>>(
        '/api/upload/presigned-url',
        {
            params: { filename, contentType },
        }
    );
    return response.data.data;
};

/**
 * Uploads a file directly to S3 using the presigned URL
 * This bypasses the backend and uploads directly to S3
 */
export const uploadToS3 = async (
    presignedUrl: string,
    file: File
): Promise<void> => {
    await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });
};

/**
 * Complete upload flow: get presigned URL and upload file
 * Returns the final image URL to be stored
 */
export const uploadImage = async (file: File): Promise<string> => {
    // 1. Get presigned URL from backend
    const { presignedUrl, imageUrl } = await getPresignedUrl(
        file.name,
        file.type
    );

    // 2. Upload directly to S3
    await uploadToS3(presignedUrl, file);

    // 3. Return the permanent image URL
    return imageUrl;
};
