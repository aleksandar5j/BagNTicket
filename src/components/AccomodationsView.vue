<template>
  <div class="details-page">
    <div class="container">
      <h1 style="font-size: 50px">
        Find Your Perfect <strong style="color: #705519">Stay</strong>
      </h1>
      <p>
        Discover a wide selection of carefully chosen hotels, from luxury resorts to cozy city
        stays. Whether you're planning a relaxing getaway or an exciting trip, we have the perfect
        accommodation waiting for you.
      </p>

      <div class="filterSection">
        <!-- LEFT: SEARCH -->
        <div class="filter-left">
          <input type="text" v-model="searchHotels" class="search" placeholder="Search hotels..." />
        </div>

        <!-- RIGHT: FILTERS -->
        <div class="filter-right">
          <!-- CATEGORY -->
          <select v-model="stars">
            <option value="" disabled selected>Stars</option>

            <option v-for="star in uniqueStars" :key="star" :value="star">
              {{ '⭐'.repeat(Number(star)) }}
            </option>
          </select>

          <!-- PRICE -->
          <select v-model="type">
            <option value="">Type</option>
            <option v-for="type in uniqueTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>

          <button class="filter-btn" @click="filterHotels">Search</button>
          <button class="filter-resetbtn" @click="resetFilters">
            <img src="/public/images/reset.png" />
          </button>
        </div>
      </div>

      <section class="section">
        <div class="arr-grid" v-if="accommodations.length">
          <div
            class="arr-card"
            v-for="acc in accommodations"
            :key="acc.acc_id"
            @click="goToDetailsAcc(acc.acc_id)"
          >
            <div class="arr-image">
              <img :src="imageUrl + acc.image" />

              <div class="arr-hover">
                <span>View More</span>
              </div>

              <div class="arr-overlay">
                <div class="title">
                  <h3>{{ acc.acc_name }}</h3>
                </div>

                <div class="stars">
                  <img
                    v-for="n in 5"
                    :key="n"
                    :src="n <= acc.acc_stars ? '/images/star.png' : '/images/emptystar.png'"
                    class="star-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <h1 style="text-align: center">No result</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import { imageUrl } from '@/api/config'

import { useRouter } from 'vue-router'
const router = useRouter()

function goToDetailsAcc(id: number) {
  router.push({
    name: 'accomodation-details',
    params: { id },
  })
}

const searchHotels = ref('')
const stars = ref('')
const type = ref('')

type Accommodation = {
  acc_id: number
  acc_name: string
  acc_type: string
  acc_stars: number
  acc_description: string
  image: string
}

const uniqueStars = computed(() => {
  return [...new Set(allAccommodations.value.map((acc) => acc.acc_stars))]
})

const uniqueTypes = computed(() => {
  return [...new Set(allAccommodations.value.map((acc) => acc.acc_type))]
})

async function resetFilters() {
  searchHotels.value = ''
  stars.value = ''
  type.value = ''

  const res = await api.getAccommodations()
  accommodations.value = res.data.data
}

async function filterHotels() {
  try {
    const res = await api.filterAccommodations({
      acc_name: searchHotels.value,
      acc_stars: stars.value,
      acc_type: type.value,
    })

    accommodations.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

const allAccommodations = ref<Accommodation[]>([])
const accommodations = ref<Accommodation[]>([])

onMounted(async () => {
  try {
    const res = await api.getAccommodations()
    console.log(res.data)
    allAccommodations.value = res.data.data
    accommodations.value = res.data.data
  } catch (err) {
    console.error('API ERROR:', err)
  }
})
</script>

<style scoped>
.details-page {
  padding-top: 300px;
}

.container {
  max-width: 1300px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.container h1 {
  max-width: 800px;
  margin-bottom: 15px;
}

.container p {
  max-width: 850px;
  opacity: 0.9;
}

.section {
  margin-top: 80px;
  margin-bottom: 80px;
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

.arr-overlay .stars img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.arr-overlay .title h3 {
  font-size: 17px;
  font-weight: 600;
  margin: 0;
}

.stars {
  display: flex;
  gap: 4px;
}

.star-icon {
  width: 16px;
  height: 16px;
}

.arr-hover {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: 0.3s;

  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.3);

  z-index: 3;
}

.arr-hover span {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 30px;
  color: #fff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 5, 0.3);
}

.arr-card:hover .arr-hover {
  opacity: 1;
}

.filterSection {
  width: 100%;
  max-width: 1300px;

  margin-top: 50px;
  margin-bottom: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  padding: 22px 25px;

  background: rgba(255, 255, 255, 0.35);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.4);

  border-radius: 50px;

  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.filter-left {
  flex: 1.5;
}

.search {
  width: 100%;

  padding: 16px 20px;

  border-radius: 25px;
  border: 1px solid #e5e5e5;

  background: #fff;

  font-size: 15px;

  transition: 0.25s ease;
}

.search:focus,
.filter-right select:focus {
  outline: none;

  border-color: #705519;

  box-shadow:
    0 0 0 4px rgba(112, 85, 25, 0.12),
    0 10px 30px rgba(112, 85, 25, 0.1);
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.filter-right select {
  min-width: 170px;

  padding: 15px 18px;

  border-radius: 25px;
  border: 1px solid #e5e5e5;

  background: #fff;

  font-size: 14px;

  cursor: pointer;

  transition: 0.25s ease;
}

/* BUTTONS */

.filter-btn {
  border: none;

  padding: 15px 24px;

  border-radius: 25px;

  background: linear-gradient(135deg, #705519, #9b7420);

  color: white;
  font-weight: 600;

  cursor: pointer;

  transition: 0.3s ease;

  box-shadow: 0 10px 25px rgba(112, 85, 25, 0.25);
}

.filter-btn:hover {
  transform: translateY(-2px);

  box-shadow: 0 18px 35px rgba(112, 85, 25, 0.3);
}

.filter-resetbtn {
  width: 52px;
  height: 52px;

  border: none;
  border-radius: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #111;

  cursor: pointer;

  transition: 0.3s ease;
}

.filter-resetbtn:hover {
  transform: rotate(90deg);
}

.filter-resetbtn img {
  height: 22px;
  filter: invert(1);
}

.section {
  width: 100%;
  margin-bottom: 100px;
}

.arr-grid {
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  gap: 28px;
}

/* =========================
   CARD
========================= */

.arr-card {
  height: 390px;

  border-radius: 28px;

  overflow: hidden;

  position: relative;

  cursor: pointer;

  background: #000;

  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.12),
    0 25px 60px rgba(0, 0, 0, 0.08);

  transition: 0.4s ease;
}

.arr-card:hover {
  transform: translateY(-8px);
}

.arr-image {
  width: 100%;
  height: 100%;

  position: relative;
}

.arr-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: 0.5s ease;
}

.arr-card:hover img {
  transform: scale(1.08);
}

/* OVERLAY */

.arr-image::after {
  content: '';

  position: absolute;
  inset: 0;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.25), transparent);
}

/* HOVER */

.arr-hover {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.3);

  backdrop-filter: blur(6px);

  opacity: 0;

  z-index: 5;

  transition: 0.35s ease;
}

.arr-card:hover .arr-hover {
  opacity: 1;
}

.arr-hover span {
  padding: 14px 24px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.16);

  border: 1px solid rgba(255, 255, 255, 0.25);

  color: #fff;
  font-weight: 600;

  backdrop-filter: blur(8px);

  transition: 0.3s ease;
}

.arr-hover span:hover {
  transform: scale(1.05);
}

/* CONTENT */

.arr-overlay {
  position: absolute;

  left: 0;
  bottom: 0;

  width: 100%;

  z-index: 6;

  padding: 24px;

  color: white;

  display: flex;
  flex-direction: column;

  gap: 10px;
}

.arr-overlay .title h3 {
  font-size: 22px;
  font-weight: 700;

  margin: 0;
}

/* STARS */

.stars {
  display: flex;
  gap: 5px;
}

.star-icon {
  width: 18px;
  height: 18px;

  object-fit: contain;
}

/* TYPE BADGE */

.type-badge {
  position: absolute;

  top: 18px;
  left: 18px;

  z-index: 7;

  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.15);

  border: 1px solid rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(10px);

  color: white;

  font-size: 13px;
  font-weight: 600;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 900px) {
  .details-page {
    padding-top: 130px;
  }

  .container h1 {
    font-size: 36px !important;
    line-height: 1.2;
  }

  .container p {
    font-size: 14px;
    line-height: 1.7;
  }

  .filterSection {
    flex-direction: column;

    border-radius: 24px;

    padding: 20px;
  }

  .filter-left,
  .filter-right {
    width: 100%;
  }

  .filter-right {
    flex-direction: column;
  }

  .filter-right select,
  .filter-btn,
  .filter-resetbtn {
    width: 100%;
  }

  .arr-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .arr-card {
    height: 280px;
    border-radius: 22px;
  }

  .arr-overlay {
    padding: 18px;
  }

  .arr-overlay .title h3 {
    font-size: 18px;
  }

  .star-icon {
    width: 15px;
    height: 15px;
  }

  .arr-card:hover {
    transform: none;
  }

  .arr-card:hover img {
    transform: none;
  }
}
</style>
