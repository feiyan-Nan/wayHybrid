import Cookies from 'js-cookie'

export function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, token) {
  return Cookies.set(key, token)
}

export function removeCookie (key) {
  return Cookies.remove(key)
}
