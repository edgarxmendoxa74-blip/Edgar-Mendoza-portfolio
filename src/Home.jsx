import React, { useState, useEffect } from 'react';
import {
    Star,
    Menu as MenuIcon,
    X,
    Instagram,
    Facebook,
    Utensils,
    Wine,
    Flame,
    Palette,
    Layers,
    Code,
    Zap,
    MapPin,
    Phone,
    Clock,
    CheckCircle,
    ArrowRight,
    TrendingUp,
    Users,
    Smartphone,
    ShoppingCart,
    MessageSquare,
    Target,
    BarChart3,
    Heart,
    Zap as FastIcon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── Service Data ─── */
const serviceCategories = [
    {
        name: 'Development',
        items: [
            { name: 'Custom Marketing Site', desc: 'Immersive, high-performance brand storytelling designed for conversion.', price: 'Consult' },
            { name: 'Digital Menu Engineering', desc: 'Sub-second interactions with optimized visual hierarchy to lift order value.', price: 'Consult' },
            { name: 'Reservation Systems', desc: 'Custom, white-label booking flows that integrate with your existing POS.', price: 'Consult' },
        ]
    },
    {
        name: 'Solutions',
        items: [
            { name: 'Direct Order Systems', desc: 'Cut third-party commissions with your own high-conversion ordering engine.', price: 'Consult' },
            { name: 'CRM & Guest Data', desc: 'Own your guest relationships with custom data capture and loyalty systems.', price: 'Consult' },
            { name: 'Payment Integrations', desc: 'Secure, multi-region payment processing tailored for hospitality ops.', price: 'Consult' },
        ]
    },
    {
        name: 'Growth',
        items: [
            { name: 'SEO & Speed Ops', desc: 'Rank #1 in local search and ensure pages load in under 1 second.', price: 'Consult' },
            { name: 'Content Strategy', desc: 'High-end visual storytelling and copywriting that sells the experience.', price: 'Consult' },
            { name: 'Systems Audit', desc: 'A deep-dive analysis of your current digital leakage and ROI bottlenecks.', price: 'Consult' },
        ]
    }
];

const BackgroundBalls = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[
            { size: '150px', top: '10%', left: '10%', color: 'var(--blue)', duration: 4 },
            { size: '120px', top: '70%', left: '80%', color: 'var(--accent-gold)', duration: 6 },
            { size: '100px', top: '30%', left: '60%', color: 'var(--blue)', duration: 3 },
            { size: '160px', top: '80%', left: '20%', color: 'var(--accent-gold)', duration: 8 },
            { size: '110px', top: '40%', left: '40%', color: 'var(--blue)', duration: 5 },
            { size: '130px', top: '15%', left: '75%', color: 'var(--blue)', duration: 4.5 },
            { size: '100px', top: '60%', left: '45%', color: 'var(--accent-gold)', duration: 7 },
        ].map((ball, i) => (
            <motion.div
                key={i}
                style={{
                    position: 'absolute',
                    width: ball.size,
                    height: ball.size,
                    borderRadius: '50%',
                    background: ball.color,
                    filter: 'blur(50px)',
                    opacity: 0.5,
                    top: ball.top,
                    left: ball.left,
                }}
                animate={{
                    y: [0, 150, 0],
                    x: i % 2 === 0 ? [0, 80, 0] : [0, -80, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: ball.duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        ))}
    </div>
);

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Development');
    const [businesses, setBusinesses] = useState([
        { name: 'ANTONIO\'S GROUP', image: null },
        { name: 'FOODEE GLOBAL', image: null },
        { name: 'THE BISTRO GROUP', image: null }
    ]);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const saved = localStorage.getItem('admin_businesses');
        if (saved) {
            const data = JSON.parse(saved).filter(b => b.name.toUpperCase() !== 'VINE & FIRE');
            setBusinesses(data);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ background: 'var(--dark)', minHeight: '100vh', color: 'var(--text)', position: 'relative' }}>
            <BackgroundBalls />

            {/* ═══════════ NAVIGATION ═══════════ */}
            <nav style={{
                position: 'fixed', width: '100%', zIndex: 50,
                transition: 'all 0.5s ease',
                background: scrolled ? 'var(--nav-bg)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : 'none',
                padding: scrolled ? '1rem 0' : '2rem 0',
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo - Text Only */}
                    <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="logo-text" style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.4rem',
                            color: 'var(--white)',
                            letterSpacing: '-0.01em',
                            textTransform: 'none',
                            fontWeight: 700
                        }}>
                            Edgar <span style={{ color: 'var(--blue)', fontWeight: 800, fontStyle: 'italic' }}>Mendoza</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">


                        <a href="#contact" className="btn btn-gold header-btn" style={{ padding: '0.65rem 1.4rem', fontSize: '0.6rem' }}>Contact Me</a>

                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer' }}
                    >
                        {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'var(--dark)', zIndex: 100,
                            padding: '6rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
                        }}
                    >


                        <a href="#contact" className="btn btn-gold" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center', padding: '1rem' }}>Contact Me</a>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════ HERO ═══════════ */}
            <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--dark)', overflow: 'hidden' }}>
                    {/* Bouncing Balls */}
                    {[
                        { size: '50px', top: '10%', left: '10%', color: 'var(--blue)', duration: 4 },
                        { size: '40px', top: '70%', left: '80%', color: 'var(--accent-gold)', duration: 6 },
                        { size: '30px', top: '30%', left: '60%', color: 'var(--blue)', duration: 3 },
                        { size: '60px', top: '80%', left: '20%', color: 'var(--accent-gold)', duration: 8 },
                        { size: '35px', top: '40%', left: '40%', color: 'var(--blue)', duration: 5 },
                        { size: '45px', top: '15%', left: '75%', color: 'var(--blue)', duration: 4.5 },
                        { size: '30px', top: '60%', left: '45%', color: 'var(--accent-gold)', duration: 7 },
                    ].map((ball, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: ball.size,
                                height: ball.size,
                                borderRadius: '50%',
                                background: ball.color,
                                filter: 'blur(40px)',
                                opacity: 0.4,
                                top: ball.top,
                                left: ball.left,
                            }}
                            animate={{
                                y: [0, 150, 0],
                                x: i % 2 === 0 ? [0, 80, 0] : [0, -80, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: ball.duration,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="container" style={{
                    position: 'relative', zIndex: 10, height: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}>

                        <p style={{ fontSize: '0.6rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '1.25rem', fontWeight: 700, opacity: 0.8 }}>
                            Growth Engineering
                        </p>
                        <h1 className="hero-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)', color: 'var(--white)', lineHeight: 1.25, marginBottom: '2rem', maxWidth: '850px' }}>
                            "If you do not fix your <span style={{ fontStyle: 'italic', textDecoration: 'underline', color: 'var(--accent-gold)' }}>menu</span>, you didn't know it is <span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>silently killing your profit."</span>
                        </h1>
                        <div className="hero-btns-wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '380px', margin: '0 auto' }}>
                            <a href="#about" className="btn btn-outline btn-hero" style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem' }}>Read More</a>
                            <a href="#contact" className="btn btn-gold btn-hero" style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem' }}>Inquire Me</a>
                            <a href="#menu" className="btn btn-gold btn-hero" style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem' }}>Try Sample Demo</a>
                            <a href="#gallery" className="btn btn-outline btn-hero" style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem' }}>View Sample Works</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ ABOUT ME ═══════════ */}
            <section id="about" className="section" style={{ background: 'var(--dark-2)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="about-grid">
                        <div style={{ position: 'relative', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--dark-2)', overflow: 'hidden' }}>
                            <img src="/edgar_portrait.jpg" alt="Edgar Mendoza" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div>
                            <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
                                About Me
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)', marginBottom: '2rem', lineHeight: 1.1 }}>
                                I engineer <br /><span style={{ fontStyle: 'italic' }}>Growth Engines.</span>
                            </h2>

                            <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                                I'm Edgar Mendoza, a full-stack developer and restaurant consultant specializing in bridging the gap between hospitality and technology.
                            </p>
                            <p style={{ color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '3rem' }}>
                                With a background in both culinary arts and software engineering, I provide unique digital solutions that don't just look pretty—they solve operational bottlenecks and maximize profitability for modern restaurants.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', margin: '4rem 0', borderTop: '1px solid var(--border)', paddingTop: '3rem' }} className="about-details-grid">
                                <div>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--white)', marginBottom: '1.5rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <MapPin size={18} color="var(--blue)" /> Portfolio Office
                                    </h4>
                                    <address style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, fontStyle: 'normal' }}>
                                        3rd Floor, High Street South<br />
                                        Bonifacio Global City, Taguig
                                    </address>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--white)', marginBottom: '1.5rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Clock size={18} color="var(--blue)" /> Availability
                                    </h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                        Mon – Thu: 11AM – 10PM<br />
                                        Fri – Sat: 11AM – 12MN
                                    </p>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--white)', marginBottom: '1.5rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <Phone size={18} color="var(--blue)" /> Connect
                                    </h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                        +63 917 123 4567 • hello@edgarskitchen.ph • @edgarskitchen
                                    </p>
                                </div>
                            </div>
                            <a href="#menu" className="btn btn-outline">Explore My Solutions</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ CLIENTS ═══════════ */}

                <section style={{ padding: '6rem 0', background: 'var(--dark)' }}>
                    <div className="container">
                        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '4rem', fontWeight: 600 }}>
                            Businesses I work <span style={{ fontStyle: 'italic' }}>with</span>
                        </h2>

                        <div className="client-grid" style={{ display: 'flex', justifyContent: 'center', gap: '5rem', alignItems: 'center', flexWrap: 'wrap', opacity: 0.7 }}>
                            {businesses.map((biz, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {biz.image ? (
                                        <img src={biz.image} alt={biz.name} style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                                    ) : (
                                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--white)', fontWeight: 700, letterSpacing: '0.05em' }}>
                                            {biz.name.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


            {/* ═══════════ CONTACT ═══════════ */}
            <section id="contact" className="section" style={{ display: "none",  background: 'var(--dark-2)', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
                            Get In Touch
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '1.5rem' }}>
                            Contact <span style={{ fontStyle: 'italic' }}>Me</span>
                        </h2>

                        <p style={{ color: 'var(--text)', marginBottom: '3rem', fontSize: '1.05rem' }}>
                            Have a question or want to work together? Send me a message and I'll get back to you as soon as possible.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', textAlign: 'left' }} className="about-grid">

                            {/* Left Side: Contact Details */}
                            <div>
                                <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 600 }}>
                                    Contact Details
                                </p>
                                <div style={{ display: 'grid', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Location</h4>
                                        <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                            3rd Floor, High Street South<br />Bonifacio Global City, Taguig
                                        </p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Email</h4>
                                        <p style={{ color: 'var(--text)', fontSize: '0.95rem' }}>hello@edgarskitchen.ph</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Phone</h4>
                                        <p style={{ color: 'var(--text)', fontSize: '0.95rem' }}>+63 917 123 4567</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Schedule Form */}
                            <div>
                                <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 600 }}>
                                    Schedule a Meeting
                                </p>
                                <form action="https://formspree.io/f/edgarxmendoxa74@gmail.com" method="POST" style={{ display: 'grid', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
                                        <input name="name" required style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px' }} placeholder="John Doe" />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
                                        <div>
                                            <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Preferred Date & Time</label>
                                            <input type="datetime-local" name="datetime" required style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px' }} />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Meeting Platform</label>
                                            <select name="platform" required style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px' }}>
                                                <option value="Google Meet">Google Meet</option>
                                                <option value="Zoom">Zoom</option>
                                                <option value="In-Person">In-Person</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Topic of Meeting</label>
                                        <textarea name="topic" rows={3} required style={{ width: '100%', padding: '0.85rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px' }} placeholder="E.g. Menu Optimization" />
                                    </div>
                                    <button type="submit" className="btn btn-gold" style={{ padding: '1rem' }}>Schedule Meeting</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




































            {/* ═══════════ FOOTER ═══════════ */}
            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', background: 'var(--dark)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            Edgar <span style={{ color: 'var(--blue)' }}>Mendoza</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        <a href="#" style={{ width: '44px', height: '44px', background: 'rgba(0,0,0,0.04)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
                            <Instagram size={20} />
                        </a>
                        <a href="#" style={{ width: '44px', height: '44px', background: 'rgba(0,0,0,0.04)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)' }}>
                            <Facebook size={20} />
                        </a>
                    </div>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 500 }}>
                        &copy; 2024 Edgar Mendoza. All Rights Reserved.
                    </p>
                </div>
            </footer>

            {/* ═══════════ RESPONSIVE STYLES ═══════════ */}
            <style>{`
                .desktop-nav { display: flex !important; }
                .mobile-toggle { display: none !important; }

                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                    .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                    .gallery-grid { grid-template-columns: 1fr !important; }
                    .form-grid { grid-template-columns: 1fr !important; }

                    .expertise-item { flex-direction: column !important; gap: 1rem !important; }
                    .expertise-price { margin-left: 0 !important; }
                    .client-grid { gap: 2rem !important; }
                    section { padding: 4rem 0 !important; }
                    .hero-title { font-size: 2.2rem !important; }
                    .logo-text { font-size: 1.1rem !important; }
                    .header-btn { padding: 0.5rem 1.2rem !important; font-size: 0.55rem !important; }
                    nav { padding: 1rem 0 !important; }
                    .hero-btns-wrapper { 
                        display: grid !important; 
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0.75rem !important; 
                        width: 100% !important;
                        max-width: 400px !important;
                        margin: 0 auto !important;
                    }
                    .btn-hero { 
                        padding: 0.85rem 0.5rem !important; 
                        font-size: 0.55rem !important; 
                        letter-spacing: 0.05em !important; 
                        width: 100% !important;
                        text-align: center !important;
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
