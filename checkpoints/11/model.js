export function cleanText(value) {
  return String(value).trim().slice(0, 120);
}

export function visibleItems(items, filter) {
  return items.filter((item) =>
    filter === 'all' ||
    (filter === 'done' ? item.done : !item.done));
}

export function restoreItems(data) {
  if (!Array.isArray(data)) return [];
  const seen = new Set();
  return data.filter((item) => {
    if (!item || typeof item.id !== 'string' ||
      typeof item.text !== 'string' ||
      typeof item.done !== 'boolean') return false;
    if (!item.id || !cleanText(item.text) ||
      seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).map((item) => ({
    id: item.id,
    text: cleanText(item.text),
    done: item.done,
  }));
}
