import React from 'react';
import { Edit3, Trash2, Plus } from 'lucide-react';

const PortfolioManagement = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{ background: 'var(--dark-2)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)' }}></div>
                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem' }}>Project_Image_{i}.jpg</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="icon-btn"><Edit3 size={16} /></button>
                        <button className="icon-btn" style={{ color: '#ff4444' }}><Trash2 size={16} /></button>
                    </div>
                </div>
            </div>
        ))}
        <div style={{ 
            height: '260px', borderRadius: '24px', border: '2px dashed var(--border)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            gap: '1rem', cursor: 'pointer', transition: 'all 0.3s'
        }} className="upload-box">
            <Plus size={32} style={{ opacity: 0.3 }} />
            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Upload New Image</p>
        </div>
    </div>
);

export default PortfolioManagement;
