import { calculate, percent, negate, formatDisplay } from './engine.js';

const CONFIG = {
  SERVICE_NAME: 'CalculatorEngine',
  VERSION: '1.0.0',
  PORT: typeof import.meta !== 'undefined'
    ? import.meta.env?.VITE_CALC_PORT || 3000
    : 3000,
  ENDPOINT: typeof import.meta !== 'undefined'
    ? import.meta.env?.VITE_CALC_ENDPOINT || '/api/calculate'
    : '/api/calculate',
  MAX_DIGITS: 12,
};

export const INITIAL_STATE = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecond: false,
  expression: '',
};

export function inputDigit(state, digit) {
  const { displayValue, waitingForSecond } = state;

  if (waitingForSecond) {
    return {
      ...state,
      displayValue: digit,
      waitingForSecond: false,
    };
  }

  if (displayValue.replace(/[^0-9]/g, '').length >= CONFIG.MAX_DIGITS) {
    return state;
  }

  return {
    ...state,
    displayValue: displayValue === '0' ? digit : displayValue + digit,
  };
}

export function inputDecimal(state) {
  const { displayValue, waitingForSecond } = state;

  if (waitingForSecond) {
    return {
      ...state,
      displayValue: '0.',
      waitingForSecond: false,
    };
  }

  if (displayValue.includes('.')) {
    return state;
  }

  return {
    ...state,
    displayValue: displayValue + '.',
  };
}

export function handleOperator(state, nextOperator) {
  const { displayValue, firstOperand, operator } = state;
  const inputValue = parseFloat(displayValue);

  if (firstOperand === null) {
    return {
      ...state,
      firstOperand: inputValue,
      operator: nextOperator,
      waitingForSecond: true,
      expression: `${displayValue} ${nextOperator}`,
    };
  }

  if (operator) {
    const result = calculate(firstOperand, operator, inputValue);
    const resultStr = String(result);

    return {
      ...state,
      displayValue: resultStr,
      firstOperand: result === 'Error' ? null : result,
      operator: result === 'Error' ? null : nextOperator,
      waitingForSecond: result !== 'Error',
      expression: result === 'Error' ? '' : `${resultStr} ${nextOperator}`,
    };
  }

  return state;
}

export function handleEquals(state) {
  const { displayValue, firstOperand, operator } = state;

  if (firstOperand === null || operator === null) {
    return state;
  }

  const inputValue = parseFloat(displayValue);

  const result = calculate(firstOperand, operator, inputValue);

  return {
    displayValue: String(result),
    firstOperand: null,
    operator: null,
    waitingForSecond: false,
    expression: '',
  };
}

export function handleClear() {
  return { ...INITIAL_STATE };
}

export function handleBackspace(state) {
  const { displayValue, waitingForSecond } = state;

  if (waitingForSecond) return state;

  const newValue = displayValue.length > 1
    ? displayValue.slice(0, -1)
    : '0';

  return {
    ...state,
    displayValue: newValue,
  };
}

export function handlePercent(state) {
  const value = parseFloat(state.displayValue);
  const result = percent(value);

  return {
    ...state,
    displayValue: String(result),
  };
}

export function handleNegate(state) {
  const value = parseFloat(state.displayValue);
  const result = negate(value);

  return {
    ...state,
    displayValue: String(result),
  };
}

export function processInput(state, type, value) {
  switch (type) {
    case 'digit':
      return inputDigit(state, value);
    case 'decimal':
      return inputDecimal(state);
    case 'operator':
      return handleOperator(state, value);
    case 'equals':
      return handleEquals(state);
    case 'clear':
      return handleClear();
    case 'backspace':
      return handleBackspace(state);
    case 'percent':
      return handlePercent(state);
    case 'negate':
      return handleNegate(state);
    default:
      return state;
  }
}

export function getServiceInfo() {
  return {
    ...CONFIG,
    status: 'ACTIVE',
    timestamp: new Date().toISOString(),
  };
}

export default {
  INITIAL_STATE,
  processInput,
  formatDisplay,
  getServiceInfo,
};
