import React from 'react';
import { 
  Menu, 
  Plus, 
  Database, 
  Award, 
  Zap, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';

export const TopHeader = ({
  collapsed,
  setCollapsed,
  masteryInfo,
  onOpenQuickLog,
  onOpenDataModal,
  completedStepsCount = 0
}) => {
  return (
    <header className="apex-top-header">
      {/* Left: Mobile/Sidebar Toggle & Status */}
      <div className="header-left">
        <button 
          className="header-icon-btn sidebar-mobile-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="telemetry-badge-group">
          <div className="track-badge">
            <MapPin size={14} className="text-apex mr-xs" />
            <span className="mono text-xs font-semibold">SEBRING INTL RACEWAY</span>
            <span className="divider-dot">•</span>
            <span className="text-muted text-xs">Mazda MX-5 Cup / Viper</span>
          </div>

          <div className="system-status-pill hidden-mobile">
            <span className="status-dot green pulse"></span>
            <span className="mono text-xs text-secondary">STORAGE: LOCAL OK</span>
          </div>
        </div>
      </div>

      {/* Right: Mastery Ring, Quick Actions & Settings */}
      <div className="header-right">
        {/* Mastery Ring Pill */}
        <div className="mastery-header-pill" title={`Overall Mastery: ${masteryInfo.percentage}% (${masteryInfo.tier})`}>
          <div className="mastery-mini-ring">
            <svg width="32" height="32" viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-fill"
                strokeDasharray={`${masteryInfo.percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="ring-text mono">{masteryInfo.percentage}%</span>
          </div>
          <div className="mastery-pill-info hidden-mobile">
            <span className="mono text-apex font-bold text-sm">{masteryInfo.tier}</span>
            <span className="text-muted text-xs">{completedStepsCount}/6 Steps Completed</span>
          </div>
        </div>

        {/* Quick Log Session Button */}
        <button 
          className="btn btn-apex btn-sm"
          onClick={onOpenQuickLog}
        >
          <Plus size={16} className="mr-xs" />
          <span>Log Session</span>
        </button>

        {/* Backup / Data Manager Button */}
        <button 
          className="btn btn-secondary btn-sm icon-only-mobile"
          onClick={onOpenDataModal}
          title="Backup & Restore Data"
        >
          <Database size={16} />
          <span className="hidden-mobile">Backup & Sync</span>
        </button>
      </div>
    </header>
  );
};
