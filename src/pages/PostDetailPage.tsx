import { useParams, Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

// Mock data
const mockPost = {
    id: 101234,
    title: '첫 번째 게시글입니다',
    author: '독서가',
    date: '2025.12.22 12:45:30',
    content: `안녕하세요, 이것은 첫 번째 게시글의 전체 내용입니다.

블로그 스타일로 깔끔하게 보여주는 것이 목표입니다.
여러 줄의 텍스트도 잘 표시되어야 합니다.

이렇게 단락을 나눠서 작성할 수도 있습니다.`,
    views: 124,
    upvotes: 15,
    downvotes: 2,
}

const mockComments = [
    { id: 1, author: '책벌레', content: '좋은 글이네요', date: '12:50' },
    { id: 2, author: '김철수', content: '잘 읽었습니다', date: '12:55' },
    { id: 3, author: '독서왕', content: '추천합니다', date: '13:00' },
]

export default function PostDetailPage() {
    const { id: _id } = useParams()

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
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{mockPost.title}</h1>
                        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>닉네임: <span className="text-gray-700 dark:text-gray-300">{mockPost.author}</span></span>
                            <span>작성일: {mockPost.date}</span>
                            <span>조회: {mockPost.views}</span>
                            <span>추천: {mockPost.upvotes}</span>
                        </div>
                    </div>

                    {/* Post Body */}
                    <div className="p-6 min-h-[200px] text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line border-b border-gray-200 dark:border-gray-700">
                        {mockPost.content}
                    </div>

                    {/* Vote Buttons */}
                    <div className="flex justify-center gap-4 py-4 bg-gray-50 dark:bg-gray-700/50">
                        <button className="flex flex-col items-center px-6 py-2 border border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <span className="text-lg">▲</span>
                            <span className="text-sm font-bold">{mockPost.upvotes}</span>
                        </button>
                        <button className="flex flex-col items-center px-6 py-2 border border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <span className="text-lg">▼</span>
                            <span className="text-sm font-bold">{mockPost.downvotes}</span>
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <span className="font-bold text-sm text-gray-700 dark:text-gray-300">댓글 {mockComments.length}개</span>
                    </div>
                    <ul>
                        {mockComments.map((comment) => (
                            <li key={comment.id} className="p-3 border-b border-gray-100 dark:border-gray-700 text-sm">
                                <div className="flex gap-2 mb-1">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {comment.author}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-500">{comment.date}</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Comment Input */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50">
                        <textarea
                            placeholder="댓글을 입력하세요"
                            className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded resize-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                            rows={2}
                        />
                        <div className="flex justify-end mt-2">
                            <button className="px-4 py-1.5 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500">
                                등록
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-4">
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        목록
                    </Link>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            수정
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
