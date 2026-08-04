import React from 'react';
import { BookOpen, TrendingUp, Zap, ShieldAlert, Award, AlertCircle, Quote } from 'lucide-react';
import { CHAPTER_1_DATA } from '../data/chapter1Data';

export const CurriculumOverview = ({ onNavigateTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 3 Basic Problems Section */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
          The Three Basic Problems to Solve in Racing
        </h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Skip Barber breaks down racecar driving into three core challenges every driver must master.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {CHAPTER_1_DATA.threeBasicProblems.map((prob) => (
            <div 
              key={prob.id} 
              className="glass-panel glass-panel-hover"
              style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-green">{prob.roi}</span>
                <span className="mono text-muted" style={{ fontSize: '0.75rem' }}>PROB #{prob.id}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                {prob.name}
              </h3>
              <div className="text-cyan mono" style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {prob.tagline}
              </div>
              <p className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                {prob.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Priority Pyramid Section */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
          Order of Effort & Priority Pyramid
        </h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          To lower your lap times quickly, focus your energy on the highest-reward skills first.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CHAPTER_1_DATA.priorityPyramid.map((pyr, idx) => (
            <div 
              key={pyr.level}
              className="metric-box"
              style={{ 
                borderLeft: `4px solid ${pyr.color}`,
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ flex: '1', minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: pyr.color, border: `1px solid ${pyr.color}` }}>
                    {pyr.level}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{pyr.title}</span>
                </div>
                <p className="text-secondary" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  {pyr.impact}
                </p>
              </div>

              <div style={{ maxWidth: '400px', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div className="metric-label" style={{ fontSize: '0.65rem' }}>SKIP BARBER ADVICE</div>
                <div className="text-primary" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "{pyr.advice}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Driver Quotes Gallery */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Quote className="text-apex" size={22} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Champions & Chief Instructors Speak</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {CHAPTER_1_DATA.quotesGallery.map((q, idx) => (
            <div 
              key={idx}
              className="metric-box"
              style={{ padding: '1.25rem', background: 'rgba(0, 0, 0, 0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <p className="text-primary" style={{ fontSize: '0.88rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1rem' }}>
                "{q.quote}"
              </p>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--apex-green)' }}>
                  — {q.author}
                </div>
                <div className="text-muted mono" style={{ fontSize: '0.75rem' }}>
                  {q.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Common Novice Mistakes */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
          The Four Most Common Novice Mistakes
        </h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Avoid these frequent pitfalls on your quest for faster lap times.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {CHAPTER_1_DATA.commonMistakes.map((m) => (
            <div 
              key={m.id}
              className="metric-box"
              style={{ padding: '1.1rem', border: '1px solid rgba(255, 61, 0, 0.2)' }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--racing-red)', marginBottom: '0.4rem' }}>
                {m.title}
              </h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <span className="metric-label" style={{ fontSize: '0.65rem' }}>ROOT CAUSE:</span>
                <p className="text-secondary" style={{ fontSize: '0.8rem' }}>
                  {m.cause}
                </p>
              </div>
              <div>
                <span className="metric-label" style={{ fontSize: '0.65rem', color: 'var(--apex-green)' }}>CORRECTIVE ACTION:</span>
                <p className="text-primary" style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                  {m.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Workbench Call-to-Action */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 229, 255, 0.15) 100%)',
        border: '1px solid var(--apex-green)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Ready to test your driving line physics?
          </h3>
          <p className="text-secondary" style={{ fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Open the 2D Line Simulator to calculate exact radius arcs ($R \propto v^2$) and straightaway time compounding.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigateTab('simulator')}>
          LAUNCH LINE SIMULATOR →
        </button>
      </div>
    </div>
  );
};
