<template>
  <div class="details-page">
    <div class="container">
      <section class="intro" v-if="destination">
        <h1 class="title">
          Discover <strong style="color: #705519">{{ destination.des_name }}</strong>
        </h1>

        <p class="subtitle">
          Explore the beauty, culture and unique experiences of
          {{ destination.des_name }} in {{ destination.des_country }}. From luxury stays to
          unforgettable adventures, everything you need is right here.
        </p>
      </section>

      <section class="hero" v-if="destination">
        <img v-if="destination.image" :src="imageUrl + destination.image" class="hero-img" />
        <div class="hero-overlay">
          <h2>{{ destination.des_name }}</h2>
          <p>{{ destination.des_country }}</p>
        </div>
      </section>

      <section class="about" v-if="destination">
        <p style="text-align: center; padding-bottom: 30px">{{ destination.des_description }}</p>
      </section>

      <div class="divider-with-text">
        <span>Available arrangements</span>
      </div>

      <section class="section">
        <div class="arr-grid" v-if="arrangements.length">
          <div
            class="arr-card"
            v-for="arr in arrangements"
            :key="arr.arr_id"
            @click="goToDetails(arr.arr_id)"
          >
            <div class="arr-image">
              <img :src="imageUrl + arr.image" />

              <div class="arr-hover">
                <span>View More</span>
              </div>

              <div class="arr-overlay">
                <h3>{{ arr.arr_title }}</h3>
                <p>{{ arr.cat_name }}</p>
                <div class="price">{{ arr.arr_price }} €</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 style="color: #888; text-align: center">No arrangements available!</h1>
        </div>
      </section>

      <div class="divider-with-text">
        <span>Hotels & Accommodations</span>
      </div>

      <section class="section">
        <div class="hotel-grid" v-if="accommodations.length">
          <div
            class="hotel-card"
            v-for="acc in accommodations"
            :key="acc.acc_id"
            @click="goToDetailsAcc(acc.acc_id)"
          >
            <img :src="imageUrl + acc.image" />

            <!-- hover -->
            <div class="hotel-hover">
              <span>Book now</span>
            </div>

            <!-- bottom info -->
            <div class="hotel-overlay">
              <h3>{{ acc.acc_name }}</h3>

              <div class="stars">
                <span v-for="n in acc.acc_stars" :key="n">★</span>
              </div>

              <div class="price" v-for="room in acc.rooms" :key="room.rom_id">
                from {{ room.rom_price_per_night }} €
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 style="color: #888; text-align: center">No accommodations available!</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
import { imageUrl } from '@/api/config'

import { useRouter } from 'vue-router'

const router = useRouter()

function goToDetails(id: number) {
  router.push({
    name: 'arrangement-details',
    params: { id },
  })
}

function goToDetailsAcc(id: number) {
  router.push({
    name: 'accomodation-details',
    params: { id },
  })
}

const route = useRoute()

type Destination = {
  des_id: number
  des_name: string
  des_country: string
  des_description: string
  image: string
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

type Room = {
  rom_id: number
  rom_type: string
  rom_price_per_night: number
  rom_capacity: number
  image: string
}

type Accommodation = {
  acc_id: number
  acc_name: string
  acc_type: string
  acc_stars: number
  acc_description: string
  image: string
  rooms: Room[]
}

const destination = ref<Destination | null>(null)
const arrangements = ref<Arrangement[]>([])
const accommodations = ref<Accommodation[]>([])

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.getDestinationDetails(id)

    destination.value = res.data.data.destination
    arrangements.value = res.data.data.arrangements
    accommodations.value = res.data.data.accommodations
  } catch (err) {
    console.error('API ERROR:', err)
  }
})
</script>

<style scoped>
.details-page {
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-top: 310px;
}

.container {
  width: 100%;
  max-width: 1300px;
}

.hero {
  position: relative;
  height: 600px;
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.arr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 40px;
  justify-content: center;
}

.arr-hover {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: 0.3s;
}

.arr-hover span {
  color: white;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

.arr-card:hover .arr-hover {
  opacity: 1;
}

.arr-card {
  width: 220px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e5e5;
  transition: 0.2s;
  cursor: pointer;
}

.arr-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0, 0.15);
}

.arr-image {
  position: relative;
  width: 100%;
  height: 300px;
}

.arr-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.75);
}

.arr-overlay {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
}

.arr-overlay h3 {
  font-size: 16px;
  margin-bottom: 4px;
}

.arr-overlay p {
  font-size: 12px;
  opacity: 0.9;
}

.price {
  margin-top: 6px;
  font-weight: bold;
  color: #ffd369;
}

.arr-body {
  padding: 10px;
  font-size: 12px;
  color: #666;
  height: 70px;
  overflow: hidden;
}

.intro {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 46px;
  font-weight: 700;
  opacity: 0.8;
}

.subtitle {
  max-width: 750px;
  margin: 10px auto 0;
  color: #666;
  line-height: 1.6;
  margin-bottom: 200px;
}

.section {
  margin-top: 30px;
  margin-bottom: 100px;
}

.card {
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 10px;
}

.hotel {
  padding: 15px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  border-radius: 10px;
}

.rooms {
  margin-top: 10px;
}

.room {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.loading {
  text-align: center;
  padding: 50px;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 40px;
  justify-content: center;
}

.hotel-card {
  position: relative;
  width: 220px;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.hotel-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.hotel-overlay {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  padding: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
}

.hotel-overlay h3 {
  margin: 0;
  font-size: 16px;
}

.stars {
  color: #ffd369;
  font-size: 14px;
  letter-spacing: 2px;
}

.price {
  font-size: 15px;
  font-weight: bold;
}

.hotel-hover {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: 0.3s;
}

.hotel-hover span {
  color: white;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

.hotel-card:hover .hotel-hover {
  opacity: 1;
}

.hotel-card:hover img {
  transform: scale(1.05);
}
section h2 {
  text-align: center;
  margin-bottom: 20px;
}

.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 60px 0;
}

.divider-with-text::before,
.divider-with-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
}

.divider-with-text span {
  padding: 0 15px;
  color: #888;
  font-size: 30px;
}

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
</style>
