import React, { useState } from "react";

function Calculator() {
  const [a, setA] = useState("");
  const [result, setResult] = useState("");
  const [extra, setExtra] = useState("");

  const b = Number(a) - 15;

  const evaluateExpression = () => {
    const A = Number(a);
    const B = b;
    const res = ((A + B) / (A - B)) * (A + B);
    setResult(res);
  };

  const modSumSquare = () => {
    let n = Math.abs(Number(a));
    let sum = 0;
    while (n > 0) {
      const d = n % 10;
      sum += d * d;
      n = Math.floor(n / 10);
    }
    setExtra(`Sum of squares: ${sum}`);
  };

  const evenOdd = () => {
    setExtra(Number(a) % 2 === 0 ? "Even Number" : "Odd Number");
  };

  return (
    <div className="calc-wrapper">
      <h1 className="title">CALCULATOR</h1>

      <div className="panel">
        <label>INPUT (a)</label>
        <input
          type="number"
          placeholder="Enter value for a"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />

        <label>OUTPUT</label>
        <div className="output-box">
          <p>Result: {result}</p>
          <p>{extra}</p>
        </div>

        <div className="button-grid">
          <button onClick={evaluateExpression}>EVALUATE</button>
          <button onClick={modSumSquare}>MoD_Sum_square</button>
          <button onClick={evenOdd}>Even_ODD</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
