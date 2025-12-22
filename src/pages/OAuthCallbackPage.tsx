import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../features/auth/hooks/useAuthStore';

/**
 * OAuth Callback Page
 * Handles redirect from backend after Google OAuth2 login.
 * Extracts accessToken and refreshToken from URL params, stores them, then redirects to home.
 */
export default function OAuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuthStore();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (accessToken) {
            login(accessToken);
            navigate('/', { replace: true });
        } else {
            // If accessToken is missing, redirect to home
            console.error('OAuth callback: Missing accessToken');
            navigate('/', { replace: true });
        }
    }, [searchParams, login, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 dark:border-gray-300 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">로그인 처리 중...</p>
            </div>
        </div>
    );
}
