import request from '@/utils/request'

//医院设置相关请求
const API = "/admin/hosp/hospitalSet"

export default {
  //分页查询
  pageList(page,size,params) {
    return request({
      url: `${API}/pageList/${page}/${size}`,
      method: 'get',
      params 
    })
  },
  //通过id删除
  removeById(id){
    return request({
      url: `${API}/${id}`,
      method: 'delete'
    })
  },
  //新增数据
  insert(data){
    return request({
      url: `${API}/insert`,
      method: 'post',
      data
    })
  },
}