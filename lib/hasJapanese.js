const JAPANESE_RE = /[\u3040-\u30FF\u4E00-\u9FFF]/;

export function hasJapanese(text) {
  if (text == null) return false;
  return JAPANESE_RE.test(String(text));
}
