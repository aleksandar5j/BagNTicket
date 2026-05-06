<template>
  <div class="details-page">
    <div class="container">
      <h1 style="font-size: 50px">
        Explore Our Best <strong style="color: #705519">Offers</strong>
      </h1>
      <p>
        Browse our latest travel deals and find the perfect destination at the best price. From
        tropical beaches to vibrant cities, we’ve got something for everyone.
      </p>

      <div class="filterSection">
        <div class="filter-left">
          <input
            type="text"
            v-model="searchArr"
            @input="handleInput"
            class="search"
            placeholder="Search offers..."
          />
        </div>

        <div class="filter-right">
          <label>from</label>
          <input type="date" v-model="from" />
          <label>to</label>
          <input type="date" v-model="to" />

          <select v-model="category" @change="searchArrFun">
            <option :value="undefined">Category</option>

            <option v-for="cat in categories" :key="cat.cat_id" :value="cat.cat_id">
              {{ cat.cat_name }}
            </option>
          </select>

          <select v-model="price" @change="searchArrFun">
            <option :value="undefined">Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <button class="filter-btn" @click="searchArrFun">Search</button>
          <button class="filter-resetbtn" @click="resetFilters">
            <img src="/src/videos-images/for-all/reset.png" />
          </button>
        </div>
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
                <div class="title">
                  <h3>{{ arr.arr_title }}</h3>
                </div>

                <div class="price">{{ arr.arr_price }} €</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1>No result</h1>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '@/api'
import { imageUrl } from '@/api/config'
import { useRouter } from 'vue-router'

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

type Category = {
  cat_id: string
  cat_name: string
}

const router = useRouter()

function goToDetails(id: number) {
  router.push({
    name: 'arrangement-details',
    params: { id },
  })
}

const searchArr = ref('')
const from = ref()
const to = ref()
const category = ref<string | undefined>(undefined)
const price = ref<string | undefined>(undefined)

watch([from, to], () => {
  searchArr.value = ''
  category.value = undefined
  price.value = undefined

  searchArrFun()
})

async function searchArrFun() {
  try {
    const res = await api.filterArrangements({
      arr_title: searchArr.value || undefined,
      from: from.value || undefined,
      to: to.value || undefined,
      category: category.value,
      price: price.value,
    })

    arrangements.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

async function resetFilters() {
  searchArr.value = ''
  from.value = undefined
  to.value = undefined
  category.value = undefined
  price.value = undefined

  const res = await api.getArrangements()
  arrangements.value = res.data.data
}

const categories = ref<Category[]>([])

async function getCat() {
  try {
    const res = await api.getCategories()
    categories.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getCat()
  searchArrFun()
})

const arrangements = ref<Arrangement[]>([])

onMounted(async () => {
  try {
    await getCat()

    const res = await api.getArrangements()
    console.log(res.data)
    arrangements.value = res.data.data
  } catch (err) {
    console.error('API ERROR:', err)
  }
})

let timeout: any

function handleInput() {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    searchArrFun()
  }, 400)
}
</script>

<style scoped>
.details-page {
  padding-top: 300px;
}

.container {
  max-width: 1300px;
  margin: 0 auto;

  display: flex;
  flex-direction: column; /* 🔥 KLJUČNO */
  align-items: center;
  text-align: center;
  justify-content: center;
}

.container h1 {
  max-width: 800px;
  margin-bottom: 15px;
}

.container p {
  max-width: 700px;
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

/* CARD */
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

/* IMAGE */
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

/* DARK GRADIENT OVERLAY */
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

/* TITLE + PRICE OVERLAY */
.arr-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 15px;
  color: #fff;
}

/* TITLE (GORE) */
.arr-overlay .title h3 {
  font-size: 16px;
  font-weight: 600;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);

  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
}

/* PRICE (DOLE) */
.arr-overlay .price {
  align-self: flex-end;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);

  padding: 6px 12px;
  border-radius: 20px;

  font-weight: bold;
  color: #f5c542;
}

/* HOVER LAYER */
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

  background: rgba(255, 255, 255, 0.2); /* 🔥 transparent */
  backdrop-filter: blur(12px); /* 🔥 blur */
  -webkit-backdrop-filter: blur(12px); /* safari */

  border: 1px solid rgba(112, 85, 25, 0.6);
  border-radius: 50px;

  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

/* LEFT */
.filter-left {
  flex: 1.5; /* 🔥 više prostora za search */
}

.search {
  width: 100%;
  padding: 13px 16px; /* veći input */
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 15px;
}

/* RIGHT */
.filter-right {
  display: flex;
  gap: 15px; /* veći razmak */
  align-items: center;
}

/* INPUTS */
.filter-right input,
.filter-right select {
  padding: 12px 14px; /* veći elementi */
  border-radius: 20px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 130px; /* 🔥 da ne budu mali */
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
