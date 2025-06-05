/**
 * Initialize the Guess the Number game.
 * Creates the game UI and handles user interaction.
 */
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

  document.body.appendChild(container);

  const secret = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  button.addEventListener('click', () => {
    const guess = parseInt(input.value, 10);
    attempts++;
    if (Number.isNaN(guess)) {
      message.textContent = 'Please enter a number.';
    } else if (guess < secret) {
      message.textContent = 'Too low!';
    } else if (guess > secret) {
      message.textContent = 'Too high!';
    } else {
      message.textContent = `Correct! The number was ${secret}. Attempts: ${attempts}`;
      button.disabled = true;
      input.disabled = true;
    }
    input.value = '';
    input.focus();
  });
}
