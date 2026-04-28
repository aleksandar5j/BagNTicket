<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import api from '@/api'
import { imageUrl } from '@/api/config'

type Destination = {
  des_id: number
  des_name: string
  image: string
}

const destinations = ref<Destination[]>([])

async function getDestinations() {
  console.log('POZVANA FUNKCIJA')

  try {
    const res = await api.getDestinations()
    console.log(res)

    destinations.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

const destinationsSection = ref<HTMLElement | null>(null)

onMounted(async () => {
  await getDestinations()
  await nextTick()

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
        <h1>Explore Destinations</h1>
        <p>
          Discover the most beautiful places around the world. Choose your next adventure and create
          unforgettable memories.
        </p>
        <div class="search-box">
          <input type="text" placeholder="Where do you want to go?" />
          <button>Search</button>
        </div>
      </div>
    </section>

    <section ref="destinationsSection" class="destinations">
      <h2>All Destinations</h2>

      <div class="grid">
        <div class="card" v-for="dest in destinations" :key="dest.des_id">
          <img v-if="dest.image" :src="imageUrl + dest.image" />
          <h3 v-else>No image</h3>

          <div class="label">
            {{ dest.des_name }}
          </div>
          <div class="overlay">
            <span>View more</span>
          </div>
        </div>
      </div>
    </section>
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
  font-size: 42px;
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
  gap: 20px;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
}

.card {
  width: 200px;
  height: 300px;
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
</style>
