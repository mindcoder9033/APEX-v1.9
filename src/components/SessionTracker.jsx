import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, ShieldCheck, Flag } from 'lucide-react';

export const SessionTracker = ({ sessionLogs, setSessionLogs, onSave }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    sim: 'iRacing',
    car: '',
    track: '',
    bestLap: '',
    focusArea: 'Finding R3 ideal line arc & unwinding wheel on exit',
    notes: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.car || !formData.track) return;

    const newLog = {
      id: `log-${Date.now()}`,
      ...formData
    };

    const updated = [newLog, ...sessionLogs];
    setSessionLogs(updated);
    onSave(updated);

    setFormData({
      date: new Date().toISOString().split('T')[0],
      sim: 'iRacing',
      car: '',
      track: '',
      bestLap: '',
      focusArea: 'Finding R3 ideal line arc & unwinding wheel on exit',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    const updated = sessionLogs.filter((log) => log.id !== id);
    setSessionLogs(updated);
    onSave(updated);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckSquare className="text-cyan" size={22} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Sim Practice Session Tracker</h2>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Log your sim sessions, track/car combinations, and target Skip Barber technique focus areas.
          </p>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          <span>{showAddForm ? 'CANCEL' : 'LOG NEW PRACTICE SESSION'}</span>
        </button>
      </div>

      {/* Add Session Form Modal/Panel */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--apex-green)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--apex-green)' }}>
            + NEW SIM PRACTICE ENTRY
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="metric-label">DATE</label>
              <input
                type="date"
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'left' }}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="metric-label">SIMULATOR</label>
              <select
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'left', background: 'var(--bg-input)' }}
                value={formData.sim}
                onChange={(e) => setFormData({ ...formData, sim: e.target.value })}
              >
                <option value="iRacing">iRacing</option>
                <option value="Assetto Corsa">Assetto Corsa</option>
                <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
                <option value="Le Mans Ultimate">Le Mans Ultimate</option>
                <option value="Automobilista 2">Automobilista 2</option>
                <option value="rFactor 2">rFactor 2</option>
              </select>
            </div>
            <div>
              <label className="metric-label">CAR MODEL</label>
              <input
                type="text"
                placeholder="e.g. Ray FF1600 / MX-5"
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'left' }}
                value={formData.car}
                onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="metric-label">TRACK & LAYOUT</label>
              <input
                type="text"
                placeholder="e.g. Sebring International"
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'left' }}
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="metric-label">BEST LAP TIME</label>
              <input
                type="text"
                placeholder="e.g. 1:14.250"
                className="btn btn-secondary"
                style={{ width: '100%', textAlign: 'left' }}
                value={formData.bestLap}
                onChange={(e) => setFormData({ ...formData, bestLap: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="metric-label">CHAPTER 1 TECHNIQUE FOCUS</label>
            <input
              type="text"
              placeholder="e.g. Unwinding steering wheel on exit / Repeatable 300ft brake marker"
              className="btn btn-secondary"
              style={{ width: '100%', textAlign: 'left' }}
              value={formData.focusArea}
              onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="metric-label">NOTES & DRIVING OBSERVATIONS</label>
            <textarea
              placeholder="Record lap time gains, telemetry feel, or mistakes..."
              className="btn btn-secondary"
              style={{ width: '100%', minHeight: '70px', textAlign: 'left', fontFamily: 'var(--font-sans)' }}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            SAVE SESSION LOG
          </button>
        </form>
      )}

      {/* Session Logs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sessionLogs.length === 0 ? (
          <div className="text-muted text-center" style={{ padding: '2rem' }}>
            No practice sessions logged yet. Click "+ LOG NEW PRACTICE SESSION" to record your driving.
          </div>
        ) : (
          sessionLogs.map((log) => (
            <div 
              key={log.id} 
              className="metric-box"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="badge badge-cyan">{log.sim}</span>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{log.car} @ {log.track}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {log.bestLap && (
                    <span className="mono text-apex" style={{ fontWeight: 700 }}>
                      BEST: {log.bestLap}
                    </span>
                  )}
                  <span className="text-muted mono" style={{ fontSize: '0.8rem' }}>
                    {log.date}
                  </span>
                  <button 
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.2rem 0.4rem' }}
                    onClick={() => handleDelete(log.id)}
                    title="Delete log entry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {log.focusArea && (
                <div style={{ fontSize: '0.85rem', color: 'var(--telemetry-cyan)' }} className="mono">
                  FOCUS: {log.focusArea}
                </div>
              )}

              {log.notes && (
                <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                  "{log.notes}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
