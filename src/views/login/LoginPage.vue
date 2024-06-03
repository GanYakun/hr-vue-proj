<script setup lang="ts">
import { userRegisterService,loginService } from '@/api/register'
import { reactive, ref, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { type FormInstance, type ElMessage } from 'element-plus'
const isRegister = ref(false)
const form = ref()

const formModel = ref({
    username: '',
    password: '',
    repassword: ''
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 15, message: '用户名必须是 5-15位 的字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是 6-15位 的非空字符',
            trigger: 'blur'
        }
    ],
    repassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是 6-15位 的非空字符',
            trigger: 'blur'
        },
        {
            validator: (rule: any, value: any, callback: any) => {
                // 判断 value 和 当前 form 中收集的 password 是否一致
                if (value !== formModel.value.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback() // 就算校验成功，也需要callback
                }
            },
            trigger: 'blur'
        }
    ]
}
 
const register = async () => {
    await form.value.validate()
    const res = await userRegisterService(formModel.value)
    if (res.data.code == '200') {
        console.log(res.data.message, "<<<<<<<<<<<<")
        ElMessage.success(res.data.message)
        // alert("成功")
    } else {
        ElMessage.warning(res.data.message)
    }
    isRegister.value = false;
}

const login = async () => {
    await form.value.validate()
    const res = await loginService(formModel.value)
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

    <el-row type="login-page">
        <!-- 登录表单 -->
        <el-col :span="6" :offset="9" class="form">
            <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" class="registerInput">
                    <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password"
                        show-password />
                </el-form-item>
                <el-form-item prop="repassword" class="registerInputAgain">
                    <el-input v-model="formModel.repassword" :prefix-icon="Lock" placeholder="请再次输入密码" type="password"
                        show-password />
                </el-form-item>
                <el-form-item class="loginButton">
                    <el-button type="primary" :underline="false" auto-insert-space @click="register" class="button">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" class="registerLink" @click="isRegister = false">
                        返回 →
                    </el-link>
                </el-form-item>
            </el-form>

            <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="checkPass" class="inputPw">
                    <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password"
                        autocomplete="off" show-password />
                </el-form-item>
                <el-form-item class="help">
                    <div class="flex">
                        <el-checkbox class="remember">记住我</el-checkbox>
                        <el-link type="primary" :underline="false" class="forgetPw">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <el-form-item class="loginButton">
                    <el-button type="primary" :underline="false" auto-insert-space @click="login"
                        class="button">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" class="registerLink" @click="isRegister = true">
                        注册 →
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



.inputPw,
.help {
    margin-bottom: 0px;
}

.loginButton {
    margin-bottom: 5px;
}

.registerLink,
.forgetPw,
.remember {
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
