
export function getToken() {
  return localStorage.getItem('token')
}

export function removeLoginStorage() {
  window.localStorage.clear()
  window.sessionStorage.clear()
}

export function setLoginStorage(response) {
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('userinfo', JSON.stringify(response.data.user))
  localStorage.setItem('uid', response.data.user.id)
  localStorage.setItem('agent', response.data.user.staff_no)
  localStorage.setItem('password', response.data.user.seat_password)
  localStorage.setItem('dn', response.data.user.phone_no)
  localStorage.setItem('cid', response.data.user.cid)
  localStorage.setItem('phone_password', response.data.user.phone_password)
}
