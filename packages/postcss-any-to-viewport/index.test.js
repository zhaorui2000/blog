const postcss = require('postcss');
const { equal } = require('node:assert');
const { test } = require('node:test');

const plugin = require('./');

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test('transform px', async () => {
  await run('font-size:16px', 'font-size:0.04267vw', {});
});

test('transform rem', async () => {
  await run('font-size:2.5rem', 'font-size:0.10667vw', {});
});

test('test config', async () => {
  await run('font-size:7rem', 'font-size:0.213vw', { viewportWidth: 789, unitPrecision: 3, rootValue: 24 });
});
