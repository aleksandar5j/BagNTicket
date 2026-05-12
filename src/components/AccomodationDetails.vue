<template>
  <div class="details-page">
    <div class="container">
      <section class="section" v-if="accommodations.length">
        <div v-for="acc in accommodations" :key="acc.acc_id">
          <!-- HEADER -->
          <div class="acc-header">
            <div class="herrro">
              <h1 style="text-align: center; font-size: 40px; margin-bottom: 20px">
                <strong style="color: #705519">{{ acc.acc_name }}</strong> details
              </h1>
              <p style="text-align: center; margin-bottom: 150px; max-width: 700px">
                Explore carefully selected accommodations designed to give you comfort, convenience,
                and a truly relaxing experience. Each property is chosen to match high standards of
                quality, location, and guest satisfaction.
              </p>
            </div>
            <h1 style="text-align: center">{{ acc.acc_name }}</h1>
            <div class="stars" style="text-align: center">
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

          <div class="divider-with-text">
            <span>Gallery</span>
          </div>

          <!-- GALLERY -->
          <div class="acc-images" v-if="acc.images.length">
            <div class="main-img">
              <img :src="imageUrl + acc.images[0]" @click="openGallery(acc, 0)" />
              <div class="img-overlay"></div>
            </div>

            <div class="thumb-grid">
              <div class="thumb" v-for="(img, i) in acc.images.slice(1, 6)" :key="i">
                <img :src="imageUrl + img" @click="openGallery(acc, i + 1)" />
                <div class="img-overlay"></div>
              </div>

              <div v-if="acc.images.length > 6" class="more" @click="openGallery(acc, 0)">
                +{{ acc.images.length - 6 }}
              </div>
            </div>
          </div>

          <!-- DIVIDER -->
          <div class="divider-with-text">
            <span>All about</span>
          </div>

          <div class="section2">
            <!-- LEFT -->
            <div class="left">
              <div class="description">
                <h2>About this hotel</h2>
                <p>{{ acc.acc_description }}</p>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="right">
              <div class="booking-box">
                <h3 style="font-size: 25px">Reserve your stay</h3>

                <div class="form-grid">
                  <div class="form-group">
                    <label>Check in</label>
                    <input type="date" v-model="booking.from" />
                  </div>

                  <div class="form-group">
                    <label>Check out</label>
                    <input type="date" v-model="booking.to" />
                  </div>

                  <div class="form-group">
                    <label>Guests</label>
                    <input type="number" v-model="booking.people" min="1" />
                  </div>
                </div>

                <button class="reserve-btn" @click="reserveNow">Reserve now</button>
              </div>
            </div>
          </div>

          <div class="divider-with-text">
            <span>Available rooms</span>
          </div>

          <div class="hotel-grid" v-if="acc.rooms.length">
            <div class="hotel-card" v-for="room in acc.rooms" :key="room.rom_id">
              <!-- LEFT IMAGE -->
              <div class="room-img">
                <img src="/src/videos-images/rooms.jpg" />
              </div>

              <!-- MIDDLE INFO -->
              <div class="room-info">
                <h3>{{ room.rom_type }}</h3>
                <p>{{ room.rom_capacity }} persons</p>

                <div class="price">
                  {{ room.rom_price_per_night }} €
                  <span>/ night</span>
                </div>
              </div>

              <!-- RIGHT BUTTON -->
              <div class="room-action">
                <button class="book-btn">Book now</button>
              </div>
            </div>
          </div>

          <div v-else>
            <h1 style="text-align: center; color: gray; margin-bottom: 100px">
              No available rooms
            </h1>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div v-if="showGallery" class="lightbox">
    <span class="close" @click="showGallery = false">✕</span>

    <button @click="prev">‹</button>

    <img :src="imageUrl + activeImages[activeIndex]" />

    <button @click="next">›</button>
  </div>

  <transition name="toast">
    <div v-if="showToast" :class="['toast', toastType]">
      <img v-if="toastType === 'success'" src="/src/videos-images/for-all/check.png" />

      <img v-else src="/src/videos-images/for-all/warning.png" />

      <span>{{ toastMessage }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
import { imageUrl } from '@/api/config'

const booking = ref({
  from: '',
  to: '',
  people: 1,
})

const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const showToast = ref(false)

function triggerToast(message: string, type: 'success' | 'error' = 'success') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

async function reserveNow() {
  if (!booking.value.from || !booking.value.to || !booking.value.people) {
    triggerToast('Please fill all fields', 'error')
    return
  }

  if (booking.value.people < 1) {
    triggerToast('Guests must be at least 1', 'error')
    return
  }

  if (booking.value.from >= booking.value.to) {
    triggerToast('Check-out must be after check-in', 'error')
    return
  }

  try {
    triggerToast('Reservation successful! Email has sent, wait for respone.', 'success')

    booking.value = {
      from: '',
      to: '',
      people: 1,
    }
  } catch (err) {
    console.log(err)
    triggerToast('Reservation failed!', 'error')
  }
}

const route = useRoute()

type Room = {
  rom_id: number
  rom_type: string
  rom_price_per_night: number
  rom_capacity: number
  image: string
}

type Accommodation = {
  acc_id: number
  acc_name: string
  acc_type: string
  acc_stars: number
  acc_description: string
  image: string
  images: string[] // 🔥 DODAJ OVO
  rooms: Room[]
}

const accommodations = ref<Accommodation[]>([])

const id = Number(route.params.id)

onMounted(async () => {
  try {
    const res = await api.getAccommodationDetails(id)

    accommodations.value = res.data.data.accommodations
  } catch (err) {
    console.error('API ERROR:', err)
  }
})

const activeImages = ref<string[]>([])
const activeIndex = ref(0)
const showGallery = ref(false)

function openGallery(acc: Accommodation, index: number) {
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
  padding-top: 280px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1300px;
}

.acc-images {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;

  height: 500px;

  overflow: hidden; /* 🔥 KLJUČNO */
  border-radius: 12px; /* da lepo izgleda */
}

.main-img,
.thumb-grid {
  height: 100%;
  overflow: hidden;
}

.acc-images img {
  max-height: 100%;
  object-fit: cover;
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
  gap: 5px;
  position: relative;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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

.close {
  position: absolute;
  top: 100px;
  right: 100px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}

/* HEADER */
.acc-header {
  margin-bottom: 20px;
}

.acc-header h1 {
  font-size: 32px;
  font-weight: 700;
}

.stars {
  color: #f5b50a;
  margin-top: 5px;
}

/* DESCRIPTION */
.description {
  max-width: 700px;
  margin-bottom: 40px;
}

.description h2 {
  margin-bottom: 10px;
}

/* ROOMS GRID */
.section2 {
  display: flex;
  gap: 60px;
  align-items: flex-start;
  margin-top: 50px;
}

/* LEFT SIDE */
.left {
  flex: 1;
}

.description h2 {
  font-size: 26px;
  margin-bottom: 15px;
}

.description p {
  color: #555;
  line-height: 1.6;
}

/* RIGHT SIDE */
.right {
  flex: 1;
}

.right h2 {
  font-size: 26px;
  margin-bottom: 20px;
}

/* ROOM CARDS */
.hotel-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
}

.hotel-card {
  display: flex;
  align-items: stretch; /* bitno */
  gap: 15px;

  padding: 12px;
  border-radius: 12px;
  background: #f7f7f7;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0, 0.08);

  min-height: 100px;
}

.main-img,
.thumb {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: 0.3s ease;
  pointer-events: none;
}

.main-img:hover .img-overlay,
.thumb:hover .img-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.main-img img,
.thumb img {
  transition: transform 0.3s ease;
}

.main-img:hover img,
.thumb:hover img {
  transform: scale(1.05);
}

.room-img {
  width: 20%;
  height: 150px;
  flex-shrink: 0;
}

.room-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.room-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.room-action {
  width: 120px;
  display: flex;
  align-items: flex-end; /* dole */
  justify-content: flex-end; /* desno */
}

.book-btn {
  padding: 10px 15px;
  border: none;
  background: #705519;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.book-btn:hover {
  background: #8a6b1f;
}

/* ROOM INFO */
.room-info h3 {
  margin: 0;
}

.room-info p {
  color: #777;
  margin: 5px 0;
}

/* PRICE */
.price {
  font-size: 18px;
  font-weight: 700;
  color: #705519;
  margin: 10px 0;
}

.price span {
  font-size: 13px;
  color: #888;
}

.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
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

.star-icon {
  height: 40px;
  margin-right: 5px;
}

.booking-box {
  max-width: 1300px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0, 0.08);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.form-group label {
  font-size: 13px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.reserve-btn {
  width: 100%;
  padding: 12px;
  background: #705519;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.reserve-btn:hover {
  background: #8a6b1f;
}

.herrro {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.toast {
  position: fixed;
  top: 120px;
  right: 30px;

  min-width: 300px;
  max-width: 420px;

  padding: 16px 20px;

  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  color: white;
  font-weight: 600;

  z-index: 99999;

  backdrop-filter: blur(10px);

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.toast img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.toast.success {
  background: linear-gradient(135deg, #1d553f, #16895c);
}

.toast.error {
  background: linear-gradient(135deg, #703232, #ad5d5d);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(120px);
}

/* =========================
   TABLET (do 1024px)
========================= */
@media (max-width: 1024px) {
  .details-page {
    padding-top: 180px;
  }

  .acc-images {
    height: 400px;
  }

  .section2 {
    gap: 30px;
  }

  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* =========================
   MOBILE (do 768px)
========================= */
@media (max-width: 768px) {
  /* PAGE */
  .details-page {
    padding-top: 120px;
  }

  .container {
    padding: 0 15px;
  }

  /* ===== GALLERY ===== */
  .acc-images {
    grid-template-columns: 1fr;
    height: auto;
  }

  .thumb-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }

  .main-img {
    height: 250px;
  }

  .thumb-grid {
    height: auto;
  }

  .more {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }

  /* ===== HEADER ===== */
  .acc-header h1 {
    font-size: 24px;
  }

  /* ===== SECTION SPLIT ===== */
  .section2 {
    flex-direction: column;
  }

  .left,
  .right {
    width: 100%;
  }

  /* ===== ROOMS ===== */
  .hotel-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .room-img {
    width: 100%;
    height: 180px;
  }

  .room-action {
    width: 100%;
    justify-content: flex-start;
    margin-top: 10px;
  }

  .book-btn {
    width: 100%;
  }

  /* ===== BOOKING ===== */
  .form-grid {
    grid-template-columns: 1fr;
  }

  .booking-box {
    padding: 15px;
  }

  /* ===== LIGHTBOX ===== */
  .lightbox img {
    max-width: 90%;
  }

  .close {
    top: 20px;
    right: 20px;
    font-size: 26px;
  }

  .lightbox button {
    font-size: 30px;
  }
}

@media (max-width: 480px) {
  .acc-header h1 {
    font-size: 20px;
  }

  .description h2,
  .right h2 {
    font-size: 20px;
  }

  .price {
    font-size: 16px;
  }

  .thumb-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .more {
    font-size: 12px;
  }
}
</style>
