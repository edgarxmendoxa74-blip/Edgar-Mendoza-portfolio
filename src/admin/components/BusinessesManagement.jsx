import React from 'react';
import { Globe, Edit3, Trash2, Plus } from 'lucide-react';

const BusinessesManagement = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
        {[
            { name: 'The Noble Table', link: 'https://nobletable.com', logo: 'N' },
            { name: 'Vine & Fire', link: 'https://vineandfire.ph', logo: 'V' }
        ].map((biz, i) => (
            <div key={i} style={{ padding: '2rem', background: 'var(--dark-2)', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '64px', height: '64px', background: 'var(--dark)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, border: '1px solid var(--border)' }}>{biz.logo}</div>
                <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{biz.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--blue)', fontWeight: 600 }}>{biz.link}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="icon-btn" title="Edit Link"><Globe size={18} /></button>
                    <button className="icon-btn"><Edit3 size={18} /></button>
                    <button className="icon-btn" style={{ color: '#ff4444' }}><Trash2 size={18} /></button>
                </div>
            </div>
        ))}
        
        {/* Add New Business Form Mockup */}
        <div style={{ padding: '2.5rem', background: 'var(--dark-2)', borderRadius: '32px', border: '2px dashed var(--border)', marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Add New Partner Business</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="about-grid">
                <div>
                    <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Business name</label>
                    <input style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="e.g. Steak & Stone" />
                </div>
                <div>
                    <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Website link</label>
                    <input style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} placeholder="https://..." />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ height: '100px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <p style={{ opacity: 0.5, fontSize: '0.8rem' }}><Plus size={16} style={{ marginBottom: '-3px' }} /> Upload Business Logo</p>
                    </div>
                </div>
            </div>
            <button className="btn btn-blue" style={{ marginTop: '2rem', width: '100%', padding: '1rem' }}>Save Partner Business</button>
        </div>
    </div>
);

export default BusinessesManagement;
