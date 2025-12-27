import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { useAuthStore } from '../features/auth/hooks/useAuthStore'
import { useMyProfile, useUpdateMyProfile } from '../features/users/hooks/useUsers'
import { useImageUpload } from '../features/upload/hooks/useImageUpload'
import GoogleLoginButton from '../features/auth/components/GoogleLoginButton'

// Available genres for selection
const AVAILABLE_GENRES = [
    'NOVEL',
    'ESSAY',
    'SF',
    'FANTASY',
    'MYSTERY',
    'ROMANCE',
    'HISTORY',
    'SCIENCE',
    'PHILOSOPHY',
    'SELF_HELP',
]

const genreDisplayNames: Record<string, string> = {
    NOVEL: '소설',
    ESSAY: '에세이',
    SF: 'SF',
    FANTASY: '판타지',
    MYSTERY: '미스터리',
    ROMANCE: '로맨스',
    HISTORY: '역사',
    SCIENCE: '과학',
    PHILOSOPHY: '철학',
    SELF_HELP: '자기계발',
}

export default function MyPage() {
    const { isAuthenticated } = useAuthStore()
    const { data: profile, isLoading, isError } = useMyProfile()
    const updateProfileMutation = useUpdateMyProfile()
    const { isUploading, upload } = useImageUpload()

    const [isEditing, setIsEditing] = useState(false)
    const [nickname, setNickname] = useState('')
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [profileImage, setProfileImage] = useState<string | null>(null)

    // Populate form when profile loads
    useEffect(() => {
        if (profile) {
            setNickname(profile.nickname)
            setSelectedGenres(profile.favoriteGenres)
            setProfileImage(profile.profileImage)
        }
    }, [profile])

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const uploadedUrl = await upload(file)
        if (uploadedUrl) {
            setProfileImage(uploadedUrl)
        }
    }

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        )
    }

    const handleSave = async () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력해주세요.')
            return
        }

        try {
            await updateProfileMutation.mutateAsync({
                nickname: nickname.trim(),
                profileImage: profileImage ?? undefined,
                favoriteGenres: selectedGenres,
            })
            setIsEditing(false)
            alert('프로필이 수정되었습니다.')
        } catch {
            alert('프로필 수정에 실패했습니다.')
        }
    }

    const handleCancel = () => {
        if (profile) {
            setNickname(profile.nickname)
            setSelectedGenres(profile.favoriteGenres)
            setProfileImage(profile.profileImage)
        }
        setIsEditing(false)
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
                            마이페이지를 이용하려면 로그인이 필요합니다.<br />
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
                        <span>프로필을 불러오는 중...</span>
                    </div>
                </div>
            </div>
        )
    }

    // Error State
    if (isError || !profile) {
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
                        <span className="text-lg font-medium">프로필을 불러오는데 실패했습니다.</span>
                        <Link
                            to="/"
                            className="mt-4 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        <li className="py-2.5 border-b-2 border-white">마이페이지</li>
                    </ul>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">내 프로필</h1>

                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden mb-3">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="프로필"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400 dark:text-gray-500">
                                    👤
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <label className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                                {isUploading ? '업로드 중...' : '이미지 변경'}
                            </label>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="space-y-4">
                        {/* Email (read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                이메일
                            </label>
                            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                        </div>

                        {/* Nickname */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                닉네임
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500"
                                />
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">{profile.nickname}</p>
                            )}
                        </div>

                        {/* Favorite Genres */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                관심 장르
                            </label>
                            {isEditing ? (
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_GENRES.map((genre) => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => handleGenreToggle(genre)}
                                            className={`px-3 py-1 text-sm rounded-full border ${selectedGenres.includes(genre)
                                                ? 'bg-gray-700 dark:bg-gray-600 text-white border-gray-700 dark:border-gray-600'
                                                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {genreDisplayNames[genre] || genre}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {(profile.favoriteGenres?.length ?? 0) > 0 ? (
                                        profile.favoriteGenres?.map((genre) => (
                                            <span
                                                key={genre}
                                                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                            >
                                                {genreDisplayNames[genre] || genre}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 dark:text-gray-500">설정된 장르가 없습니다.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={updateProfileMutation.isPending || isUploading}
                                    className="px-4 py-2 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50"
                                >
                                    {updateProfileMutation.isPending ? '저장 중...' : '저장'}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 text-sm bg-gray-700 dark:bg-gray-600 text-white rounded hover:bg-gray-800 dark:hover:bg-gray-500"
                            >
                                수정
                            </button>
                        )}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-4">
                    <Link
                        to="/"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        ← 홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    )
}
