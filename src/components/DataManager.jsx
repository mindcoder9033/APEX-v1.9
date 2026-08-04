import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { exportUserDataJSON, importUserDataJSON, resetUserData } from '../utils/storage';

export const DataManager = ({ isOpen, onClose, onReloadData }) => {
  const [importStatus, setImportStatus] = useState(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportUserDataJSON();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const success = importUserDataJSON(content);
      if (success) {
        setImportStatus({ type: 'success', msg: 'Data imported successfully!' });
        onReloadData();
      } else {
        setImportStatus({ type: 'error', msg: 'Failed to parse JSON backup file.' });
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all APEX progress, rubrics, and practice logs?')) {
      resetUserData();
      onReloadData();
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{ maxWidth: '520px', width: '100%', padding: '1.5rem', border: '1px solid var(--border-active)', position: 'relative' }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Database className="text-apex" size={24} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Data Backup & Storage Manager</h2>
        </div>

        <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          APEX is 100% offline-first. Your progress, rubric ratings, and practice session logs are stored safely in your browser.
        </p>

        {importStatus && (
          <div style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            background: importStatus.type === 'success' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 61, 0, 0.1)',
            border: importStatus.type === 'success' ? '1px solid var(--apex-green)' : '1px solid var(--racing-red)',
            color: importStatus.type === 'success' ? 'var(--apex-green)' : 'var(--racing-red)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {importStatus.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
            <span>{importStatus.msg}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Export JSON */}
          <div className="metric-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Export Backup JSON</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Download local progress as JSON file</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleExport}>
              <Download size={14} /> EXPORT
            </button>
          </div>

          {/* Import JSON */}
          <div className="metric-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Restore Backup JSON</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Upload previously saved apex-progress.json</div>
            </div>
            <label className="btn btn-cyan btn-sm" style={{ margin: 0, cursor: 'pointer' }}>
              <Upload size={14} /> RESTORE
              <input type="file" accept=".json" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Reset All */}
          <div className="metric-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid rgba(255, 61, 0, 0.3)' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--racing-red)' }}>Reset All Local Data</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Clear all stored progress and logs</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleReset}>
              <RefreshCw size={14} /> RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
