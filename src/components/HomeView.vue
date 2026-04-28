<script setup lang="ts">
import { imageUrl } from '@/api/config'
import api from '@/api'
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function goToDetails(id: number) {
  router.push({
    name: 'destinations-details',
    params: { id },
  })
}

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

    <section class="featured">
      <h2>Popular Destinations</h2>

      <div class="featured-grid">
        <div
          class="card-modern"
          :class="{ big: index === 0 }"
          v-for="(dest, index) in popularDestinations"
          :key="dest.des_id"
          @click="goToDetails(dest.des_id)"
        >
          <img v-if="dest.image" :src="imageUrl + dest.image" />
          <div v-else class="no-img">No image</div>

          <div class="card-title">
            {{ dest.des_name }}
          </div>

          <div class="card-overlay" @click.stop="goToDetails(dest.des_id)">
            <span>Explore</span>
          </div>
        </div>
      </div>
    </section>

    <!-- LAST MINUTE DEALS -->
    <section class="deals">
      <h2>Last Minute Offers</h2>

      <div class="deals-grid">
        <div
          class="card-modern"
          :class="{ big: index === 0 }"
          v-for="(arr, index) in lastMinuteDeals"
          :key="arr.arr_id"
        >
          <img v-if="arr.image" :src="imageUrl + arr.image" />
          <div v-else class="no-img">No image</div>

          <div class="card-title">
            {{ arr.arr_title }}
          </div>

          <div class="card-badge">{{ arr.arr_price }}€</div>

          <div class="card-overlay">
            <span>Book now</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 280px;
}

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

.deals-grid,
.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
}

.deals-grid {
  grid-auto-rows: 250px;
}

.featured-grid {
  grid-auto-rows: 220px;
}

/* BIG CARD (ZA OBA) */
.big {
  grid-column: span 2;
  grid-row: span 2;
}

/* ========================= */
/* UNIVERSAL CARD */
/* ========================= */

.card-modern {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card-modern img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease;
}

.card-modern:hover img {
  transform: scale(1.1);
}

.card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

/* GRADIENT */
.card-modern::after {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), transparent);
}

/* TITLE (DOLE) */
.card-title {
  position: absolute;
  bottom: 15px;
  left: 15px;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);

  color: #fff;
  font-size: 16px;
  font-weight: 600;

  padding: 6px 12px;
  border-radius: 10px;

  z-index: 2;

  transition: 0.3s ease;
}

/* PRICE BADGE */
.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;

  background: #88342f;
  color: #fff;

  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;

  z-index: 2;
}

.card-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: 0.3s ease;

  backdrop-filter: blur(6px);

  background: rgba(0, 0, 0, 0.25);
}

.card-overlay span {
  background: rgba(250, 250, 250, 0.15);
  backdrop-filter: blur(5px);

  color: #fff;
  font-size: 18px;
  font-weight: 600;

  padding: 10px 20px;
  border-radius: 30px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  transition: 0.3s ease;
}

.card-modern:hover .card-overlay span {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.25);
}

.card-modern:hover .card-overlay {
  opacity: 1;
}

.card-modern:hover .card-title {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

/* NO IMAGE */
.no-img {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.about h1 {
  font-size: 56px;
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
}

.about p {
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 15px;
  margin-top: 150px;
}

.about p.sub {
  font-size: 16px;
  color: #777;
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 80px;
}
</style>
