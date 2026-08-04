import React, { useState } from 'react';
import { Activity, ChevronRight, ChevronLeft, Eye, RotateCw, Play, Pause } from 'lucide-react';
import { CHAPTER_1_DATA } from '../data/chapter1Data';

export const SebringWalkthrough = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const steps = CHAPTER_1_DATA.sebringSteps;
  const currentStep = steps[currentStepIndex];

  // Next / Prev step handlers
  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity className="text-cyan" size={22} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Sebring Test Circuit Telemetry Walkthrough</h2>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Step-by-step Dodge Viper telemetry analysis matching Skip Barber Fig 1-16 to 1-25 (Sebring 12 Hour Circuit).
          </p>
        </div>

        {/* Step Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={handlePrev}>
            <ChevronLeft size={16} /> PREV
          </button>
          <span className="mono" style={{ padding: '0.4rem 0.8rem', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
            STEP {currentStep.step} OF {steps.length}
          </span>
          <button className="btn btn-primary btn-sm" onClick={handleNext}>
            NEXT <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Telemetry Visual HUD Box */}
        <div style={{ background: 'rgba(5, 8, 15, 0.9)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-cyan">LIVE CAR TELEMETRY</span>
            <span className="mono text-muted" style={{ fontSize: '0.75rem' }}>DODGE VIPER RT/10</span>
          </div>

          {/* Speedometer & Gear */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="metric-label">VEHICLE SPEED</div>
              <div className="metric-val text-apex" style={{ fontSize: '2.2rem' }}>
                {currentStep.speed}
              </div>
            </div>
            <div style={{ width: '1px', height: '40px', background: 'var(--border-subtle)' }} />
            <div style={{ textAlign: 'center' }}>
              <div className="metric-label">CURRENT GEAR</div>
              <div className="metric-val text-cyan" style={{ fontSize: '2.2rem' }}>
                {currentStep.gear}
              </div>
            </div>
          </div>

          {/* Pedal Telemetry Bars */}
          <div className="pedal-bar-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }} className="mono">
              <span className="text-apex">THROTTLE INPUT</span>
              <span className="text-apex">{currentStep.throttle}%</span>
            </div>
            <div className="pedal-bar">
              <div className="pedal-fill-throttle" style={{ width: `${currentStep.throttle}%` }} />
            </div>
          </div>

          <div className="pedal-bar-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }} className="mono">
              <span className="text-red">BRAKE PRESSURE</span>
              <span className="text-red">{currentStep.brake}%</span>
            </div>
            <div className="pedal-bar">
              <div className="pedal-fill-brake" style={{ width: `${currentStep.brake}%` }} />
            </div>
          </div>

          {/* Steering Angle Indicator */}
          <div className="metric-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="metric-label">STEERING WHEEL ANGLE</div>
              <div className="metric-val" style={{ fontSize: '1.2rem' }}>
                {currentStep.steering > 0 ? `+${currentStep.steering}° RIGHT` : currentStep.steering < 0 ? `${currentStep.steering}° LEFT` : '0° CENTERED'}
              </div>
            </div>
            <div style={{ 
              width: '45px', 
              height: '45px', 
              borderRadius: '50%', 
              border: '3px solid var(--apex-green)', 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'center',
              transform: `rotate(${currentStep.steering * 2}deg)`,
              transition: 'transform 0.25s ease'
            }}>
              <div style={{ width: '4px', height: '18px', background: '#FFFFFF', borderRadius: '2px' }} />
            </div>
          </div>

          {/* Driver Sightline Box */}
          <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--telemetry-cyan)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.3rem' }} className="mono">
              <Eye size={16} /> DRIVER FOCAL SIGHTLINE:
            </div>
            <p className="text-primary" style={{ fontSize: '0.85rem' }}>
              "{currentStep.sightline}"
            </p>
          </div>
        </div>

        {/* Step Breakdown & Skip Barber Guidance */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem', border: '1px solid rgba(0, 230, 118, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-green">STEP {currentStep.step}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{currentStep.turnName}</h3>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              {currentStep.description}
            </p>
          </div>

          {/* Step Timeline Indicator */}
          <div>
            <div className="metric-label" style={{ marginBottom: '0.5rem' }}>SEBRING CIRCUIT RUN PROGRESSION:</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: '0.35rem' }}>
              {steps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: idx === currentStepIndex ? 'var(--apex-green)' : idx < currentStepIndex ? 'rgba(0, 230, 118, 0.4)' : 'rgba(255,255,255,0.1)',
                    boxShadow: idx === currentStepIndex ? '0 0 10px rgba(0, 230, 118, 0.8)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  title={`Step ${st.step}: ${st.turnName}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
