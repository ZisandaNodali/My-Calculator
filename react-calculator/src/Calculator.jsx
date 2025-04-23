import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
      return;
    }

    switch (operation) {
      case "+":
        setResult(a + b);
        break;
      case "-":
        setResult(a - b);
        break;
      case "*":
        setResult(a * b);
        break;
      case "/":
        setResult(b !== 0 ? a / b : "Can't divide by 0");
        break;
      default:
        setResult("Invalid operation");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1>React Calculator</h1>
      <input
        type="number"
        placeholder="First number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <br /><br />
      <input
        type="number"
        placeholder="Second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <br /><br />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">Add (+)</option>
        <option value="-">Subtract (-)</option>
        <option value="*">Multiply (*)</option>
        <option value="/">Divide (/)</option>
      </select>
      <br /><br />
      <button onClick={calculate}>Calculate</button>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
}
