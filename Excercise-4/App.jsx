import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const App = () => {
  const [mode, setMode] = useState('calculator');
  const [display, setDisplay] = useState('0');
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');
  const [stringResult, setStringResult] = useState('READY');

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

  // String Functions
  const strLength = () => setStringResult(`LENGTH: ${str1.length}`);
  const strReverse = () => setStringResult(str1.split('').reverse().join(''));
  const strUpper = () => setStringResult(str1.toUpperCase());
  const strLower = () => setStringResult(str1.toLowerCase());
  const strConcat = () => setStringResult(str1 + str2);
  const strCompare = () => setStringResult(str1 === str2 ? 'EQUAL' : 'NOT EQUAL');
  const strTrim = () => setStringResult(str1.trim());
  const strSplit = () => {
    const words = str1.split(' ');
    setStringResult(`${words.length} WORDS: ${words.join(', ')}`);
  };
  const strSubstring = () => {
    const start = prompt('START INDEX:');
    const end = prompt('END INDEX:');
    if (start !== null && end !== null) {
      setStringResult(str1.substring(parseInt(start), parseInt(end)));
    }
  };
  const strReplace = () => {
    const find = prompt('FIND:');
    const replace = prompt('REPLACE WITH:');
    if (find !== null && replace !== null) {
      setStringResult(str1.replaceAll(find, replace));
    }
  };
  const strCount = () => {
    const char = prompt('CHARACTER TO COUNT:');
    if (char !== null) {
      const count = str1.split(char).length - 1;
      setStringResult(`"${char}" APPEARS ${count} TIME(S)`);
    }
  };
  const clearStrings = () => {
    setStr1('');
    setStr2('');
    setStringResult('READY');
  };

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
          <div className="flex justify-center gap-4">
            <button onClick={() => setMode('calculator')} className={`px-8 py-2 font-bold tracking-wider ${mode === 'calculator' ? 'bg-white text-black' : 'bg-black text-white border-2 border-white'}`}>
              CALCULATOR
            </button>
            <button onClick={() => setMode('string')} className={`px-8 py-2 font-bold tracking-wider ${mode === 'string' ? 'bg-white text-black' : 'bg-black text-white border-2 border-white'}`}>
              STRING OPS
            </button>
          </div>
        </div>

        {mode === 'calculator' ? (
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
        ) : (
          <div className="border-[3px] border-white bg-black p-6 md:p-8">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white font-bold mb-2 tracking-wider">INPUT 1</label>
                <input type="text" value={str1} onChange={(e) => setStr1(e.target.value)} className="w-full px-4 py-3 bg-white text-black font-bold border-4 border-black outline-none" placeholder="ENTER TEXT..." />
              </div>
              <div>
                <label className="block text-white font-bold mb-2 tracking-wider">INPUT 2</label>
                <input type="text" value={str2} onChange={(e) => setStr2(e.target.value)} className="w-full px-4 py-3 bg-white text-black font-bold border-4 border-black outline-none" placeholder="ENTER TEXT..." />
              </div>
            </div>
            <div className="bg-white border-4 border-black p-6 mb-6">
              <div className="text-black font-bold mb-2">OUTPUT:</div>
              <div className="text-black font-bold break-words text-lg">{stringResult}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button onClick={strLength} className={`py-4 ${btnClass} bg-white text-black`}>LENGTH</button>
              <button onClick={strReverse} className={`py-4 ${btnClass} bg-white text-black`}>REVERSE</button>
              <button onClick={strUpper} className={`py-4 ${btnClass} bg-white text-black`}>UPPER</button>
              <button onClick={strLower} className={`py-4 ${btnClass} bg-white text-black`}>LOWER</button>
              <button onClick={strConcat} className={`py-4 ${btnClass} bg-white text-black`}>CONCAT</button>
              <button onClick={strCompare} className={`py-4 ${btnClass} bg-white text-black`}>COMPARE</button>
              <button onClick={strTrim} className={`py-4 ${btnClass} bg-black text-white`}>TRIM</button>
              <button onClick={strSplit} className={`py-4 ${btnClass} bg-black text-white`}>SPLIT</button>
              <button onClick={strSubstring} className={`py-4 ${btnClass} bg-black text-white`}>SLICE</button>
              <button onClick={strReplace} className={`py-4 ${btnClass} bg-black text-white`}>REPLACE</button>
              <button onClick={strCount} className={`py-4 ${btnClass} bg-black text-white`}>COUNT</button>
              <button onClick={clearStrings} className={`py-4 ${btnClass} bg-white text-black`}>CLEAR</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
export default App;