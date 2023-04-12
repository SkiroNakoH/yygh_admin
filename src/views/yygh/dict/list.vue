<template>
    <div class="app-container">
        <el-table :data="dictList" style="width: 100%" row-key="id" border lazy :load="load"
            :tree-props="{hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="dictCode" label="编码" width="180">
            </el-table-column>
            <el-table-column prop="value" label="值" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import dict from '@/api/dict'
export default {
    data() {
        return {
            dictList:[] //数据字典列表数组
        }
    },
    created() {
        this.fetchData(1)
    },
    methods: {
        //数据字典列表
        fetchData(id) {
            dict.findListByParentId(id)
                .then(response => {
                    this.dictList = response.data.dictList
                })
        },

        //加载孩子
        load(tree, treeNode, resolve) {

            dict.findListByParentId(tree.id).then(response => {
                //将返回值添加到下一层
                resolve(response.data.dictList)
            })
      }
    }
}
</script>
  