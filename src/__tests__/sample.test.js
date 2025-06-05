let start;
beforeAll(async () => { ({start} = await import('../modules/game.js')); });

test('start logs', () => {
  expect(typeof start).toBe('function');
});
