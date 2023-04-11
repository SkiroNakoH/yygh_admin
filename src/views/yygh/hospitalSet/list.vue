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
                <el-button type="info" @click="batchDeleteByIds()">批量删除</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="listLoading" :data="list" @selection-change="getIds" element-loading-text="数据加载中" border fit
            highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
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

            <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/yygh/hospitalSet/edit/' + scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                        @click="removeDataById(scope.row.id)">删除</el-button>

                    <el-button type="danger" size="mini" icon="el-icon-lock" v-if="scope.row.status == 1"
                        @click="updateStatus(scope.row.id, 0)">锁定</el-button>
                    <el-button type="success" size="mini" icon="el-icon-unlock" v-else
                        @click="updateStatus(scope.row.id, 1)">解锁</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="fetchData" :current-page="page" :page-size="size" 
                style="padding: 30px 0; text-align: right;" layout="total, prev, pager, next, jumper" :total="total">
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
            hosptialSetQuery: {},
            idList: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        //分页查询
        fetchData(page = 1) { //ES6 page值未分配
            this.page = page;

            //分页条件查询
            hosptialSet.pageList(this.page, this.size, this.hosptialSetQuery).then(resopnse => {
                this.list = resopnse.data.hospitalSetList;
                this.total = resopnse.data.total;

                this.listLoading = false;   //结束加载
            })
        },
        //清空查询条件
        clearQuery() {
            this.hosptialSetQuery = {};
        },
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
        //医院上市或下市
        updateStatus(id, status) {
            hosptialSet.updateStatus(id, status).then(response => {
                if (status = 0) {
                    this.$message.success("锁定成功");
                } else {
                    this.$message.success("解锁成功");
                }
                //重载页面
                this.fetchData(this.page);
            })
        },
        //获取选中的id
        getIds(val) {
            //清空上次点击数据
            this.idList = [];

            for (let i in val) {
                this.idList.push(val[i].id);
            }
        },
        //根据id批量删除医院
        batchDeleteByIds() {
            if (this.idList.length > 0) {
                hosptialSet.batchDeleteByIds(this.idList).then(resopnse => {
                    //重载页面
                    this.fetchData(this.page);

                    this.$message.success("批量删除成功");
                });
            } else {
                this.$message.error("未选中任何行");
            }
        }
    }
}
</script>
  