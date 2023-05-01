import request from '@/utils/request'

export default {
    //查询科室-树节点
    orderCount(data) {
        return request({
            url: `/admin/statistics/orderCount`,
            method: 'post',
            data
        })
    }
}