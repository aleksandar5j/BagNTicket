<script setup lang="ts">
import { imageUrl } from '@/api/config'
import api from '@/api'
import { ref, onMounted } from 'vue'

type Arrangement = {
  arr_id: number
  des_id: number
  cat_id: number
  arr_title: string
  arr_description: string
  arr_price: number
  arr_capacity: number
  arr_duration_days: number
  arr_available_from: Date
  arr_available_to: Date
  arr_createdat: Date
  image: string
  cat_name: string
}

const lastMinuteDeals = ref<Arrangement[]>([])

async function getLastMinDeals() {
  try {
    const res = await api.lastMinuteDeals()
    lastMinuteDeals.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

type Destination = { des_id: number; des_name: string; des_country: string; image: string }

const popularDestinations = ref<Destination[]>([])

async function getPopDes() {
  try {
    const res = await api.popularDest()
    popularDestinations.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getPopDes()
  getLastMinDeals()
})
</script>

<template>
  <div class="home">
    <section class="about">
      <div class="about-content">
        <h1>We Create Unforgettable Travel Experiences</h1>

        <h2>Discover. Explore. Enjoy.</h2>

        <p>
          We are a modern travel agency specializing in tailor-made journeys, luxury vacations, and
          unforgettable adventures across the world.
        </p>

        <p class="sub">
          From tropical beaches to iconic cities, we connect you with the best destinations,
          hand-picked hotels, and exclusive travel deals — all in one place.
        </p>
      </div>
    </section>

    <section class="hero">
      <div class="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Find the best destinations, hotels and travel deals worldwide</p>

        <div class="search-box">
          <input type="text" placeholder="Where do you want to go?" />
          <button>Search</button>
        </div>
      </div>
    </section>

    <section class="featured">
      <h2>Popular Destinations</h2>

      <div class="grid">
        <div class="card" v-for="dest in popularDestinations" :key="dest.des_id">
          <img v-if="dest.image" :src="imageUrl + dest.image" />
          <div v-else class="no-img">No image</div>

          <div class="label">
            {{ dest.des_name }}
          </div>

          <div class="overlay">
            <span>Explore</span>
          </div>
        </div>
      </div>
    </section>

    <!-- LAST MINUTE DEALS -->
    <section class="deals">
      <h2>Last Minute Deals</h2>

      <div class="grid">
        <div class="card" v-for="arr in lastMinuteDeals" :key="arr.arr_id">
          <img v-if="arr.image" :src="imageUrl + arr.image" />
          <div v-else class="no-img">No image</div>

          <div class="label">
            {{ arr.arr_title }}
          </div>

          <div class="overlay">
            <span>Explore</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.hero-content {
  max-width: 700px;
  margin-top: -100px;
}

.hero-content h1 {
  font-size: 42px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.hero-content p {
  color: #555;
  margin-bottom: 25px;
}

/* SEARCH */
.search-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-box input {
  width: 300px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
}

.search-box button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background: #1e66ff;
  color: #fff;
  cursor: pointer;
}

.featured {
  text-align: center;
  padding: 60px 20px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
}

.card {
  width: 200px;
  height: 300px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover img {
  transform: scale(1.1);
}

.card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

/* LABEL */
.label {
  position: absolute;
  top: 10px;
  left: 10px;

  background: rgba(0, 0, 0, 0.6);
  color: #fff;

  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: 600;

  opacity: 0;
  transition: 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}

.no-img {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ABOUT */
.about {
  padding: 80px 20px 40px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about h1 {
  font-size: 38px;
  margin-bottom: 15px;
  color: #111;
}

.about p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

/* HERO */
.hero {
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.hero-content {
  max-width: 700px;
}

.hero-content h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.hero-content p {
  color: #555;
  margin-bottom: 25px;
}

/* SEARCH */
.search-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-box input {
  width: 300px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
}

.search-box button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background: #1e66ff;
  color: #fff;
  cursor: pointer;
}

/* SECTIONS */
.featured,
.deals {
  text-align: center;
  padding: 60px 20px;
}

.featured h2,
.deals h2 {
  margin-bottom: 30px;
  font-size: 28px;
}

.about {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.about h1 {
  font-size: 54px;
  font-weight: 800;
  line-height: 1.1;
  color: #111;
  opacity: 0.9;
  margin-bottom: 25px;
}

.about h2 {
  font-size: 28px;
  font-weight: bold;
  color: #705519;
  margin-bottom: 25px;
  letter-spacing: 1px;
}

.about p {
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 15px;
}

.about p.sub {
  font-size: 16px;
  color: #777;
  max-width: 750px;
  margin: 0 auto;
}
</style>
