import React from 'react';

const MessagesManagement = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
        {[
            { from: 'Marcus Aurelius', subject: 'Consultation Request', content: 'I am interested in optimizing my menu for Q4...', time: '2 hours ago' },
            { from: 'Seneca the Younger', subject: 'Platform Inquiry', content: 'How long does the implementation usually take?', time: '5 hours ago' }
        ].map((msg, i) => (
            <div key={i} style={{ padding: '2rem', background: 'var(--dark-2)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{msg.from}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600 }}>{msg.subject}</p>
                    </div>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>{msg.content}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-blue" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Reply</button>
                    <button className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}>Archive</button>
                </div>
            </div>
        ))}
    </div>
);

export default MessagesManagement;
