import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanText, visibleItems, restoreItems,
} from './model.js';

const tasks = [
  { id: 'a', text: 'Read', done: false },
  { id: 'b', text: 'Walk', done: true },
];

test('trim and limit text', () => {
  assert.equal(cleanText('  tea  '), 'tea');
  const long = cleanText('x'.repeat(150));
  assert.equal(long.length, 120);
});

test('filter without mutation', () => {
  assert.equal(visibleItems(tasks, 'all').length,
    2);
  assert.equal(visibleItems(tasks, 'active')[0].id,
    'a');
  assert.equal(visibleItems(tasks, 'done')[0].id,
    'b');
  assert.equal(tasks[0].done, false);
});

test('restore valid unique rows', () => {
  assert.deepEqual(restoreItems(null), []);
  const data = [null, ...tasks, tasks[0]];
  assert.deepEqual(restoreItems(data), tasks);
});

test('keep Unicode graphemes whole', () => {
  const family =
    '\u{1f469}\u200d\u{1f469}' +
    '\u200d\u{1f467}\u200d\u{1f466}';
  assert.equal(cleanText(family.repeat(121)),
    family.repeat(120));
  const accent = 'e\u0301';
  assert.equal(cleanText(accent.repeat(121)),
    accent.repeat(120));
});
