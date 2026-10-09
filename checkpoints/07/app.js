// Small Steps
const $ = (selector) =>
  document.querySelector(selector);

const form = $('#add-form');
const input = $('#task-input');
const list = $('#tasks');
const STORE = 'small-steps-v1';
let items = load();
let filter = 'all';

function render() {
  const visible = items.filter((item) =>
    filter === 'all' ||
    (filter === 'done' ? item.done : !item.done));
  list.replaceChildren(...visible.map(taskRow));
  for (const button of
    document.querySelectorAll('[data-filter]')) {
    button.setAttribute('aria-pressed',
      String(button.dataset.filter === filter));
  }
}

function load() {
  try {
    const saved = localStorage.getItem(STORE);
    const data = JSON.parse(saved || '[]');
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item &&
      typeof item.id === 'string' &&
      typeof item.text === 'string' &&
      typeof item.done === 'boolean');
  } catch {
    return [];
  }
}

function commit() {
  try {
    localStorage.setItem(STORE,
      JSON.stringify(items));
  } catch {
    console.info('Session-only mode.');
  }
  render();
}

function taskRow(item) {
  const row = document.createElement('li');
  row.className = item.done ? 'task done' : 'task';
  row.dataset.id = item.id;
  const label = document.createElement('label');
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = item.done;
  const text = document.createElement('span');
  text.textContent = item.text;
  label.append(check, text);
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'remove';
  remove.textContent = '×';
  remove.setAttribute('aria-label',
    `Delete: ${item.text}`);
  row.append(label, remove);
  return row;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  items.push({
    id: crypto.randomUUID(),
    text,
    done: false,
  });
  input.value = '';
  input.focus();
  commit();
});

list.addEventListener('change', (event) => {
  const row = event.target.closest('.task');
  if (!row) return;
  const item = items.find((task) =>
    task.id === row.dataset.id);
  if (!item) return;
  item.done = event.target.checked;
  commit();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('.remove');
  if (!button) return;
  const id = button.closest('.task').dataset.id;
  items = items.filter((item) => item.id !== id);
  commit();
});

$('#filters').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  filter = button.dataset.filter;
  render();
});

render();
