export function jsonSafeParse(message: string) {
  try {
    return JSON.parse(message);
  } catch (error) {
    return null;
  }
}
