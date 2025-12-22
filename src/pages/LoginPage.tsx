import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="w-full max-w-md bg-[var(--color-bg-card)] rounded-3xl p-10 border border-[var(--color-border)] shadow-[var(--shadow-card)]">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        to="/"
                        className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                        📚 HHBookClub
                    </Link>
                    <ThemeToggle />
                </div>

                <h1 className="text-2xl font-bold text-center text-[var(--color-text)] mb-8">
                    로그인
                </h1>

                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-[var(--color-text-muted)]"
                        >
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일을 입력하세요"
                            className="px-4 py-3.5 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all duration-200"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-[var(--color-text-muted)]"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            className="px-4 py-3.5 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="py-3.5 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all duration-200"
                    >
                        로그인
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
                    <span>계정이 없으신가요?</span>
                    <Link
                        to="/signup"
                        className="ml-2 text-[var(--color-primary)] font-semibold hover:underline"
                    >
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    )
}
