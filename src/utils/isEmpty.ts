export function isEmpty(obj: any) {
  if (!obj) return false;
  if (typeof obj !== 'object') return false;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
}
