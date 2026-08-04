import React, { useState } from 'react';
import { X, Plus, Save, ClipboardList, CheckCircle2 } from 'lucide-react';

export const QuickLogDrawer = ({ isOpen, onClose, sessionLogs, onSaveSessionLogs }) => {
  const [formData, setFormData] = useState({
    sim: 'iRacing',
    car: 'Mazda MX-5 Cup',
    track: 'Sebring International Raceway',
    bestLap: '',
    focusArea: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...formData
    };
    const updated = [newLog, ...sessionLogs];
    onSaveSessionLogs(updated);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        sim: 'iRacing',
        car: 'Mazda MX-5 Cup',
        track: 'Sebring International Raceway',
        bestLap: '',
        focusArea: '',
        notes: ''
      });
    }, 1000);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="flex-between align-center width-100">
            <div className="flex align-center gap-sm">
              <div className="drawer-icon-box">
                <ClipboardList size={18} className="text-apex" />
              </div>
              <div>
                <h3 className="mono text-apex margin-none">QUICK LOG PRACTICE SESSION</h3>
                <span className="text-muted text-xs">Record sim setup, lap time & focus area</span>
              </div>
            </div>
            <button className="btn-icon" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Content Form */}
        <div className="drawer-body">
          {submitted ? (
            <div className="text-center padding-xl">
              <CheckCircle2 size={48} className="text-apex mb-md margin-auto" />
              <h3 className="text-apex mono">SESSION LOGGED SUCCESSFULLY!</h3>
              <p className="text-muted text-sm">Saved to local browser storage.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quick-log-form">
              <div className="form-group mb-sm">
                <label className="mono text-xs uppercase text-muted">Sim Simulator Platform</label>
                <select 
                  className="input-field"
                  value={formData.sim}
                  onChange={(e) => setFormData({ ...formData, sim: e.target.value })}
                >
                  <option value="iRacing">iRacing</option>
                  <option value="Assetto Corsa">Assetto Corsa</option>
                  <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
                  <option value="Automobilista 2">Automobilista 2</option>
                  <option value="rFactor 2">rFactor 2</option>
                  <option value="Le Mans Ultimate">Le Mans Ultimate</option>
                  <option value="Other / Real Karting">Other / Real Karting</option>
                </select>
              </div>

              <div className="grid-2 gap-sm mb-sm">
                <div className="form-group">
                  <label className="mono text-xs uppercase text-muted">Car Model</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Mazda MX-5 / Ray FF1600"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="mono text-xs uppercase text-muted">Track Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Sebring International"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-sm">
                <label className="mono text-xs uppercase text-muted">Best Lap Time</label>
                <input
                  type="text"
                  className="input-field mono"
                  placeholder="e.g. 1:14.250"
                  value={formData.bestLap}
                  onChange={(e) => setFormData({ ...formData, bestLap: e.target.value })}
                />
              </div>

              <div className="form-group mb-sm">
                <label className="mono text-xs uppercase text-muted">Primary Focus Area</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Unwinding wheel on Hairpin exit"
                  value={formData.focusArea}
                  onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                  required
                />
              </div>

              <div className="form-group mb-md">
                <label className="mono text-xs uppercase text-muted">Session Notes & Telemetry Observations</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Notes on throttle application, brake points, tire wear, or setup tweaks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-sm">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-apex">
                  <Save size={16} className="mr-xs" />
                  Save Session Log
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
