import React, { useState } from 'react';
import { Sidebar } from './components/shell/Sidebar';
import { TopHeader } from './components/shell/TopHeader';
import { QuickLogDrawer } from './components/shell/QuickLogDrawer';
import { CurriculumDashboard } from './components/dashboard/CurriculumDashboard';
import { CurriculumTree } from './components/curriculum/CurriculumTree';
import { SessionStepStage } from './components/curriculum/SessionStepStage';
import { CurriculumOverview } from './components/CurriculumOverview';
import { LineSimulator } from './components/LineSimulator';
import { SebringWalkthrough } from './components/SebringWalkthrough';
import { SelfAssessment } from './components/SelfAssessment';
import { SessionTracker } from './components/SessionTracker';
import { ChapterQuiz } from './components/ChapterQuiz';
import { DataManager } from './components/DataManager';
import { getStoredData, saveStoredData } from './utils/storage';
import { calculateMasteryScore } from './utils/physics';

export const App = () => {
  // Shell UI states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);

  // Active navigation view & step selection
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'curriculum', 'step-stage'
  const [activeStepId, setActiveStepId] = useState('step-1-1');

  // Loaded persistent state from storage
  const [userData, setUserData] = useState(() => {
    const data = getStoredData();
    if (!data.completedSteps) {
      data.completedSteps = ['step-1-1']; // Default start
    }
    return data;
  });

  const completedSteps = userData.completedSteps || ['step-1-1'];

  // Reload state from LocalStorage (after import/reset)
  const handleReloadData = () => {
    const fresh = getStoredData();
    if (!fresh.completedSteps) fresh.completedSteps = ['step-1-1'];
    setUserData(fresh);
  };

  // State update helpers
  const handleToggleStepComplete = (stepId) => {
    const exists = completedSteps.includes(stepId);
    const updatedSteps = exists 
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];

    const updatedData = { ...userData, completedSteps: updatedSteps };
    setUserData(updatedData);
    saveStoredData(updatedData);
  };

  const handleUpdateRubrics = (newRubrics) => {
    const updated = { ...userData, rubricRatings: newRubrics };
    setUserData(updated);
    saveStoredData(updated);
  };

  const handleUpdateSessionLogs = (newLogs) => {
    const updated = { ...userData, sessionLogs: newLogs };
    setUserData(updated);
    saveStoredData(updated);
  };

  const handleUpdateQuizScores = (newQuizScores) => {
    const updated = { ...userData, quizScores: newQuizScores };
    setUserData(updated);
    saveStoredData(updated);
  };

  // Step selection router
  const handleSelectStep = (stepId) => {
    setActiveStepId(stepId);
    setActiveView('step-stage');
  };

  const masteryInfo = calculateMasteryScore(userData.rubricRatings);

  // Render stage tool component based on stepId
  const renderStepToolComponent = () => {
    switch (activeStepId) {
      case 'step-1-1':
        return <CurriculumOverview onNavigateTab={(view) => {
          if (view === 'simulator') handleSelectStep('step-1-2');
        }} />;
      case 'step-1-2':
        return <LineSimulator />;
      case 'step-1-3':
        return <SebringWalkthrough />;
      case 'step-1-4':
        return (
          <SelfAssessment
            rubricRatings={userData.rubricRatings}
            setRubricRatings={(val) => setUserData({ ...userData, rubricRatings: val })}
            onSave={handleUpdateRubrics}
          />
        );
      case 'step-1-5':
        return (
          <ChapterQuiz
            quizScores={userData.quizScores}
            setQuizScores={(val) => setUserData({ ...userData, quizScores: val })}
            onSave={handleUpdateQuizScores}
          />
        );
      case 'step-1-6':
        return (
          <SessionTracker
            sessionLogs={userData.sessionLogs}
            setSessionLogs={(val) => setUserData({ ...userData, sessionLogs: val })}
            onSave={handleUpdateSessionLogs}
          />
        );
      default:
        return <CurriculumOverview onNavigateTab={() => {}} />;
    }
  };

  return (
    <div className="apex-app-layout">
      {/* Left Navigation Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeView={activeView}
        setActiveView={setActiveView}
        activeStepId={activeStepId}
        onSelectStep={handleSelectStep}
        completedSteps={completedSteps}
        masteryInfo={masteryInfo}
      />

      {/* Main Content Area */}
      <div className="apex-main-wrapper">
        {/* Top Telemetry Header */}
        <TopHeader
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          masteryInfo={masteryInfo}
          onOpenQuickLog={() => setQuickLogOpen(true)}
          onOpenDataModal={() => setDataModalOpen(true)}
          completedStepsCount={completedSteps.length}
        />

        {/* Dynamic Page Views */}
        <main className="container" style={{ flex: '1', width: '100%' }}>
          {activeView === 'dashboard' && (
            <CurriculumDashboard
              completedSteps={completedSteps}
              onSelectStep={handleSelectStep}
              masteryInfo={masteryInfo}
              sessionLogsCount={userData.sessionLogs?.length || 0}
              quizScores={userData.quizScores}
            />
          )}

          {activeView === 'curriculum' && (
            <CurriculumTree
              activeStepId={activeStepId}
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
            />
          )}

          {activeView === 'step-stage' && (
            <SessionStepStage
              activeStepId={activeStepId}
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              {renderStepToolComponent()}
            </SessionStepStage>
          )}

          {activeView === 'simulator' && (
            <SessionStepStage
              activeStepId="step-1-2"
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              <LineSimulator />
            </SessionStepStage>
          )}

          {activeView === 'sebring' && (
            <SessionStepStage
              activeStepId="step-1-3"
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              <SebringWalkthrough />
            </SessionStepStage>
          )}

          {activeView === 'assessment' && (
            <SessionStepStage
              activeStepId="step-1-4"
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              <SelfAssessment
                rubricRatings={userData.rubricRatings}
                setRubricRatings={(val) => setUserData({ ...userData, rubricRatings: val })}
                onSave={handleUpdateRubrics}
              />
            </SessionStepStage>
          )}

          {activeView === 'quiz' && (
            <SessionStepStage
              activeStepId="step-1-5"
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              <ChapterQuiz
                quizScores={userData.quizScores}
                setQuizScores={(val) => setUserData({ ...userData, quizScores: val })}
                onSave={handleUpdateQuizScores}
              />
            </SessionStepStage>
          )}

          {activeView === 'tracker' && (
            <SessionStepStage
              activeStepId="step-1-6"
              onSelectStep={handleSelectStep}
              completedSteps={completedSteps}
              onToggleStepComplete={handleToggleStepComplete}
            >
              <SessionTracker
                sessionLogs={userData.sessionLogs}
                setSessionLogs={(val) => setUserData({ ...userData, sessionLogs: val })}
                onSave={handleUpdateSessionLogs}
              />
            </SessionStepStage>
          )}
        </main>

        {/* Global Footer */}
        <footer style={{
          background: 'rgba(6, 9, 15, 0.95)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.8rem'
        }}>
          <div className="flex-between align-center flex-wrap gap-sm">
            <div>
              <span className="mono text-apex font-bold">APEX v1.9</span> — Telemetry Cockpit App Shell
            </div>
            <div className="text-secondary">
              Based on <em>Going Faster!</em> by Skip Barber Racing School
            </div>
            <div className="mono text-xs">
              STORAGE: <span className="text-apex">ENABLED</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Quick Log Slide-Over Drawer */}
      <QuickLogDrawer
        isOpen={quickLogOpen}
        onClose={() => setQuickLogOpen(false)}
        sessionLogs={userData.sessionLogs || []}
        onSaveSessionLogs={handleUpdateSessionLogs}
      />

      {/* Backup & Storage Manager Modal */}
      <DataManager
        isOpen={dataModalOpen}
        onClose={() => setDataModalOpen(false)}
        onReloadData={handleReloadData}
      />
    </div>
  );
};

export default App;
