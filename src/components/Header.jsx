import React from 'react';
import { Flag, Compass, Activity, CheckSquare, BookOpen, Database, Award } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, masteryInfo, onOpenDataModal }) => {
  const tabs = [
    { id: 'curriculum', label: 'Curriculum & Theory', icon: BookOpen },
    { id: 'simulator', label: 'Line & Radius Simulator', icon: Compass },
    { id: 'sebring', label: 'Sebring Telemetry Run', icon: Activity },
    { id: 'assessment', label: 'Self-Assessment', icon: Award },
    { id: 'tracker', label: 'Practice Logs', icon: CheckSquare },
    { id: 'quiz', label: 'Chapter Quiz', icon: Flag }
  ];

  return (
    <header className="header">
      <div className="header-content">
        {/* Brand */}
        <div className="logo-brand">
          <div className="logo-icon">
            <Activity size={22} className="pulse-glow" />
          </div>
          <div>
            <div className="logo-text">APEX</div>
            <div className="text-muted mono" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', marginTop: '-4px' }}>
              SIMRACING ACADEMY
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status & Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Mastery Badge */}
          <div className="metric-box" style={{ padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="text-muted mono" style={{ fontSize: '0.7rem' }}>MASTERY:</span>
            <span className={`badge ${masteryInfo.badgeClass}`}>
              {masteryInfo.score}% • {masteryInfo.badge}
            </span>
          </div>

          {/* Backup Data Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onOpenDataModal}
            title="Backup & Restore Local Data"
          >
            <Database size={15} />
            <span className="mono" style={{ fontSize: '0.75rem' }}>DATA</span>
          </button>
        </div>
      </div>
    </header>
  );
};
