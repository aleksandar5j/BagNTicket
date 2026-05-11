<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import api from '@/api'
import { imageUrl } from '@/api/config'

import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionUser'

const session = useSessionStore()

const router = useRouter()

const userId = session.user?.usr_id || null

type Destination = {
  des_id: number
  des_name: string
  image: string
  fav_id?: number | null
}

const searchDest = ref('')

async function postFav(id: number) {
  const dest = destinations.value.find((d) => d.des_id === id)

  if (!dest) return

  try {
    if (dest.fav_id) {
      await api.removeFavorite(session.user.usr_id, id)
      dest.fav_id = null
    } else {
      await api.postFavorite(session.user.usr_id, id)
      dest.fav_id = 1
    }
  } catch (err) {
    console.log(err)
  }
}

async function filterDest() {
  try {
    const res = await api.filterDestinations(searchDest.value)

    destinations.value = res.data.data.map((d: any) => ({
      ...d,
      fav_id: d.fav_id ?? null, // zaštita
    }))
  } catch (error) {
    console.log(error)
  }
}

const destinations = ref<Destination[]>([])

async function getDestinations() {
  console.log('POZVANA FUNKCIJA')

  try {
    const res = await api.getDestinations(userId)
    console.log(res)

    destinations.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

function goToDetails(id: number) {
  router.push({
    name: 'destination-details',
    params: { id },
  })
}

const destinationsSection = ref<HTMLElement | null>(null)

onMounted(async () => {
  await getDestinations()

  destinationsSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <h1>Explore <strong style="color: #705519">Destinations</strong></h1>
        <p>
          Discover the most beautiful places around the world. Choose your next adventure and create
          unforgettable memories.
        </p>
        <div class="search-box">
          <input type="text" placeholder="Where do you want to go?" v-model="searchDest" />
          <button @click="filterDest">Search</button>
        </div>
      </div>
    </section>

    <div class="tip" v-if="!session.isLoggedIn">
      <h2>
        Sign in to save your favorite destinations, create your personal travel wishlist, and
        quickly access the places you’d love to visit again.
      </h2>
      <img src="/src/videos-images/for-all/heart.png" />
    </div>

    <section ref="destinationsSection" class="destinations" v-if="destinations.length">
      <h2>All Destinations</h2>

      <div class="grid">
        <div
          class="card"
          v-for="dest in destinations"
          :key="dest.des_id"
          @click="goToDetails(dest.des_id)"
        >
          <img v-if="dest.image" :src="imageUrl + dest.image" />

          <h3 v-else>No image</h3>

          <div class="isFavorite" @click.stop="postFav(dest.des_id)" v-if="session.isLoggedIn">
            <img
              :src="
                dest.fav_id
                  ? '/src/videos-images/for-all/heart.png'
                  : '/src/videos-images/for-all/emptyheart.png'
              "
            />
          </div>

          <div class="label">
            {{ dest.des_name }}
          </div>
          <div class="overlay">
            <span>View more</span>
          </div>
        </div>
      </div>
    </section>
    <div v-else>
      <h1 style="text-align: center">No result</h1>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 80px;
}

.destinations {
  text-align: center;
  scroll-margin-top: 140px;
}

.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.hero-content {
  max-width: 700px;
}

.hero-content h1 {
  font-size: 46px;
  margin-bottom: 10px;
  opacity: 0.8;
}

.hero-content p {
  color: #555;
  margin-bottom: 25px;
}

.destinations h2 {
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-box input {
  width: 300px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
}

.search-box button {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  background: #1e66ff;
  color: #fff;
  cursor: pointer;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto;
  margin-bottom: 100px;
}

.card {
  width: 230px;
  height: 380px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

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

  backdrop-filter: blur(2px);
}

.card:hover .overlay {
  opacity: 1;
}

.overlay span {
  transform: translateY(20px);
  transition: 0.3s ease;
}

.card:hover .overlay span {
  transform: translateY(0);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.card:hover img {
  transform: scale(1.1);
}

.label {
  position: absolute;
  top: 10px;
  left: 10px;

  background: rgba(0, 0, 0, 0.6);
  color: #fff;

  padding: 5px 10px;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;

  backdrop-filter: blur(5px);
}

.isFavorite {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  z-index: 50; /* 🔥 BITNO */
  border: 2px solid white;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.isFavorite img {
  position: absolute;
  width: 60%;
  height: 60%;
  object-fit: contain;
  transition: 0.25s ease;
}

.heart-empty {
  opacity: 0;
}

.isFavorite:hover {
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
  transition: 0.2s ease;
}

.isFavorite:hover .heart-full {
  opacity: 0;
  transform: scale(1.2);
}

.isFavorite:hover .heart-empty {
  opacity: 1;
  transform: scale(1);
  filter: invert(1);
}

.tip {
  display: flex;
  max-width: 1300px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: 40px;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 20px;
  margin-bottom: 70px;
}

.tip img {
  height: 50px;
}

.tip h2 {
  font-size: 15px;
}
</style>
