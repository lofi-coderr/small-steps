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
  row.className = 'task';
  row.dataset.id = item.id;
  const label = document.createElement('label');
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = item.done;
  const text = document.createElement('span');
  text.textContent = item.text;
  label.append(check, text);
  row.append(label);
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

render();
