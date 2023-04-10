<template>
    <div class="app-container">
        医院设置列表...

    </div>
</template>
  
<script>
import  hosptialSet  from '@/api/hosptialSet'

export default {
    data() {
        return {
            list: null,
            listLoading: true,
            page: 1,
            size: 10,
            hosptialSetQuery: {}
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            //分页条件查询
            hosptialSet.pageList(this.page, this.size, this.hosptialSetQuery).then(resopnse => {
                console.log(resopnse);
            })
        }
    }
}
</script>
  