<template>
    <div class="app-container">
        <el-form :model="hospset" :rules="rules" ref="hospset" label-width="100px">
            <el-form-item label="医院名称" prop="hosname">
                <el-input v-model="hospset.hosname" />
            </el-form-item>
            <el-form-item label="医院编号" prop="hoscode">
                <el-input v-model="hospset.hoscode" />
            </el-form-item>
            <el-form-item label="api地址" prop="apiUrl">
                <el-input v-model="hospset.apiUrl" />
            </el-form-item>
            <el-form-item label="联系人" prop="contactsName">
                <el-input v-model="hospset.contactsName" />
            </el-form-item>
            <el-form-item label="电话" prop="contactsPhone">
                <el-input v-model="hospset.contactsPhone" />
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('hospset')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import hosptialSet from '@/api/hosptialSet'

export default {
    data() {
        return {
            hospset: {},
            saveBtnDisabled: false, // 保存按钮是否禁用,
            rules: {
                hosname: [
                    { required: true, message: '请输入医院名称', trigger: 'blur' }
                ],
                hoscode: [
                    { required: true, message: '请输入医院编号', trigger: 'blur' }
                ],
                apiUrl: [
                    { required: true, message: '请输入api地址', trigger: 'blur' }
                ],
                contactsName: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                contactsPhone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.hospset.id = this.$route.params.id;
        if (this.hospset.id) {
            this.getById(this.hospset.id);
        }

    },
    methods: {
        //表单校验
        saveOrUpdate(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //禁用保存按钮
                    this.saveBtnDisabled = true;
                    if(this.hospset.id){
                        this.updateById();
                    }else{
                        this.insert();
                    }

                    //保存出错，开启保存按钮
                    this.saveBtnDisabled = false;
                }
            });

        },
        // 新增
        insert() {
            hosptialSet.insert(this.hospset).then((response) => {
                this.$message.success("添加成功")
            });

            //跳转页面 => 路由跳转
            this.$router.push({ path: '/yygh/hospitalSet/list' });
        },
        //根据id查询
        getById(id) {
            hosptialSet.getById(id).then(response => {
                this.hospset = response.data.hospitalSet;
            })
        },
        //修改
        updateById(){
            hosptialSet.updateById(this.hospset).then((response)=> {
                this.$message.success("修改成功");
            })

            //路由跳转
            this.$router.push({ path: '/yygh/hospitalSet/list' });
        }

    }
}
</script>