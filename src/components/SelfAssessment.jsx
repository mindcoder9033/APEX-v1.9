import React from 'react';
import { Award, Star, CheckSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { calculateMasteryScore } from '../utils/physics';

export const SelfAssessment = ({ rubricRatings, setRubricRatings, onSave }) => {
  const masteryInfo = calculateMasteryScore(rubricRatings);

  const handleStarChange = (field, value) => {
    const updated = { ...rubricRatings, [field]: value };
    setRubricRatings(updated);
    onSave(updated);
  };

  const handleCheckChange = (field, checked) => {
    const updated = { ...rubricRatings, [field]: checked };
    setRubricRatings(updated);
    onSave(updated);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award className="text-apex" size={24} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Chapter 1 Self-Assessment Rubric</h2>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Rate your technique confidence and audit your driving against Skip Barber principles.
          </p>
        </div>

        {/* Live Calculated Mastery Score Box */}
        <div className="metric-box pulse-glow" style={{ padding: '0.75rem 1.25rem', border: '1px solid var(--apex-green)', minWidth: '220px' }}>
          <div className="metric-label">CHAPTER 1 OVERALL MASTERY</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
            <span className="metric-val text-apex" style={{ fontSize: '1.8rem' }}>
              {masteryInfo.score}%
            </span>
            <span className={`badge ${masteryInfo.badgeClass}`}>
              {masteryInfo.badge}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Priority Star Ratings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            1. TECHINQUE CONFIDENCE (1 TO 5 STARS)
          </h3>

          {/* Priority 1 */}
          <div className="metric-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="metric-label text-apex">PRIORITY 1: FINDING THE LINE</span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    style={{ cursor: 'pointer', fill: star <= rubricRatings.priority1_line ? 'var(--apex-green)' : 'transparent', color: star <= rubricRatings.priority1_line ? 'var(--apex-green)' : 'var(--text-muted)' }}
                    onClick={() => handleStarChange('priority1_line', star)}
                  />
                ))}
              </div>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>
              Ability to map the highest radius arc through corners (outside &rarr; touch inside apex &rarr; track out).
            </p>
          </div>

          {/* Priority 2 */}
          <div className="metric-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="metric-label text-cyan">PRIORITY 2: CORNER EXIT SPEED</span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    style={{ cursor: 'pointer', fill: star <= rubricRatings.priority2_exitSpeed ? 'var(--telemetry-cyan)' : 'transparent', color: star <= rubricRatings.priority2_exitSpeed ? 'var(--telemetry-cyan)' : 'var(--text-muted)' }}
                    onClick={() => handleStarChange('priority2_exitSpeed', star)}
                  />
                ))}
              </div>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>
              Combining early throttle squeeze with unwinding the steering wheel onto straightaways.
            </p>
          </div>

          {/* Priority 3 */}
          <div className="metric-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="metric-label text-red">PRIORITY 3: BRAKING & ENTRY</span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    style={{ cursor: 'pointer', fill: star <= rubricRatings.priority3_brakingEntry ? 'var(--racing-red)' : 'transparent', color: star <= rubricRatings.priority3_brakingEntry ? 'var(--racing-red)' : 'var(--text-muted)' }}
                    onClick={() => handleStarChange('priority3_brakingEntry', star)}
                  />
                ))}
              </div>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.8rem' }}>
              Straight-line threshold braking and controlled brake release turning into corner entry.
            </p>
          </div>
        </div>

        {/* 4 Common Mistakes Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            2. NOVICE MISTAKES SELF-AUDIT
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                field: 'mistake1_exitRunoff',
                title: 'Unwinding Steering Wheel on Exit',
                desc: 'I actively release steering angle as speed climbs exiting corners to avoid running off track.'
              },
              {
                field: 'mistake2_lateBraking',
                title: 'Repeatable Brake Reference Points',
                desc: 'I use fixed pylons/markers on track approach instead of guessing late brake points.'
              },
              {
                field: 'mistake3_badDownshifts',
                title: 'Rev-Matched Downshifts',
                desc: 'I blip the throttle on downshifts to prevent locking or unsettling the rear tires.'
              },
              {
                field: 'mistake4_liftingThrottle',
                title: 'Smooth Throttle Modulation',
                desc: 'I avoid lifting off gas abruptly mid-corner to prevent sudden snap oversteer.'
              }
            ].map((item) => (
              <label 
                key={item.field}
                className="metric-box"
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.85rem', 
                  cursor: 'pointer',
                  border: rubricRatings[item.field] ? '1px solid var(--apex-green)' : '1px solid var(--border-subtle)',
                  background: rubricRatings[item.field] ? 'rgba(0, 230, 118, 0.05)' : 'rgba(0, 0, 0, 0.4)'
                }}
              >
                <input
                  type="checkbox"
                  checked={Boolean(rubricRatings[item.field])}
                  onChange={(e) => handleCheckChange(item.field, e.target.checked)}
                  style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--apex-green)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: rubricRatings[item.field] ? 'var(--apex-green)' : 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '0.1rem' }}>
                    {item.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
