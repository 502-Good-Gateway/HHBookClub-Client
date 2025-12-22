import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-lg flex items-center justify-center cursor-pointer hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-primary)] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    )
}
