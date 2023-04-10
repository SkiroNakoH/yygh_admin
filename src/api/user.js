import request from '@/utils/request'

const API = "/admin/hosp/user"

export function login(data) {
  return request({
    url: `${API}/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: `${API}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `${API}/logout`,
    method: 'post'
  })
}
