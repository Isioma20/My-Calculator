import React, { useState } from 'react'
import CalculatorButton from './CalculatorButton'


const Calculator = () => {
    const [displayVal, setDisplayVal] = useState("0");
    const [prevVal, setPrevVal] = useState('');
    const [mathOp, setMathOp] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const handleClick = (value) => {
     if (!isTyping) {
        setDisplayVal(value === "." ? "0." : value);
        setIsTyping(true);
        return;
  }
    setDisplayVal((prev) => {
      if (prev === "0" && value === ".") return "0.";
      if (value === "." && prev.includes(".")) return prev;
      if (prev === "0" && value !== ".") return value;
      return prev + value;
    });
    };

     const handleClear = () => {
        setDisplayVal("0");
        setPrevVal('');
        setMathOp('');
     }
     
     const handlePercent = () => {
        setDisplayVal((prev) => prev/100)
        setIsTyping(false);
     }
     
     const handleSquare = () => {
        setDisplayVal((prev) => Math.sqrt(prev));
        setIsTyping(false);
     }

     const operations = {
        "÷": (a, b) => a / b,
        "x": (a, b) => a * b,
        "−": (a, b) => a - b,
        "+": (a, b) => a + b,
    };
    
    const handleOperations = (op)  => {
        setMathOp(op);
        setPrevVal(displayVal);
        setDisplayVal(op);  
        setIsTyping(false);

     }
     // this ensures clean decimal places
     const cleanFloat = (num) => Number(num.toPrecision(12));
     
     const handleEquality = () => {
        if (!mathOp) return;
        if (prevVal === "" || displayVal === "") return;

     const a = Number(prevVal);
     const b = Number(displayVal);

    const compute = operations[mathOp];
    if (!compute) return;

    const result = cleanFloat(compute(a, b));

    setDisplayVal(String(result));
    setPrevVal("");
    setMathOp("");
    setIsTyping(false);
    };


  return (
    <>
    <div className="bg-black/100 p-5 rounded-2xl w-md mx-auto">
    <div className={`bg-black/100 p-10 text-white text-right text-5xl whitespace-nowrap overflow-x-auto no-scrollbar`}
    style={{direction: isTyping ? "rtl" : "ltr",}}>
    <span style={{ direction: "ltr", display: "inline-block" }}>
        {displayVal}
    </span>
    </div>

        <div className="grid grid-cols-4 gap-4">
            <CalculatorButton color="grey" onClick={handleClear}>C</CalculatorButton>
            <CalculatorButton color="grey" onClick={handlePercent}>%</CalculatorButton>
            <CalculatorButton color="grey" onClick={handleSquare}>√</CalculatorButton>
            <CalculatorButton color="orange" onClick={() => handleOperations("÷")}>÷</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("1")}>1</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("2")}>2</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("3")}>3</CalculatorButton>
            <CalculatorButton color="orange" onClick={() => handleOperations("x")}>x</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("4")}>4</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("5")}>5</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("6")}>6</CalculatorButton>
            <CalculatorButton color="orange" onClick={() => handleOperations("−")}>−</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("7")}>7</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("8")}>8</CalculatorButton>
            <CalculatorButton onClick={() => handleClick("9")}>9</CalculatorButton>
            <CalculatorButton color="orange" onClick={() => handleOperations("+")}>+</CalculatorButton>
            <CalculatorButton className="col-span-2 aspect-auto" onClick={() => handleClick("0")}>0</CalculatorButton>
            <CalculatorButton onClick={() => handleClick(".")}>.</CalculatorButton>
            <CalculatorButton color="orange" onClick={handleEquality}>=</CalculatorButton>
        </div>
    </div>
    </>
  );
};

export default Calculator
