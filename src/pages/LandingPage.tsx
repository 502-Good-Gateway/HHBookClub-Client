import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="logo">HHBookClub</div>
                <nav>
                    <button className="btn-ghost">Login</button>
                    <button className="btn-primary">Get Started</button>
                </nav>
            </header>

            <main className="landing-hero">
                <h1 className="hero-title">
                    Elevate Your <br />
                    <span className="gradient-text">Reading Experience</span>
                </h1>
                <p className="hero-subtitle">
                    Join the exclusive community where knowledge meets networking.
                    Discover, discuss, and grow with HHBookClub.
                </p>
                <div className="hero-actions">
                    <button className="btn-primary large">Start Your Journey</button>
                    <button className="btn-secondary large">Learn More</button>
                </div>
            </main>

            <div className="landing-visual">
                {/* Placeholder for a cool 3D or visual element */}
                <div className="glow-sphere"></div>
            </div>
        </div>
    )
}
