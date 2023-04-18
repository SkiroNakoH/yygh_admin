import request from '@/utils/request'

const API = "/admin/hosp/department"

export default {
    //查询科室-树节点
    findDepartmentTree(hoscode) {
        return request({
            url: `${API}/findDepartmentTree/${hoscode}`,
            method: 'get'
        })
    }
}