<template>
  <div class="details-page" v-if="arrangement">
    <div class="container">
      <!-- TOP TEXT -->
      <div class="top-text">
        <h1>{{ arrangement.arr_title }}</h1>
        <p class="location">{{ arrangement.des_name }}, {{ arrangement.des_country }}</p>
      </div>

      <!-- HERO IMAGE -->
      <div class="hero">
        <img :src="imageUrl + arrangement.image" class="hero-img" />

        <div class="hero-overlay">
          <h2>{{ arrangement.des_name }}</h2>
          <p>{{ arrangement.des_country }}</p>
        </div>
      </div>

      <!-- DESCRIPTION + BOOK -->
      <div class="content">
        <div class="description">
          <h2>About this trip</h2>
          <p>{{ arrangement.arr_description }}</p>
        </div>

        <div class="booking-card">
          <h3>{{ arrangement.arr_price }}€</h3>
          <p>{{ arrangement.arr_duration_days }} days</p>
          <p>{{ arrangement.arr_capacity }} people</p>

          <button class="book-btn">Book now</button>
        </div>
      </div>

      <!-- ACCOMMODATIONS -->
      <div class="accommodations">
        <h2>Available Hotels</h2>

        <div class="acc-grid">
          <div v-for="acc in accommodations" :key="acc.acc_id" class="acc-card">
            <img :src="imageUrl + acc.image" class="acc-img" />

            <div class="acc-info">
              <h3>{{ acc.acc_name }}</h3>
              <div class="stars">
                <span v-for="n in 5" :key="n">
                  {{ n <= acc.acc_stars ? '⭐' : '☆' }}
                </span>
              </div>

              <div class="rooms">
                <div v-for="room in acc.rooms" :key="room.rom_id" class="room">
                  <p>{{ room.rom_type }}</p>
                  <p>{{ room.rom_price_per_night }}€/night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
import { imageUrl } from '@/api/config'

const route = useRoute()

type Room = {
  rom_id: number
  rom_type: string
  rom_price_per_night: number
  rom_capacity: number
}

type Accommodation = {
  acc_id: number
  acc_name: string
  acc_stars: number
  image: string
  rooms: Room[]
}

type Arrangement = {
  arr_id: number
  des_id: number
  des_name: string
  des_description: string
  des_country: string
  cat_id: number
  cat_name: string
  arr_title: string
  arr_description: string
  arr_price: number
  arr_capacity: number
  arr_duration_days: number
  arr_available_from: string
  arr_available_to: string
  arr_createdat: string
  image: string
}

const arrangement = ref<Arrangement | null>(null)
const accommodations = ref<Accommodation[]>([])

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.getArrangementDetails(id)

    arrangement.value = res.data.data.arrangement
    accommodations.value = res.data.data.accommodations
  } catch (err) {
    console.error('API ERROR:', err)
  }
})
</script>

<style scoped>
.details-page {
  padding-top: 320px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1300px;
}

/* TOP TEXT */
.top-text {
  text-align: center;
  margin-bottom: 210px;
}

.top-text h1 {
  font-size: 36px;
  font-weight: 700;
}

.location {
  color: #777;
  margin-top: 5px;
}

/* HERO */
.hero {
  position: relative;
  height: 500px;
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

/* OVERLAY */
.hero-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);

  padding: 15px 20px;
  border-radius: 12px;
  color: white;
}

/* CONTENT */
.content {
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
}

.description {
  flex: 2;
}

.booking-card {
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 16px;
  height: fit-content;
}

.book-btn {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  border: none;
  background: #705519;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.book-btn:hover {
  background: #8a6b1f;
}

/* ACCOMMODATIONS */
.accommodations h2 {
  margin-bottom: 20px;
}

.acc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 100px;
}

.acc-card {
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: row;

  background: #f9f9f9;
  border-radius: 14px;
  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0, 0.08);
  transition: 0.3s;
  cursor: pointer;
}

.acc-card:hover {
  transform: translateY(-4px);
}

.acc-img {
  width: 40%;
  height: 100%;
  object-fit: cover;
}

.acc-info {
  width: 60%;
  padding: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.acc-info h3 {
  margin: 0;
  font-size: 16px;
}

.room {
  padding: 4px 0;
  background: transparent;
}
</style>
