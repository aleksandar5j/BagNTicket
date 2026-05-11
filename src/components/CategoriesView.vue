<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/api'

import { imageUrl } from '@/api/config'

const route = useRoute()
const router = useRouter()

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
}

const arrangements = ref<Arrangement[]>([])

async function getDestinations() {
  if (!route.params.id) return

  try {
    const res = await api.filterArrByCat(Number(route.params.id))
    arrangements.value = res.data.data
  } catch (err) {
    console.log(err)
  }
}

const categoryName = computed(() => {
  return arrangements.value[0]?.cat_name || ''
})

onMounted(getDestinations)

watch(
  () => route.params.id,
  () => getDestinations(),
)
</script>

<template>
  <div class="page">
    <section class="arrangements">
      <div class="title-block">
        <h2>
          Explore <span>{{ categoryName }}</span>
        </h2>
        <p>Find the best travel deals, hand-picked just for you</p>
      </div>

      <div class="grid" v-if="arrangements.length">
        <div
          class="card"
          v-for="arr in arrangements"
          :key="arr.arr_id"
          @click="goToDetails(arr.arr_id)"
        >
          <img v-if="arr.image" :src="imageUrl + arr.image" />
          <div v-else class="no-img">No image</div>

          <div class="arr-overlay">
            <div class="title">
              <h3>{{ arr.arr_title }}</h3>
            </div>

            <div class="price">{{ arr.arr_price }} €</div>
            <span>{{ arr.arr_duration_days }} days</span>
          </div>

          <!-- OVERLAY -->
          <div class="overlay">
            <span>Book now</span>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>No result</h1>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 330px;
  margin-bottom: 50px;
}

.arrangements {
  text-align: center;
}

.arrangements h2 {
  font-size: 42px;
  opacity: 0.8;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
}

.card {
  width: 240px;
  height: 320px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
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

.no-img {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* INFO (dole) */
.info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;

  display: flex;
  justify-content: space-between;

  background: rgba(0, 0, 0, 0.6);
  color: #fff;

  padding: 6px 10px;
  border-radius: 8px;
  font-size: 13px;
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

.overlay span {
  padding: 15px 20px;
  border-radius: 30px;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  color: #fff;
}

.card:hover .overlay {
  opacity: 1;
}

.title-block {
  margin-bottom: 60px;
}

.title-block h2 {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #111;
}

.title-block h2 span {
  color: #705519;
  position: relative;
}

/* underline efekat */
.title-block h2 span::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;

  width: 100%;
  height: 3px;
  background: #7a5910;
  border-radius: 2px;
}

.title-block p {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
  margin-bottom: 200px;
}

.arr-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  padding-bottom: 20px;
  backdrop-filter: blur(8px);

  padding: 18px;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5), transparent);

  display: flex;
  flex-direction: column;
  gap: 6px;

  text-align: left;

  color: #fff;
}

.arr-overlay .title h3 {
  font-size: 16px;
  font-weight: 600;

  display: inline-block;
  border-radius: 20px;
}

.arr-overlay .price {
  color: #ddba6f;
}
</style>
