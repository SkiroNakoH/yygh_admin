<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="医院名称">
                <el-input v-model="hospset.hosname" />
            </el-form-item>
            <el-form-item label="医院编号">
                <el-input v-model="hospset.hoscode" />
            </el-form-item>
            <el-form-item label="api地址">
                <el-input v-model="hospset.apiUrl" />
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="hospset.contactsName" />
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="hospset.contactsPhone" />
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
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
            saveBtnDisabled: false // 保存按钮是否禁用,
        }
    },

    methods: {
        saveOrUpdate() {
            this.saveBtnDisabled = true
            this.insert()
        },

        // 新增
        insert() {
            hosptialSet.insert(this.hospset);

            //跳转页面 => 路由跳转
            this.$router.push({path: '/yygh/hospitalSet/list'});
        }

    }
}
</script>