import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { usePostDetail, useUpdatePost } from '../features/posts/hooks/usePosts'
import { useAuthStore } from '../features/auth/hooks/useAuthStore'
import GoogleLoginButton from '../features/auth/components/GoogleLoginButton'

export default function PostEditPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const postId = Number(id) || 0

    const { isAuthenticated } = useAuthStore()
    const { data: post, isLoading, isError, error } = usePostDetail(postId)
    const updatePostMutation = useUpdatePost()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Populate form when post data loads
    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setContent(post.content)
        }
    }, [post])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            alert('제목을 입력해주세요.')
            return
        }

        if (!content.trim()) {
            alert('내용을 입력해주세요.')
            return
        }

        setIsSubmitting(true)

        try {
            await updatePostMutation.mutateAsync({
                id: postId,
                data: {
                    title: title.trim(),
                    content: content.trim(),
                    contentFormat: 'MD',
                },
            })
            navigate(`/posts/${postId}`)
        } catch {
            alert('게시글 수정에 실패했습니다.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold text-gray-700 dark:text-gray-200">
                            📚 HHBookClub
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>
                <div className="max-w-5xl mx-auto px-4 py-12 flex items-center justify-center">
                    <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm text-center">
                        <span className="text-4xl mb-4 block">🔒</span>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">로그인이 필요합니다</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                            게시글을 수정하려면 로그인이 필요합니다.<br />
                            구글 계정으로 간편하게 시작해보세요!
                        </p>
                        <GoogleLoginButton />
                        <Link
                            to="/"
                            className="mt-6 inline-block text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:underline"
                        >
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold text-gray-700 dark:text-gray-200">
                            📚 HHBookClub
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400">
                        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-gray-600 dark:border-t-gray-300 rounded-full animate-spin" />
                        <span>게시글을 불러오는 중...</span>
                    </div>
                </div>
            </div>
        )
    }

    // Error State
    if (isError || !post) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold text-gray-700 dark:text-gray-200">
                            📚 HHBookClub
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>
                <div className="max-w-5xl mx-auto px-4 py-12">
                    <div className="flex flex-col items-center gap-4 text-red-500 dark:text-red-400">
                        <span className="text-4xl">⚠️</span>
                        <span className="text-lg font-medium">게시글을 불러오는데 실패했습니다.</span>
                        <span className="text-sm text-gray-500">
                            {error instanceof Error ? error.message : '게시글을 찾을 수 없습니다.'}
                        </span>
                        <Link
                            to="/"
                            className="mt-4 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            목록으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        )
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
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="bg-gray-700 dark:bg-gray-800 text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <ul className="flex gap-6 text-sm font-medium">
                        <li className="py-2.5 border-b-2 border-white">글 수정</li>
                    </ul>
                </div>
            </nav>

            {/* Edit Form */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        {/* Title Input */}
                        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                className="w-full text-lg font-medium text-gray-800 dark:text-gray-100 bg-transparent border-none outline-none placeholder-gray-400 dark:placeholder-gray-500"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Content Input */}
                        <div className="p-4">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="내용을 입력하세요. Markdown을 지원합니다."
                                className="w-full min-h-[400px] text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none resize-none placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                        <Link
                            to={`/posts/${postId}`}
                            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            취소
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '수정 중...' : '수정'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
