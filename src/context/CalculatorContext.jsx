import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_STATE, processInput, getServiceInfo } from '../logic/calculatorAdapter.js';
import { formatDisplay } from '../logic/engine.js';

const CalculatorContext = createContext(null);

export function CalculatorProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [history, setHistory] = useState([]);

  const dispatch = useCallback((type, value) => {
    setState((prevState) => {
      const newState = processInput(prevState, type, value);

      if (type === 'equals' && prevState.firstOperand !== null && prevState.operator) {
        const entry = `${prevState.expression} ${prevState.displayValue} = ${newState.displayValue}`;
        setHistory((prev) => [entry, ...prev].slice(0, 10));
      }

      return newState;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const contextValue = {
    displayValue: state.displayValue,
    formattedDisplay: formatDisplay(state.displayValue),
    expression: state.expression,
    hasOperator: state.operator !== null,
    history,
    dispatch,
    clearHistory,
    serviceInfo: getServiceInfo(),
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator phải được sử dụng bên trong CalculatorProvider');
  }
  return context;
}

export default CalculatorContext;
