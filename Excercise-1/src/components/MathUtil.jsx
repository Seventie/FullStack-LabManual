import React, { useState } from 'react';

const MathUtil = () => {
  const [factorialInput, setFactorialInput] = useState('');
  const [fibonacciInput, setFibonacciInput] = useState('');
  const [primeInput, setPrimeInput] = useState('');
  
  const [factorialResult, setFactorialResult] = useState(null);
  const [fibonacciResult, setFibonacciResult] = useState(null);
  const [primeResult, setPrimeResult] = useState(null);

  // Factorial calculation
  const calculateFactorial = () => {
    const n = parseInt(factorialInput);
    if (isNaN(n)) {
      setFactorialResult({ error: 'Invalid input' });
      return;
    }
    if (n < 0) {
      setFactorialResult({ error: 'Negative not allowed' });
      return;
    }
    if (n > 170) {
      setFactorialResult({ error: 'Too large (max 170)' });
      return;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    setFactorialResult({ 
      value: result, 
      formatted: result.toLocaleString(),
      scientific: result.toExponential(4)
    });
  };

  // Fibonacci calculation
  const calculateFibonacci = () => {
    const n = parseInt(fibonacciInput);
    if (isNaN(n)) {
      setFibonacciResult({ error: 'Invalid input' });
      return;
    }
    if (n < 0) {
      setFibonacciResult({ error: 'Negative not allowed' });
      return;
    }
    if (n > 1476) {
      setFibonacciResult({ error: 'Too large (max 1476)' });
      return;
    }
    
    if (n <= 1) {
      setFibonacciResult({ 
        value: n,
        formatted: n.toString(),
        scientific: n.toExponential(4),
        sequence: [0, 1].slice(0, n + 1)
      });
      return;
    }
    
    let a = 0, b = 1;
    const sequence = [0, 1];
    
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
      if (sequence.length < 15) sequence.push(temp);
    }
    
    setFibonacciResult({ 
      value: b,
      formatted: b.toLocaleString(),
      scientific: b.toExponential(4),
      sequence
    });
  };

  // Prime checker
  const checkPrime = () => {
    const n = parseInt(primeInput);
    if (isNaN(n)) {
      setPrimeResult({ error: 'Invalid input' });
      return;
    }
    if (n < 2) {
      setPrimeResult({ isPrime: false, message: 'Not prime (< 2)' });
      return;
    }
    
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        setPrimeResult({ 
          isPrime: false, 
          message: 'Composite',
          divisor: i 
        });
        return;
      }
    }
    
    setPrimeResult({ isPrime: true, message: 'Prime number' });
  };

  const handleKeyPress = (e, calculator) => {
    if (e.key === 'Enter') {
      switch(calculator) {
        case 'factorial':
          calculateFactorial();
          break;
        case 'fibonacci':
          calculateFibonacci();
          break;
        case 'prime':
          checkPrime();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Header */}
        <header className="mb-32">
          <h1 className="text-xs uppercase tracking-[0.4em] font-light mb-4 opacity-50">
            Math Utility 
          </h1>
          <p className="text-4xl md:text-5xl font-light tracking-tight leading-none max-w-xl">
            Basic Operations <br />
          </p>
        </header>

        {/* Main Sections */}
        <main className="space-y-32">
          {/* Factorial Section */}
          <section className="group">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
                  01. Factorial
                </h2>
                <p className="text-xs uppercase tracking-widest opacity-40">
                  [n!] Calculation
                </p>
                {factorialResult && (
                  <div className="mt-6">
                    {factorialResult.error ? (
                      <p className="text-red-400 text-sm">{factorialResult.error}</p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-2xl md:text-3xl font-light tracking-tight">
                          {factorialResult.formatted}
                        </p>
                        <p className="text-xs opacity-50 font-mono">
                          {factorialResult.scientific}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full md:w-72 relative">
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 focus:border-white focus:ring-0 px-0 py-4 text-xl font-light transition-all placeholder:text-white/10"
                  placeholder="Enter value"
                  type="number"
                  value={factorialInput}
                  onChange={(e) => setFactorialInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'factorial')}
                />
                <button
                  onClick={calculateFactorial}
                  className="absolute right-0 bottom-4 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity"
                >
                  Run
                </button>
              </div>
            </div>
          </section>

          {/* Fibonacci Section */}
          <section className="group">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
                  02. Fibonacci
                </h2>
                <p className="text-xs uppercase tracking-widest opacity-40">
                  [Fₙ] Sequence Position
                </p>
                {fibonacciResult && (
                  <div className="mt-6">
                    {fibonacciResult.error ? (
                      <p className="text-red-400 text-sm">{fibonacciResult.error}</p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-2xl md:text-3xl font-light tracking-tight">
                          {fibonacciResult.formatted}
                        </p>
                        <p className="text-xs opacity-50 font-mono">
                          {fibonacciResult.scientific}
                        </p>
                        {fibonacciResult.sequence && (
                          <p className="text-xs opacity-40 mt-4">
                            Sequence: {fibonacciResult.sequence.join(', ')}
                            {fibonacciResult.sequence.length >= 15 ? '...' : ''}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full md:w-72 relative">
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 focus:border-white focus:ring-0 px-0 py-4 text-xl font-light transition-all placeholder:text-white/10"
                  placeholder="Enter position"
                  type="number"
                  value={fibonacciInput}
                  onChange={(e) => setFibonacciInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'fibonacci')}
                />
                <button
                  onClick={calculateFibonacci}
                  className="absolute right-0 bottom-4 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity"
                >
                  Run
                </button>
              </div>
            </div>
          </section>

          {/* Prime Checker Section */}
          <section className="group">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">
                  03. Prime Checker
                </h2>
                <p className="text-xs uppercase tracking-widest opacity-40">
                  [P] Primality Test
                </p>
                {primeResult && (
                  <div className="mt-6">
                    {primeResult.error ? (
                      <p className="text-red-400 text-sm">{primeResult.error}</p>
                    ) : (
                      <div className="space-y-2">
                        <p className={`text-2xl md:text-3xl font-light tracking-tight ${
                          primeResult.isPrime ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {primeResult.message}
                        </p>
                        {primeResult.divisor && (
                          <p className="text-xs opacity-50">
                            First divisor: {primeResult.divisor}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-full md:w-72 relative">
                <input
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/20 focus:border-white focus:ring-0 px-0 py-4 text-xl font-light transition-all placeholder:text-white/10"
                  placeholder="Enter number"
                  type="number"
                  value={primeInput}
                  onChange={(e) => setPrimeInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, 'prime')}
                />
                <button
                  onClick={checkPrime}
                  className="absolute right-0 bottom-4 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity"
                >
                  Run
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-48 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] opacity-30">
          <div>CB.SC.U4CSE23245</div>
          <div>Shaik Abdus Sattar</div>
        </footer>
      </div>
    </div>
  );
};

export default MathUtil;
