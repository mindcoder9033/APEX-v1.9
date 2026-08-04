import React, { useState, useEffect, useRef } from 'react';
import { Compass, Zap, RotateCcw, Info, Play, Pause } from 'lucide-react';
import { calculateMaxCornerSpeed, calculateStraightawayGain } from '../utils/physics';

export const LineSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedLine, setSelectedLine] = useState('all'); // 'r1', 'r2', 'r3', 'all'
  const [radiusInput, setRadiusInput] = useState(105); // feet for R3
  const [tireGrip, setTireGrip] = useState(1.0); // mu
  const [exitBoost, setExitBoost] = useState(4); // mph boost on exit
  const [isPlaying, setIsPlaying] = useState(true);
  const animProgressRef = useRef(0);

  // Physics values
  const r1Speed = calculateMaxCornerSpeed(100, tireGrip);
  const r3Speed = calculateMaxCornerSpeed(radiusInput, tireGrip);
  const straightGain = calculateStraightawayGain(53, 53 + exitBoost, 1320, 100);

  // Draw Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Track Asphalt Borders (A 90-degree right hand turn)
      const cx = 380;
      const cy = 340;
      const trackWidth = 75;

      // Track inner edge
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, cy);
      ctx.lineTo(cx - 100, cy);
      ctx.arc(cx - 100, cy - 100, 100, Math.PI / 2, 0, true);
      ctx.lineTo(cx, 40);
      ctx.stroke();

      // Track outer edge
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.beginPath();
      ctx.moveTo(80, cy + trackWidth);
      ctx.lineTo(cx - 100, cy + trackWidth);
      ctx.arc(cx - 100, cy - 100, 100 + trackWidth, Math.PI / 2, 0, true);
      ctx.lineTo(cx + trackWidth, 40);
      ctx.stroke();

      // Curb Apex Marker (Red/White curb on inside)
      ctx.strokeStyle = '#FF3D00';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx - 100, cy - 100, 100, Math.PI * 0.35, Math.PI * 0.15, true);
      ctx.stroke();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 6;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(cx - 100, cy - 100, 100, Math.PI * 0.35, Math.PI * 0.15, true);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Lines
      // R1: Tight Inside Line
      if (selectedLine === 'r1' || selectedLine === 'all') {
        ctx.strokeStyle = '#FF3D00';
        ctx.lineWidth = selectedLine === 'r1' ? 4 : 2;
        ctx.beginPath();
        ctx.moveTo(80, cy + 10);
        ctx.lineTo(cx - 100, cy + 10);
        ctx.arc(cx - 100, cy - 100, 110, Math.PI / 2, 0, true);
        ctx.lineTo(cx + 10, 40);
        ctx.stroke();
      }

      // R2: Wide Outside Line
      if (selectedLine === 'r2' || selectedLine === 'all') {
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = selectedLine === 'r2' ? 4 : 2;
        ctx.beginPath();
        ctx.moveTo(80, cy + trackWidth - 10);
        ctx.lineTo(cx - 100, cy + trackWidth - 10);
        ctx.arc(cx - 100, cy - 100, 100 + trackWidth - 10, Math.PI / 2, 0, true);
        ctx.lineTo(cx + trackWidth - 10, 40);
        ctx.stroke();
      }

      // R3: Ideal Skip Barber Arc (Max Radius)
      if (selectedLine === 'r3' || selectedLine === 'all') {
        ctx.strokeStyle = '#00E676';
        ctx.lineWidth = selectedLine === 'r3' ? 5 : 3;
        ctx.shadowColor = '#00E676';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        // Start far outside, apex inside, exit far outside
        ctx.moveTo(80, cy + trackWidth - 10);
        ctx.bezierCurveTo(cx - 120, cy + trackWidth - 10, cx - 100, cy + 5, cx - 100, cy + 5);
        ctx.bezierCurveTo(cx - 100, cy + 5, cx + 5, cy - 100, cx + trackWidth - 10, 40);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Animated Car Dot on R3 Path
      if (isPlaying) {
        animProgressRef.current = (animProgressRef.current + 0.006) % 1;
      }
      const t = animProgressRef.current;

      // Approximate bezier point for car position
      let carX, carY;
      if (t < 0.5) {
        const u = t * 2;
        carX = (1 - u) * 80 + u * (cx - 100);
        carY = (1 - u) * (cy + trackWidth - 10) + u * (cy + 5);
      } else {
        const u = (t - 0.5) * 2;
        carX = (1 - u) * (cx - 100) + u * (cx + trackWidth - 10);
        carY = (1 - u) * (cy + 5) + u * 40;
      }

      // Draw Car
      ctx.fillStyle = '#00E676';
      ctx.shadowColor = '#00E676';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(carX, carY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // HUD Label on Canvas
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText(`LINE: ${selectedLine.toUpperCase()}`, 20, 30);
      ctx.fillText(`RADIUS: ${radiusInput} FT`, 20, 50);
      ctx.fillText(`MAX SPEED: ${r3Speed} MPH`, 20, 70);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedLine, radiusInput, tireGrip, isPlaying, r3Speed]);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass className="text-apex" size={22} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Racing Line & Radius Physics Simulator</h2>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Compare R1 (Inside), R2 (Outside), and R3 (Ideal Apex Arc). Larger radius ($R$) = higher cornering speed ($v \propto \sqrt{R}$).
          </p>
        </div>

        {/* Play/Pause */}
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'PAUSE SIM' : 'PLAY SIM'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Canvas Render Panel */}
        <div style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: 'var(--radius-md)', padding: '0.5rem', border: '1px solid var(--border-subtle)', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <canvas 
            ref={canvasRef} 
            width={520} 
            height={400} 
            style={{ width: '100%', maxHeight: '400px', borderRadius: 'var(--radius-sm)' }}
          />
        </div>

        {/* Physics Controls & Telemetry Readouts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Line Selection Buttons */}
          <div>
            <label className="metric-label" style={{ display: 'block', marginBottom: '0.5rem' }}>SELECT RACING PATH:</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              <button 
                className={`btn btn-sm ${selectedLine === 'r1' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => setSelectedLine('r1')}
              >
                R1 (Inside)
              </button>
              <button 
                className={`btn btn-sm ${selectedLine === 'r2' ? 'btn-cyan' : 'btn-secondary'}`}
                onClick={() => setSelectedLine('r2')}
              >
                R2 (Outside)
              </button>
              <button 
                className={`btn btn-sm ${selectedLine === 'r3' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLine('r3')}
              >
                R3 (Ideal Arc)
              </button>
              <button 
                className={`btn btn-sm ${selectedLine === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLine('all')}
              >
                COMPARE ALL
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="metric-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span className="metric-label">IDEAL CORNER RADIUS (R3):</span>
              <span className="mono text-apex" style={{ fontWeight: 700 }}>{radiusInput} FEET</span>
            </div>
            <input 
              type="range" 
              min={80} 
              max={150} 
              value={radiusInput}
              onChange={(e) => setRadiusInput(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>80 ft (Tight)</span>
              <span>105 ft (Skip Barber Baseline)</span>
              <span>150 ft (Wide Sweeper)</span>
            </div>
          </div>

          <div className="metric-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span className="metric-label">TIRE FRICTION COEFFICIENT (μ):</span>
              <span className="mono text-cyan" style={{ fontWeight: 700 }}>{tireGrip.toFixed(1)} μ</span>
            </div>
            <input 
              type="range" 
              min={0.7} 
              max={1.3} 
              step={0.1}
              value={tireGrip}
              onChange={(e) => setTireGrip(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>0.7 (Wet Rain)</span>
              <span>1.0 (Race Slick)</span>
              <span>1.3 (High Downforce)</span>
            </div>
          </div>

          {/* Telemetry Output Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="metric-box">
              <div className="metric-label">R1 INSIDE LIMIT</div>
              <div className="metric-val text-red">{r1Speed} <span style={{ fontSize: '0.8rem' }}>MPH</span></div>
            </div>
            <div className="metric-box" style={{ border: '1px solid rgba(0, 230, 118, 0.4)' }}>
              <div className="metric-label">R3 IDEAL ARC LIMIT</div>
              <div className="metric-val text-apex">{r3Speed} <span style={{ fontSize: '0.8rem' }}>MPH</span></div>
            </div>
          </div>

          {/* Straightaway Compounding Calculator */}
          <div style={{ background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.2)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Zap className="text-apex" size={18} />
              <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                EXIT SPEED STRAIGHTAWAY COMPOUNDING
              </span>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              +100 mph acceleration down 1/4 mile straight (1320 ft):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
              <div className="metric-box" style={{ padding: '0.4rem' }}>
                <div className="metric-label" style={{ fontSize: '0.65rem' }}>EXIT BOOST</div>
                <div className="metric-val text-cyan" style={{ fontSize: '1rem' }}>+{exitBoost} MPH</div>
              </div>
              <div className="metric-box" style={{ padding: '0.4rem' }}>
                <div className="metric-label" style={{ fontSize: '0.65rem' }}>LAP GAIN</div>
                <div className="metric-val text-apex" style={{ fontSize: '1rem' }}>-{straightGain.timeSavedSec}s</div>
              </div>
              <div className="metric-box" style={{ padding: '0.4rem' }}>
                <div className="metric-label" style={{ fontSize: '0.65rem' }}>20-LAP RACE</div>
                <div className="metric-val text-apex" style={{ fontSize: '1rem' }}>-{straightGain.raceSavedSec}s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
