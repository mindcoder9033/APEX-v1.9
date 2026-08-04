import React, { useState } from 'react';
import { Flag, CheckCircle, XCircle, RefreshCw, Award } from 'lucide-react';
import { CHAPTER_1_QUIZ } from '../data/quizData';

export const ChapterQuiz = ({ quizScores, setQuizScores, onSave }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = CHAPTER_1_QUIZ;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      const finalScore = {
        score: score + (selectedOption === currentQ.correctAnswer ? 1 : 0),
        total: questions.length,
        date: new Date().toISOString().split('T')[0]
      };
      const updatedScores = { ...quizScores, chapter1: finalScore };
      setQuizScores(updatedScores);
      onSave(updatedScores);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flag className="text-apex" size={22} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Chapter 1 Knowledge Quiz</h2>
          </div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Test your understanding of Skip Barber physics, radius rules, and racecraft scenarios.
          </p>
        </div>

        {/* Previous Best Score */}
        {quizScores?.chapter1 && (
          <div className="metric-box" style={{ padding: '0.4rem 0.8rem' }}>
            <span className="metric-label">BEST SCORE: </span>
            <span className="mono text-apex" style={{ fontWeight: 700 }}>
              {quizScores.chapter1.score} / {quizScores.chapter1.total}
            </span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Progress Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-green">
              QUESTION {currentQuestionIndex + 1} OF {questions.length}
            </span>
            <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>
              CURRENT SCORE: {score}
            </span>
          </div>

          {/* Question Text */}
          <div className="metric-box" style={{ padding: '1.25rem', border: '1px solid var(--border-active)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: '1.5', color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentQ.options.map((opt, idx) => {
              let optionStyle = {
                border: '1px solid var(--border-subtle)',
                background: 'rgba(0, 0, 0, 0.4)'
              };

              if (selectedOption === idx) {
                optionStyle = {
                  border: '1px solid var(--telemetry-cyan)',
                  background: 'rgba(0, 229, 255, 0.1)'
                };
              }

              if (isSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  optionStyle = {
                    border: '1px solid var(--apex-green)',
                    background: 'rgba(0, 230, 118, 0.15)',
                    color: 'var(--apex-green)'
                  };
                } else if (selectedOption === idx) {
                  optionStyle = {
                    border: '1px solid var(--racing-red)',
                    background: 'rgba(255, 61, 0, 0.15)',
                    color: 'var(--racing-red)'
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="glass-panel"
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: isSubmitted ? 'default' : 'pointer',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    transition: 'all 0.15s ease',
                    ...optionStyle
                  }}
                >
                  <span style={{ fontSize: '0.92rem', fontWeight: selectedOption === idx ? 600 : 400 }}>
                    {opt}
                  </span>
                  {isSubmitted && idx === currentQ.correctAnswer && (
                    <CheckCircle className="text-apex" size={20} />
                  )}
                  {isSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                    <XCircle className="text-red" size={20} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Submit */}
          {isSubmitted && (
            <div style={{ background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--apex-green)', marginBottom: '0.3rem', fontSize: '0.9rem' }} className="mono">
                SKIP BARBER EXPLANATION:
              </div>
              <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            {!isSubmitted ? (
              <button 
                className="btn btn-primary"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                style={{ opacity: selectedOption === null ? 0.5 : 1 }}
              >
                SUBMIT ANSWER
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'NEXT QUESTION' : 'SEE FINAL RESULTS'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Award className="text-apex pulse-glow" size={60} />
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>QUIZ COMPLETED!</h3>
          <div className="metric-box" style={{ padding: '1rem 2rem' }}>
            <div className="metric-label">FINAL SCORE</div>
            <div className="metric-val text-apex" style={{ fontSize: '2.5rem' }}>
              {score} / {questions.length}
            </div>
          </div>
          <p className="text-secondary" style={{ maxWidth: '500px' }}>
            {score === questions.length 
              ? 'Perfect score! You have mastered the core Skip Barber physics & strategy principles of Chapter 1.'
              : 'Great effort! Review the Chapter 1 curriculum notes and retake the quiz to sharpen your physics mastery.'}
          </p>
          <button className="btn btn-primary" onClick={handleRestartQuiz}>
            <RefreshCw size={16} /> RETAKE QUIZ
          </button>
        </div>
      )}
    </div>
  );
};
