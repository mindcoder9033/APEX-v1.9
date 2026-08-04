import React from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  Activity, 
  MapPin, 
  CheckSquare, 
  HelpCircle, 
  ClipboardList, 
  BookOpen, 
  ArrowRight,
  Zap,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react';
import { CURRICULUM_DATA } from '../../data/curriculumData';

export const CurriculumDashboard = ({
  completedSteps = [],
  onSelectStep,
  masteryInfo,
  sessionLogsCount = 0,
  quizScores
}) => {
  const chapter1 = CURRICULUM_DATA[0].chapters[0];
  const steps = chapter1.steps;

  // Find next incomplete step
  const nextIncompleteStep = steps.find(s => !completedSteps.includes(s.id)) || steps[0];

  const getStepIcon = (type) => {
    switch (type) {
      case 'theory': return BookOpen;
      case 'simulator': return Activity;
      case 'sebring': return MapPin;
      case 'assessment': return CheckSquare;
      case 'quiz': return HelpCircle;
      case 'tracker': return ClipboardList;
      default: return PlayCircle;
    }
  };

  return (
    <div className="curriculum-dashboard">
      {/* Hero "Continue Learning" Banner */}
      <div className="dashboard-hero-card glass-panel mb-lg glow-border-apex">
        <div className="hero-content-grid">
          <div className="hero-main">
            <div className="badge badge-apex mb-xs inline-flex align-center">
              <Zap size={12} className="mr-xs" />
              ACTIVE LEARNING PATH
            </div>
            <h1 className="mono text-apex hero-title">MODULE 1: SKIP BARBER FUNDAMENTALS</h1>
            <p className="text-secondary hero-description">
              Demystifying racetrack chaos using the 3-Tiered Priority Pyramid: Corner Radius, Exit Speed, and Braking Efficiency.
            </p>
            <div className="flex align-center gap-md mt-md flex-wrap">
              <button 
                className="btn btn-apex btn-lg"
                onClick={() => onSelectStep(nextIncompleteStep.id)}
              >
                <PlayCircle size={20} className="mr-xs" />
                <span>Continue: {nextIncompleteStep.shortName}</span>
                <ArrowRight size={18} className="ml-xs" />
              </button>
              <div className="text-muted text-xs mono flex align-center">
                <Clock size={14} className="mr-xs text-apex" />
                <span>Next Step ~{nextIncompleteStep.estimatedMin} mins</span>
              </div>
            </div>
          </div>

          <div className="hero-stats-panel glass-panel">
            <div className="hero-stat-item">
              <span className="stat-label uppercase mono text-xs text-muted">Mastery Index</span>
              <div className="stat-value-group">
                <span className="stat-value mono text-apex">{masteryInfo.percentage}%</span>
                <span className="stat-subtext text-xs text-secondary">{masteryInfo.tier}</span>
              </div>
            </div>
            <div className="divider-hr" />
            <div className="hero-stat-item">
              <span className="stat-label uppercase mono text-xs text-muted">Curriculum Progress</span>
              <div className="stat-value-group">
                <span className="stat-value mono text-white">{completedSteps.length} / {steps.length}</span>
                <span className="stat-subtext text-xs text-secondary">Steps Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metric Grid */}
      <div className="grid-3 gap-md mb-lg">
        <div className="glass-panel metric-card">
          <div className="metric-icon-box">
            <Award className="text-apex" size={24} />
          </div>
          <div>
            <span className="mono text-xs text-muted uppercase">Skill Rubric Score</span>
            <h3 className="mono text-apex margin-none mt-xs">{masteryInfo.percentage}%</h3>
            <span className="text-muted text-xs">Based on Priority 1, 2 & 3 ratings</span>
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-icon-box">
            <ClipboardList className="text-cyan" size={24} />
          </div>
          <div>
            <span className="mono text-xs text-muted uppercase">Telemetry Logs</span>
            <h3 className="mono text-cyan margin-none mt-xs">{sessionLogsCount} Sessions</h3>
            <span className="text-muted text-xs">Logged practice sessions</span>
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-icon-box">
            <HelpCircle className="text-apex" size={24} />
          </div>
          <div>
            <span className="mono text-xs text-muted uppercase">Quiz Performance</span>
            <h3 className="mono text-white margin-none mt-xs">
              {quizScores?.chapter1 ? `${quizScores.chapter1.score}/${quizScores.chapter1.total}` : 'Not Taken'}
            </h3>
            <span className="text-muted text-xs">Chapter 1 scenario check</span>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Section */}
      <div className="roadmap-section glass-panel padding-lg mb-lg">
        <div className="flex-between align-center mb-md flex-wrap gap-sm">
          <div>
            <h2 className="mono text-apex margin-none flex align-center">
              <BookOpen size={22} className="mr-xs" />
              CHAPTER 1 SESSION STEPS ROADMAP
            </h2>
            <span className="text-muted text-sm">Click any step to open the interactive split-stage workspace</span>
          </div>
          <div className="progress-badge-group mono text-xs">
            <span className="text-apex">{Math.round((completedSteps.length / steps.length) * 100)}% Complete</span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="progress-bar-bg mb-lg" style={{ height: '8px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
          />
        </div>

        {/* Session Step Grid */}
        <div className="roadmap-step-grid">
          {steps.map((step, index) => {
            const IconComponent = getStepIcon(step.type);
            const isCompleted = completedSteps.includes(step.id);
            const isNext = step.id === nextIncompleteStep.id;

            return (
              <div 
                key={step.id} 
                className={`roadmap-step-card glass-panel ${isCompleted ? 'completed' : ''} ${isNext ? 'active-next' : ''}`}
                onClick={() => onSelectStep(step.id)}
              >
                <div className="step-card-header">
                  <div className="step-number mono">STEP 0{index + 1}</div>
                  {isCompleted ? (
                    <span className="step-status-badge completed flex align-center">
                      <CheckCircle2 size={14} className="mr-xs" /> Completed
                    </span>
                  ) : isNext ? (
                    <span className="step-status-badge next flex align-center">
                      <Zap size={14} className="mr-xs text-apex" /> Up Next
                    </span>
                  ) : (
                    <span className="step-status-badge pending">Pending</span>
                  )}
                </div>

                <div className="step-card-body">
                  <div className="step-icon-wrapper mb-xs">
                    <IconComponent size={24} className={isCompleted ? 'text-apex' : 'text-secondary'} />
                  </div>
                  <h4 className="step-title font-bold text-white mb-xs">{step.title}</h4>
                  <p className="step-description text-muted text-xs mb-sm">{step.description}</p>
                </div>

                <div className="step-card-footer flex-between align-center">
                  <span className="text-muted text-xs mono flex align-center">
                    <Clock size={12} className="mr-xs" /> {step.estimatedMin} mins
                  </span>
                  <span className="text-apex text-xs mono font-bold flex align-center link-hover">
                    Launch <ArrowRight size={14} className="ml-xs" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
