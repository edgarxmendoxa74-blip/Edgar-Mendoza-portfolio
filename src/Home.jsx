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
    XCircle,
    ArrowRight,
    TrendingUp,
    Users,
    Smartphone,
    ShoppingCart,
    MessageSquare,
    Target,
    BarChart3,
    Heart,
    Zap as FastIcon,
    Linkedin,
    Mail,
    QrCode,
    MessageCircle,
    BookOpen
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';


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
                    opacity: 0.8,
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
    const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [businesses, setBusinesses] = useState(() => {
        const saved = localStorage.getItem('admin_businesses');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.length > 0) return data;
        }
        return [
            { name: 'ANTONIO\'S GROUP', image: null, link: '#' },
            { name: 'FOODEE GLOBAL', image: null, link: '#' },
            { name: 'THE BISTRO GROUP', image: null, link: '#' }
        ];
    });
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleInquirySubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const contact = formData.get('contact');
        const bizName = formData.get('bizName');
        const bizType = formData.get('bizType');
        const concern = formData.get('concern');

        const newInquiry = {
            id: Date.now(),
            from: name,
            subject: 'Business Consultation Inquiry',
            content: `
**Contact:** ${contact}
**Business Name:** ${bizName}
**Business Type:** ${bizType}
**Concern:** ${concern}
            `.trim(),
            time: 'Just now'
        };

        const existingMessages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
        localStorage.setItem('admin_messages', JSON.stringify([newInquiry, ...existingMessages]));
        
        alert('Your inquiry has been sent successfully! I will get back to you soon.');
        setIsInquiryOpen(false);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const newMessage = {
            id: Date.now(),
            from: name,
            subject: 'General Contact Inquiry',
            content: `
**Email:** ${email}
**Message:** ${message}
            `.trim(),
            time: 'Just now'
        };

        const existingMessages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
        localStorage.setItem('admin_messages', JSON.stringify([newMessage, ...existingMessages]));
        
        alert('Thank you for your message! I will reply to you shortly.');
        e.target.reset();
    };

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


                        <button 
                            onClick={() => setIsPlaybookOpen(true)} 
                            className="btn header-btn" 
                            style={{ padding: '0.65rem 1.4rem', fontSize: '0.66rem', background: '#6b7280', color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <BookOpen size={14} /> Read More
                        </button>
                        <a 
                            href="#contact" 
                            className="btn header-btn" 
                            style={{ padding: '0.65rem 1.4rem', fontSize: '0.66rem', background: '#22c55e', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Mail size={14} /> Contact Me
                        </a>
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


                        <button 
                            onClick={() => { setIsMenuOpen(false); setIsPlaybookOpen(true); }} 
                            className="btn" 
                            style={{ textAlign: 'center', padding: '1rem', color: '#fff', background: '#6b7280', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <BookOpen size={16} /> Read More
                        </button>
                        <a 
                            href="#contact" 
                            className="btn" 
                            onClick={() => setIsMenuOpen(false)} 
                            style={{ textAlign: 'center', padding: '1rem', background: '#22c55e', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Mail size={16} /> Contact Me
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════ HERO ═══════════ */}
            <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'var(--dark)', overflow: 'hidden' }}>
                    {/* Bouncing Balls */}
                    {[
                        { size: '100px', top: '10%', left: '10%', color: 'var(--blue)', duration: 4 },
                        { size: '120px', top: '70%', left: '80%', color: 'var(--accent-gold)', duration: 6 },
                        { size: '90px', top: '30%', left: '60%', color: 'var(--blue)', duration: 3 },
                        { size: '150px', top: '80%', left: '20%', color: 'var(--accent-gold)', duration: 8 },
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
                                filter: 'blur(30px)',
                                opacity: 0.8,
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
                        <div className="hero-btns-wrapper" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '0 auto' }}>
                             <button 
                                onClick={() => setIsInquiryOpen(true)} 
                                className="btn btn-gold btn-hero" 
                                style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem', border: 'none', cursor: 'pointer' }}
                            >
                                Inquire Me
                            </button>
                            <a href="#gallery" className="btn btn-outline btn-hero" style={{ padding: '0.9rem 1.5rem', fontSize: '0.65rem' }}>View Sample Works</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ ABOUT ME (BIO) ═══════════ */}
            <section id="about" className="section" style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)' }}>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ SERVICES: SMART MENU SYSTEM ═══════════ */}
            <section id="read-more" className="section" style={{ background: 'var(--dark-2)', position: 'relative', overflow: 'hidden' }}>
                {/* Enhanced Modern Background Glows */}
                <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--blue) 0%, transparent 70%)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '40%', right: '15%', width: '300px', height: '300px', background: 'var(--blue)', filter: 'blur(100px)', opacity: 0.05, borderRadius: '50%', pointerEvents: 'none' }} />

                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--white)', opacity: 0.6, fontWeight: 700, marginBottom: '1.5rem' }}>
                                Services I Offer
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--white)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                Smart Menu System <br/><span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>for Restaurants</span>
                            </h2>
                            <p style={{ color: 'var(--white)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem', opacity: 0.9 }}>
                                Turn Your Menu Into a Digital Sales Machine
                            </p>
                            <p style={{ color: 'var(--text)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.8 }}>
                                Upgrade your restaurant with a Smart Menu system that makes ordering faster, easier, and more profitable.
                            </p>
                        </motion.div>
                    </div>

                    {/* How It Works */}
                    <div style={{ marginBottom: '8rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--white)' }}>How It Works</h3>
                        </div>
                        <div 
                            className="how-it-works-grid"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}
                        >
                            {[
                                { step: '01', title: 'Scan or Click', desc: 'Customers scan a QR code or click your website link placed on tables, counters, or online pages.', icon: <QrCode size={32} /> },
                                { step: '02', title: 'Browse and Order', desc: 'They are redirected to your digital menu website where they can easily view items and place orders.', icon: <ShoppingCart size={32} /> },
                                { step: '03', title: 'Instant Order Delivery', desc: 'All orders are automatically sent to your preferred platform: Messenger, WhatsApp, or Email.', icon: <div style={{ display: 'flex', gap: '0.5rem' }}><MessageSquare size={32} /><MessageCircle size={32} /></div> }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
                                    whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
                                    style={{ 
                                        background: 'rgba(255, 255, 255, 0.03)', 
                                        backdropFilter: 'blur(15px)',
                                        padding: '3.5rem 2.5rem', 
                                        borderRadius: '40px', 
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        position: 'relative',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '5rem', fontWeight: 900, color: 'var(--accent-gold)', opacity: 0.04, fontFamily: 'var(--font-serif)', pointerEvents: 'none' }}>{item.step}</div>
                                    <div style={{ marginBottom: '2.5rem', color: 'var(--white)', display: 'inline-flex', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>{item.icon}</div>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '1.05rem', lineHeight: 1.8 }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div style={{ marginBottom: '8rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--white)' }}>Benefits for Your Business</h3>
                        </div>
                        <div 
                            className="benefits-grid"
                            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}
                        >
                            {[
                                { title: 'Increase Average Order Value', desc: 'Encourage customers to order more through a well-structured digital menu.', icon: <TrendingUp size={24} /> },
                                { title: 'Convenient for Customers', desc: 'Faster ordering experience with no waiting time.', icon: <Clock size={24} /> },
                                { title: 'User-Friendly System', desc: 'Simple and easy to use for both customers and business owners.', icon: <CheckCircle size={24} /> },
                                { title: 'Modern Customer Experience', desc: 'Upgrade your brand with a more professional and digital approach.', icon: <Star size={24} /> }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                                    style={{ 
                                        background: 'rgba(255, 255, 255, 0.02)', 
                                        backdropFilter: 'blur(10px)',
                                        padding: '2.5rem 2rem', 
                                        borderRadius: '28px', 
                                        border: '1px solid rgba(255, 255, 255, 0.06)', 
                                        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                    }}
                                    whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', y: -8 }}
                                >
                                    <div style={{ marginBottom: '1.5rem', color: 'var(--white)', opacity: 1, display: 'inline-flex', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{item.icon}</div>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 700 }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Marketing & Features Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '4rem', marginBottom: '8rem' }} className="about-grid">
                        {/* Marketing Opportunities */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Marketing Opportunities</h3>
                            <div className="marketing-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                                {[
                                    { title: 'Run Ads', desc: 'Promote your Smart Menu using Facebook Ads and drive more orders.', icon: <Target size={24} /> },
                                    { title: 'Repeat Customers', desc: 'Distribute QR cards so customers can easily order again anytime.', icon: <Users size={24} /> },
                                    { title: 'In-Store Placement', desc: 'Place QR stickers on tables, counters, and walls for easy access.', icon: <MapPin size={24} /> },
                                    { title: 'Social Media Integration', desc: 'Post your QR code and website link on your Facebook page.', icon: <Facebook size={24} /> }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)', y: -5 }}
                                        style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s' }}
                                    >
                                        <div style={{ marginBottom: '1rem', color: 'var(--accent-gold)', display: 'inline-flex', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>{item.icon}</div>
                                        <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 700 }}>{item.title}</h4>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Features of Smart Menu */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Features of Smart Menu</h3>
                            <div className="features-grid" style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                                {[
                                    'Website Link and QR Access',
                                    'Custom Branding Design',
                                    'Order Types: Dine-in, Takeout, Delivery',
                                    'Flexible Payment Options',
                                    'Order Integration: Messenger, WhatsApp, Email'
                                ].map((feature, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ background: 'rgba(255, 255, 255, 0.05)', x: 5 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.75rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.06)', transition: 'all 0.3s' }}
                                    >
                                        <CheckCircle size={20} color="#22c55e" style={{ opacity: 0.9 }} />
                                        <span style={{ color: 'var(--white)', fontSize: '1rem', fontWeight: 500 }}>{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ═══════════ CLIENTS ═══════════ */}

                <section style={{ padding: '6rem 0', background: 'var(--dark)' }}>
                    <div className="container">
                        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '4rem', fontWeight: 600 }}>
                            Businesses I work <span style={{ fontStyle: 'italic', color: 'var(--blue)' }}>with</span>
                        </h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
                            Trusted by leading brands in the food and hospitality industry to deliver smart digital solutions that drive real results.
                        </p>

                        <div className="client-grid" style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '1rem', 
                            marginTop: '2rem',
                            maxWidth: '430px',
                            margin: '2rem auto 0'
                        }}>
                            {businesses.map((biz, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -5 }}
                                    style={{ 
                                        background: 'var(--dark-2)', 
                                        padding: '1rem', 
                                        borderRadius: '0', 
                                        border: '1px solid var(--border)',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        aspectRatio: '1 / 1',
                                        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
                                    }}
                                >
                                    <div style={{ 
                                        width: '80px', height: '80px', 
                                        borderRadius: '0', background: 'var(--dark)', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        border: '1px solid var(--border)', overflow: 'hidden'
                                    }}>
                                        {biz.image ? (
                                            <img src={biz.image} alt={biz.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                                        ) : (
                                            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--white)', fontFamily: 'var(--font-serif)', opacity: 0.9 }}>
                                                {biz.name ? biz.name[0].toUpperCase() : 'B'}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 style={{ fontSize: '0.85rem', marginBottom: '0.15rem', color: 'var(--white)' }}>{biz.name}</h3>
                                        <p style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Partnered Client</p>
                                    </div>

                                    <a 
                                        href={biz.link || "#"} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                        style={{ width: '100%', padding: '0.45rem', fontSize: '0.55rem' }}
                                    >
                                        Visit Website
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>




            {/* ═══════════ CONTACT ═══════════ */}
            <section id="contact" className="section" style={{ background: 'var(--dark-2)', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
                            Get In Touch
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: '1.5rem' }}>
                            Contact <span style={{ fontStyle: 'italic' }}>Me</span>
                        </h2>

                        <p style={{ color: 'var(--text)', marginBottom: '3rem', fontSize: '1.05rem' }}>
                            Have a general question or want to say hello? Send me a message and I'll get back to you as soon as possible.
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

                            {/* Right Side: Contact Form */}
                            <div>
                                <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 600 }}>
                                    Send a Message
                                </p>
                                <form onSubmit={handleContactSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
                                        <input name="name" required style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '8px' }} placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                                        <input type="email" name="email" required style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '8px' }} placeholder="hello@example.com" />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>How can I help?</label>
                                        <textarea name="message" rows={4} required style={{ width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '8px' }} placeholder="Write your message here..." />
                                    </div>
                                    <button type="submit" className="btn" style={{ padding: '1rem', border: 'none', cursor: 'pointer', background: '#22c55e', color: '#fff' }}>Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
















            {/* ═══════════ FOOTER ═══════════ */}
            <footer style={{ padding: '4rem 0 3rem', borderTop: '1px solid var(--border)', background: 'black', position: 'relative', zIndex: 10 }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                            Edgar <span style={{ color: '#3498db' }}>Mendoza</span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            Menu Engineering & Restaurant Strategy
                        </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'} aria-label="LinkedIn"><Linkedin size={22} /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'} aria-label="Facebook"><Facebook size={22} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'} aria-label="Instagram"><Instagram size={22} /></a>
                    </div>

                    <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <p style={{ fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                            &copy; {new Date().getFullYear()} Edgar Mendoza. All Rights Reserved.
                        </p>
                    </div>
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
                    .client-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
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
    .how-it-works-grid {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
                        gap: 1rem !important;
                    }
                    .how-it-works-grid > div {
                        padding: 1.5rem 1rem !important;
                        text-align: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .how-it-works-grid > div h4 {
                        font-size: 0.9rem !important;
                        margin-bottom: 0.5rem !important;
                    }
                    .how-it-works-grid > div p {
                        font-size: 0.75rem !important;
                        line-height: 1.4 !important;
                    }
                    .how-it-works-grid > div div[style*="fontSize: '4rem'"] {
                        font-size: 2rem !important;
                        top: 0.5rem !important;
                        right: 0.5rem !important;
                    }
                    .how-it-works-grid > div div[style*="marginBottom: '2rem'"] {
                        margin-bottom: 1rem !important;
                        padding: 0.5rem !important;
                    }
                    .how-it-works-grid > div div[style*="marginBottom: '2rem'"] svg {
                        width: 24px !important;
                        height: 24px !important;
                    }
                    .benefits-grid {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
                        gap: 1rem !important;
                    }
                    .benefits-grid > div {
                        padding: 1.5rem 1rem !important;
                        text-align: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .benefits-grid > div div[style*="marginBottom: '1.5rem'"] {
                        margin-bottom: 1rem !important;
                    }
                    .benefits-grid > div div[style*="marginBottom: '1.5rem'"] svg {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    .benefits-grid > div h4 {
                        font-size: 0.85rem !important;
                        margin-bottom: 0.5rem !important;
                        line-height: 1.3 !important;
                    }
                    .benefits-grid > div p {
                        font-size: 0.7rem !important;
                        line-height: 1.4 !important;
                    }
                    .marketing-grid, .features-grid {
                        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
                        gap: 1rem !important;
                    }
                    .marketing-grid > div, .features-grid > div {
                        padding: 1.25rem 1rem !important;
                        text-align: center !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }
                    .marketing-grid > div h4, .features-grid > div span {
                        font-size: 0.85rem !important;
                        margin-bottom: 0.5rem !important;
                        line-height: 1.3 !important;
                    }
                    .marketing-grid > div p {
                        font-size: 0.7rem !important;
                        line-height: 1.4 !important;
                    }
                    .features-grid > div {
                        gap: 0.75rem !important;
                    }
                    .features-grid > div svg {
                        width: 18px !important;
                        height: 18px !important;
                    }
                }
            `}</style>

            {/* ═══════════ PLAYBOOK MODAL ═══════════ */}
            <AnimatePresence>
                {isPlaybookOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: 'rgba(5, 5, 5, 0.95)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '1000px',
                                maxHeight: '90vh',
                                background: 'var(--dark-2)',
                                border: '1px solid var(--border)',
                                borderRadius: '40px',
                                position: 'relative',
                                overflowY: 'auto',
                                padding: '4rem 3rem'
                            }}
                            className="playbook-modal-content"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsPlaybookOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--white)',
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--white)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <p style={{ fontSize: '0.7rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
                                    Smart Menu Engineering Playbook (Simplified)
                                </p>
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--white)', lineHeight: 1.1, marginBottom: '2rem' }}>
                                    What is it?
                                </h2>
                                <div style={{ maxWidth: '750px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '2.5rem 2rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
                                    <p style={{ color: 'var(--text)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                        The Smart Menu Engineering Playbook is a guide that teaches you how to turn your menu into a powerful sales tool — not just a list of food items.
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                                        <Target size={20} />
                                        <span>Goal: Increase revenue, get more repeat customers, and attract new ones.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Problems & Solution Row */}
                            <div style={{ marginBottom: '5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    <div style={{ padding: '2.5rem', background: 'rgba(255,50,50,0.03)', borderRadius: '32px', border: '1px solid rgba(255,50,50,0.1)' }}>
                                        <h4 style={{ color: '#ff4d4d', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase' }}>Common Problems</h4>
                                        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
                                            {[
                                                'High traffic but low order value',
                                                'Customers come once but don’t return',
                                                'Difficulty attracting new customers',
                                                'Competing on price despite quality'
                                            ].map((item, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <XCircle size={16} style={{ marginTop: '3px', flexShrink: 0 }} /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div style={{ padding: '2.5rem', background: 'rgba(37,235,99,0.03)', borderRadius: '32px', border: '1px solid rgba(37,235,99,0.1)' }}>
                                        <h4 style={{ color: '#2ecc71', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase' }}>The Solution</h4>
                                        <p style={{ color: 'var(--text)', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
                                            Transforms your menu into a <strong>“silent salesperson.”</strong> It is a strategic sales system, not just a design.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 4 Pillars Header */}
                            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2rem' }}>What Makes a Smart Menu?</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    {[
                                        { title: '1. Curated', desc: 'Grants selection. Highlights high-profit items.' },
                                        { title: '2. Optimized', desc: 'Increases AOV. Customers naturally order more.' },
                                        { title: '3. Loyalty-Driven', desc: 'Encourages repeat visits via smooth experience.' },
                                        { title: '4. Acquisition-Ready', desc: 'Easy to share via links, QR, and social media.' }
                                    ].map((pill, i) => (
                                        <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'left' }}>
                                            <h5 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', fontWeight: 700 }}>{pill.title}</h5>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{pill.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Flow */}
                            <div style={{ marginBottom: '5rem' }}>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2.5rem', textAlign: 'center' }}>How the System Works</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    <div style={{ padding: '2.5rem', background: 'var(--dark)', borderRadius: '32px', border: '1px solid var(--border)' }}>
                                        <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>For Restaurant Owners</h4>
                                        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <li>• Custom branded ordering system</li>
                                            <li>• Menu optimized for sales</li>
                                            <li>• Orders directly to Messenger</li>
                                            <li>• Automatic computation (No manual work)</li>
                                            <li>• Automated customer data collection</li>
                                        </ul>
                                    </div>
                                    <div style={{ padding: '2.5rem', background: 'var(--dark)', borderRadius: '32px', border: '1px solid var(--border)' }}>
                                        <h4 style={{ color: 'var(--white)', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>For Customers</h4>
                                        <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <li>1. Click link or scan QR code</li>
                                            <li>2. Browse the menu & add to cart</li>
                                            <li>3. View total instantly</li>
                                            <li>4. Click “Order via Messenger”</li>
                                            <li>5. Send the message — Order complete</li>
                                            <li style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Fast, simple, and hassle-free.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Features & Results */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Smart Features</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                        {[
                                            'Strategic layout', 'Upsell suggestions', 'Bundle optimization', 
                                            'Auto computation', 'Mobile-optimized', 'Follow-up messaging', 'Data tracking'
                                        ].map((feat, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                <CheckCircle size={14} color="var(--accent-gold)" /> {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
                                    <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 700 }}>Results You Can Expect</h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gap: '0.75rem', color: 'var(--text)', fontSize: '0.9rem' }}>
                                        <li>🚀 Higher order value per customer</li>
                                        <li>🔄 More repeat customers</li>
                                        <li>📈 Easier customer acquisition</li>
                                        <li>⚙️ Automated ordering system</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Example Case */}
                            <div style={{ marginBottom: '5rem', background: 'rgba(255,255,255,0.03)', padding: '3rem', borderRadius: '32px', border: '1px solid var(--border)' }}>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '2rem', textAlign: 'center' }}>Example Scenario</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                                    <div>
                                        <h4 style={{ color: '#ff4d4d', fontSize: '1rem', marginBottom: '1rem', fontWeight: 700 }}>Traditional Menu:</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Customer feels unsure and orders only one item.<br/><br/><strong style={{ color: 'white' }}>Result: Low order value</strong></p>
                                    </div>
                                    <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '3rem' }}>
                                        <h4 style={{ color: '#2ecc71', fontSize: '1rem', marginBottom: '1rem', fontWeight: 700 }}>Smart Menu:</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Customer sees: “Best Seller”, “Add fries + drink”, “Bundle Meal”.<br/><br/><strong style={{ color: 'white' }}>Result: More items ordered, higher revenue</strong></p>
                                    </div>
                                </div>
                            </div>

                            {/* Final Call */}
                            <div style={{ textAlign: 'center', background: 'var(--dark)', padding: '4rem 2rem', borderRadius: '40px', border: '1px solid var(--border)' }}>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1rem' }}>Your menu is not just design.</h3>
                                <p style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '2rem' }}>It is an automated sales system.</p>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                                    Turn your menu into a revenue machine today. Are you ready to increase order value and automate your restaurant sales?
                                </p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsPlaybookOpen(false)}
                                    style={{ background: 'var(--white)', color: '#ffffff', border: 'none', padding: '1.25rem 3.5rem', borderRadius: '50px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
                                >
                                    Close Playbook
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
 
             {/* ═══════════ INQUIRY MODAL ═══════════ */}
             <AnimatePresence>
                 {isInquiryOpen && (
                     <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                     >
                         <motion.div
                             initial={{ scale: 0.9, y: 20 }}
                             animate={{ scale: 1, y: 0 }}
                             exit={{ scale: 0.9, y: 20 }}
                             style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', background: 'var(--dark-2)', border: '1px solid var(--border)', borderRadius: '40px', position: 'relative', overflowY: 'auto', padding: '3.5rem 2.5rem' }}
                         >
                             <button
                                 onClick={() => setIsInquiryOpen(false)}
                                 style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                             >
                                 <X size={20} />
                             </button>
 
                             <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                 <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '1rem', fontWeight: 700 }}>Business Consultation</p>
                                 <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Inquire Me</h2>
                                 <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tell me about your business and let's optimize your growth.</p>
                             </div>
 
                             <form onSubmit={handleInquirySubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                                 <div>
                                     <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Contact Person (Name)</label>
                                     <input name="name" required style={{ width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="e.g. Juan Dela Cruz" />
                                 </div>
                                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
                                     <div>
                                         <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Contact Details</label>
                                         <input name="contact" required style={{ width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="Email or Phone Number" />
                                     </div>
                                     <div>
                                         <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Business Name</label>
                                         <input name="bizName" required style={{ width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="e.g. Steak & Stone" />
                                     </div>
                                 </div>
                                 <div>
                                     <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Business Type</label>
                                     <input name="bizType" required style={{ width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="e.g. Fine Dining, Fast Food, Cloud Kitchen" />
                                 </div>
                                 <div>
                                     <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Concern about your business</label>
                                     <textarea name="concern" rows={4} required style={{ width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="Describe your current challenges or goals..." />
                                 </div>
                                 <motion.button 
                                     whileHover={{ scale: 1.02 }}
                                     whileTap={{ scale: 0.98 }}
                                     type="submit" 
                                     className="btn btn-gold" 
                                     style={{ padding: '1.2rem', marginTop: '1rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                 >
                                     Send Inquiry
                                 </motion.button>
                             </form>
                         </motion.div>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
    );
};

export default Home;
