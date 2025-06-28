import React, { useEffect, useState } from 'react';
import AdSense from '../components/AdSense';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Fallback questions in case API fails
const fallbackQuestions = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"]
  },
  {
    question: "Which planet is known as the Red Planet?",
    correct_answer: "Mars",
    incorrect_answers: ["Venus", "Jupiter", "Saturn"]
  },
  {
    question: "What is the largest ocean on Earth?",
    correct_answer: "Pacific Ocean",
    incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
  },
  {
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo"]
  },
  {
    question: "What is the chemical symbol for gold?",
    correct_answer: "Au",
    incorrect_answers: ["Ag", "Fe", "Cu"]
  }
];

export default function RandomQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
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
      } else {
        setCurrent(current + 1);
      }
    }, 1500);
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p className="text-muted mt-4">Loading questions...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center">
        <div className="card">
          <h2 className="mb-4">❌ No Questions Available</h2>
          <p className="text-muted mb-6">Sorry, we couldn't load the questions. Please try again later.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
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
          <h2 className="mb-6">🎉 Quiz Complete!</h2>
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
            {percentage >= 80 ? '🌟 Excellent! You\'re a trivia master!' :
             percentage >= 60 ? '👍 Good job! Keep learning!' :
             percentage >= 40 ? '📚 Not bad! Practice makes perfect!' :
             '💪 Keep trying! Every expert was once a beginner!'}
          </p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            🔄 Try Again
          </button>
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
          Question {current + 1} of {questions.length}
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