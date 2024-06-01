<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const isRegister = ref(true)
const form = ref()
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
})

// const register = async () => {
//   // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
//   await form.value.validate()
//   await userRegisterService(formModel.value)
//   ElMessage.success('注册成功')
//   isRegister.value = false
// }

const register = () => {
    isRegister.value = false
}

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

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

</script>

<template>
    
    <el-row type="flex">
        <!-- 登录表单 -->
        <el-col :span="6" :offset="9" class="form"  v-if="isRegister">
            <el-form ref="ruleFormRef" size="large" autocomplete="off">
                <el-form-item>
                    <h1>
                        登录
                    </h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item  prop="checkPass" class="inputPw">
                    <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item class="help">
                    <div class="flex">
                        <el-checkbox class="remember">记住我</el-checkbox>
                        <el-link type="primary" :underline="false" class="forgetPw">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <el-form-item class="loginButton">
                    <el-button type="primary" :underline="false" auto-insert-space @click="submitForm(ruleFormRef)" class="button">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" class="registerLink" @click="register">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- 注册表单 -->
        <el-col :span="6" :offset="9" class="form" v-else>
            <el-form ref="ruleFormRef" size="large" autocomplete="off">
                <el-form-item>
                    <h1>
                        注册
                    </h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item  prop="checkPass" class="registerInput">
                    <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item  prop="checkPass" class="registerInputAgain">
                    <el-input v-model="formModel.repassword" :prefix-icon="Lock" placeholder="请再次输入密码" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item class="loginButton">
                    <el-button type="primary" :underline="false" auto-insert-space @click="submitForm(ruleFormRef)" class="button">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" class="registerLink"@click="isRegister = true">
                        返回 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style>

.el-row {
    height: 100%;
    background-image: url('@/assets/login.png');
}



.inputPw,.help  {
    margin-bottom: 0px;
}

.loginButton {
    margin-bottom: 5px;
}

.registerLink, .forgetPw, .remember{
    color: black;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
        margin: 0 auto;
    }

    .button {
        width: 100%;
    }

    .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>
