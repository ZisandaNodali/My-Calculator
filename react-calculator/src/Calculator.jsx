import { useState, useEffect } from "react";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [prevInput, setPrevInput] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleButtonClick = (value) => {
    if (value === "=") {
      if (prevInput && operator && input) {
        try {
          const expression = `${prevInput}${operator}${input}`;
          const result = eval(expression);
          setInput(result.toString());
          setPrevInput(null);
          setOperator(null);
        } catch {
          setInput("Error");
        }
      }
    } else if (value === "C") {
      setInput("0");
      setPrevInput(null);
      setOperator(null);
    } else if (value === "←") {
      setInput(input.slice(0, -1) || "0");
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (prevInput && operator) {
        // Chain calculations
        const expression = `${prevInput}${operator}${input}`;
        try {
          const result = eval(expression);
          setPrevInput(result.toString());
          setInput("0");
          setOperator(value);
        } catch {
          setInput("Error");
          setPrevInput(null);
          setOperator(null);
        }
      } else {
        setPrevInput(input);
        setInput("0");
        setOperator(value);
      }
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        handleButtonClick("←");
      } else if ("0123456789".includes(key)) {
        handleButtonClick(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        handleButtonClick(key);
      } else if (key === "c" || key === "C") {
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <div className="calculator-container">
      <h3>Simple Calculator</h3>
      <input
        type="text"
        className="calc-display"
        value={input}
        readOnly
      />
      <div className="calc-buttons">
        {["7", "8", "9", "+"].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
        {["4", "5", "6", "-"].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
        {["1", "2", "3", "*"].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
        {["C", "0", "=", "/"].map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
        <button className="backspace" onClick={() => handleButtonClick("←")}>
          ←
        </button>
      </div>
    </div>
  );
}
