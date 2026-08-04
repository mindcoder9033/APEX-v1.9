import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  BookOpen, 
  Activity, 
  Award, 
  FileText, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { CURRICULUM_DATA } from '../../data/curriculumData';

export const SessionStepStage = ({
  activeStepId,
  onSelectStep,
  completedSteps,
  onToggleStepComplete,
  children
}) => {
  const steps = CURRICULUM_DATA[0].chapters[0].steps;
  const currentIndex = steps.findIndex(s => s.id === activeStepId);
  const currentStep = steps[currentIndex] || steps[0];
  const isCompleted = completedSteps.includes(currentStep.id);

  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  // Step contextual takeaways
  const getContextContent = (stepId) => {
    switch (stepId) {
      case 'step-1-1':
        return {
          principles: [
            "Demystify cornering by focusing on arc radius.",
            "Priority 1 (The Line) gives maximum speed with lowest risk.",
            "Priority 2 (Exit Speed) multiplies straightaway time gains.",
            "Priority 3 (Late Braking) offers smallest gain for highest risk."
          ],
          formula: "v = \\sqrt{r \\cdot g \\cdot \\mu}",
          formulaDesc: "Cornering velocity (v) increases with the square root of arc radius (r)."
        };
      case 'step-1-2':
        return {
          principles: [
            "A wider entry arc increases corner radius.",
            "Expanding radius by 25% allows +5 to +8 mph higher apex velocity.",
            "Smooth steering unwinding maintains tire grip budget."
          ],
          formula: "F_{lat} = \\frac{m \\cdot v^2}{r}",
          formulaDesc: "Lateral force required decreases as radius (r) expands."
        };
      case 'step-1-3':
        return {
          principles: [
            "Sebring Turn 9 Carousel requires early throttle squeeze.",
            "Turn 10 Hairpin demands straight-line 100% threshold braking.",
            "Unwind steering smoothly off the Hairpin exit onto the main straight."
          ],
          formula: "t_{gain} = \\frac{d_{straight}}{\\Delta v_{exit}}",
          formulaDesc: "Exit velocity advantage compounds down the entire straight length."
        };
      case 'step-1-4':
        return {
          principles: [
            "Honest self-assessment reveals bad driving habits.",
            "Common mistake #1: Holding steering lock on corner exit.",
            "Common mistake #4: Carelessly lifting throttle mid-corner."
          ],
          formula: "\\text{Mastery Score} = \\sum_{i=1}^3 P_i \\cdot w_i",
          formulaDesc: "Score calculated based on weighted self-assessment ratings."
        };
      case 'step-1-5':
        return {
          principles: [
            "Scenario testing verifies intuitive physics application.",
            "Choose line radius over risky late braking every time."
          ],
          formula: "\\text{Passing Grade}: 80\\%",
          formulaDesc: "Scenario mastery requires minimum 4/5 correct responses."
        };
      case 'step-1-6':
        return {
          principles: [
            "Consistency beats fast single laps.",
            "Track focus areas and lap deltas after every practice session."
          ],
          formula: "\\Delta t = t_{target} - t_{best}",
          formulaDesc: "Monitor lap time progression across practice logs."
        };
      default:
        return {
          principles: ["Focus on smooth driver inputs."],
          formula: "v = \\sqrt{r \\cdot g \\cdot \\mu}",
          formulaDesc: "Physics of racing line."
        };
    };
  };

  const context = getContextContent(currentStep.id);

  return (
    <div className="session-step-stage-container">
      {/* Top Stepper Breadcrumb Header */}
      <div className="stage-top-bar glass-panel padding-sm mb-md flex-between align-center flex-wrap gap-sm">
        <div className="flex align-center gap-xs text-xs mono">
          <span className="text-muted">MODULE 1</span>
          <span className="text-muted">/</span>
          <span className="text-muted">CHAP 1</span>
          <span className="text-muted">/</span>
          <span className="text-apex font-bold uppercase">{currentStep.shortName}</span>
        </div>

        <div className="flex align-center gap-sm">
          <button 
            className="btn btn-secondary btn-sm"
            disabled={!prevStep}
            onClick={() => prevStep && onSelectStep(prevStep.id)}
          >
            <ChevronLeft size={16} className="mr-xs" /> Prev Step
          </button>
          
          <button
            className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-apex'}`}
            onClick={() => onToggleStepComplete(currentStep.id)}
          >
            <CheckCircle2 size={16} className="mr-xs" />
            {isCompleted ? 'Mark Pending' : 'Mark Step Complete'}
          </button>

          <button 
            className="btn btn-apex btn-sm"
            disabled={!nextStep}
            onClick={() => nextStep && onSelectStep(nextStep.id)}
          >
            Next Step <ChevronRight size={16} className="ml-xs" />
          </button>
        </div>
      </div>

      {/* Main Split Stage Grid (70% Stage / 30% Sticky Context Panel) */}
      <div className="stage-split-grid">
        {/* Left 70% Main Interactive Stage */}
        <main className="stage-main-canvas glass-panel padding-md">
          {children}
        </main>

        {/* Right 30% Sticky Context Panel */}
        <aside className="stage-context-panel glass-panel padding-md">
          <div className="panel-header mb-sm pb-xs border-bottom-subtle">
            <div className="flex align-center justify-between">
              <span className="badge badge-apex mono text-xs">STEP CONTEXT</span>
              {isCompleted && (
                <span className="text-apex text-xs mono flex align-center">
                  <CheckCircle2 size={14} className="mr-xs" /> COMPLETED
                </span>
              )}
            </div>
            <h3 className="mono text-white mt-xs margin-none">{currentStep.title}</h3>
            <span className="text-muted text-xs flex align-center mt-xs">
              <Clock size={12} className="mr-xs" /> Est. Time: {currentStep.estimatedMin} mins
            </span>
          </div>

          {/* Key Physics Principles */}
          <div className="context-section mb-md">
            <h4 className="mono text-apex text-xs uppercase mb-xs flex align-center">
              <BookOpen size={14} className="mr-xs" /> Key Takeaways & Physics
            </h4>
            <ul className="takeaways-list">
              {context.principles.map((item, idx) => (
                <li key={idx} className="text-secondary text-xs mb-xs flex align-start">
                  <Zap size={12} className="text-apex mr-xs flex-shrink-0 mt-2px" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formula Card */}
          <div className="context-formula-card glass-panel padding-sm mb-md">
            <span className="mono text-xs text-muted uppercase">Core Physics Equation</span>
            <div className="formula-box mono text-apex font-bold text-center margin-y-xs padding-xs">
              {context.formula}
            </div>
            <span className="text-muted text-xs block text-center">{context.formulaDesc}</span>
          </div>

          {/* Complete Step & Jump Next */}
          <div className="context-action-box text-center mt-md">
            <button 
              className={`btn width-100 ${isCompleted ? 'btn-secondary' : 'btn-apex'}`}
              onClick={() => {
                onToggleStepComplete(currentStep.id);
                if (!isCompleted && nextStep) {
                  onSelectStep(nextStep.id);
                }
              }}
            >
              <CheckCircle2 size={16} className="mr-xs" />
              {isCompleted ? 'Completed (Click to Reset)' : 'Complete & Jump Next'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
