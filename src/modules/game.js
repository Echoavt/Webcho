/**
 * Initialize the Guess the Number game.
 * Creates the game UI and handles user interaction.
 */
import { saveScore } from './scoreboard.js';

export function start() {
  console.log('start');

  const container = document.createElement('div');
  container.id = 'game';

  const heading = document.createElement('h1');
  heading.textContent = 'Guess the Number';
  container.appendChild(heading);

  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Enter a number 1-100';
  container.appendChild(input);

  const button = document.createElement('button');
  button.textContent = 'Guess';
  container.appendChild(button);

  const message = document.createElement('p');
  container.appendChild(message);

  const scoreboard = document.createElement('div');
  scoreboard.id = 'scoreboard';
  const boardHeading = document.createElement('h2');
  boardHeading.textContent = 'Past Guesses';
  const guesses = document.createElement('ul');
  scoreboard.appendChild(boardHeading);
  scoreboard.appendChild(guesses);
  container.appendChild(scoreboard);

  const highScores = document.createElement('div');
  highScores.id = 'highscores';
  const highHeading = document.createElement('h2');
  highHeading.textContent = 'Leaderboard';
  const table = document.createElement('table');
  table.innerHTML =
    '<thead><tr><th>Name</th><th>Attempts</th></tr></thead><tbody></tbody>';
  highScores.appendChild(highHeading);
  highScores.appendChild(table);
  container.appendChild(highScores);

  function refreshScores() {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    import('./scoreboard.js').then(({ getTopScores }) => {
      const scores = getTopScores();
      scores.forEach((s) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${s.name}</td><td>${s.attempts}</td>`;
        tbody.appendChild(row);
      });
    });
  }

  refreshScores();

  document.body.appendChild(container);

  const secret = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  button.addEventListener('click', () => {
    const guess = parseInt(input.value, 10);
    attempts++;
    if (Number.isNaN(guess)) {
      message.textContent = 'Please enter a number.';
      const li = document.createElement('li');
      li.textContent = `#${attempts}: invalid input`;
      guesses.appendChild(li);
    } else if (guess < secret) {
      message.textContent = 'Too low!';
      const li = document.createElement('li');
      li.textContent = `#${attempts}: ${guess} - too low`;
      guesses.appendChild(li);
    } else if (guess > secret) {
      message.textContent = 'Too high!';
      const li = document.createElement('li');
      li.textContent = `#${attempts}: ${guess} - too high`;
      guesses.appendChild(li);
    } else {
      message.textContent = `Correct! The number was ${secret}. Attempts: ${attempts}`;
      button.disabled = true;
      input.disabled = true;
      const li = document.createElement('li');
      li.textContent = `#${attempts}: ${guess} - correct`;
      guesses.appendChild(li);
      const name = prompt('You won! Enter your name for the leaderboard:');
      if (name) {
        saveScore(name, attempts);
        refreshScores();
      }
    }
    input.value = '';
    input.focus();
  });
}
