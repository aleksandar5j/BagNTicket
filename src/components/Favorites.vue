<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { useSessionStore } from '@/stores/sessionUser'
import { imageUrl } from '@/api/config'
import router from '@/router'

const session = useSessionStore()

function goToDetails(id: number) {
  router.push({
    name: 'destination-details',
    params: { id },
  })
}

type Destination = {
  fav_id: number
  des_id: number
  des_name: string
  des_country: string
  image: string
}

async function removeFav(id: number) {
  try {
    const res = await api.removeFavorite(session.user.usr_id, id)
    await getFavorites()
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

const favorites = ref<Destination[]>([])

async function getFavorites() {
  try {
    if (!session.user?.usr_id) return

    const res = await api.getFavorites(session.user.usr_id)
    favorites.value = res.data.data
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getFavorites()
})
</script>

<template>
  <div class="details-page" v-if="favorites">
    <div class="container">
      <!-- TOP TEXT -->
      <div class="top-text">
        <h1 style="font-size: 50px">
          Your <strong style="color: #705519">Favorite Destinations</strong>
        </h1>

        <p>
          Discover all the places you've fallen in love with. Your saved destinations are just one
          step away from becoming your next unforgettable journey.
        </p>
      </div>

      <div class="card-grid" v-if="favorites.length">
        <div
          class="dest-card"
          v-for="fav in favorites"
          :key="fav.des_id"
          @click="goToDetails(fav.des_id)"
        >
          <div class="card-image">
            <img :src="imageUrl + fav.image" />

            <div class="isFavorite" @click.stop="removeFav(fav.des_id)">
              <img class="heart-full" src="/src/videos-images/for-all/heart.png" />
              <img class="heart-empty" src="/src/videos-images/for-all/emptyheart.png" />
            </div>

            <div class="card-overlay">
              <h3>{{ fav.des_name }}</h3>
              <p>{{ fav.des_country }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-fav" style="margin-top: 200px; margin-bottom: 150px">
        <h2>No favorites yet</h2>
        <p>Start exploring and save your dream destinations</p>
      </div>
    </div>
  </div>
</template>

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

.top-text {
  margin-bottom: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.top-text p {
  text-align: center;
  max-width: 700px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 50px;
}

.dest-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.dest-card:hover {
  transform: translateY(-2px);
}

.card-image {
  position: relative;
  height: 250px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7));

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;

  color: #fff;
}

.card-overlay h3 {
  margin: 0;
  font-size: 20px;
}

.card-overlay p {
  margin: 0;
  font-size: 14px;
  opacity: 0.85;
}

.no-fav {
  text-align: center;
  margin-top: 50px;
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dest-card:hover .card-overlay {
  opacity: 1;
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
  transform: scale(1.2);
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
</style>
