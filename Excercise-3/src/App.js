import React, { useState } from "react";
import "./App.css";

function App() {
  const [a, setA] = useState("");
  const [result, setResult] = useState("");
  const [extra, setExtra] = useState("");

  const A = Number(a);
  const B = A - 15;

  const add = () => setResult(A + B);
  const sub = () => setResult(A - B);
  const mul = () => setResult(A * B);
  const div = () => setResult(B !== 0 ? A / B : "Infinity");

  const evaluateExpression = () => {
    const res = ((A + B) / (A - B)) * (A + B);
    setResult(res);
  };

  const modSumSquare = () => {
    let n = Math.abs(A);
    let sum = 0;
    while (n > 0) {
      const d = n % 10;
      sum += d * d;
      n = Math.floor(n / 10);
    }
    setExtra(`Sum of squares: ${sum}`);
  };

  const evenOdd = () => {
    setExtra(A % 2 === 0 ? "Even Number" : "Odd Number");
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

        <p><strong>b = a − 15 → {B}</strong></p>

        <label>OUTPUT</label>
        <div className="output-box">
          <p>Result: {result}</p>
          <p>{extra}</p>
        </div>

        <div className="button-grid">
          <button onClick={add}>ADD</button>
          <button onClick={sub}>SUB</button>
          <button onClick={mul}>MUL</button>
          <button onClick={div}>DIV</button>
          <button onClick={evaluateExpression}>EVALUATE</button>
          <button onClick={modSumSquare}>MoD_Sum_square</button>
          <button onClick={evenOdd}>Even_ODD</button>
        </div>
      </div>
    </div>
  );
}

export default App;
