import React from 'react';
import { Moon } from 'lucide-react';

const SettingsManagement = () => (
    <div style={{ maxWidth: '600px', display: 'grid', gap: '3rem' }}>
        <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>Public Profile</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Display Name</label>
                    <input style={{ width: '100%', padding: '1rem', background: 'var(--dark)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '12px' }} defaultValue="Edgar Mendoza" />
                </div>
                <div>
                    <label style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, display: 'block', marginBottom: '0.75rem' }}>Primary Email</label>
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

export default SettingsManagement;
