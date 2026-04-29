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
      </section>

      <section class="about" v-if="destination">
        <p style="text-align: center; padding-bottom: 30px">{{ destination.des_description }}</p>
      </section>

      <section class="section">
        <h2>Available Arrangements</h2>

        <div class="arr-grid" v-if="arrangements.length">
          <div class="arr-card" v-for="arr in arrangements" :key="arr.arr_id">
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
      </section>

      <section class="section">
        <h2>Hotels & Accommodations</h2>

        <div class="hotel-grid" v-if="accommodations.length">
          <div class="hotel-card" v-for="acc in accommodations" :key="acc.acc_id">
            <h3>{{ acc.acc_name }}</h3>
            <p>{{ acc.acc_description }}</p>

            <div class="rooms-grid">
              <div class="room-card" v-for="room in acc.rooms" :key="room.rom_id">
                <div>{{ room.rom_type }}</div>
                <strong>{{ room.rom_price_per_night }} €</strong>
              </div>
            </div>
          </div>
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
}

type Accommodation = {
  acc_id: number
  acc_name: string
  acc_type: string
  acc_stars: number
  acc_description: string
  rooms: Room[]
}

const destination = ref<Destination | null>(null)
const arrangements = ref<Arrangement[]>([])
const accommodations = ref<Accommodation[]>([])

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.getDestinationDetails(id)

    console.log('FULL RES:', res)
    console.log('RES.DATA:', res.data)
    console.log('RES.DATA.DATA:', res.data.data)

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
  margin-bottom: 30px;
}

.hero-img {
  width: 100%;
  height: 500px;
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

.rooms-grid {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  gap: 10px;
  justify-content: start;
}

.room-card {
  width: 140px;
  height: 120px;
  padding: 10px;
  border-radius: 10px;
  background: #f6f6f6;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-card {
  transition: 0.2s;
}

.room-card:hover {
  transform: translateY(-3px);
  background: #eee;
}

.room-card strong {
  color: #2c7be5;
}

section h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
