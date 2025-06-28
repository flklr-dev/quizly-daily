import React, { useEffect, useState } from 'react';
import AdSense from '../components/AdSense';

function getTodayKey() {
  const d = new Date();
  return `daily-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Fallback questions in case API fails
const fallbackQuestions = [
  {
    question: "What is the largest continent on Earth?",
    correct_answer: "Asia",
    incorrect_answers: ["Africa", "North America", "Europe"]
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    correct_answer: "Oxygen",
    incorrect_answers: ["Osmium", "Oganesson", "Osmium"]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    correct_answer: "William Shakespeare",
    incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"]
  },
  {
    question: "What is the smallest prime number?",
    correct_answer: "2",
    incorrect_answers: ["1", "3", "0"]
  },
  {
    question: "Which country is home to the kangaroo?",
    correct_answer: "Australia",
    incorrect_answers: ["New Zealand", "South Africa", "Brazil"]
  }
];

export default function DailyChallenge() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const todayKey = getTodayKey();
    const done = localStorage.getItem(todayKey);
    if (done) {
      setCompleted(true);
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Add timeout to prevent long waits
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('https://the-trivia-api.com/api/questions?limit=5&difficulty=medium', {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Transform Trivia API data to match our format
          const transformedQuestions = data.map(item => ({
            question: item.question,
            correct_answer: item.correctAnswer,
            incorrect_answers: item.incorrectAnswers
          }));
          
          setQuestions(transformedQuestions);
          setUseFallback(false);
        } else {
          throw new Error('No questions received from API');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Use fallback questions if API fails
        setQuestions(fallbackQuestions);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  function handleAnswer(ans) {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    const correct = questions[current].correct_answer;
    setSelectedAnswer(ans);
    setShowCorrect(true);
    
    if (ans === correct) setScore(score + 1);
    
    setTimeout(() => {
      setAnswers([...answers, ans]);
      setSelectedAnswer(null);
      setShowCorrect(false);
      
      if (current === questions.length - 1) {
        setShowResult(true);
        localStorage.setItem(getTodayKey(), JSON.stringify({ 
          score: score + (ans === correct ? 1 : 0), 
          date: new Date() 
        }));
        setCompleted(true);
      } else {
        setCurrent(current + 1);
      }
    }, 1500);
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p className="text-muted mt-4">Loading today's challenge...</p>
      </div>
    );
  }

  if (completed && !showResult) {
    const todayKey = getTodayKey();
    const result = JSON.parse(localStorage.getItem(todayKey));
    const percentage = Math.round((result.score / 5) * 100);
    
    return (
      <div className="fade-in">
        <div className="results-card">
          <h2 className="mb-6">🎯 Daily Challenge Completed!</h2>
          <div className="score-display mb-6">
            {result.score} / 5
          </div>
          <p className="text-muted mb-6">
            {percentage >= 80 ? '🌟 Perfect score! You\'re unstoppable!' :
             percentage >= 60 ? '👍 Great job! Keep up the good work!' :
             percentage >= 40 ? '📚 Good effort! Tomorrow will be better!' :
             '💪 Nice try! Practice makes perfect!'}
          </p>
          <p className="text-muted">Come back tomorrow for a new set of questions! 🌅</p>
        </div>
        
        {/* Completion Ad */}
        <AdSense 
          adSlot="3232622207" 
          adFormat="auto" 
          className="completion"
        />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center">
        <div className="card">
          <h2 className="mb-4">❌ No Questions Available</h2>
          <p className="text-muted mb-6">Sorry, we couldn't load today's challenge. Please try again later.</p>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="fade-in">
        <div className="results-card">
          <h2 className="mb-6">🎉 Daily Challenge Complete!</h2>
          {useFallback && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Using offline questions due to API limits
              </p>
            </div>
          )}
          <div className="score-display mb-6">
            {score} / {questions.length}
          </div>
          <p className="text-muted mb-6">
            {percentage >= 80 ? '🌟 Outstanding! You\'re a daily champion!' :
             percentage >= 60 ? '👍 Excellent work! Consistency is key!' :
             percentage >= 40 ? '📚 Good progress! Keep learning!' :
             '💪 Great effort! Every day is a new opportunity!'}
          </p>
          <p className="text-muted">Come back tomorrow for a new challenge! 🌅</p>
        </div>
        
        {/* Completion Ad */}
        <AdSense 
          adSlot="3232622207" 
          adFormat="auto" 
          className="completion"
        />
      </div>
    );
  }

  const q = questions[current];
  const options = [...q.incorrect_answers, q.correct_answer].sort();

  return (
    <div className="quiz-container fade-in">
      {useFallback && (
        <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Using offline questions due to API limits
          </p>
        </div>
      )}
      <div className="question-card">
        <div className="question-number">
          Daily Challenge - Question {current + 1} of {questions.length}
        </div>
        <div className="question-text">
          {decodeHtml(q.question)}
        </div>
        <div className="options-grid">
          {options.map((opt, index) => {
            const isSelected = selectedAnswer === opt;
            const isCorrect = opt === q.correct_answer;
            let className = 'option-btn';
            
            if (showCorrect) {
              if (isCorrect) {
                className += ' correct';
              } else if (isSelected) {
                className += ' incorrect';
              }
            }
            
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswer(opt)}
                disabled={selectedAnswer !== null}
              >
                {decodeHtml(opt)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 