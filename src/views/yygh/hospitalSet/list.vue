<template>
    <div class="app-container">
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="hosname" label="医院名称" width="180">
            </el-table-column>
            <el-table-column prop="hoscode" label="医院编号" width="180">
            </el-table-column>
            <el-table-column prop="contactsName" label="联系人姓名" width="180">
            </el-table-column>
            <el-table-column prop="contactsPhone" label="联系人手机" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination @current-change="fetchData"
                :current-page="page" :page-sizes="[100, 200, 300, 400]" :page-size="size"
                layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
  
<script>
import hosptialSet from '@/api/hosptialSet'

export default {
    data() {
        return {
            list: null,
            listLoading: true,
            page: 1,
            size: 3,
            total: 0,
            hosptialSetQuery: {}
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData(page = 1) { //ES6 page值未分配
            this.page = page;

            //分页条件查询
            hosptialSet.pageList(this.page, this.size, this.hosptialSetQuery).then(resopnse => {
                this.list = resopnse.data.hospitalSetList;
                this.total = resopnse.data.total;

                this.listLoading = false;   //结束加载
            })
        }
    }
}
</script>
  