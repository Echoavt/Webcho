import { loadScores, saveScore, getTopScores } from '../modules/scoreboard.js';

describe('scoreboard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveScore stores entry', () => {
    saveScore('Alice', 3);
    const scores = loadScores();
    expect(scores.length).toBe(1);
    expect(scores[0].name).toBe('Alice');
    expect(scores[0].attempts).toBe(3);
  });

  test('getTopScores sorts by attempts', () => {
    saveScore('Bob', 5);
    saveScore('Alice', 3);
    const top = getTopScores();
    expect(top[0].name).toBe('Alice');
    expect(top[0].attempts).toBe(3);
  });
});
