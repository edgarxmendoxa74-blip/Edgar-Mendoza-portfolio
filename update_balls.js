import fs from 'fs';
const path = 'c:/Users/Administrator/freelance edgar/src/Home.jsx';
let content = fs.readFileSync(path, 'utf-8');

// Replace Hero Background Balls
const heroStart = `<div style={{ position: 'absolute', inset: 0, background: 'var(--dark)', overflow: 'hidden' }}>`;
const heroEnd = `</div>`;
const hIndex = content.indexOf(heroStart);

if(hIndex !== -1) {
    const heroEndBlock = content.indexOf(heroEnd, hIndex + heroStart.length) + heroEnd.length;
    const heroContent = content.substring(hIndex, heroEndBlock);
    
    // Make sure we're replacing the whole Bouncing balls block
    if(heroContent.includes('Bouncing Balls')) {
        content = content.replace(heroContent, `<div style={{ position: 'absolute', inset: 0, background: 'var(--dark)', overflow: 'hidden', zIndex: -1 }} />\n                <BackgroundBalls />`);
    }
}

// Replace Businesses section wrapper
const busStart = `<section style={{ padding: '6rem 0', background: 'var(--dark)' }}>\n                    <div className="container">`;
const busEnd = `<section style={{ padding: '6rem 0', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>\n                    <BackgroundBalls />\n                    <div className="container" style={{ position: 'relative', zIndex: 10 }}>`;
content = content.replace(busStart, busEnd);

fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully updated Home.jsx balls!');
