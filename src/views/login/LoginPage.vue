<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass')
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

</script>

<template>
    <el-row type="flex" align="middle">

        <el-col :span="8" :offset="8" class="form">
            <el-form ref="ruleFormRef" size="large" autocomplete="off">
                <el-form-item>
                    <h1>
                        注册
                    </h1>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input :prfix-icon="User" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input placeholder="请输入密码" v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="register">
                    <el-checkbox>记住我</el-checkbox>
                    <el-link type="primary">注册</el-link>
                </el-form-item>
                <el-form-item> 
                    <el-button type="primary" :underline="false" @click="submitForm(ruleFormRef)">
                        Submit
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<style>
.el-row {
    height: 100%;
}
.el-link {
    float: right;
}
</style>
