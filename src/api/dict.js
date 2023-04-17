import request from '@/utils/request'

const API = "/admin/cmn/dict"

export default {
    //分页查询//根据f父id查询子类
    findListByParentId(parentId) {
        return request({
            url: `${API}/findListByParentId/${parentId}`,
            method: 'get'
        })
    },
    findDictByParentCode(parentCode) {
        return request({
            url: `${API}/findDictByParentCode/${parentCode}`,
            method: 'get'
        })
    },
}

