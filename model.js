export function cleanText(value) {
  const text = String(value).trim();
  const segmenter = typeof Intl.Segmenter ===
    'function' ? new Intl.Segmenter(undefined,
      { granularity: 'grapheme' }) : null;
  const parts = segmenter
    ? Array.from(segmenter.segment(text),
        (part) => part.segment)
    : Array.from(text);
  return parts.slice(0, 120).join('');
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
