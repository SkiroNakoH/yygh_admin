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
    },
    //上线或下线
    updateStatus(id,status){
        return request({
            url: `${API}/updateStatus/${id}/${status}`,
            method: 'put'
        })
    }
}
