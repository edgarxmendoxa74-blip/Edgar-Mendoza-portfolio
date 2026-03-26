import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Settings, 
    MessageSquare, 
    LogOut,
    Plus,
    Edit3,
    Trash2,
    Eye,
    Smartphone,
    Globe,
    Moon,
    X,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('Businesses');
    
    // Auth Check
    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/admin/login');
    };

    const sidebarItems = [
        { name: 'Portfolio', icon: <Smartphone size={20} /> },
        { name: 'Businesses', icon: <Globe size={20} /> },
        { name: 'Messages', icon: <MessageSquare size={20} /> },
        { name: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div style={{ background: 'var(--dark)', minHeight: '100vh', display: 'flex', color: 'var(--white)' }}>
            
            {/* Sidebar */}
            <aside style={{ 
                width: '280px', background: 'var(--dark-2)', borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100
            }}>
                <div style={{ padding: '2.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--blue)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '-0.2rem' }}>Edgar <span style={{ color: 'var(--blue)' }}>Admin</span></h2>
                            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5 }}>Management Portal</p>
                        </div>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '2.5rem 1rem' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {sidebarItems.map((item, i) => (
                            <button 
                                key={item.name + i}
                                onClick={() => setActiveSection(item.name)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
                                    borderRadius: '12px', fontSize: '0.9rem', fontWeight: 500, border: 'none',
                                    cursor: 'pointer', transition: 'all 0.3s',
                                    background: activeSection === item.name ? 'rgba(37,99,235,0.1)' : 'transparent',
                                    color: activeSection === item.name ? 'var(--blue)' : 'var(--text-muted)',
                                    textAlign: 'left'
                                }}
                            >
                                {item.icon}
                                {item.name}
                                {activeSection === item.name && (
                                    <motion.div layoutId="active-pill" style={{ marginLeft: 'auto', width: '4px', height: '4px', background: 'var(--blue)', borderRadius: '50%' }} />
                                )}
                            </button>
                        ))}
                    </div>
                </nav>

                <div style={{ padding: '2rem', borderTop: '1px solid var(--border)' }}>
                    <button 
                        onClick={handleLogout}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
                            borderRadius: '12px', fontSize: '0.9rem', fontWeight: 500, background: 'transparent',
                            color: '#ff4444', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'
                        }}
                    >
                        <LogOut size={20} />
                        Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '280px', padding: '3rem 5rem' }}>
                <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>{activeSection}</h1>
                        <p style={{ opacity: 0.5, fontSize: '0.95rem' }}>Welcome back, Manage your digital presence effortlessly.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ 
                            padding: '0.8rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', 
                            background: 'var(--dark-2)', color: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' 
                        }}>
                           <Eye size={18} /> View Site
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeSection === 'Portfolio' && <PortfolioManagement />}
                        {activeSection === 'Businesses' && <BusinessesManagement />}
                        {activeSection === 'Messages' && <MessagesManagement />}
                        {activeSection === 'Settings' && <SettingsManagement />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

/* ─── Sub-Components ─── */

const PortfolioManagement = () => {
    const [portfolio, setPortfolio] = useState(() => {
        const saved = localStorage.getItem('admin_portfolio');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Project_Image_1.jpg' },
            { id: 2, name: 'Project_Image_2.jpg' },
            { id: 3, name: 'Project_Image_3.jpg' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('admin_portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            setPortfolio(portfolio.filter(p => p.id !== id));
        }
    };

    const handleAdd = () => {
        const newProj = { id: Date.now(), name: `Project_Image_${portfolio.length + 1}.jpg` };
        setPortfolio([...portfolio, newProj]);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {portfolio.map(p => (
                <div key={p.id} style={{ background: 'var(--dark-2)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                    <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', opacity: 0.2 }}>
                        <Smartphone size={48} />
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem' }}>{p.name}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="icon-btn" style={{ color: '#ff4444' }} onClick={() => handleDelete(p.id)}><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
            ))}
            <div 
                style={{ 
                    height: '260px', borderRadius: '24px', border: '2px dashed var(--border)', 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    gap: '1rem', cursor: 'pointer', transition: 'all 0.3s'
                }} 
                className="upload-box"
                onClick={handleAdd}
            >
                <Plus size={32} style={{ opacity: 0.3 }} />
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Upload New Image</p>
            </div>
        </div>
    );
};

const BusinessesManagement = () => {
    const [businesses, setBusinesses] = useState(() => {
        const saved = localStorage.getItem('admin_businesses');
        return saved ? JSON.parse(saved) : [];
    });
    const [isEditing, setIsEditing] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', link: '', image: null });
    const [newForm, setNewForm] = useState({ name: '', link: '', image: null });

    useEffect(() => {
        localStorage.setItem('admin_businesses', JSON.stringify(businesses));
    }, [businesses]);

    const handleImageUpload = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isEdit) {
                    setEditForm({ ...editForm, image: reader.result });
                } else {
                    setNewForm({ ...newForm, image: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const newBiz = {
            id: Date.now(),
            name: newForm.name,
            link: newForm.link,
            logo: newForm.name[0].toUpperCase(),
            image: newForm.image
        };
        setBusinesses([...businesses, newBiz]);
        setNewForm({ name: '', link: '', image: null });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this business?')) {
            setBusinesses(businesses.filter(b => b.id !== id));
        }
    };

    const startEdit = (biz) => {
        setIsEditing(biz.id);
        setEditForm({ name: biz.name, link: biz.link, image: biz.image });
    };

    const saveEdit = () => {
        setBusinesses(businesses.map(b => 
            b.id === isEditing ? { 
                ...b, 
                name: editForm.name, 
                link: editForm.link, 
                image: editForm.image,
                logo: editForm.name[0].toUpperCase() 
            } : b
        ));
        setIsEditing(null);
    };

    return (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
            {businesses.map((biz) => (
                <div key={biz.id} style={{ padding: '2rem', background: 'var(--dark-2)', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ 
                        width: '64px', height: '64px', background: 'var(--dark)', borderRadius: '16px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', 
                        fontWeight: 800, border: '1px solid var(--border)', overflow: 'hidden'
                    }}>
                        {biz.image ? (
                            <img src={biz.image} alt={biz.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : biz.logo}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        {isEditing === biz.id ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <input 
                                    value={editForm.name} 
                                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--blue)', background: 'var(--dark)', color: 'white' }}
                                    placeholder="Business Name"
                                />
                                <input 
                                    value={editForm.link} 
                                    onChange={e => setEditForm({...editForm, link: e.target.value})}
                                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--blue)', background: 'var(--dark)', color: 'white' }}
                                    placeholder="Website (e.g. https://...)"
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <label style={{ fontSize: '0.7rem', cursor: 'pointer', color: 'var(--blue)' }}>
                                        <Plus size={14} style={{ marginBottom: '-2px' }} /> Update Logo
                                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                                    </label>
                                    {editForm.image && <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Image ready</span>}
                                </div>
                            </div>
                        ) : (
                            <>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{biz.name}</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--blue)', fontWeight: 600 }}>{biz.link}</p>
                            </>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {isEditing === biz.id ? (
                            <button className="icon-btn" onClick={saveEdit} style={{ color: '#44ff44' }}><Check size={18} /></button>
                        ) : (
                            <button className="icon-btn" onClick={() => startEdit(biz)}><Edit3 size={18} /></button>
                        )}
                        <button className="icon-btn" style={{ color: '#ff4444' }} onClick={() => handleDelete(biz.id)}><Trash2 size={18} /></button>
                    </div>
                </div>
            ))}
            
            {/* Add New Business Form */}
            <form onSubmit={handleAdd} style={{ padding: '2.5rem', background: 'var(--dark-2)', borderRadius: '32px', border: '2px dashed var(--border)', marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Add New Partner Business</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <div 
                            style={{ 
                                height: '120px', borderRadius: '16px', border: '1px solid var(--border)', 
                                background: 'var(--dark)', display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', position: 'relative'
                            }}
                            onClick={() => document.getElementById('new-biz-image').click()}
                        >
                            {newForm.image ? (
                                <img src={newForm.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <Plus size={24} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Click to upload branding logo</p>
                                </div>
                            )}
                            <input id="new-biz-image" type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, false)} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6rem', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Business name</label>
                        <input 
                            required 
                            value={newForm.name}
                            onChange={e => setNewForm({...newForm, name: e.target.value})}
                            style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} 
                            placeholder="e.g. Steak & Stone" 
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6rem', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Website link</label>
                        <input 
                            required 
                            value={newForm.link}
                            onChange={e => setNewForm({...newForm, link: e.target.value})}
                            style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} 
                            placeholder="https://..." 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-blue" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>Save Partner Business</button>
            </form>
        </div>
    );
};


const MessagesManagement = () => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('admin_messages');
        return saved ? JSON.parse(saved) : [
            { id: 1, from: 'Marcus Aurelius', subject: 'Consultation Request', content: 'I am interested in optimizing my menu for Q4...', time: '2 hours ago' },
            { id: 2, from: 'Seneca the Younger', subject: 'Platform Inquiry', content: 'How long does the implementation usually take?', time: '5 hours ago' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('admin_messages', JSON.stringify(messages));
    }, [messages]);

    const handleArchive = (id) => {
        setMessages(messages.filter(m => m.id !== id));
    };

    return (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
            {messages.map((msg) => (
                <div key={msg.id} style={{ padding: '2rem', background: 'var(--dark-2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{msg.from}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600 }}>{msg.subject}</p>
                        </div>
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>{msg.content}</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }} onClick={() => handleArchive(msg.id)}>Archive Message</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SettingsManagement = () => (
    <div style={{ maxWidth: '600px', display: 'grid', gap: '3rem' }}>
        <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>Public Profile</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ fontSize: '0.6rem', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Display Name</label>
                    <input style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} defaultValue="Edgar Mendoza" />
                </div>
                <div>
                    <label style={{ fontSize: '0.6rem', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Primary Email</label>
                    <input style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} defaultValue="hello@edgarskitchen.ph" />
                </div>
            </div>
        </div>
        
        <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>System Preferences</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--dark-2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Moon size={20} />
                    <span>Dark Mode (Always On)</span>
                </div>
                <div style={{ width: '50px', height: '26px', background: 'var(--blue)', borderRadius: '20px', padding: '3px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'var(--white)', borderRadius: '50%', marginLeft: 'auto' }}></div>
                </div>
            </div>
        </div>

        <button className="btn btn-blue" style={{ width: '100%', padding: '1.25rem' }}>Save Changes</button>
    </div>
);

export default AdminDashboard;
