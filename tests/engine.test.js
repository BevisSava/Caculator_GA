import { describe, it, expect } from 'vitest';
import {
  add,
  subtract,
  multiply,
  divide,
  percent,
  negate,
  calculate,
  formatDisplay,
} from '../src/logic/engine.js';

describe('add() - Phép cộng', () => {
  it('cộng hai số dương', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('cộng số dương và số âm', () => {
    expect(add(10, -3)).toBe(7);
  });

  it('cộng hai số âm', () => {
    expect(add(-5, -3)).toBe(-8);
  });

  it('cộng với 0', () => {
    expect(add(42, 0)).toBe(42);
  });

  it('cộng số thập phân', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('subtract() - Phép trừ', () => {
  it('trừ hai số dương', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it('trừ cho số lớn hơn (kết quả âm)', () => {
    expect(subtract(3, 7)).toBe(-4);
  });

  it('trừ hai số bằng nhau', () => {
    expect(subtract(5, 5)).toBe(0);
  });

  it('trừ số âm (tương đương cộng)', () => {
    expect(subtract(10, -5)).toBe(15);
  });
});

describe('multiply() - Phép nhân', () => {
  it('nhân hai số dương', () => {
    expect(multiply(4, 5)).toBe(20);
  });

  it('nhân với 0', () => {
    expect(multiply(100, 0)).toBe(0);
  });

  it('nhân với 1 (đơn vị)', () => {
    expect(multiply(42, 1)).toBe(42);
  });

  it('nhân hai số âm (kết quả dương)', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  it('nhân số dương với số âm', () => {
    expect(multiply(6, -2)).toBe(-12);
  });
});

describe('divide() - Phép chia', () => {
  it('chia hai số nguyên chẵn', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('chia hai số có kết quả thập phân', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it('chia cho 0 → trả về "Error"', () => {
    expect(divide(10, 0)).toBe('Error');
  });

  it('chia 0 cho số khác → trả về 0', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('chia số âm cho số dương', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
});

describe('percent() - Phần trăm', () => {
  it('tính 50% → 0.5', () => {
    expect(percent(50)).toBe(0.5);
  });

  it('tính 100% → 1', () => {
    expect(percent(100)).toBe(1);
  });

  it('tính 0% → 0', () => {
    expect(percent(0)).toBe(0);
  });

  it('tính 200% → 2', () => {
    expect(percent(200)).toBe(2);
  });
});

describe('negate() - Đảo dấu', () => {
  it('đảo số dương → âm', () => {
    expect(negate(5)).toBe(-5);
  });

  it('đảo số âm → dương', () => {
    expect(negate(-3)).toBe(3);
  });

  it('đảo 0 → 0 (negative zero)', () => {
    expect(negate(0)).toBe(-0);
  });
});

describe('calculate() - Tính toán tổng hợp', () => {
  it('phép cộng qua calculate()', () => {
    expect(calculate(5, '+', 3)).toBe(8);
  });

  it('phép trừ qua calculate()', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  it('phép nhân qua calculate()', () => {
    expect(calculate(6, '×', 7)).toBe(42);
  });

  it('phép chia qua calculate()', () => {
    expect(calculate(15, '÷', 3)).toBe(5);
  });

  it('chia cho 0 qua calculate() → "Error"', () => {
    expect(calculate(10, '÷', 0)).toBe('Error');
  });

  it('toán tử không hợp lệ → "Error"', () => {
    expect(calculate(5, '^', 2)).toBe('Error');
  });

  it('kết quả thập phân được làm tròn 10 chữ số', () => {
    const result = calculate(1, '÷', 3);
    expect(result).toBe(0.3333333333);
  });
});

describe('formatDisplay() - Định dạng hiển thị', () => {
  it('hiển thị "Error" giữ nguyên', () => {
    expect(formatDisplay('Error')).toBe('Error');
  });

  it('số 0 hiển thị là "0"', () => {
    expect(formatDisplay('0')).toBe('0');
  });

  it('giữ dấu chấm cuối khi đang nhập', () => {
    expect(formatDisplay('5.')).toBe('5.');
  });

  it('số có phần nghìn được format đúng', () => {
    expect(formatDisplay('1000000')).toBe('1,000,000');
  });

  it('NaN trả về "0"', () => {
    expect(formatDisplay('abc')).toBe('0');
  });
});
