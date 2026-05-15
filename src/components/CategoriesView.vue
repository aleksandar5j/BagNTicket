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

function getPrice(arr: Arrangement) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const discount = (arr as any).arr_discount || 0
  return Math.round(arr.arr_price * (1 - discount / 100))
}
function hasDiscount(arr: Arrangement) {
  return (arr as any).arr_discount > 0
}
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
          <div v-if="arr.arr_discount" class="badge">-{{ arr.arr_discount }}%</div>
          <img v-if="arr.image" :src="imageUrl + arr.image" />
          <div v-else class="no-img">No image</div>

          <div class="arr-overlay">
            <div class="title">
              <h3>{{ arr.arr_title }}</h3>
            </div>

            <div class="price">
              <span v-if="hasDiscount(arr)" class="old"> {{ arr.arr_price }}€ </span>

              <span class="new"> {{ getPrice(arr) }}€ </span>
            </div>
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

@media (max-width: 900px) {
  /* PAGE */
  .page {
    padding-top: 140px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .arrangements h2 {
    font-size: 24px;
  }

  /* TITLE BLOCK */
  .title-block {
    margin-bottom: 40px;
  }

  .title-block h2 {
    font-size: 26px;
    line-height: 1.3;
  }

  .title-block p {
    font-size: 13px;
    margin-bottom: 60px;
  }

  /* GRID → MOBILE */
  .grid {
    gap: 12px;
  }

  /* CARD SIZE → MOBILE FRIENDLY */
  .card {
    width: 48%;
    height: 220px;
    border-radius: 14px;
  }

  /* 1 column on very small screens */
  @media (max-width: 500px) {
    .card {
      width: 100%;
      height: 240px;
    }
  }

  /* LABEL */
  .label {
    font-size: 11px;
    padding: 4px 8px;
  }

  /* INFO BAR */
  .info {
    font-size: 11px;
    padding: 5px 8px;
    bottom: 8px;
    left: 8px;
    right: 8px;
  }

  /* OVERLAY → NO HOVER ON MOBILE */
  .overlay {
    opacity: 0;
  }

  .card:active .overlay {
    opacity: 1;
  }

  .overlay span {
    font-size: 14px;
    padding: 10px 14px;
  }

  .card:hover {
    transform: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .card:hover img {
    transform: none;
  }

  .card img {
    object-fit: cover;
  }

  .arr-overlay {
    padding: 12px;
    gap: 4px;
  }

  .arr-overlay .title h3 {
    font-size: 13px;
  }

  .arr-overlay .price {
    font-size: 12px;
  }
}

.price {
  display: flex;
  gap: 10px;
  align-items: center;
}

.old {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.new {
  color: #ddba6f;
  font-weight: bold;
  font-size: 16px;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;

  background: #ddba6f;
  color: white;

  padding: 5px 10px;
  border-radius: 20px;

  font-size: 12px;
  font-weight: bold;
}
</style>
