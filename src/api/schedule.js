import request from '@/utils/request'

const API = "/admin/hosp/schedule"

export default {
    //排班日期安排
    arrangeDate(page,size,hoscode,depcode) {
        let params = {hoscode,depcode};
        return request({
            url: `${API}/arrangeDate/${page}/${size}`,
            method: 'get',
            params
        })
    },
    findScheduleDetail(hoscode,depcode,workDate) {
        return request({
            url: `${API}/findScheduleDetail/${hoscode}/${depcode}/${workDate}`,
            method: 'get'
        })
    },
}