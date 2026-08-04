import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Activity, 
  MapPin, 
  CheckSquare, 
  HelpCircle, 
  ClipboardList, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Award,
  Zap
} from 'lucide-react';

export const Sidebar = ({ 
  collapsed, 
  setCollapsed, 
  activeView, 
  setActiveView, 
  activeStepId, 
  onSelectStep,
  completedSteps = [],
  masteryInfo
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Roadmap'
    },
    {
      id: 'curriculum',
      label: 'Curriculum Tree',
      icon: BookOpen,
      badge: '6 Steps'
    },
    {
      id: 'simulator',
      label: 'Line Simulator',
      icon: Activity,
      type: 'tool'
    },
    {
      id: 'sebring',
      label: 'Sebring Telemetry',
      icon: MapPin,
      type: 'tool'
    },
    {
      id: 'assessment',
      label: 'Self-Assessment',
      icon: CheckSquare,
      type: 'tool'
    },
    {
      id: 'quiz',
      label: 'Scenario Quiz',
      icon: HelpCircle,
      type: 'tool'
    },
    {
      id: 'tracker',
      label: 'Practice Sessions',
      icon: ClipboardList,
      type: 'tool'
    }
  ];

  return (
    <aside className={`apex-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header & Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo-wrapper">
          <div className="brand-icon-box">
            <Zap className="text-apex" size={20} />
          </div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-title mono">APEX</span>
              <span className="brand-subtitle">Simracing Academy</span>
            </div>
          )}
        </div>
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand Navigation" : "Collapse Navigation"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Mastery Status Widget (Expanded only) */}
      {!collapsed && (
        <div className="sidebar-mastery-card glass-panel margin-sm">
          <div className="flex-between align-center mb-xs">
            <span className="text-muted text-xs uppercase mono">Driver Mastery</span>
            <span className="badge badge-apex mono text-xs">{masteryInfo.percentage}%</span>
          </div>
          <div className="progress-bar-bg" style={{ height: '6px' }}>
            <div 
              className="progress-bar-fill"
              style={{ width: `${masteryInfo.percentage}%` }}
            />
          </div>
          <div className="flex-between align-center mt-xs text-xs text-secondary">
            <span>Completed: <strong>{completedSteps.length}/6 Steps</strong></span>
            <span>{masteryInfo.tier}</span>
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">
          {!collapsed ? <span>NAVIGATION</span> : <Layers size={14} className="text-muted" />}
        </div>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView(item.id);
                    if (item.id === 'simulator') onSelectStep('step-1-2');
                    else if (item.id === 'sebring') onSelectStep('step-1-3');
                    else if (item.id === 'assessment') onSelectStep('step-1-4');
                    else if (item.id === 'quiz') onSelectStep('step-1-5');
                    else if (item.id === 'tracker') onSelectStep('step-1-6');
                  }}
                  title={item.label}
                >
                  <Icon size={18} className="nav-icon" />
                  {!collapsed && (
                    <div className="nav-label-container">
                      <span className="nav-label">{item.label}</span>
                      {item.badge && <span className="nav-badge mono">{item.badge}</span>}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="text-muted text-xs mono align-center text-center">
            SKIP BARBER METHODOLOGY
          </div>
        )}
      </div>
    </aside>
  );
};
