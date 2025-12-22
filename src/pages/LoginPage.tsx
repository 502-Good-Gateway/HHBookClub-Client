import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-700 dark:bg-gray-700 rounded-t-lg flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-white">
                        📚 HHBookClub
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="p-6">
                    <h1 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-6">로그인</h1>

                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                아이디
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="아이디를 입력하세요"
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호를 입력하세요"
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-gray-700 dark:bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
                        >
                            로그인
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        <span>계정이 없으신가요?</span>
                        <Link to="/signup" className="ml-1 text-gray-700 dark:text-gray-300 hover:underline">
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
