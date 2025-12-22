import React from 'react';

/**
 * GoogleLoginButton component
 * Redirects the user to the backend Google OAuth2 authorization endpoint.
 */
const GoogleLoginButton: React.FC = () => {
    const handleLogin = () => {
        const backendBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        window.location.href = `${backendBaseUrl}/oauth2/authorization/google`;
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Google로 로그인
            </span>
        </button>
    );
};

export default GoogleLoginButton;
