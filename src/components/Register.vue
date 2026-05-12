<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="userRegister">
      <h1>Create account</h1>
      <p class="subtitle">Find perfect stay for you!</p>

      <div class="form-group">
        <div class="input-wrap">
          <span><img src="/src/videos-images/for-all/info.png" /></span>
          <input type="text" v-model="fullname" placeholder="Full name" required />
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <span><img src="/src/videos-images/for-all/userforlogin.png" /></span>
          <input type="text" v-model="username" placeholder="Username" required />
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <span><img src="/src/videos-images/for-all/email.png" /></span>
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <span><img src="/src/videos-images/for-all/padlock.png" /></span>
          <input
            :type="showPass ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
          />
          <button type="button" class="show" @click="showPass = !showPass">👁</button>
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <span><img src="/src/videos-images/for-all/padlock.png" /></span>
          <input
            :type="showPass ? 'text' : 'password'"
            v-model="password2"
            placeholder="Repeat password"
            required
          />
          <button type="button" class="show" @click="showPass = !showPass">👁</button>
        </div>
      </div>

      <button type="submit" class="register-btn">Create account</button>

      <div class="not-log">
        <p>Already have an account?</p>
        <button class="login-btn" @click="backToLogin">Login</button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
const router = useRouter()

const fullname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const showPass = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

function backToLogin() {
  router.push('/login')
}
async function userRegister() {
  errorMsg.value = ''
  successMsg.value = ''

  if (password.value !== password2.value) {
    errorMsg.value = 'Passwords dont match'
    return
  }

  try {
    await api.userRegister({
      fullname: fullname.value,
      username: username.value,
      email: email.value,
      password: password.value,
    })
    successMsg.value = 'Register successfully! Routering to login...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Error while register'
  }
}
</script>

<style scoped>
.login-page {
  position: relative;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* BACKGROUND */
.bg {
  position: absolute;
  inset: 0;
  background: url('/src/videos-images/for-all/register-bg.jpg') center/cover no-repeat;
  transform: scale(1.1);
  z-index: -3;
}

/* DARK OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.85));
  z-index: -2;
}

/* CARD */
.login-card {
  width: 380px;
  padding: 35px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);

  display: flex;
  flex-direction: column;
  gap: 14px;

  color: white;
}

/* TITLE */
.login-card h1 {
  text-align: center;
  font-size: 24px;
  margin: 0;
}

.subtitle {
  text-align: center;
  opacity: 0.7;
  font-size: 13px;
  margin-bottom: 5px;
}

/* INPUT */
.input-wrap {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 0 10px;
  transition: 0.2s;
}

.input-wrap:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.input-wrap span img {
  height: 18px;
  opacity: 0.8;
}

.input-wrap input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 14px;
  background: transparent;
}

/* PASSWORD */
.show {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
}

/* REGISTER BUTTON */
.register-btn {
  padding: 12px;
  border-radius: 12px;
  border: none;

  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  font-weight: 600;

  cursor: pointer;
  transition: 0.2s;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

/* SWITCH LOGIN */
.not-log {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  opacity: 0.9;
}

.not-log p {
  color: black;
}

.login-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.35);
  color: white;
}

.login-btn:hover {
  background: rgba(0, 0, 0, 0.25);
}

/* ERROR / SUCCESS */
.error {
  background: rgba(255, 0, 0, 0.15);
  padding: 10px;
  border-radius: 10px;
  color: #ffb3b3;
  text-align: center;
}

.success {
  background: rgba(0, 255, 150, 0, 0.15);
  padding: 10px;
  border-radius: 10px;
  color: #8affc1;
  text-align: center;
}

/* MOBILE */
@media (max-width: 768px) {
  .login-card {
    width: 92%;
    padding: 25px;
  }
}
</style>
