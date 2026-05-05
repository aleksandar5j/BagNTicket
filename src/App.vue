<script setup lang="ts">
import api from './api'
import { ref, onMounted } from 'vue'

import { useSessionStore } from './stores/sessionUser'

const session = useSessionStore()

type Category = {
  cat_id: number
  cat_name: string
  cat_description: string
}

const categories = ref<Category[]>([])

async function getCategories() {
  try {
    const res = await api.getCategories()
    categories.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getCategories()
})

const isOpen = ref(false)
</script>

<template>
  <div class="app">
    <div class="hero-bg"></div>

    <header class="header">
      <div class="top-bar">
        <div class="container top-inner">
          <div class="logo">
            <router-link to="/"><img src="/src/components/bagnticket.png" /></router-link>
          </div>

          <div class="social">
            <a href="#"><img src="/src/videos-images/contacts/gmail.webp" /></a>
            <a href="#"><img src="/src/videos-images/contacts/facebook.png" /></a>
            <a href="#"><img src="/src/videos-images/contacts/instagram.webp" /></a>
            <a href="#"><img src="/src/videos-images/contacts/tiktok.webp" /></a>
            <a href="#"><img src="/src/videos-images/contacts/viber.png" /></a>
            <a href="#"><img src="/src/videos-images/contacts/whatsapp.png" /></a>
          </div>

          <div class="auth" v-if="!session.isLoggedIn">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </div>
          <div class="authh" v-else>
            <router-link to="/" @click="session.logout" class="logout">Log Out</router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="main-nav">
      <div class="container nav-inner">
        <nav class="nav">
          <router-link to="/destinations">Destinations</router-link>
          <div class="dropdown">
            <span class="dropbtn" @click="isOpen = !isOpen"> Categories ▾ </span>

            <div class="dropdown-content" :class="{ open: isOpen }">
              <router-link
                v-for="cat in categories"
                :key="cat.cat_id"
                :to="`/categories/${cat.cat_id}`"
                @click="isOpen = false"
              >
                {{ cat.cat_name }}
              </router-link>
            </div>
          </div>
          <router-link to="/offers">Offers</router-link>
          <router-link to="/hotels">Hotels</router-link>
          <router-link to="/favorites" v-if="session.isLoggedIn">Favorites</router-link>
          <router-link to="/bookings" v-if="session.isLoggedIn">Bookings</router-link>
          <router-link to="/contact">Contact</router-link>
          <router-link to="/about">About Us</router-link>
        </nav>
      </div>
    </div>

    <main class="content">
      <router-view />
    </main>
  </div>

  <footer class="footer">
    <div class="footer-container">
      <!-- LOGO + ABOUT -->
      <div class="footer-section">
        <h2 class="logo">Bag n Ticket</h2>
        <p>
          Explore the world with us. We offer unforgettable journeys, premium accommodations and
          unique travel experiences.
        </p>
      </div>

      <!-- QUICK LINKS -->
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/destinations">Destinations</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>

      <!-- TOP DESTINATIONS -->
      <div class="footer-section">
        <h3>Top Destinations</h3>
        <ul>
          <li>Bali</li>
          <li>Paris</li>
          <li>Dubai</li>
          <li>Maldives</li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Contact</h3>
        <p>📍 Belgrade, Serbia</p>
        <p>📞 +381 60 123 4567</p>
        <p>📧 info@bagnticket.com</p>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="footer-bottom">
      <p>© 2026 BagnTicket. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.app {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 70vh;

  background: url('/src/videos-images/seasand.jpg') no-repeat center top;
  background-size: cover;

  filter: blur(6px);
  transform: scale(1.05);

  z-index: 0;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;

  background: inherit;
  filter: blur(20px);
  transform: scale(1.1);

  opacity: 0.6;
}

.hero-bg::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: 400px;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 40%,
    rgba(255, 255, 255, 5, 0.8) 70%,
    #ffffff 100%
  );

  pointer-events: none;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.main-nav {
  position: relative;
}

.dropdown-content {
  z-index: 100000;
}

.content {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(15px);
}

.top-bar {
  background: transparent;
  backdrop-filter: blur(5px);
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-inner {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  align-items: center;
}

.logo img {
  height: 45px;
  filter: brightness(1.1);
}

.social {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social a,
.auth a {
  color: #fff;
  margin-left: 12px;
  text-decoration: none;
  font-size: 14px;
}

.social img {
  height: 30px;
  margin-top: 5px;
}

.social img:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  transition: 0.2s;
}

.main-nav .container,
.top-bar .container {
  padding: 0;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
}

.nav-inner {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav {
  display: flex;
  gap: 35px;
  justify-content: center;
  align-items: center;
}

.nav a {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;

  opacity: 0.7;

  position: relative;
  position: relative;
}

.nav a.router-link-active {
  opacity: 1;
}

.nav a.router-link-active::after {
  width: 100%;
}

.nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;

  width: 0%;
  height: 2px;
  background: #111;

  transition: width 0.3s ease;
}

.nav a:hover::after {
  width: 100%;
}

.auth {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth a {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.auth a:first-child {
  background: #fff;
  color: #111;
  border: 2px solid #fff;
}

.auth a:last-child {
  background: #1e66ff;
  color: #fff;
  border: 2px solid #1e66ff;
}

.auth a:hover {
  transform: translateY(-1px);
}

.auth a:first-child:hover {
  background: transparent;
  color: #000000;
  border-color: #fff;
}

.auth a:last-child:hover {
  background: #0f4de0;
  border-color: #0f4de0;
}

.dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.dropbtn {
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  opacity: 0.7;
  padding: 5px 0;
  position: relative;
  transition: 0.2s;
}

.dropdown:hover .dropbtn {
  opacity: 1;
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;

  min-width: 210px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);

  border-radius: 14px;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;

  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);

  transition: all 0.2s ease;

  z-index: 2000;

  pointer-events: auto;
}

.dropdown-content.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-content a {
  padding: 12px 15px;
  text-decoration: none;
  color: #111;
  font-size: 14px;
  transition: 0.2s;
}

.dropdown-content a:hover {
  background: rgba(255, 255, 255, 0.4);
}

.footer {
  background: #705519;
  color: #ccc;
  padding: 60px 20px 20px;
  font-family: 'Poppins', sans-serif;
}

.footer-container {
  max-width: 1300px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  text-align: center;
}

.footer-section h2.logo {
  color: #fff;
  margin-bottom: 15px;
}

.footer-section h3 {
  color: #fff;
  margin-bottom: 15px;
}

.footer-section p {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #ccc;
  text-decoration: none;
  transition: 0.3s;
}

.footer-section ul li a:hover {
  color: #f5c542;
  padding-left: 5px;
}

/* bottom bar */
.footer-bottom {
  border-top: 1px solid #ebebeb;
  margin-top: 40px;
  padding-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #ffffff;
}

.authh {
  display: flex;
  align-items: center;
  gap: 10px;
}

.authh a {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.authh .logout {
  background: #912a2a;
  color: #ffffff;
}

.authh .logout:hover {
  background-color: rgb(136, 0, 0);
  transition: 0.2s;
}
</style>
