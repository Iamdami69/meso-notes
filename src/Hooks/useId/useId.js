export function useId() {
  const preffix = Date.now().toString(36);
  const suffix = Math.random().toString(36).substr(2);
  const id = preffix + suffix;
  return { id };
}
