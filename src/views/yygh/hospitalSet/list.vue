<template>
    <div class="app-container">
        <el-form :inline="true" :model="hosptialSetQuery" class="demo-form-inline">
            <el-form-item label="医院名称">
                <el-input v-model="hosptialSetQuery.hosname" placeholder="医院名称"></el-input>
            </el-form-item>
            <el-form-item label="医院编号">
                <el-input v-model="hosptialSetQuery.hoscode" placeholder="医院编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData()">查询</el-button>
                <el-button type="danger" @click="clearQuery()">清空</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * size + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="hosname" label="医院名称" width="180" />

            <el-table-column prop="hoscode" label="医院编号" width="160" />

            <el-table-column prop="apiUrl" label="地址" width="200" />

            <el-table-column prop="contactsName" label="联系人" />

            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/yygh/hospitalSet/edit/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                        @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination @current-change="fetchData" :current-page="page" :page-sizes="[100, 200, 300, 400]"
                :page-size="size" layout="total, prev, pager, next, jumper" :total="total">
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
        //根据id删除
        removeDataById(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                hosptialSet.removeById(id) //根据id删除
                .then((response) => {
                    this.$message.success("删除成功");
                    this.fetchData();
                });
            }).catch(() => { });
        },
        //清空查询条件
        clearQuery() {
            this.hosptialSetQuery = {};
        },
        //分页查询
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
  