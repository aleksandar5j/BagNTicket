<template>
  <div class="details-page" v-if="arrangement">
    <div class="container">
      <!-- TOP TEXT -->
      <div class="top-text">
        <h1>{{ arrangement.arr_title }}</h1>
        <p class="location">{{ arrangement.des_name }}, {{ arrangement.des_country }}</p>
      </div>

      <div class="hero">
        <img :src="imageUrl + arrangement.image" class="hero-img" />

        <div class="hero-overlay">
          <h2>{{ arrangement.des_name }}</h2>
          <p>{{ arrangement.des_country }}</p>
        </div>
      </div>

      <div class="content">
        <div class="description">
          <h2>About this trip</h2>
          <p>{{ arrangement.arr_description }}</p>
        </div>

        <div class="booking-card">
          <h2>{{ arrangement.arr_title }}</h2>
          <h3 style="color: #705519">{{ arrangement.arr_price }}€</h3>
          <p>{{ arrangement.arr_duration_days }} days</p>
          <p>{{ arrangement.arr_capacity }} people</p>
          <p>
            {{ arrangement.arr_available_from }}
            <strong style="color: black">to</strong>
            {{ arrangement.arr_available_to }}
          </p>

          <button class="hotel-btn" @click="scroolTo()">Choose other hotel</button>

          <button class="book-btn">Book now</button>
        </div>
      </div>

      <div class="divider-with-text">
        <span>Transport details</span>
      </div>

      <div class="transport-details">
        <p v-if="arrangement.tra_type">
          You are travelling by <strong>{{ arrangement.tra_type }}</strong>
        </p>
        <p v-if="arrangement.tra_departure_location && arrangement.tra_departure_time">
          Departure:
          <strong>{{ arrangement.tra_departure_location }}</strong>
          at <strong>{{ arrangement.tra_departure_time }}</strong>
        </p>

        <p v-if="arrangement.tra_arrival_location && arrangement.tra_arrival_time">
          Arrival:
          <strong>{{ arrangement.tra_arrival_location }}</strong>
          at <strong>{{ arrangement.tra_arrival_time }}</strong>
        </p>
        <p v-else>Currently no info for this transport!</p>
      </div>

      <div class="divider-with-text">
        <span>Gallery</span>
      </div>

      <div class="gallery">
        <div class="images">
          <div v-for="acc in accommodations" :key="acc.acc_id" class="acc-block">
            <div class="hotel-info">
              <h3 style="text-align: center; opacity: 0.9; font-size: 40px">{{ acc.acc_name }}</h3>
              <div class="starss">
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="
                    n <= acc.acc_stars
                      ? '/src/videos-images/for-all/star.png'
                      : '/src/videos-images/for-all/emptystar.png'
                  "
                  class="star-iconn"
                />
              </div>
            </div>

            <div class="acc-images" v-if="acc.images.length">
              <!-- VELIKA SLIKA -->
              <div class="main-img">
                <img :src="imageUrl + acc.images[0]" @click="openGallery(acc, 0)" />
              </div>

              <!-- DESNI GRID -->
              <div class="thumb-grid">
                <div class="thumb" v-for="(img, i) in acc.images.slice(1, 6)" :key="i">
                  <img :src="imageUrl + img" @click="openGallery(acc, i + 1)" />
                </div>

                <!-- +MORE OVERLAY -->
                <div v-if="acc.images.length > 6" class="more" @click="openGallery(acc, 0)">
                  +{{ acc.images.length - 6 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider-with-text">
        <span>Other hotels</span>
      </div>

      <div class="accommodations" ref="accSection">
        <div class="acc-grid">
          <div
            v-for="acc in accommodations"
            :key="acc.acc_id"
            class="acc-card"
            @click="goToDetails(acc.acc_id)"
          >
            <img :src="imageUrl + acc.image" class="acc-img" />

            <div class="acc-info">
              <h3>{{ acc.acc_name }}</h3>
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

              <div class="rooms">
                <div v-for="room in acc.rooms" :key="room.rom_id" class="room">
                  <p>{{ room.rom_type }}</p>
                  <p>{{ room.rom_price_per_night }}€/night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showGallery" class="lightbox" @click.stop>
    <span class="close" @click="showGallery = false">✕</span>

    <button @click="prev">‹</button>

    <img :src="imageUrl + activeImages[activeIndex]" />

    <button @click="next">›</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { imageUrl } from '@/api/config'

const accSection = ref(null)

const route = useRoute()
const router = useRouter()

function goToDetails(id: number) {
  router.push({
    name: 'accomodation-details',
    params: { id },
  })
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
  acc_stars: number
  image: string
  images: string[]
  rooms: Room[]
}

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
  tra_type: string
  tra_departure_location: string
  tra_arrival_location: string
  tra_departure_time: string
  tra_arrival_time: string
}

function scroolTo() {
  accSection.value?.scrollIntoView({
    behavior: 'smooth',
  })
}

const arrangement = ref<Arrangement | null>(null)
const accommodations = ref<Accommodation[]>([])

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.getArrangementDetails(id)

    arrangement.value = res.data.data.arrangement
    accommodations.value = res.data.data.accommodations
  } catch (err) {
    console.error('API ERROR:', err)
  }
})

const activeImages = ref<string[]>([])
const activeIndex = ref(0)
const showGallery = ref(false)

function openGallery(acc, index) {
  activeImages.value = acc.images
  activeIndex.value = index
  showGallery.value = true
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % activeImages.value.length
}

function prev() {
  activeIndex.value =
    (activeIndex.value - 1 + activeImages.value.length) % activeImages.value.length
}
</script>

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
  text-align: center;
  margin-bottom: 210px;
}

.top-text h1 {
  font-size: 36px;
  font-weight: 700;
}

.location {
  color: #777;
  margin-top: 5px;
}

.hero {
  position: relative;
  height: 500px;
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.hero-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);

  padding: 15px 20px;
  border-radius: 12px;
  color: white;
}

.content {
  display: flex;
  gap: 40px;
  margin-bottom: 50px;
}

.description {
  flex: 2;
}

.booking-card {
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 16px;
  height: fit-content;
}

.book-btn {
  width: 100%;
  padding: 12px;
  border: none;
  background: #705519;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.book-btn:hover {
  background: #8a6b1f;
}

.hotel-btn {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  padding: 12px;
  border: none;
  background: #193c70;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.hotel-btn:hover {
  background: #1f4a8a;
}

.accommodations h2 {
  margin-bottom: 20px;
}

.acc-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 100px;
}

.acc-card {
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: row;

  background: #f9f9f9;
  border-radius: 14px;
  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0, 0.08);
  transition: 0.3s;
  cursor: pointer;
}

.acc-card:hover {
  transform: translateY(-4px);
}

.acc-img {
  width: 40%;
  height: 100%;
  object-fit: cover;
}

.acc-info {
  width: 60%;
  padding: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.acc-info h3 {
  margin: 0;
  font-size: 16px;
}

.room {
  padding: 4px 0;
  background: transparent;
}

.acc-images {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
  height: 550px;
}

.main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
}

.thumb-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  position: relative;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
}

.more {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48%;
  height: 32%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 9999;
}

.lightbox img {
  max-width: 70%;
  max-height: 80%;
  border-radius: 10px;
}

.lightbox button {
  background: transparent;
  border: none;
  font-size: 40px;
  color: white;
  cursor: pointer;
}

.gallery {
  margin-bottom: 100px;
}

.accommodations {
  position: relative;
  z-index: 2;
  background: white;
  padding-top: 40px;
}

.close {
  position: absolute;
  top: 100px;
  right: 100px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}

.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 60px 0;
}

.divider-with-text::before,
.divider-with-text::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
}

.divider-with-text span {
  padding: 0 15px;
  color: #888;
  font-size: 30px;
}

.warning {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
}

.warning img {
  height: 30px;
}

.star-icon {
  height: 20px;
  margin-right: 5px;
}

.starss {
  display: flex;
  justify-content: center;
  align-items: center;
}

.star-iconn {
  height: 40px;
  margin-right: 5px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.hotel-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
}
</style>
