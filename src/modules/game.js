export function start() {
  console.log('start');
  const heading = document.createElement('h1');
  heading.textContent = 'Game started';
  document.body.appendChild(heading);
}
