<script setup lang="ts">
import { imageUrl } from '@/api/config'
import api from '@/api'
import { ref, onMounted, computed } from 'vue'

import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionUser'

const session = useSessionStore()

const router = useRouter()

const userId = session.user?.usr_id || null

function goToDetails(id: number) {
  router.push({
    name: 'destination-details',
    params: { id },
  })
}

function goToDetailsArr(id: number) {
  router.push({
    name: 'arrangement-details',
    params: { id },
  })
}

function goToDetailsTra(type: string) {
  router.push({
    name: 'transport-arrangements',
    params: { tra_type: type },
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
  arr_discount: number
  image: string
  cat_name: string
}

type Transport = {
  tra_id: number
  arr_id: number
  tra_type: string
  tra_departure_location: string
  tra_arrival_location: string
  tra_departure_time: Date
  tra_arrival_time: Date
}

const transports = ref<Transport[]>([])

async function getTransports() {
  try {
    const res = await api.getTransport()
    transports.value = res.data.data
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

function getTransportImage(type: string) {
  switch (type.toLowerCase()) {
    case 'plane':
      return '/images/airplane.png'

    case 'bus':
      return '/images/bus.png'

    case 'train':
      return '/images/train.png'

    case 'ship':
      return '/images/ship.png'

    default:
      return '/images/transport.png'
  }
}

function getTransportDescription(type: string) {
  switch (type.toLowerCase()) {
    case 'plane':
      return 'Fast, comfortable and perfect for long-distance adventures.'

    case 'bus':
      return 'Affordable and flexible travel for discovering new places.'

    case 'train':
      return 'Relaxing journeys with scenic views and extra comfort.'

    case 'ship':
      return 'Enjoy unforgettable travel experiences across the sea.'

    default:
      return 'Travel comfortably to your dream destination.'
  }
}

const lastMinuteDeals = ref<Arrangement[]>([])

async function getLastMinDeals() {
  try {
    const res = await api.lastMinuteDeals()
    lastMinuteDeals.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

type Destination = {
  des_id: number
  des_name: string
  des_country: string
  image: string
  fav_id: number
}

const popularDestinations = ref<Destination[]>([])

async function getPopDes() {
  try {
    const res = await api.popularDest(userId)
    popularDestinations.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

async function postFav(id: number) {
  const dest = popularDestinations.value.find((d) => d.des_id === id)
  if (!dest) return

  try {
    if (dest.fav_id) {
      await api.removeFavorite(session.user.usr_id, id)
    } else {
      await api.postFavorite(session.user.usr_id, id)
    }

    await getPopDes() // jedini izvor istine
  } catch (err) {
    console.log(err)
  }
}

const slider = ref<HTMLElement | null>(null)

function scrollRight() {
  if (!slider.value) return
  slider.value.scrollBy({
    left: slider.value.clientWidth,
    behavior: 'smooth',
  })
}

function scrollLeft() {
  if (!slider.value) return
  slider.value.scrollBy({
    left: -slider.value.clientWidth,
    behavior: 'smooth',
  })
}

onMounted(() => {
  getPopDes()
  getLastMinDeals()
  getTransports()
})

function getPrice(arr: Arrangement) {
  const discount = (arr as any).arr_discount || 0
  return Math.round(arr.arr_price * (1 - discount / 100))
}
function hasDiscount(arr: Arrangement) {
  return (arr as any).arr_discount > 0
}
</script>

<template>
  <div class="home">
    <section class="about">
      <div class="about-content">
        <!-- TOP -->
        <div class="about-top">
          <h1>We Create Unforgettable Travel Experiences</h1>
          <h2>Discover. Explore. Enjoy.</h2>
        </div>

        <!-- BOTTOM -->
        <div class="about-bottom">
          <!-- LEFT SIDE -->
          <div class="promo-coupon">
            <div class="coupon-badge">LIMITED OFFER</div>

            <div class="coupon-content">
              <div class="coupon-left">
                <img src="/public/images/gift.png" class="coupon-icon" />

                <div>
                  <h2>SUMMER PROMO CODE</h2>

                  <div class="coupon-code">SUMMER</div>

                  <p class="discount">Get <strong>30% OFF</strong> on all arrangements</p>

                  <p class="coupon-sub">
                    Use this exclusive promo code during booking and enjoy unforgettable
                    destinations at a special discounted price.
                  </p>
                </div>
              </div>

              <div class="coupon-right">
                <img src="/public/images/travelagency.jpg" alt="promo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider-with-text">
      <span>Popular Destinations</span>
    </div>

    <section class="featured">
      <div class="featured-grid">
        <div
          class="card-modern"
          :class="{ big: index === 0 }"
          v-for="(dest, index) in popularDestinations"
          :key="dest.des_id"
          @click="goToDetails(dest.des_id)"
        >
          <div class="isFavorite" @click.stop="postFav(dest.des_id)" v-if="session.isLoggedIn">
            <img :src="dest.fav_id ? '/images/heart.png' : '/images/emptyheart.png'" />
          </div>
          <img v-if="dest.image" :src="imageUrl + dest.image" />
          <div v-else class="no-img">No image</div>

          <div class="card-title">
            {{ dest.des_name }}
          </div>

          <div class="card-overlay" @click.stop="goToDetails(dest.des_id)">
            <span>Explore</span>
          </div>
        </div>
      </div>
    </section>

    <div class="about-cta">
      <div class="first">
        <h3>Ready for your next adventure?</h3>
        <p>
          Explore our exclusive deals and find your perfect destination today. Discover hand-picked
          experiences, luxury stays, and unforgettable adventures.
        </p>

        <button @click="$router.push('/destinations')">View Destinations</button>
      </div>
      <div class="second">
        <img src="/public/images/globe.png" />
      </div>
    </div>

    <div class="divider-with-text">
      <span>Last minute offers</span>
    </div>

    <section class="deals">
      <div class="deals-box">
        <div class="deals-header">
          <div class="controls">
            <button @click="scrollLeft">‹</button>
            <button @click="scrollRight">›</button>
          </div>
        </div>

        <div class="deals-slider" ref="slider">
          <div class="deal-card" v-for="arr in lastMinuteDeals" :key="arr.arr_id">
            <div class="discount-badge">-{{ arr.arr_discount }}%</div>

            <img v-if="arr.image" :src="imageUrl + arr.image" />

            <div class="deal-content">
              <h3>{{ arr.arr_title }}</h3>
              <div class="price">
                <span v-if="hasDiscount(arr)" class="old"> {{ arr.arr_price }}€ </span>

                <span class="new"> {{ getPrice(arr) }}€ </span>
              </div>

              <button @click="goToDetailsArr(arr.arr_id)">Book now</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="divider-with-text">
      <span>Travel options</span>
    </div>

    <section class="transport">
      <div class="transport-box">
        <h2>What's Your Favorite Way to Travel? <img src="/public/images/earth.png" /></h2>
        <p class="subtitle">
          Choose your preferred transport and discover journeys tailored just for you.
        </p>

        <div class="transport-options">
          <div
            class="transport-card"
            v-for="tra in transports"
            :key="tra.tra_id"
            @click="goToDetailsTra(tra.tra_type)"
          >
            <img :src="getTransportImage(tra.tra_type)" class="transport-icon" />

            <h3>By {{ tra.tra_type }}</h3>

            <p>{{ getTransportDescription(tra.tra_type) }}</p>

            <button>Explore {{ tra.tra_type }} trips</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 280px;
}

.featured {
  text-align: center;
  padding: 20px 20px;
  padding-bottom: 50px;
}

.featured h2 {
  margin-bottom: 30px;
  font-size: 28px;
}

.featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 260px 260px;
  gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
}

/* BIG TOP LEFT */
.featured-grid .card-modern:nth-child(1) {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

/* LEFT BOTTOM SMALL 1 */
.featured-grid .card-modern:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

/* LEFT BOTTOM SMALL 2 */
.featured-grid .card-modern:nth-child(3) {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

/* RIGHT BIG CARD (FULL HEIGHT) */
.featured-grid .card-modern:nth-child(4) {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
}

/* fallback za ostale */
.featured-grid .card-modern {
  width: 100%;
  height: 100%;
}

.deals {
  padding: 20px 20px;
}

/* BOX */
.deals-box {
  max-width: 1300px;
  margin: auto;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* HEADER */
.deals-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 25px;
}

.deals-header img {
  height: 30px;
}

.deals-header h2 {
  font-size: 28px;
}

/* ARROWS */
.controls button {
  background: #000000;
  color: #ffffff;
  border: none;
  margin-left: 10px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.controls button:hover {
  background: red;
}

/* SLIDER */
.deals-slider {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.deals-slider::-webkit-scrollbar {
  display: none;
}

/* CARD */
.deal-card {
  min-width: 260px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.deal-card:hover {
  transform: translateY(-5px);
}

/* IMAGE */
.deal-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* CONTENT */
.deal-content {
  padding: 15px;
}

.deal-content h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.price {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.deal-content button {
  width: 100%;
  padding: 8px;
  border: none;
  background: #111;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.deal-content button:hover {
  background: red;
}

/* BIG CARD (ZA OBA) */
.big {
  grid-column: span 2;
  grid-row: span 2;
}

/* ========================= */
/* UNIVERSAL CARD */
/* ========================= */

.card-modern {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card-modern img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s ease;
}

.card-modern:hover img {
  transform: scale(1.1);
}

.card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

/* GRADIENT */
.card-modern::after {
  content: '';
  position: absolute;
  inset: 0;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), transparent);
}

/* TITLE (DOLE) */
.card-title {
  position: absolute;
  bottom: 15px;
  left: 15px;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);

  color: #fff;
  font-size: 16px;
  font-weight: 600;

  padding: 6px 12px;
  border-radius: 10px;

  z-index: 2;

  transition: 0.3s ease;
}

/* PRICE BADGE */
.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;

  background: #88342f;
  color: #fff;

  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;

  z-index: 2;
}

.card-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  transition: 0.3s ease;

  backdrop-filter: blur(6px);

  background: rgba(0, 0, 0, 0.25);
}

.card-overlay span {
  background: rgba(250, 250, 250, 0.15);
  backdrop-filter: blur(5px);

  color: #fff;
  font-size: 18px;
  font-weight: 600;

  padding: 10px 20px;
  border-radius: 30px;

  border: 1px solid rgba(255, 255, 255, 0.3);

  transition: 0.3s ease;
}

.card-modern:hover .card-overlay span {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.25);
}

.card-modern:hover .card-overlay {
  opacity: 1;
}

.card-modern:hover .card-title {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

/* NO IMAGE */
.no-img {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about {
  max-width: 1300px;
  margin: auto;
}

/* TOP */
.about-top {
  text-align: center;
  margin-top: 30px;
  max-width: 1000px;
  margin: auto;
}

.about-top h1 {
  font-size: 50px;
  margin-bottom: 10px;
  opacity: 0.8;
}

.about-top h2 {
  font-size: 30px;
  color: #705519;
}

.about-bottom {
  margin-top: 150px;
}

.promo-coupon {
  position: relative;

  background: linear-gradient(135deg, #705519, #8a6b1f);

  border-radius: 28px;
  overflow: hidden;

  padding: 40px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.coupon-badge {
  position: absolute;
  top: 20px;
  right: 20px;

  background: white;
  color: #705519;

  padding: 10px 18px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
}

.coupon-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.coupon-left {
  flex: 1;

  display: flex;
  align-items: flex-start;
  gap: 25px;

  color: white;
}

.coupon-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.coupon-left h2 {
  font-size: 38px;
  margin-bottom: 18px;
}

.coupon-code {
  display: inline-block;

  padding: 14px 30px;

  background: rgba(255, 255, 255, 0.18);

  border: 2px dashed white;
  border-radius: 14px;

  font-size: 30px;
  font-weight: 800;
  letter-spacing: 4px;

  margin-bottom: 18px;
}

.discount {
  font-size: 22px;
  margin-bottom: 12px;
}

.coupon-sub {
  max-width: 600px;
  line-height: 1.8;
  opacity: 0.92;
}

.coupon-right {
  width: 380px;
  height: 260px;

  border-radius: 24px;
  overflow: hidden;

  flex-shrink: 0;
}

.coupon-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .coupon-content {
    flex-direction: column;
  }

  .coupon-left {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .coupon-left h2 {
    font-size: 28px;
  }

  .coupon-code {
    font-size: 22px;
    letter-spacing: 2px;
  }

  .coupon-right {
    width: 100%;
    height: 220px;
  }
}

.about-cta {
  padding: 20px 50px;

  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1300px;
  margin: auto;
  border-radius: 12px;
  color: #111;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.about-cta h3 {
  margin-bottom: 8px;
}

.second img {
  height: 110px;
}

.about-cta p {
  font-size: 14px;
  margin-bottom: 15px;
}

.about-cta button {
  background: #111;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.about-cta button:hover {
  background: #333;
  transform: translateY(-2px);
}

.transport {
  padding: 20px 20px;
  margin-bottom: 50px;
}

.transport-box {
  max-width: 1300px;
  margin: auto;
  text-align: center;

  background: #fff;
  padding: 40px;
  border-radius: 20px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.transport-box img {
  height: 25px;
}

.transport-box h2 {
  font-size: 30px;
  margin-bottom: 10px;
}

.subtitle {
  color: #777;
  margin-bottom: 40px;
}

/* GRID */
.transport-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

/* CARD */
.transport-card {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 25px 20px;

  transition: 0.3s;
  cursor: pointer;
}

.transport-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0, 0.15);
}

/* ICON */
.transport-card img {
  height: 60px;
  margin-bottom: 15px;
}

/* TEXT */
.transport-card h3 {
  margin-bottom: 10px;
}

.transport-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

/* BUTTON */
.transport-card button {
  background: #111;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.transport-card button:hover {
  background: #f5c542;
  color: #000;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .transport-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .transport-options {
    grid-template-columns: 1fr;
  }
}

.divider-with-text {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 60px auto;
  max-width: 1300px;
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

/* =========================
   MOBILE RESPONSIVE UPGRADE
   ========================= */

@media (max-width: 1200px) {
  .featured-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .transport-options {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 900px) {
  .home {
    padding-top: 160px;
  }

  .featured-grid {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 200px;
  }

  .about-bottom {
    flex-direction: column;
    text-align: center;
    margin-top: 80px;
  }

  .about-image img {
    height: 220px;
  }

  .about-cta {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .transport-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .deals-box {
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .home {
    padding-top: 120px;
  }

  .featured h2 {
    font-size: 22px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }

  .deals-header {
    flex-direction: column;
    gap: 10px;
  }

  .deals-slider {
    gap: 12px;
  }

  .deal-card {
    min-width: 220px;
  }

  .about-top h1 {
    font-size: 32px;
  }

  .about-top h2 {
    font-size: 20px;
  }

  .about-bottom {
    padding: 20px;
    margin-top: 60px;
  }

  .about-image img {
    height: 180px;
  }

  .about-cta {
    padding: 20px;
  }

  .transport-box {
    padding: 20px;
  }

  .transport-options {
    grid-template-columns: 1fr;
  }

  .card-modern {
    border-radius: 14px;
  }

  .card-title {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .featured-grid {
    gap: 12px;
  }

  .deal-card {
    min-width: 200px;
  }

  .card-title {
    font-size: 13px;
    padding: 5px 10px;
  }

  .about-top h1 {
    font-size: 28px;
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
  color: red;
  font-weight: bold;
  font-size: 16px;
}

.deal-card {
  position: relative;
}

.discount-badge {
  position: absolute;
  top: 12px;
  right: 12px;

  background: #ff3b30;
  color: white;

  padding: 6px 8px;
  border-radius: 999px;

  font-size: 14px;
  font-weight: bold;

  z-index: 5;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
</style>
