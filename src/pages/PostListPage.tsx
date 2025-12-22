import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import type { Post } from '../types'

// Mock data for now
const mockPosts: Post[] = [
    {
        id: 1,
        title: '첫 번째 게시글입니다',
        author: '홍길동',
        date: '2025-12-22',
        excerpt: '이것은 첫 번째 게시글의 미리보기입니다. 블로그 스타일로 깔끔하게 보여줍니다...',
        views: 124,
    },
    {
        id: 2,
        title: '두 번째 게시글 - React 사용법',
        author: '김철수',
        date: '2025-12-21',
        excerpt: 'React를 사용하여 웹 애플리케이션을 만드는 방법에 대해 알아봅니다...',
        views: 89,
    },
    {
        id: 3,
        title: '세 번째 게시글 - TypeScript 기초',
        author: '이영희',
        date: '2025-12-20',
        excerpt: 'TypeScript의 기본 문법과 사용법에 대해 설명합니다...',
        views: 256,
    },
]

export default function PostListPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-card)] backdrop-blur-sm">
                <Link to="/" className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                    📚 HHBookClub
                </Link>
                <nav className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        to="/write"
                        className="px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-all duration-200"
                    >
                        ✏️ 글쓰기
                    </Link>
                    <Link
                        to="/login"
                        className="px-5 py-2.5 border border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
                    >
                        로그인
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-8 text-[var(--color-text)]">
                    📋 게시판
                </h1>

                <ul className="flex flex-col gap-4">
                    {mockPosts.map((post) => (
                        <li
                            key={post.id}
                            className="group bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] hover:border-[var(--color-border-hover)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <Link to={`/posts/${post.id}`} className="block p-6">
                                <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
                                    <span className="font-medium text-[var(--color-primary)]">{post.author}</span>
                                    <span>{post.date}</span>
                                    <span className="ml-auto">👁 {post.views}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
