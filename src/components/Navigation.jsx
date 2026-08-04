import React from 'react';
import { BookOpen, Target, ShieldCheck, ChevronRight } from 'lucide-react';
import { CHAPTER_1_DATA } from '../data/chapter1Data';

export const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem 2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(16, 23, 38, 0.85) 0%, rgba(10, 14, 23, 0.95) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-green">SKIP BARBER CURRICULUM</span>
            <span className="badge badge-cyan">MODULE 1 OF 16</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {CHAPTER_1_DATA.title}
          </h1>
          <p className="text-secondary" style={{ maxWidth: '700px', fontSize: '1rem', marginTop: '0.25rem' }}>
            {CHAPTER_1_DATA.subtitle}
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="metric-box" style={{ minWidth: '120px' }}>
            <div className="metric-label">CHAPTER FOCUS</div>
            <div className="metric-val text-apex" style={{ fontSize: '1.1rem' }}>3 PRIORITIES</div>
          </div>
          <div className="metric-box" style={{ minWidth: '120px' }}>
            <div className="metric-label">KEY CIRCUIT</div>
            <div className="metric-val text-cyan" style={{ fontSize: '1.1rem' }}>SEBRING 12H</div>
          </div>
          <div className="metric-box" style={{ minWidth: '120px' }}>
            <div className="metric-label">TARGET TIME GAIN</div>
            <div className="metric-val text-apex" style={{ fontSize: '1.1rem' }}>+18.4s / RACE</div>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div style={{ 
        marginTop: '1.25rem', 
        padding: '0.85rem 1.25rem', 
        borderRadius: 'var(--radius-md)', 
        background: 'rgba(0, 230, 118, 0.04)', 
        borderLeft: '4px solid var(--apex-green)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '0.92rem', maxWidth: '850px' }}>
          "{CHAPTER_1_DATA.quote.text}"
        </div>
        <div className="text-muted mono" style={{ fontSize: '0.78rem' }}>
          — {CHAPTER_1_DATA.quote.author}
        </div>
      </div>
    </div>
  );
};
