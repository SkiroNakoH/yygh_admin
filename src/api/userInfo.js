import request from '@/utils/request'

const API = "/admin/user/userInfo"

export default {
    //条件分页查询用户列表
    findPage(page,size,params) {
        return request({
            url: `${API}/findPage/${page}/${size}`,
            method: 'get',
            params
        })
    },
    updateStatus(id,status) {
        return request({
            url: `${API}/updateStatus/${id}/${status}`,
            method: 'put'
        })
    },
    getById(id) {
        return request({
            url: `${API}/getById/${id}`,
            method: 'get'
        })
    },
    approval(id,authStatus) {
        return request({
            url: `${API}/approval/${id}/${authStatus}`,
            method: 'get'
        })
    },
    
}

