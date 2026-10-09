// Small Steps
const $ = (selector) =>
  document.querySelector(selector);

const form = $('#add-form');
const input = $('#task-input');
const list = $('#tasks');
let items = [];

function render() {
  list.replaceChildren();
}

render();
