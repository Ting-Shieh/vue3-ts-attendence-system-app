<template>
  <div class="login">
    <div class="header">
      <span class="header-logo">
        <i class="iconfont icon-vue"></i>
        <i class="iconfont icon-icon-test"></i>
        <i class="iconfont icon-typescript"></i>
      </span>
      <div class="header-title">在線考勤系統</div>
    </div>
    <div class="desc">學習typescript</div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      label-width="120px"
      class="main"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="loginForm.email" type="text" placeholder="請輸入Email" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密碼" prop="pass">
        <el-input v-model="loginForm.pass" type="password" placeholder="請輸入密碼" autocomplete="off"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)" auto-insert-space>登入</el-button>
      </el-form-item>
    </el-form>
    <div class="users">
      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="testUser in testUsers"
          :key="testUser.email"
        >
          <h3>測試帳號 <el-button @click="autoLogin(testUser)">一鍵登入</el-button></h3>
          <p>Email: {{ testUser.email }}</p>
          <p>Password: {{ testUser.pass }}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface User {
  email: string,
  pass: string
}
const store = useStore()
const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<User>({
  email: 'huangrong@imooc.com',
  pass: 'huangrong'
})
const testUsers: User[] = [
  {
    email: 'huangrong@imooc.com',
    pass: 'huangrong'
  },
  {
    email: 'hongqigong@imooc.com',
    pass: 'hongqigong'
  }
]
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '請輸入Email', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的Email格式', trigger: 'blur' }
  ],
  pass: [
    { required: true, message: '請輸入密碼', trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit', loginForm)
      store.dispatch('users/login', loginForm).then((res) => {
        if (res.data.errcode === 0) {
          // 更新 token
          store.commit('users/updateToken', res.data.token)
          ElMessage.success('登入成功！')
          router.push('/')
        } else {
          return ElMessage.error('登入失敗！')
        }
      })
    } else {
      return false
    }
  })
}
const autoLogin = (user: User) => {
  loginForm.email = user.email
  loginForm.pass = user.pass
  submitForm(loginFormRef.value)
}
// store
//     .dispatch('users/login')
//     .then((res) => {
//       console.log(res.data)
//     })
  
// import http from '@/utils/http'
// http.post('/users/login',{
//   "email": "huangrong@imooc.com",
//   "pass": "huangrong"
// }).then((res) => {
//   console.log(res.data)
// })
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.svg') no-repeat center 110px;
  background-size: 100%; // 防止背景圖拉深
  // display: flex;
  // flex-direction: column;

  .header{
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:  34px;
    padding-top: 100px;
    .header-logo{
      .icon-vue, .icon-icon-test, .icon-typescript {
        margin-right: 5px;
        font-size: inherit;
      }
      .icon-vue{
        color: green;
      }
      .icon-icon-test{
        color: #deb887;
      }
      .icon-typescript{
        color: blue;
      }
    }
    .header-title{
      margin-left: 30px;
      font-size: 30px;
      font-weight: 700;
    }
  }
  .desc{
    text-align: center;
    font-size: 16px;
    padding-top: 30px;
    color: rgba(0,0,0,.45);
  }
  .main{
    width: 510px;
    margin: 0 auto;
    padding-top: 50px;
    :deep(.el-button) {
      width: 100%;
    }
  }
  .users{
    width: 510px;
    margin: 60px auto;
    color: rgba(0,0,0,.65);
    h3{
      font-size: 16px;
    }
    p{
      margin: 20px;
    }
  }
}
</style>
