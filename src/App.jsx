import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
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
  const [activeTab, setActiveTab] = useState('curriculum');
  const [dataModalOpen, setDataModalOpen] = useState(false);

  // Loaded user state
  const [userData, setUserData] = useState(() => getStoredData());

  // Reload state from LocalStorage (after import/reset)
  const handleReloadData = () => {
    setUserData(getStoredData());
  };

  // Update helper functions
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

  const masteryInfo = calculateMasteryScore(userData.rubricRatings);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Telemetry Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        masteryInfo={masteryInfo}
        onOpenDataModal={() => setDataModalOpen(true)}
      />

      {/* Main Container */}
      <main className="container" style={{ flex: '1' }}>
        {/* Chapter 1 Hero Navigation Banner */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content Panels */}
        {activeTab === 'curriculum' && (
          <CurriculumOverview onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'simulator' && (
          <LineSimulator />
        )}

        {activeTab === 'sebring' && (
          <SebringWalkthrough />
        )}

        {activeTab === 'assessment' && (
          <SelfAssessment
            rubricRatings={userData.rubricRatings}
            setRubricRatings={(val) => setUserData({ ...userData, rubricRatings: val })}
            onSave={handleUpdateRubrics}
          />
        )}

        {activeTab === 'tracker' && (
          <SessionTracker
            sessionLogs={userData.sessionLogs}
            setSessionLogs={(val) => setUserData({ ...userData, sessionLogs: val })}
            onSave={handleUpdateSessionLogs}
          />
        )}

        {activeTab === 'quiz' && (
          <ChapterQuiz
            quizScores={userData.quizScores}
            setQuizScores={(val) => setUserData({ ...userData, quizScores: val })}
            onSave={handleUpdateQuizScores}
          />
        )}
      </main>

      {/* Backup & Storage Manager Modal */}
      <DataManager
        isOpen={dataModalOpen}
        onClose={() => setDataModalOpen(false)}
        onReloadData={handleReloadData}
      />

      {/* Footer */}
      <footer style={{
        background: 'rgba(6, 9, 15, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{ padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="mono text-apex" style={{ fontWeight: 700 }}>APEX v1.0</span> — Simracing Beginner Curriculum & Assessment
            </div>
            <div className="text-secondary">
              Based on <em>Going Faster!</em> by Skip Barber Racing School
            </div>
            <div className="mono" style={{ fontSize: '0.75rem' }}>
              OFFLINE-FIRST STORAGE: <span className="text-apex">ENABLED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
