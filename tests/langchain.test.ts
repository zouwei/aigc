// src/math.test.ts
import { add, subtract } from '../src/service/langchain';

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    console.log(`日志输出:`)
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });
});