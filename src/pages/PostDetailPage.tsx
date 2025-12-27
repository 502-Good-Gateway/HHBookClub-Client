import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ThemeToggle from '../components/ThemeToggle'
import { usePostDetail, useDeletePost } from '../features/posts/hooks/usePosts'
import { useAuthStore } from '../features/auth/hooks/useAuthStore'
import CommentSection from '../features/comments/components/CommentSection'

/**
 * Formats date string for display
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const postId = Number(id) || 0

    const { isAuthenticated } = useAuthStore()
    const { data: post, isLoading, isError, error } = usePostDetail(postId)
    const deletePostMutation = useDeletePost()

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return

        try {
            await deletePostMutation.mutateAsync(postId)
            navigate('/')
        } catch {
            alert('삭제에 실패했습니다.')
        }
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
                        <li className="py-2.5 border-b-2 border-white">게시판</li>
                    </ul>
                </div>
            </nav>

            {/* Post Content */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    {/* Post Header */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{post.title}</h1>
                        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>닉네임: <span className="text-gray-700 dark:text-gray-300">{post.author.nickname}</span></span>
                            <span>작성일: {formatDate(post.createdAt)}</span>
                            <span>조회: {post.views}</span>
                            <span>추천: {post.upvotes}</span>
                        </div>
                    </div>

                    {/* Post Body */}
                    <div className="p-6 min-h-[200px] border-b border-gray-200 dark:border-gray-700">
                        <article className="prose dark:prose-invert max-w-none break-words">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.content}
                            </ReactMarkdown>
                        </article>
                    </div>

                    {/* Vote Buttons */}
                    <div className="flex justify-center gap-4 py-4 bg-gray-50 dark:bg-gray-700/50">
                        <button className="flex flex-col items-center px-6 py-2 border border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <span className="text-lg">▲</span>
                            <span className="text-sm font-bold">{post.upvotes}</span>
                        </button>
                        <button className="flex flex-col items-center px-6 py-2 border border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <span className="text-lg">▼</span>
                            <span className="text-sm font-bold">{post.downvotes}</span>
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <CommentSection postId={postId} isAuthenticated={isAuthenticated} />

                {/* Navigation */}
                <div className="flex justify-between mt-4">
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        목록
                    </Link>
                    {isAuthenticated && (
                        <div className="flex gap-2">
                            <Link
                                to={`/posts/${postId}/edit`}
                                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                수정
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={deletePostMutation.isPending}
                                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                            >
                                {deletePostMutation.isPending ? '삭제 중...' : '삭제'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

