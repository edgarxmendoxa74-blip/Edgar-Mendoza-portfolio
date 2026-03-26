import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simplified auth for demo
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{ 
            background: 'var(--dark)', 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'var(--dark-2)',
                    padding: '3rem',
                    borderRadius: '24px',
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ 
                        width: '60px', height: '60px', background: 'var(--blue)', 
                        borderRadius: '16px', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--white)' 
                    }}>
                        <Lock size={28} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Admin Portal</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure access for Edgar Mendoza</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px', outline: 'none' }} 
                                placeholder="Enter username" 
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px', outline: 'none' }} 
                                placeholder="Enter password" 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-blue" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                        Login to Dashboard <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <a href="/" style={{ fontSize: '0.8rem', color: 'var(--blue)', textDecoration: 'none' }}>Return to Website</a>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
