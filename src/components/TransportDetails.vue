<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { imageUrl } from '@/api/config'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

function goToDetails(id: number) {
  router.push({
    name: 'arrangement-details',
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
  tra_id: number
  tra_type: string
  tra_departure_location: string
  tra_arrival_location: string
  tra_departure_time: Date
  tra_arrival_time: Date
}

const transportArragnements = ref<Arrangement[]>([])

async function getTransportArr() {
  try {
    const res = await api.getTransportArrangements(id)
    transportArragnements.value = res.data.data
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getTransportArr()
})
</script>

<template>
  <div class="details-page" v-if="transportArragnements.length">
    <div class="container">
      <!-- TOP SECTION -->
      <section class="hero-section">
        <span class="mini-title">Travel by {{ transportArragnements[0]?.tra_type }}</span>

        <h1>
          Explore Amazing Trips
          <span>Across The World</span>
        </h1>

        <p>
          Choose your perfect journey and travel comfortably by
          {{ transportArragnements[0]?.tra_type }}. Discover unforgettable destinations, premium
          accommodations and experiences made for every traveler.
        </p>
      </section>

      <!-- ARRANGEMENTS -->
      <div class="card-grid">
        <div
          class="arr-card"
          v-for="tra in transportArragnements"
          :key="tra.arr_id"
          @click="goToDetails(tra.arr_id)"
        >
          <!-- IMAGE -->
          <div class="card-image">
            <img :src="imageUrl + tra.image" />

            <div class="card-badge">Travel by {{ tra.tra_type }}</div>
          </div>

          <!-- CONTENT -->
          <div class="card-content">
            <div class="card-top">
              <h2>{{ tra.arr_title }}</h2>

              <span class="price"> €{{ tra.arr_price }} </span>
            </div>

            <p class="description">
              {{ tra.arr_description }}
            </p>

            <!-- INFO -->
            <div class="info-grid">
              <div class="info-box">
                <span>Departure</span>
                <strong>{{ tra.tra_departure_location }}</strong>
              </div>

              <div class="info-box">
                <span>Arrival</span>
                <strong>{{ tra.tra_arrival_location }}</strong>
              </div>

              <div class="info-box">
                <span>Departure time</span>
                <strong>{{ tra.tra_departure_time }}</strong>
              </div>

              <div class="info-box">
                <span>Arrival time</span>
                <strong>{{ tra.tra_arrival_time }}</strong>
              </div>
            </div>

            <!-- BUTTON -->
            <button class="details-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  padding-top: 210px;
  padding-bottom: 50px;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1300px;
  margin: auto;
  padding: 0 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 100px;
}

.mini-title {
  display: inline-block;
  padding: 10px 20px;
  background: rgba(112, 85, 25, 0.1);
  color: #705519;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 25px;
}

.hero-section h1 {
  font-size: 50px;
  line-height: 1.1;
  margin-bottom: 25px;
  color: #111;
  font-weight: 800;
}

.hero-section h1 span {
  display: block;
  color: #705519;
}

.hero-section p {
  max-width: 800px;
  margin: auto;
  font-size: 16px;
  color: #666;
  line-height: 1.8;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 340px));
  justify-content: center;
  gap: 28px;
}

/* CARD */

.arr-card {
  position: relative;
  background: white;
  border-radius: 30px;
  overflow: hidden;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: 0.35s ease;

  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-top: 50px;
}

/* one side circle */
.arr-card::before {
  content: '';
  position: absolute;

  width: 34px;
  height: 34px;

  background: #f5f5f5;

  border-radius: 50%;

  left: -17px;
  top: 58%;
  z-index: 5;
}

/* second side circle */
.arr-card::after {
  content: '';
  position: absolute;

  width: 34px;
  height: 34px;

  background: #f5f5f5;

  border-radius: 50%;

  right: -17px;
  top: 58%;
  z-index: 5;
}

.arr-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

/* IMAGE */

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s ease;
}

.arr-card:hover img {
  transform: scale(1.06);
}

/* dashed line like airplane ticket */

.card-content {
  position: relative;
  padding: 22px;
}

.card-content::before {
  content: '';
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;

  border-top: 2px dashed rgba(0, 0, 0, 0.12);
}

/* BADGE */

.card-badge {
  position: absolute;
  top: 14px;
  left: 14px;

  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);

  padding: 7px 14px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 700;
  color: #705519;
}

/* CONTENT */

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
  margin-bottom: 14px;
}

.card-top h2 {
  font-size: 21px;
  color: #111;
  line-height: 1.3;
}

.price {
  color: #705519;
  font-size: 22px;
  font-weight: 800;
  white-space: nowrap;
}

.description {
  color: #666;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 22px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* INFO */

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 22px;
}

.info-box {
  background: #fafafa;
  padding: 12px;
  border-radius: 16px;
}

.info-box span {
  display: block;
  font-size: 11px;
  color: #888;
  margin-bottom: 5px;
}

.info-box strong {
  color: #111;
  font-size: 13px;
}

/* BUTTON */

.details-btn {
  width: 100%;
  height: 42px;

  border: none;
  border-radius: 14px;

  background: #705519;
  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s ease;
}

.details-btn:hover {
  background: #5b4514;
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 42px;
  }

  .hero-section p {
    font-size: 16px;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .card-top {
    flex-direction: column;
  }
}
</style>
