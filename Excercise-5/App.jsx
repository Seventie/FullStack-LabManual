import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const App = () => {
  const [mode, setMode] = useState('calculator'); // 'calculator', 'math-quiz', 'number-guess'
  const [display, setDisplay] = useState('0');
  
  // Math Quiz Game State
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState({ num1: 0, num2: 0, operator: '+', answer: 0 });
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizFeedback, setQuizFeedback] = useState('');
  const [quizTotal, setQuizTotal] = useState(0);

  // Number Guessing Game State
  const [secretNumber, setSecretNumber] = useState(0);
  const [guessInput, setGuessInput] = useState('');
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessMessage, setGuessMessage] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);

  // Calculator Functions
  const appendCalc = (value) => {
    setDisplay(display === '0' || display === 'ERROR' ? value : display + value);
  };

  const clearCalc = () => setDisplay('0');
  
  const deleteCalc = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const calculate = () => {
    try {
      const result = eval(display);
      setDisplay(Number.isFinite(result) ? result.toString() : 'ERROR');
    } catch {
      setDisplay('ERROR');
    }
  };

  const sqrtCalc = () => {
    try {
      setDisplay(Math.sqrt(eval(display)).toString());
    } catch {
      setDisplay('ERROR');
    }
  };

  // Math Quiz Game Functions
  const generateQuizQuestion = () => {
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, answer;

    if (operator === '+') {
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
    } else if (operator === '-') {
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
    }

    setQuizQuestion({ num1, num2, operator, answer });
    setQuizAnswer('');
    setQuizFeedback('');
  };

  const checkQuizAnswer = () => {
    const userAnswer = parseInt(quizAnswer);
    setQuizTotal(quizTotal + 1);
    
    if (userAnswer === quizQuestion.answer) {
      setQuizScore(quizScore + 1);
      setQuizFeedback('🎉 CORRECT! Great job!');
      setTimeout(generateQuizQuestion, 1500);
    } else {
      setQuizFeedback(`❌ Wrong! The answer is ${quizQuestion.answer}`);
      setTimeout(generateQuizQuestion, 2000);
    }
  };

  const resetQuiz = () => {
    setQuizScore(0);
    setQuizTotal(0);
    generateQuizQuestion();
  };

  // Number Guessing Game Functions
  const startGuessingGame = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(number);
    setGuessAttempts(0);
    setGuessInput('');
    setGuessMessage('I\'m thinking of a number between 1 and 100!');
    setGuessHistory([]);
  };

  const makeGuess = () => {
    const guess = parseInt(guessInput);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setGuessMessage('Please enter a number between 1 and 100!');
      return;
    }

    const newAttempts = guessAttempts + 1;
    setGuessAttempts(newAttempts);
    setGuessHistory([...guessHistory, guess]);

    if (guess === secretNumber) {
      setGuessMessage(`🎊 YOU WON! You found ${secretNumber} in ${newAttempts} attempts!`);
    } else if (guess < secretNumber) {
      setGuessMessage(`📈 Too LOW! Try a BIGGER number!`);
    } else {
      setGuessMessage(`📉 Too HIGH! Try a SMALLER number!`);
    }

    setGuessInput('');
  };

  // Initialize games when switching modes
  useEffect(() => {
    if (mode === 'math-quiz') {
      generateQuizQuestion();
    } else if (mode === 'number-guess') {
      startGuessingGame();
    }
  }, [mode]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode !== 'calculator') return;
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendCalc(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) appendCalc(e.key);
      if (e.key === 'Enter') { e.preventDefault(); calculate(); }
      if (e.key === 'Escape') clearCalc();
      if (e.key === 'Backspace') deleteCalc();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mode, display]);

  const btnClass = "py-5 font-bold border-2 border-white active:translate-y-0.5 transition-all";

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wider">CALC</h1>
          <div className="flex justify-center gap-3 flex-wrap">
            <button 
              onClick={() => setMode('calculator')} 
              className={`px-6 py-2 font-bold tracking-wider transition-all ${mode === 'calculator' ? 'bg-white text-black' : 'bg-black text-white border-2 border-white'}`}
            >
              CALCULATOR
            </button>
            <button 
              onClick={() => setMode('math-quiz')} 
              className={`px-6 py-2 font-bold tracking-wider transition-all ${mode === 'math-quiz' ? 'bg-white text-black' : 'bg-black text-white border-2 border-white'}`}
            >
              MATH QUIZ
            </button>
            <button 
              onClick={() => setMode('number-guess')} 
              className={`px-6 py-2 font-bold tracking-wider transition-all ${mode === 'number-guess' ? 'bg-white text-black' : 'bg-black text-white border-2 border-white'}`}
            >
              GUESS NUMBER
            </button>
          </div>
        </div>

        {/* CALCULATOR MODE */}
        {mode === 'calculator' && (
          <div className="border-[3px] border-white bg-black p-6 md:p-8">
            <div className="bg-white border-4 border-black mb-6 p-6">
              <input type="text" value={display} readOnly className="w-full bg-transparent text-right text-4xl md:text-5xl font-bold text-black outline-none" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button onClick={clearCalc} className={`${btnClass} bg-white text-black`}>AC</button>
              <button onClick={deleteCalc} className={`${btnClass} bg-white text-black`}>DEL</button>
              <button onClick={() => appendCalc('(')} className={`${btnClass} bg-white text-black`}>(</button>
              <button onClick={() => appendCalc(')')} className={`${btnClass} bg-white text-black`}>)</button>
              
              <button onClick={() => appendCalc('Math.sin(')} className={`${btnClass} bg-black text-white`}>SIN</button>
              <button onClick={() => appendCalc('Math.cos(')} className={`${btnClass} bg-black text-white`}>COS</button>
              <button onClick={() => appendCalc('Math.tan(')} className={`${btnClass} bg-black text-white`}>TAN</button>
              <button onClick={() => appendCalc('/')} className={`${btnClass} bg-white text-black text-xl`}>÷</button>
              
              <button onClick={() => appendCalc('7')} className={`${btnClass} bg-white text-black text-xl`}>7</button>
              <button onClick={() => appendCalc('8')} className={`${btnClass} bg-white text-black text-xl`}>8</button>
              <button onClick={() => appendCalc('9')} className={`${btnClass} bg-white text-black text-xl`}>9</button>
              <button onClick={() => appendCalc('*')} className={`${btnClass} bg-white text-black text-xl`}>×</button>
              
              <button onClick={() => appendCalc('4')} className={`${btnClass} bg-white text-black text-xl`}>4</button>
              <button onClick={() => appendCalc('5')} className={`${btnClass} bg-white text-black text-xl`}>5</button>
              <button onClick={() => appendCalc('6')} className={`${btnClass} bg-white text-black text-xl`}>6</button>
              <button onClick={() => appendCalc('-')} className={`${btnClass} bg-white text-black text-xl`}>−</button>
              
              <button onClick={() => appendCalc('1')} className={`${btnClass} bg-white text-black text-xl`}>1</button>
              <button onClick={() => appendCalc('2')} className={`${btnClass} bg-white text-black text-xl`}>2</button>
              <button onClick={() => appendCalc('3')} className={`${btnClass} bg-white text-black text-xl`}>3</button>
              <button onClick={() => appendCalc('+')} className={`${btnClass} bg-white text-black text-xl`}>+</button>
              
              <button onClick={sqrtCalc} className={`${btnClass} bg-black text-white`}>√</button>
              <button onClick={() => appendCalc('0')} className={`${btnClass} bg-white text-black text-xl`}>0</button>
              <button onClick={() => appendCalc('.')} className={`${btnClass} bg-white text-black text-xl`}>.</button>
              <button onClick={calculate} className={`${btnClass} bg-black text-white text-2xl`}>=</button>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-3">
              <button onClick={() => appendCalc('Math.PI')} className={`py-4 ${btnClass} bg-black text-white`}>π</button>
              <button onClick={() => appendCalc('Math.E')} className={`py-4 ${btnClass} bg-black text-white`}>e</button>
              <button onClick={() => appendCalc('**')} className={`py-4 ${btnClass} bg-black text-white`}>x^y</button>
              <button onClick={() => appendCalc('Math.log(')} className={`py-4 ${btnClass} bg-black text-white`}>LOG</button>
            </div>
          </div>
        )}

        {/* MATH QUIZ GAME */}
        {mode === 'math-quiz' && (
          <div className="border-[3px] border-white bg-black p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">🧮 MATH QUIZ GAME</h2>
              <p className="text-white text-lg">Score: {quizScore} / {quizTotal}</p>
            </div>

            <div className="bg-white border-4 border-black p-8 mb-6 text-center">
              <div className="text-6xl font-bold text-black mb-4">
                {quizQuestion.num1} {quizQuestion.operator} {quizQuestion.num2} = ?
              </div>
              <input
                type="number"
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkQuizAnswer()}
                className="w-full max-w-xs px-6 py-4 text-4xl font-bold text-center bg-gray-100 border-4 border-black outline-none"
                placeholder="?"
                autoFocus
              />
            </div>

            {quizFeedback && (
              <div className={`text-center text-2xl font-bold mb-6 p-4 border-4 ${quizFeedback.includes('CORRECT') ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}`}>
                {quizFeedback}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={checkQuizAnswer}
                className="py-6 bg-white text-black font-bold text-xl border-2 border-white hover:bg-gray-200 active:translate-y-0.5 transition-all"
              >
                SUBMIT ANSWER
              </button>
              <button 
                onClick={resetQuiz}
                className="py-6 bg-black text-white font-bold text-xl border-2 border-white hover:bg-gray-900 active:translate-y-0.5 transition-all"
              >
                RESET SCORE
              </button>
            </div>
          </div>
        )}

        {/* NUMBER GUESSING GAME */}
        {mode === 'number-guess' && (
          <div className="border-[3px] border-white bg-black p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">🎯 NUMBER GUESSING GAME</h2>
              <p className="text-white text-lg">Attempts: {guessAttempts}</p>
            </div>

            <div className="bg-white border-4 border-black p-8 mb-6">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-black mb-4">{guessMessage}</p>
              </div>

              {guessHistory.length > 0 && (
                <div className="mb-4">
                  <p className="text-black font-bold mb-2">Your guesses:</p>
                  <div className="flex flex-wrap gap-2">
                    {guessHistory.map((guess, idx) => (
                      <span key={idx} className="px-3 py-1 bg-black text-white font-bold border-2 border-black">
                        {guess}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <input
                type="number"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                className="w-full px-6 py-4 text-3xl font-bold text-center bg-gray-100 border-4 border-black outline-none"
                placeholder="Enter your guess"
                min="1"
                max="100"
                disabled={guessMessage.includes('WON')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={makeGuess}
                disabled={guessMessage.includes('WON')}
                className="py-6 bg-white text-black font-bold text-xl border-2 border-white hover:bg-gray-200 active:translate-y-0.5 transition-all disabled:opacity-50"
              >
                MAKE GUESS
              </button>
              <button 
                onClick={startGuessingGame}
                className="py-6 bg-black text-white font-bold text-xl border-2 border-white hover:bg-gray-900 active:translate-y-0.5 transition-all"
              >
                NEW GAME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;