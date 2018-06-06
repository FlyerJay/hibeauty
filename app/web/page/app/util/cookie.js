export function getCookie(key) {
  if (typeof document === 'object') {
    const cookies = document.cookie;
    const cookieRegExp = new RegExp(`${key}=([^;]*)`);
    return cookies.match(cookieRegExp) ? cookies.match(cookieRegExp)[1] : '';
  }
  return '';
}