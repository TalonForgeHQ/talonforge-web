'use client';

import { useEffect, useState } from 'react';

export default function MonitorPage() {
  const [data, setData] = useState<any>({ runtime: {}, today: 'Loading...', workQueue: '', xActivity: '', xLeads: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/activity');
        const d = await res.json();
        setData(d);
      } catch (e) {
        console.error(e);
      }
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'SF Mono', Monaco, monospace", background: '#0a0a0a', color: '#e0e0e0', padding: '1rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', color: '#4ade80' }}>🦅 Potts Live Monitor</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 12, height: 12, background: '#4ade80', borderRadius: '50%', animation: 'blink 2s infinite' }} />
            <span>{new Date(data.runtime.time || Date.now()).toLocaleTimeString('de-DE')}</span>
          </div>
        </header>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#888' }}>
          <div>Model: <span style={{ color: '#4ade80' }}>{data.runtime.model || 'ollama-cloud/glm-5.1'}</span></div>
          <div>Store: <a href="https://www.talonforge.xyz/store" style={{ color: '#4ade80' }}>talonforge.xyz/store</a></div>
          <div>Provider: <span style={{ color: '#fbbf24' }}>{data.runtime.provider || 'Ollama Cloud'}</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Today&apos;s Activity</h2>
            <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 400, overflowY: 'auto' }}>{data.today}</pre>
          </div>
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Work Queue</h2>
            <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 400, overflowY: 'auto' }}>{data.workQueue}</pre>
          </div>
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.75rem' }}>X Activity</h2>
            <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 400, overflowY: 'auto' }}>{data.xActivity}</pre>
          </div>
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Leads Found</h2>
            <pre style={{ fontSize: '0.75rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: 400, overflowY: 'auto' }}>{data.xLeads}</pre>
          </div>
        </div>
        <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #333', fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
          Auto-refreshes every 30s · <a href="/api/activity" style={{ color: '#666' }}>JSON API</a>
        </footer>
      </div>
    </div>
  );
}