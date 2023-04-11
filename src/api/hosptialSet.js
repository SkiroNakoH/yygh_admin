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
  //根据id查询
  getById(id){
    return request({
      url: `${API}/${id}`,
      method: 'get'
    })
  },
  //修改
  updateById(data){
    return request({
      url: `${API}/updateById`,
      method: 'put',
      data
    })
  },
  //修改状态
  updateStatus(id,status){
    return request({
      url: `${API}/updateStatus/${id}/${status}`,
      method: 'put'
    })
  },
  //批量删除
  batchDeleteByIds(data){
    return request({
      url: `${API}/batchDeleteByIds`,
      method: 'delete',
      data
    })
  },
}