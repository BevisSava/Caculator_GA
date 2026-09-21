export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) return 'Divided by zero';
    return a % b;
}

export function percent(value) {
    return value / 100;
}

export function negate(value) {
    return -value;
}

const operationRegistry = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide,
};

export function calculate(operandA, operator, operandB) {
    const operation = operationRegistry[operator];

    if (!operation) {
        return 'Error';
    }

    const result = operation(operandA, operandB);

    if (typeof result === 'number' && !Number.isInteger(result)) {
        return parseFloat(result.toFixed(10));
    }

    return result;
}

export function formatDisplay(value) {
    if (value === 'Error') return 'Error';

    const strValue = String(value);

    if (strValue.endsWith('.')) return strValue;

    const num = parseFloat(strValue);
    if (isNaN(num)) return '0';

    if (Math.abs(num) > 999999999999) {
        return num.toExponential(4);
    }

    const parts = strValue.split('.');
    parts[0] = parseInt(parts[0]).toLocaleString('en-US');

    return parts.join('.');
}

export const ENGINE_SERVICES = {
    add,
    subtract,
    multiply,
    divide,
    percent,
    negate,
    calculate,
    formatDisplay,
    operationRegistry,
};

export default ENGINE_SERVICES;
