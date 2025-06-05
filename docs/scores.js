import { getTopScores } from './modules/scoreboard.js';

const tbody = document.querySelector('#leaderboard tbody');

function render() {
  tbody.innerHTML = '';
  const scores = getTopScores();
  scores.forEach((s) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${s.name}</td><td>${s.attempts}</td>`;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', render);
