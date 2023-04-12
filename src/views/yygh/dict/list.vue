<template>
    <div class="app-container">

        <el-button type="primary" @click="downLoad()">下载<i class="el-icon-download el-icon--right"></i></el-button>
        <el-button type="primary" @click="upload()">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
        <el-table :data="dictList" v-loading="listLoading" style="width: 100%" row-key="id" border lazy :load="load"
            :tree-props="{ hasChildren: 'hasChildren' }">
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="dictCode" label="编码" width="180">
            </el-table-column>
            <el-table-column prop="value" label="值" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
            </el-table-column>
        </el-table>

        <!-- 文件上传弹出层 -->
        <el-dialog title="上传" :visible.sync="dialogImportVisible" width="480px">
            <el-form label-position="right" label-width="170px">
                <el-form-item label="文件">
                    <el-upload :multiple="false" :on-success="onUploadSuccess"
                        :action="'http://localhost:8202/admin/cmn/dict/upLoad'" class="upload-demo">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import dict from '@/api/dict'
export default {
    data() {
        return {
            listLoading: true,
            dictList: [], //数据字典列表数组
            dialogImportVisible: false //是否显示弹出层
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
                    this.dictList = response.data.dictList;
                    this.listLoading = false;
                })
        },

        //加载孩子
        load(tree, treeNode, resolve) {

            dict.findListByParentId(tree.id).then(response => {
                //将返回值添加到下一层
                resolve(response.data.dictList)
            })
        },
        //下载Excel表
        downLoad() {
            window.open("http://localhost:8202/admin/cmn/dict/downLoad");
        },
        //上传Excel表点击事件
        upload() {
            this.dialogImportVisible = true;
        },
        //上传Excel的回调的函数
        onUploadSuccess(response){
            //根据响应的状态码，判断是否上传成功
            if(response.code == 20000){
                //数据发生更新，重新加载数据字典
                this.fetchData(1);

                this.$message.success("上传成功");
                //关闭上传文件弹出层
                this.dialogImportVisible = false;
            }else{
                this.$message.error("上传失败");
            }
        }
    }
}
</script>
  