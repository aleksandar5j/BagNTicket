<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page">
    <form class="login-card" @submit.prevent="userLogin">
      <h1>Welcome back</h1>
      <p class="subtitle">Login to your agendly</p>

      <div class="form-group">
        <div class="input-wrap">
          <span>
            <img src="/public/images/userforlogin.png" />
          </span>
          <input type="text" v-model="username" placeholder="Username" required />
        </div>
      </div>

      <div class="form-group">
        <div class="input-wrap">
          <span>
            <img src="/public/images/padlock.png" />
          </span>

          <input
            :type="showPass ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
          />

          <button type="button" class="show" @click="showPass = !showPass">👁</button>
        </div>
      </div>

      <button type="submit" class="login-btn">Login</button>

      <div class="not-reg">
        <p>You don't have an account?</p>
        <button class="register-btn" @click="backToRegister">Register</button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/sessionUser'
import { useRouter } from 'vue-router'

const session = useSessionStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPass = ref(false)

const errorMsg = ref('')
const successMsg = ref('')

function backToRegister() {
  router.push('/register')
}

const userLogin = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  try {
    await session.login({
      username: username.value,
      password: password.value,
    })

    successMsg.value = 'Login successful!'
    router.push('/')
  } catch (err) {
    errorMsg.value = 'Wrong username or password'
    console.log(err)
  }
}
</script>

<style scoped>
/* PAGE */
.login-page {
  position: relative;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
}

/* CARD */
.login-card {
  width: 400px;
  padding: 40px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(22px);

  border: 1px solid rgba(255, 255, 255, 0.15);

  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);

  display: flex;
  flex-direction: column;
  gap: 16px;

  color: white;
  z-index: 2;
  transition: 0.3s ease;
}

.login-card:hover {
  transform: translateY(-3px);
}

.login-card h1 {
  text-align: center;
  margin: 0;
}

.subtitle {
  text-align: center;
  opacity: 0.7;
  font-size: 14px;
}

/* INPUTS */
.form-group {
  display: flex;
  flex-direction: column;
}

.input-wrap {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 0 12px;
  transition: 0.2s;
}

.input-wrap:focus-within {
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.4);
  transform: scale(1.02);
}

.input-wrap span img {
  height: 16px;
}

.input-wrap input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px;
  background: transparent;
  color: #222;
}

/* PASSWORD BUTTON */
.show {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* BUTTON */
.login-btn {
  padding: 12px;
  border-radius: 12px;
  border: none;

  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

/* REGISTER */
.not-reg {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-btn {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  background: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
}

/* MESSAGES */
.error {
  background: rgba(255, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
  color: #ffb3b3;
  text-align: center;
}

.success {
  background: rgba(0, 255, 150, 0.2);
  padding: 10px;
  border-radius: 10px;
  color: #8affc1;
  text-align: center;
}

/* MOBILE */
@media (max-width: 768px) {
  .login-card {
    width: 90%;
    padding: 25px;
  }
}
</style>
