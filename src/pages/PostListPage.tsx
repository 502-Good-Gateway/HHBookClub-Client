import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import type { Post } from '../types'

// Mock data
const mockPosts: Post[] = [
    { id: 101234, title: '첫 번째 게시글입니다', author: '독서가', date: '12:45', views: 124, excerpt: '' },
    { id: 101233, title: '두 번째 게시글 - React 사용법', author: '김철수', date: '12:30', views: 89, excerpt: '' },
    { id: 101232, title: '세 번째 게시글 - TypeScript 기초', author: '개발자A', date: '11:55', views: 256, excerpt: '' },
    { id: 101231, title: '네 번째 게시글 - Tailwind CSS 완벽 가이드', author: '코딩왕', date: '11:20', views: 512, excerpt: '' },
    { id: 101230, title: '다섯 번째 게시글 - Next.js 14 업데이트 정리', author: '프론트엔드', date: '10:45', views: 1024, excerpt: '' },
    { id: 101229, title: '여섯 번째 게시글 - 개발자 취업 후기', author: '취준생', date: '10:15', views: 2048, excerpt: '' },
    { id: 101228, title: '일곱 번째 게시글 - 알고리즘 공부법', author: '알고리즘러', date: '09:30', views: 789, excerpt: '' },
    { id: 101227, title: '여덟 번째 게시글 - 프론트엔드 로드맵 2025', author: '시니어', date: '25.12.21', views: 3500, excerpt: '' },
]

export default function PostListPage() {
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
                        {mockPosts.map((post) => (
                            <tr key={post.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="py-2.5 px-3 text-center text-gray-400 dark:text-gray-500 text-xs">{post.id}</td>
                                <td className="py-2.5 px-3">
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white hover:underline"
                                    >
                                        {post.title}
                                        <span className="ml-1 text-gray-500 dark:text-gray-400 font-bold">[3]</span>
                                    </Link>
                                </td>
                                <td className="py-2.5 px-3 text-center text-xs">
                                    <span className="text-gray-600 dark:text-gray-300">{post.author}</span>
                                </td>
                                <td className="py-2.5 px-3 text-center text-gray-400 dark:text-gray-500 text-xs">{post.date}</td>
                                <td className="py-2.5 px-3 text-center text-gray-500 dark:text-gray-400 text-xs">{post.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center gap-1 mt-6">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        ◀ 이전
                    </button>
                    {[1, 2, 3, 4, 5].map((page) => (
                        <button
                            key={page}
                            className={`px-3 py-1.5 text-sm border rounded ${page === 1
                                ? 'bg-gray-700 dark:bg-gray-600 text-white border-gray-700 dark:border-gray-600'
                                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        다음 ▶
                    </button>
                </div>
            </div>
        </div>
    )
}
