export function shortDateNow() {
  return new Date().toLocaleString('pt-BR', { dateStyle: 'short' }).replaceAll('/', '-');
}
