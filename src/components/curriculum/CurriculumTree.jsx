import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  BookOpen, 
  Activity, 
  MapPin, 
  CheckSquare, 
  HelpCircle, 
  ClipboardList,
  Zap
} from 'lucide-react';
import { CURRICULUM_DATA } from '../../data/curriculumData';

export const CurriculumTree = ({ activeStepId, onSelectStep, completedSteps = [] }) => {
  const [expandedModules, setExpandedModules] = useState({ 'module-1': true });
  const [expandedChapters, setExpandedChapters] = useState({ 'chap-1': true });

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleChapter = (chapId) => {
    setExpandedChapters(prev => ({ ...prev, [chapId]: !prev[chapId] }));
  };

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
    <div className="curriculum-tree-container glass-panel padding-md">
      <div className="tree-header mb-md flex-between align-center">
        <div>
          <h3 className="mono text-apex margin-none">CURRICULUM TREE EXPLORER</h3>
          <span className="text-muted text-xs">Navigate Modules, Chapters & Interactive Session Steps</span>
        </div>
      </div>

      <div className="tree-body">
        {CURRICULUM_DATA.map((module) => {
          const isModExpanded = expandedModules[module.id];
          return (
            <div key={module.id} className="tree-module-node mb-md">
              {/* Module Node Header */}
              <div 
                className="module-node-header glass-panel padding-sm flex-between align-center cursor-pointer"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex align-center gap-sm">
                  {isModExpanded ? <ChevronDown size={18} className="text-apex" /> : <ChevronRight size={18} className="text-muted" />}
                  <span className="badge badge-apex mono text-xs">{module.badge}</span>
                  <h4 className="mono text-white margin-none">{module.title}</h4>
                </div>
                <div className="text-muted text-xs mono">
                  {module.chapters.length} Chapter
                </div>
              </div>

              {/* Chapters List */}
              {isModExpanded && (
                <div className="module-chapters-container pl-md mt-sm">
                  {module.chapters.map((chapter) => {
                    const isChapExpanded = expandedChapters[chapter.id];
                    const completedInChap = chapter.steps.filter(s => completedSteps.includes(s.id)).length;
                    const isChapComplete = completedInChap === chapter.steps.length;

                    return (
                      <div key={chapter.id} className="tree-chapter-node mb-sm">
                        {/* Chapter Node Header */}
                        <div 
                          className="chapter-node-header glass-panel padding-sm flex-between align-center cursor-pointer"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <div className="flex align-center gap-sm">
                            {isChapExpanded ? <ChevronDown size={16} className="text-apex" /> : <ChevronRight size={16} className="text-muted" />}
                            <span className="mono text-apex font-bold text-sm">{chapter.title}</span>
                          </div>
                          <div className="flex align-center gap-xs">
                            <span className="text-muted text-xs mono">{completedInChap}/{chapter.steps.length} Completed</span>
                            {isChapComplete && <CheckCircle2 size={16} className="text-apex ml-xs" />}
                          </div>
                        </div>

                        {/* Session Steps List */}
                        {isChapExpanded && (
                          <div className="chapter-steps-container pl-md mt-xs">
                            {chapter.steps.map((step) => {
                              const IconComponent = getStepIcon(step.type);
                              const isSelected = activeStepId === step.id;
                              const isCompleted = completedSteps.includes(step.id);

                              return (
                                <div 
                                  key={step.id}
                                  className={`step-tree-item padding-sm glass-panel flex-between align-center mb-xs cursor-pointer ${isSelected ? 'active-step' : ''} ${isCompleted ? 'completed-step' : ''}`}
                                  onClick={() => onSelectStep(step.id)}
                                >
                                  <div className="flex align-center gap-sm">
                                    <div className="step-check-icon">
                                      {isCompleted ? (
                                        <CheckCircle2 size={18} className="text-apex" />
                                      ) : isSelected ? (
                                        <Zap size={18} className="text-apex pulse" />
                                      ) : (
                                        <Circle size={18} className="text-muted" />
                                      )}
                                    </div>
                                    <IconComponent size={16} className={isSelected ? 'text-apex' : 'text-secondary'} />
                                    <div>
                                      <div className={`step-tree-title text-sm ${isSelected ? 'text-apex font-bold' : 'text-white'}`}>
                                        {step.title}
                                      </div>
                                      <div className="text-muted text-xs">{step.description}</div>
                                    </div>
                                  </div>

                                  <div className="mono text-xs text-muted flex align-center">
                                    <span>~{step.estimatedMin}m</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
