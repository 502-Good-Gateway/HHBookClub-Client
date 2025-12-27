import { Link } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from '../components/ThemeToggle'
import LoginDialog from '../features/auth/components/LoginDialog'
import { useAuthStore } from '../features/auth/hooks/useAuthStore'
import { usePostList } from '../features/posts/hooks/usePosts'

/**
 * Formats date string for display
 * Shows time if today, otherwise shows date
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) {
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' })
}

export default function PostListPage() {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const { isAuthenticated, logout } = useAuthStore()

    const { data, isLoading, isError, error } = usePostList({
        page: currentPage,
        limit: 20,
        sort: 'latest',
    })

    const handleLogout = () => {
        logout()
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    // Generate page numbers for pagination
    const getPageNumbers = (): number[] => {
        if (!data) return [1]
        const totalPages = data.totalPages
        const current = currentPage
        const pages: number[] = []

        let start = Math.max(1, current - 2)
        const end = Math.min(totalPages, start + 4)

        if (end - start < 4) {
            start = Math.max(1, end - 4)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Top Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-700 dark:text-gray-200">
                        📚 HHBookClub
                    </Link>
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/my"
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    마이페이지
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsLoginDialogOpen(true)}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                로그인
                            </button>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="bg-gray-700 dark:bg-gray-800 text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <ul className="flex gap-6 text-sm font-medium">
                        <li className="py-2.5 border-b-2 border-white">게시판</li>
                    </ul>
                </div>
            </nav>

            {/* Gallery Header */}
            <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">📋 게시글</h1>
                    <Link
                        to="/write"
                        className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
                    >
                        글쓰기
                    </Link>
                </div>
            </div>

            {/* Post Table */}
            <div className="max-w-5xl mx-auto px-4 pb-8">
                <table className="w-full text-sm border-t-2 border-gray-400 dark:border-gray-500">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="py-2 px-3 text-center text-gray-600 dark:text-gray-400 font-medium w-16">번호</th>
                            <th className="py-2 px-3 text-left text-gray-600 dark:text-gray-400 font-medium">제목</th>
                            <th className="py-2 px-3 text-center text-gray-600 dark:text-gray-400 font-medium w-24">닉네임</th>
                            <th className="py-2 px-3 text-center text-gray-600 dark:text-gray-400 font-medium w-20">작성일</th>
                            <th className="py-2 px-3 text-center text-gray-600 dark:text-gray-400 font-medium w-16">조회</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        {/* Loading State */}
                        {isLoading && (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
                                        <span>게시글을 불러오는 중...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Error State */}
                        {isError && (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-red-500 dark:text-red-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-2xl">⚠️</span>
                                        <span>게시글을 불러오는데 실패했습니다.</span>
                                        <span className="text-sm text-gray-500">
                                            {error instanceof Error ? error.message : '알 수 없는 오류'}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Empty State */}
                        {!isLoading && !isError && data?.content?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-2xl">📭</span>
                                        <span>아직 작성된 게시글이 없습니다.</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {/* Data State */}
                        {!isLoading && !isError && data?.content?.map((post) => (
                            <tr key={post.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="py-2.5 px-3 text-center text-gray-400 dark:text-gray-500 text-xs">{post.id}</td>
                                <td className="py-2.5 px-3">
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white hover:underline"
                                    >
                                        {post.title}
                                        {post.commentCount > 0 && (
                                            <span className="ml-1 text-gray-500 dark:text-gray-400 font-bold">
                                                [{post.commentCount}]
                                            </span>
                                        )}
                                    </Link>
                                </td>
                                <td className="py-2.5 px-3 text-center text-xs">
                                    <span className="text-gray-600 dark:text-gray-300">{post.author.nickname}</span>
                                </td>
                                <td className="py-2.5 px-3 text-center text-gray-400 dark:text-gray-500 text-xs">
                                    {formatDate(post.createdAt)}
                                </td>
                                <td className="py-2.5 px-3 text-center text-gray-500 dark:text-gray-400 text-xs">{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {data && data.totalPages > 1 && (
                    <div className="flex justify-center gap-1 mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={data.first}
                            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ◀ 이전
                        </button>
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1.5 text-sm border rounded ${page === currentPage
                                    ? 'bg-gray-700 dark:bg-gray-600 text-white border-gray-700 dark:border-gray-600'
                                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={data.last}
                            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            다음 ▶
                        </button>
                    </div>
                )}
            </div>

            <LoginDialog
                isOpen={isLoginDialogOpen}
                onClose={() => setIsLoginDialogOpen(false)}
            />
        </div>
    )
}
