let start;
beforeAll(async () => { ({ start } = await import('../modules/game.js')); });

beforeEach(() => {
  document.body.innerHTML = '';
});

test('start creates game UI', () => {
  start();
  const heading = document.querySelector('h1');
  expect(heading).not.toBeNull();
  expect(heading.textContent).toMatch(/Guess the Number/);
  const button = document.querySelector('button');
  expect(button).not.toBeNull();
});
