<script setup lang="ts"></script>

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

          <div class="auth">
            <router-link to="/login">Login</router-link>
            <router-link to="/signup">Register</router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="main-nav">
      <div class="container nav-inner">
        <nav class="nav">
          <router-link to="/destinations">Destinations</router-link>
          <router-link to="/categories">Categories</router-link>
          <router-link to="/offers">Offers</router-link>
          <router-link to="/accommodations">Hotels</router-link>
          <router-link to="/transport">Transport</router-link>
          <router-link to="/favorites">Favorites</router-link>
          <router-link to="/bookings">Bookings</router-link>
        </nav>
      </div>
    </div>

    <main class="content">
      <router-view />
    </main>
  </div>
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

.header,
.main-nav,
.content {
  position: relative;
  z-index: 2;
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
  border: 1px solid #fff;
}

.auth a:last-child {
  background: #1e66ff;
  color: #fff;
  border: 1px solid #1e66ff;
}

.auth a:hover {
  transform: translateY(-2px);
}

.auth a:first-child:hover {
  background: transparent;
  color: #fff;
  border-color: #fff;
}

.auth a:last-child:hover {
  background: #0f4de0;
  border-color: #0f4de0;
}
</style>
