<script lang="ts" setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { Login } from '@/api/user/type'
import { login } from '@/api/user'

const LoginState = ref<Login>({
  mobile: '',
  password: '',
})

async function handleFinish() {
  await login(LoginState.value)
}

function handleFinishFailed() {
  console.log('nnkj')
}
</script>

<template>
  <div class="logo-page h-screen w-screen">
    <div class="bg fixed h-screen w-screen bg-cover bg-repeat-unset transition duration-500" />
    <div
      class="login-container absolute left-5% h-100% w-420px flex flex-col flex-items-center bg-black bg-op-50 shadow-black shadow-lg backdrop-blur-10px backdrop-filter"
    >
      <p class="logo-text text-center text-size-4xl font-bold text-white text-op-70">
        whoChat
      </p>
      <a-form
        :model="LoginState"
        @finish="handleFinish"
        @finish-failed="handleFinishFailed"
      >
        <a-form-item>
          <a-input
            v-model:value="LoginState.mobile"
            size="large"
            placeholder="mobile"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="LoginState.password" size="large" placeholder="password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="w-full">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-page {
  .bg {
    background-image: url('images/bg.jpg');
  }
  .login-container {
    .logo-text {
      font-family: "TypoGraphica";
    }
  }
}
</style>
