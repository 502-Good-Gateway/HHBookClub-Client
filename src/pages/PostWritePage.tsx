import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ThemeToggle from '../components/ThemeToggle'
import { useCreatePost } from '../features/posts/hooks/usePosts'
import { useAuthStore } from '../features/auth/hooks/useAuthStore'
import { useImageUpload } from '../features/upload/hooks/useImageUpload'
import GoogleLoginButton from '../features/auth/components/GoogleLoginButton'

export default function PostWritePage() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthStore()
    const createPostMutation = useCreatePost()
    const { upload } = useImageUpload()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPreviewMode, setIsPreviewMode] = useState(false)

    // Key for local storage
    const TEMP_POST_KEY = 'temp_post_write'

    // 1. Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem(TEMP_POST_KEY)
        if (savedData) {
            if (window.confirm('작성 중이던 글이 있습니다. 불러오시겠습니까?')) {
                const { title, content } = JSON.parse(savedData)
                setTitle(title)
                setContent(content)
            } else {
                localStorage.removeItem(TEMP_POST_KEY)
            }
        }
    }, [])

    // 2. Auto-save when title or content changes
    useEffect(() => {
        if (title.trim() || content.trim()) {
            localStorage.setItem(TEMP_POST_KEY, JSON.stringify({ title, content }))
        } else {
            localStorage.removeItem(TEMP_POST_KEY)
        }
    }, [title, content])

    // 3. Warn before unloading (refresh/close)
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (title.trim() || content.trim()) {
                e.preventDefault()
                e.returnValue = '' // Chrome requires returnValue to be set
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [title, content])

    const handleImageUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) return

        // Use a transparent 1x1 pixel gif as a placeholder to avoid "empty src" warning in console
        const loadingImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        const placeholder = `![업로드 중... ${file.name}](${loadingImage})`
        const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement

        if (textarea) {
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const textBefore = content.substring(0, start)
            const textAfter = content.substring(end)
            setContent(textBefore + placeholder + textAfter)
        } else {
            setContent(prev => prev + '\n' + placeholder)
        }

        try {
            const url = await upload(file)
            if (url) {
                const markdownImage = `![${file.name}](${url})`
                setContent(prev => prev.replace(placeholder, markdownImage))
            } else {
                setContent(prev => prev.replace(placeholder, `[이미지 업로드 실패: ${file.name}]`))
            }
        } catch {
            setContent(prev => prev.replace(placeholder, `[이미지 업로드 실패: ${file.name}]`))
        }
    }

    const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            await Promise.all(files.map(file => handleImageUpload(file)))
        }
    }

    const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = e.clipboardData.items
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile()
                if (file) {
                    e.preventDefault()
                    await handleImageUpload(file)
                }
            }
        }
    }

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
            const newPost = await createPostMutation.mutateAsync({
                title: title.trim(),
                content: content.trim(),
                contentFormat: 'MD',
            })
            // Clear temp data on success
            localStorage.removeItem(TEMP_POST_KEY)
            navigate(`/posts/${newPost.id}`)
        } catch {
            alert('게시글 작성에 실패했습니다.')
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
                            게시글을 작성하려면 로그인이 필요합니다.<br />
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
                        <li className="py-2.5 border-b-2 border-white">글쓰기</li>
                    </ul>
                </div>
            </nav>

            {/* Write Form */}
            <div className={`mx-auto px-4 py-6 ${isPreviewMode ? 'max-w-[90%]' : 'max-w-5xl'}`}>
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

                        {/* Toolbar */}
                        <div className="flex justify-end border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                            <button
                                type="button"
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className={`px-3 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${isPreviewMode
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span>{isPreviewMode ? '👁️ 미리보기 끄기' : '👁️ 미리보기'}</span>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className={`p-4 ${isPreviewMode ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
                            {/* Editor */}
                            <div className={isPreviewMode ? 'h-full' : ''}>
                                <textarea
                                    name="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    onDrop={handleDrop}
                                    onPaste={handlePaste}
                                    placeholder="내용을 입력하세요. Markdown을 지원합니다. (이미지를 드래그하거나 붙여넣어 업로드하세요)"
                                    className={`w-full text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none resize-none placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed font-mono ${isPreviewMode ? 'min-h-[600px] h-full' : 'min-h-[400px]'
                                        }`}
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Preview */}
                            {isPreviewMode && (
                                <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 pt-4 lg:pt-0 lg:pl-4 min-h-[400px] lg:min-h-[600px]">
                                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Preview</h3>
                                    <div className="prose dark:prose-invert max-w-none break-words overflow-y-auto h-full max-h-[600px]">
                                        {content ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {content}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="text-gray-400 dark:text-gray-500 italic text-sm">
                                                작성된 내용이 여기에 미리보기로 표시됩니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                        <Link
                            to="/"
                            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            취소
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? '등록 중...' : '등록'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
