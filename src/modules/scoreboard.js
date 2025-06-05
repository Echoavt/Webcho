/**
 * Utility functions for persisting high scores to localStorage.
 * Each score includes a player name and the number of attempts taken
 * to guess the correct number.
 */

const STORAGE_KEY = 'webcho-scores';

/**
 * Load score array from localStorage.
 * @returns {Array<{name: string, attempts: number}>}
 */
export function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s) => typeof s.name === 'string' && Number.isFinite(s.attempts)
    );
  } catch (err) {
    console.error('Failed to load scores', err);
    return [];
  }
}

/**
 * Save score array to localStorage.
 * @param {Array<{name: string, attempts: number}>} scores
 */
function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (err) {
    console.error('Failed to save scores', err);
  }
}

/**
 * Record a new score and persist.
 * @param {string} name Player name
 * @param {number} attempts Number of attempts taken
 */
export function saveScore(name, attempts) {
  const scores = loadScores();
  scores.push({ name, attempts });
  scores.sort((a, b) => a.attempts - b.attempts);
  saveScores(scores.slice(0, 20)); // keep top 20
}

/**
 * Get the top scores limited by the provided count.
 * @param {number} [limit=10] Maximum number of scores to return
 */
export function getTopScores(limit = 10) {
  return loadScores().slice(0, limit);
}
