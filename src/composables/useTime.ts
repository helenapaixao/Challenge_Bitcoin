export function shortTimeNow() {
  return new Date().toLocaleString('pt-BR', { timeStyle: 'short' });
}
