import { useState, useCallback } from 'react';
import { uploadImage } from '../api/uploadApi';

interface UseImageUploadReturn {
    isUploading: boolean;
    error: string | null;
    uploadedUrl: string | null;
    upload: (file: File) => Promise<string | null>;
    reset: () => void;
}

/**
 * Hook for handling image uploads to S3 via presigned URL
 */
export const useImageUpload = (): UseImageUploadReturn => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const upload = useCallback(async (file: File): Promise<string | null> => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드할 수 있습니다.');
            return null;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('파일 크기는 5MB 이하여야 합니다.');
            return null;
        }

        setIsUploading(true);
        setError(null);

        try {
            const imageUrl = await uploadImage(file);
            setUploadedUrl(imageUrl);
            return imageUrl;
        } catch (err) {
            console.error('이미지 업로드 에러:', err);
            const message =
                err instanceof Error ? err.message : '업로드에 실패했습니다.';
            setError(message);
            return null;
        } finally {
            setIsUploading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setIsUploading(false);
        setError(null);
        setUploadedUrl(null);
    }, []);

    return {
        isUploading,
        error,
        uploadedUrl,
        upload,
        reset,
    };
};
