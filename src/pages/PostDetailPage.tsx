import { useParams, Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

// Mock data
const mockPost = {
    id: 1,
    title: '첫 번째 게시글입니다',
    author: '홍길동',
    date: '2025-12-22',
    content: `
안녕하세요, 이것은 첫 번째 게시글의 전체 내용입니다.

블로그 스타일로 깔끔하게 보여주는 것이 목표입니다.
여러 줄의 텍스트도 잘 표시되어야 합니다.

이렇게 단락을 나눠서 작성할 수도 있습니다.
  `,
    views: 124,
}

export default function PostDetailPage() {
    const { id: _id } = useParams()

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-card)] backdrop-blur-sm">
                <Link to="/" className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                    📚 HHBookClub
                </Link>
                <nav className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        to="/"
                        className="px-4 py-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        ← 목록으로
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
                <article className="bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] p-8">
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                        {mockPost.title}
                    </h1>
                    <div className="flex gap-4 text-sm text-[var(--color-text-muted)] pb-6 border-b border-[var(--color-border)] mb-6">
                        <span className="font-medium text-[var(--color-primary)]">{mockPost.author}</span>
                        <span>{mockPost.date}</span>
                        <span>👁 {mockPost.views}</span>
                    </div>
                    <div className="text-[var(--color-text)] leading-relaxed whitespace-pre-line">
                        {mockPost.content}
                    </div>
                </article>
            </main>
        </div>
    )
}
