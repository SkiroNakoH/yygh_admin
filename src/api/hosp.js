import request from '@/utils/request'

const API = "/admin/hosp/hospital"

export default {
    //分页查询
    findPage(page,size,params) {
        return request({
            url: `${API}/findPage/${page}/${size}`,
            method: 'get',
            params
        })
    }
}
