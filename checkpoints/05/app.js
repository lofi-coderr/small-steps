// Small Steps
const $ = (selector) =>
  document.querySelector(selector);

const form = $('#add-form');
const input = $('#task-input');
const list = $('#tasks');
let items = [];

function render() {
  list.replaceChildren(...items.map(taskRow));
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
  render();
});

list.addEventListener('change', (event) => {
  const row = event.target.closest('.task');
  if (!row) return;
  const item = items.find((task) =>
    task.id === row.dataset.id);
  if (!item) return;
  item.done = event.target.checked;
  render();
});

list.addEventListener('click', (event) => {
  const button = event.target.closest('.remove');
  if (!button) return;
  const id = button.closest('.task').dataset.id;
  items = items.filter((item) => item.id !== id);
  render();
});

render();
