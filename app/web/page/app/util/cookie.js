export function getCookie(key) {
  if (typeof document === 'object') {
    const cookies = document.cookie;
    const cookieRegExp = new RegExp(`${key}=(\\w+)$`);
    return cookies.match(cookieRegExp)[1];
  }
  return '';
}