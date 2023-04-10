import request from '@/utils/request'

//医院设置相关请求
const API = "/admin/hosp/hospitalSet"

export default {
  pageList(page,size,params) {
    return request({
      url: `${API}/pageList/${page}/${size}`,
      method: 'get',
      params 
    })
  }
}