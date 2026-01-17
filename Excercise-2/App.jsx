import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const App = () => {
  // Sum of Digits State
  const [inputNumber, setInputNumber] = useState('');
  const [digitSum, setDigitSum] = useState(null);
  const [digitBreakdown, setDigitBreakdown] = useState([]);
  const [sumSteps, setSumSteps] = useState('');
  const [history, setHistory] = useState([]);

  // Sum of Digits Functions
  const calculateDigitSum = () => {
    if (!inputNumber || inputNumber.trim() === '') {
      setDigitSum(null);
      setDigitBreakdown([]);
      setSumSteps('Please enter a number!');
      return;
    }

    // Remove any non-digit characters except minus sign
    const cleanNumber = inputNumber.replace(/[^\d-]/g, '');
    const isNegative = cleanNumber.startsWith('-');
    const digits = cleanNumber.replace('-', '').split('').map(d => parseInt(d));
    
    if (digits.length === 0 || digits.some(isNaN)) {
      setDigitSum(null);
      setDigitBreakdown([]);
      setSumSteps('Invalid number!');
      return;
    }

    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    const finalSum = isNegative ? -sum : sum;
    
    setDigitBreakdown(digits);
    setDigitSum(finalSum);
    setSumSteps(digits.join(' + ') + ' = ' + sum);
    
    // Add to history
    setHistory([
      { number: inputNumber, sum: finalSum, breakdown: digits.join(' + ') + ' = ' + sum },
      ...history.slice(0, 4)
    ]);
  };

  const clearDigitSum = () => {
    setInputNumber('');
    setDigitSum(null);
    setDigitBreakdown([]);
    setSumSteps('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wider">
            SUM OF DIGITS
          </h1>
          <p className="text-white text-lg">Calculate the sum of digits in any number</p>
        </div>

        {/* Main Panel */}
        <div className="border-[3px] border-white bg-black p-6 md:p-8">
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-white font-bold mb-3 tracking-wider text-lg">
              ENTER NUMBER:
            </label>
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateDigitSum()}
              className="w-full px-6 py-6 bg-white text-black font-bold border-4 border-black outline-none text-4xl text-center"
              placeholder="e.g., 12345"
              autoFocus
            />
          </div>

          {/* Result Display */}
          {digitSum !== null && (
            <div className="bg-white border-4 border-black p-8 mb-6">
              <div className="text-center">
                <p className="text-black font-bold text-lg mb-4">DIGIT BREAKDOWN:</p>
                <div className="flex justify-center flex-wrap gap-3 mb-6">
                  {digitBreakdown.map((digit, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="px-6 py-4 bg-black text-white font-bold text-3xl border-2 border-black">
                        {digit}
                      </span>
                      {idx < digitBreakdown.length - 1 && (
                        <span className="text-black font-bold text-2xl mt-2">+</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-black font-bold text-2xl mb-6">{sumSteps}</p>
                <div className="mt-6 p-6 bg-black">
                  <p className="text-white text-sm mb-2">FINAL SUM:</p>
                  <p className="text-white font-bold text-6xl">{digitSum}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {sumSteps && digitSum === null && (
            <div className="bg-white border-4 border-black p-6 mb-6 text-center">
              <p className="text-red-500 font-bold text-2xl">{sumSteps}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              onClick={calculateDigitSum}
              className="py-6 bg-white text-black font-bold text-xl border-2 border-white hover:bg-gray-200 active:translate-y-0.5 transition-all"
            >
              CALCULATE
            </button>
            <button 
              onClick={clearDigitSum}
              className="py-6 bg-black text-white font-bold text-xl border-2 border-white hover:bg-gray-900 active:translate-y-0.5 transition-all"
            >
              CLEAR
            </button>
          </div>

          {/* Examples Section */}
          <div className="p-6 border-2 border-white mb-6">
            <p className="text-white font-bold text-lg mb-3">EXAMPLES:</p>
            <div className="space-y-2 text-white">
              <p className="text-base">• <span className="font-bold">123</span> → 1 + 2 + 3 = <span className="text-green-400 font-bold">6</span></p>
              <p className="text-base">• <span className="font-bold">9876</span> → 9 + 8 + 7 + 6 = <span className="text-green-400 font-bold">30</span></p>
              <p className="text-base">• <span className="font-bold">555</span> → 5 + 5 + 5 = <span className="text-green-400 font-bold">15</span></p>
              <p className="text-base">• <span className="font-bold">1000</span> → 1 + 0 + 0 + 0 = <span className="text-green-400 font-bold">1</span></p>
            </div>
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="p-6 border-2 border-white">
              <div className="flex justify-between items-center mb-3">
                <p className="text-white font-bold text-lg">RECENT CALCULATIONS:</p>
                <button 
                  onClick={clearHistory}
                  className="text-xs text-white border border-white px-3 py-1 hover:bg-white hover:text-black transition-all"
                >
                  CLEAR HISTORY
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-white text-black p-3 border-2 border-white">
                    <p className="font-bold text-lg">{item.number} → Sum: {item.sum}</p>
                    <p className="text-sm text-gray-700">{item.breakdown}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm opacity-50">
          <p>© 2024 SUM OF DIGITS CALCULATOR</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;