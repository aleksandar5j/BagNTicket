<template>
  <div class="details-page">
    <div class="container">
      <h1 style="font-size: 50px">
        <strong style="color: #705519">Find Your Perfect Stay</strong>
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
            <img src="/src/videos-images/for-all/reset.png" />
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
                    :src="
                      n <= acc.acc_stars
                        ? '/src/videos-images/for-all/star.png'
                        : '/src/videos-images/for-all/emptystar.png'
                    "
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

.arr-grid {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.arr-card {
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
}

.arr-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
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
  transition: 0.4s;
}

.arr-card:hover img {
  transform: scale(1.1);
}

.arr-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.7)
  );
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
  max-width: 1300px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 25px;
  height: 90px;

  gap: 80px;

  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(112, 85, 25, 0.6);
  border-radius: 50px;

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

/* LEFT */
.filter-left {
  flex: 1.2;
}

.search {
  width: 100%;
  padding: 13px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.filter-right {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filter-right select {
  padding: 12px 14px;
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 200px;
}

.filter-right input:focus,
.filter-right select:focus,
.search:focus {
  border: 1px solid #705519;
  outline: none;

  box-shadow:
    0 0 0 2px rgba(112, 85, 25, 0.2),
    0 0 10px rgba(112, 85, 25, 0.4);
}

/* BUTTON */
.filter-btn {
  background: #705519;
  color: #fff;
  border: none;
  padding: 13px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #8a6a22;
}

.filter-resetbtn {
  background: #705519;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}

.filter-resetbtn img {
  height: 30px;
  border-radius: 20px;
  filter: invert(1);
}
</style>
