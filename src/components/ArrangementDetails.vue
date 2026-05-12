<template>
  <div class="details-page" v-if="arrangement">
    <div class="container">
      <!-- TOP TEXT -->
      <div class="top-text">
        <h1>{{ arrangement.arr_title }}</h1>
        <p class="location">{{ arrangement.des_name }}, {{ arrangement.des_country }}</p>
      </div>

      <div class="divider-with-text">
        <span>About arrangement</span>
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

          <button class="book-btn" @click="openBooking">Book now</button>
        </div>
      </div>

      <div class="divider-with-text">
        <span>Transport details</span>
      </div>

      <div class="transport-card" v-if="arrangement.tra_type || arrangement.tra_departure_location">
        <div class="transport-header">
          <img src="/src/videos-images/for-all/earth.png" />
          <h2>Transport Details</h2>
        </div>

        <div class="transport-body">
          <div class="transport-item">
            <span class="label">Travel method</span>
            <span class="value">
              {{ arrangement.tra_type }}
            </span>
          </div>

          <div
            class="transport-item"
            v-if="arrangement.tra_departure_location && arrangement.tra_departure_time"
          >
            <span class="label">Departure</span>
            <span class="value">
              {{ arrangement.tra_departure_location }} • {{ arrangement.tra_departure_time }}
            </span>
          </div>

          <div
            class="transport-item"
            v-if="arrangement.tra_arrival_location && arrangement.tra_arrival_time"
          >
            <span class="label">Arrival</span>
            <span class="value">
              {{ arrangement.tra_arrival_location }} • {{ arrangement.tra_arrival_time }}
            </span>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="transport-empty">
        <img src="/src/videos-images/for-all/airplane.png" />
        <h3>No transport available for this trip</h3>
        <p>Transportation details will be added soon or depend on selected package.</p>
      </div>

      <div class="divider-with-text">
        <span>Gallery</span>
      </div>

      <div class="gallery" v-if="accommodations.length">
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
                <div class="img-overlay"></div>
              </div>

              <!-- DESNI GRID -->
              <div class="thumb-grid">
                <div class="thumb" v-for="(img, i) in acc.images.slice(1, 6)" :key="i">
                  <img :src="imageUrl + img" @click="openGallery(acc, i + 1)" />
                  <div class="img-overlay"></div>
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

      <div v-else>
        <h1 style="text-align: center; color: #888; padding-bottom: 100px">
          Currently no photos for this trip!
        </h1>
      </div>

      <div class="divider-with-text">
        <span>Other hotels</span>
      </div>

      <div class="accommodations" ref="accSection" v-if="accommodations.length">
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
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 style="text-align: center; color: #888; padding-bottom: 150px">
          Currently no accommodations for this trip!
        </h1>
      </div>
    </div>
  </div>

  <div class="divider-with-text">
    <span>Traveler reviews</span>
  </div>

  <section class="reviews-section">
    <!-- LEFT SIDE -->
    <div class="reviews-left">
      <h2>What travelers say about this trip</h2>

      <p class="reviews-text">
        Read authentic experiences from travelers who already visited this destination. Discover
        what they loved the most — from hotels and transport to unforgettable moments and
        adventures.
      </p>

      <div class="review-stats">
        <div class="stat-box">
          <h3>4.8</h3>
          <p>Average rating</p>
        </div>

        <div class="stat-box">
          <h3>124+</h3>
          <p>Happy travelers</p>
        </div>

        <div class="stat-box">
          <h3>98%</h3>
          <p>Would recommend</p>
        </div>
      </div>
      <!-- ADD REVIEW -->
      <div class="add-review" v-if="session.isLoggedIn">
        <h3>Share your experience</h3>

        <div class="rating-select">
          <img
            v-for="n in 5"
            :key="n"
            :src="
              n <= rev_rating
                ? '/src/videos-images/for-all/star.png'
                : '/src/videos-images/for-all/emptystar.png'
            "
            class="star-select"
            @click="rev_rating = n"
          />
        </div>

        <textarea
          v-model="rev_comment"
          placeholder="Tell other travelers about your experience..."
        ></textarea>

        <button @click="postReview">Post review</button>
      </div>

      <div v-else class="login-review-box">
        <img src="/src/videos-images/for-all/userforlogin.png" class="login-review-icon" />

        <h3>Want to share your experience?</h3>

        <p>
          Login to post reviews, rate your trip experience and help other travelers discover the
          perfect destination.
        </p>

        <button @click="$router.push('/login')">Login now</button>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="reviews-right" v-if="reviews.length">
      <!-- REVIEW -->
      <div class="review-card" v-for="rev in reviews" :key="rev.rev_id">
        <div class="review-top">
          <div class="user-info">
            <img src="/src/videos-images/for-all/userforlogin.png" class="user-img" />

            <div>
              <h4>{{ rev.usr_fullname }}</h4>
              <span>Created at {{ rev.rev_createdat }}</span>
            </div>
          </div>

          <div class="right-actions">
            <div class="review-stars">
              <img
                v-for="n in 5"
                :key="n"
                :src="
                  n <= rev.rev_rating
                    ? '/src/videos-images/for-all/star.png'
                    : '/src/videos-images/for-all/emptystar.png'
                "
                class="star-icon"
              />
            </div>

            <!-- ACTION MENU -->
            <div class="actions" v-if="session.user?.usr_id === rev.usr_id">
              <button @click.stop="editReview(rev)">
                <img src="/src/videos-images/for-all/edit.png" />
              </button>

              <button @click.stop="deleteReview(rev.rev_id)">
                <img src="/src/videos-images/for-all/bin.png" />
              </button>
            </div>
          </div>
        </div>

        <p>
          {{ rev.rev_comment }}
        </p>
      </div>
    </div>

    <div v-else>
      <h1 style="text-align: center">No reviews at the moment!</h1>
    </div>
  </section>

  <div v-if="showGallery" class="lightbox" @click.stop>
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

  <div v-if="showBooking" class="booking-modal" @click.self="showBooking = false">
    <div class="booking-content">
      <!-- CLOSE -->
      <button class="close-btn" @click="showBooking = false">✕</button>

      <!-- HEADER -->
      <div class="booking-header">
        <h2>Complete your reservation</h2>
        <p>You're one step away from your next unforgettable adventure</p>
      </div>

      <!-- FORM -->
      <div class="booking-form">
        <div class="input-group" v-if="!session.isLoggedIn">
          <label>Full name</label>
          <input type="text" placeholder="Enter your full name" v-model="fullname" />
        </div>

        <div class="input-group" v-if="!session.isLoggedIn">
          <label>Email address</label>
          <input type="email" placeholder="Enter your email" v-model="email" />
        </div>

        <div class="input-group" v-if="!session.isLoggedIn">
          <label>Phone number</label>
          <input type="number" placeholder="Enter your phone number" v-model="phonenum" />
        </div>

        <div v-else class="logged">
          <h1>You are a logged person, you dont have to put your pesonal informations...</h1>
        </div>

        <div class="input-group">
          <label>Number of travelers</label>

          <select v-model="peopleCount">
            <option disabled value="">Select travelers</option>

            <option v-for="n in arrangement?.arr_capacity" :key="n" :value="n">
              {{ n }} Traveler{{ n > 1 ? 's' : '' }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label>Special requests</label>

          <textarea
            placeholder="Optional notes, room preferences, transport requests..."
          ></textarea>
        </div>

        <!-- SUMMARY -->
        <div class="booking-summary">
          <div>
            <span>Price per person</span>
            <strong>{{ arrangement?.arr_price }}€</strong>
          </div>

          <div>
            <span>Total price</span>
            <strong> {{ arrangement ? arrangement.arr_price * peopleCount : 0 }}€ </strong>
          </div>
        </div>

        <!-- BUTTON -->
        <button class="confirm-booking" @click="confirmBooking">Confirm booking</button>
      </div>
    </div>
  </div>

  <div v-if="isEditing" class="modal-overlay" @click.self="isEditing = false">
    <div class="modal">
      <h2>Edit Review</h2>

      <label>Rating</label>
      <input type="number" v-model="editForm.rev_rating" min="1" max="5" />

      <label>Comment</label>
      <textarea v-model="editForm.rev_comment"></textarea>

      <div class="modal-actions">
        <button class="save" @click="updateReview">Save</button>
        <button class="cancel" @click="isEditing = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { imageUrl } from '@/api/config'
import { useSessionStore } from '@/stores/sessionUser'

const session = useSessionStore()

const accSection = ref(null)

const route = useRoute()
const router = useRouter()

function goToDetails(id: number) {
  router.push({
    name: 'accomodation-details',
    params: { id },
  })
}

const showBooking = ref(false)

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

const peopleCount = ref(1)
const fullname = ref('')
const email = ref('')
const phonenum = ref()

function openBooking() {
  if (!session.isLoggedIn) {
    triggerToast('Please login to continue booking.', 'error')

    setTimeout(() => {
      router.push('/login')
    }, 1000)

    return
  }

  showBooking.value = true
}

async function confirmBooking() {
  if (!session.isLoggedIn) {
    triggerToast('You must login to book this arrangement!', 'error')

    router.push('/login')

    return
  }

  try {
    if (!arrangement.value) return

    await api.postBooking({
      usr_id: session.user.usr_id,
      arr_id: arrangement.value.arr_id,
      bok_num_people: peopleCount.value,
      bok_total_price: arrangement.value.arr_price * peopleCount.value,
    })

    triggerToast('Booking successful! Request has sent to owner, wait for answer!', 'success')

    fullname.value = ''
    email.value = ''
    phonenum.value = ''
    peopleCount.value = 1

    showBooking.value = false
  } catch (error) {
    console.log(error)
    triggerToast('Booking failed!', 'error')
  }
}

const rev_rating = ref()
const rev_comment = ref()

async function postReview() {
  if (!rev_rating.value || !rev_comment.value) {
    triggerToast('You must give a rating and comment!', 'error')
    return
  }
  try {
    const res = await api.postReview({
      usr_id: session.user.usr_id,
      arr_id: id,
      rev_rating: rev_rating.value,
      rev_comment: rev_comment.value,
    })

    console.log(res.data)

    rev_rating.value = 0
    rev_comment.value = ''

    triggerToast('Review added successfully!', 'success')

    await getReviews()
  } catch (error) {
    console.log(error)
  }
}

async function deleteReview(id: number) {
  try {
    await api.deleteReview(id, session.user.usr_id)
    triggerToast('Review deleted', 'success')
    await getReviews()
  } catch (err) {
    console.log(err)
    triggerToast('Delete failed', 'error')
  }
}

const isEditing = ref(false)

type EditReview = {
  rev_id: number | null
  usr_id: number | null
  arr_id: number | null
  rev_rating: number
  rev_comment: string
}

const editForm = ref<EditReview>({
  rev_id: null,
  usr_id: null,
  arr_id: null,
  rev_rating: 0,
  rev_comment: '',
})

function editReview(rev: any) {
  if (!rev.rev_id) return

  isEditing.value = true

  editForm.value = {
    rev_id: rev.rev_id,
    usr_id: rev.usr_id,
    arr_id: rev.arr_id,
    rev_rating: rev.rev_rating,
    rev_comment: rev.rev_comment,
  }
}

async function updateReview() {
  try {
    await api.updateReview(
      editForm.value.rev_id!,
      editForm.value.rev_rating,
      editForm.value.rev_comment,
    )

    isEditing.value = false
    await getReviews()
  } catch (err) {
    console.log(err)
  }
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

type Reviews = {
  rev_id: number
  usr_id: number
  usr_fullname: string
  arr_id: number
  rev_rating: number
  rev_comment: string
  rev_createdat: Date
}

const reviews = ref<Reviews[]>([])

async function getReviews() {
  try {
    const res = await api.getReviews(id)

    reviews.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getReviews()
})

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
  object-fit: inherit;
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
  height: 560px;
  overflow: hidden;
  align-items: stretch;
}

.main-img img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: inherit;
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

.thumb img:hover {
  background: rgba(0, 0, 0, 0.6);
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

.reviews-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;

  padding: 40px;

  margin: 100px auto;

  background: #f9f9f9;
  border-radius: 24px;

  max-width: 1300px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.reviews-left h2 {
  font-size: 34px;
  margin-bottom: 20px;
  color: #222;
}

.reviews-text {
  color: #666;
  line-height: 1.8;
  margin-bottom: 35px;
}

.review-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-box {
  flex: 1;
  min-width: 120px;

  background: white;
  border-radius: 18px;
  padding: 20px;

  text-align: center;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.stat-box h3 {
  font-size: 30px;
  color: #705519;
  margin-bottom: 5px;
}

.stat-box p {
  color: #777;
  font-size: 14px;
}

.reviews-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-card {
  background: white;
  border-radius: 20px;
  padding: 25px;

  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);

  transition: 0.3s ease;
}

.review-card:hover {
  transform: translateY(-4px);
}

.review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;

  background: #eee;
  padding: 10px;
}

.user-info h4 {
  margin: 0;
  font-size: 16px;
}

.user-info span {
  font-size: 13px;
  color: #888;
}

.review-stars {
  display: flex;
  gap: 4px;
}

.review-card p {
  color: #555;
  line-height: 1.7;
  font-size: 15px;
}

@media (max-width: 900px) {
  .reviews-section {
    grid-template-columns: 1fr;
  }

  .review-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.add-review {
  margin-top: 40px;

  background: white;
  padding: 25px;
  border-radius: 20px;

  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
}

.add-review h3 {
  margin-bottom: 20px;
  font-size: 22px;
}

.rating-select {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.star-select {
  height: 32px;
  cursor: pointer;
  transition: 0.2s ease;
}

.star-select:hover {
  transform: scale(1.15);
}

.add-review textarea {
  width: 100%;
  min-height: 120px;

  border: 1px solid #ddd;
  border-radius: 14px;

  padding: 15px;
  resize: none;

  outline: none;
  font-size: 15px;

  margin-bottom: 20px;
}

.add-review textarea:focus {
  border-color: #705519;
}

.add-review button {
  width: 100%;
  border: none;

  background: #705519;
  color: white;

  padding: 14px;
  border-radius: 12px;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s ease;
}

.add-review button:hover {
  background: #8a6b1f;
}

.login-review-box {
  margin-top: 25px;
  padding: 30px;

  background: linear-gradient(135deg, #ffffff, #f8f8f8);

  border-radius: 18px;
  border: 1px solid #ececec;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  transition: 0.3s ease;
}

.login-review-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.login-review-icon {
  width: 70px;
  height: 70px;
  object-fit: contain;

  margin-bottom: 15px;
  opacity: 0.9;
}

.login-review-box h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #222;
}

.login-review-box p {
  color: #666;
  font-size: 15px;
  line-height: 1.6;

  max-width: 400px;
  margin-bottom: 20px;
}

.login-review-box button {
  padding: 12px 28px;

  border: none;
  border-radius: 12px;

  background: #705519;
  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s ease;
}

.login-review-box button:hover {
  background: #8a6b1f;
  transform: scale(1.03);
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

.right-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.actions {
  display: flex;
  gap: 5px;
}

.actions button {
  border: none;
  width: 25;
  height: 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  background: #f9f9f9;
  justify-self: end;
}

.actions button img {
  height: 25px;
}

.actions button:hover {
  transform: scale(1.05);
}

.booking-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);

  backdrop-filter: blur(8px);
  overflow-y: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 99999;
  padding: 20px;
}

.booking-content {
  width: 100%;
  max-width: 600px;

  max-height: 80vh;
  overflow-y: auto;

  background: white;
  border-radius: 24px;

  padding: 35px;
  position: relative;

  animation: popup 0.3s ease;
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;

  background: #f3f3f3;
  cursor: pointer;

  font-size: 18px;
  transition: 0.3s;
}

.close-btn:hover {
  background: #111;
  color: white;
}

.booking-header {
  text-align: center;
  margin-bottom: 30px;
}

.booking-header h2 {
  font-size: 30px;
  margin-bottom: 10px;
}

.booking-header p {
  color: #777;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 600;
}

.input-group input,
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 14px;

  border-radius: 12px;
  border: 1px solid #ddd;

  font-size: 15px;
  transition: 0.3s;
}

.input-group textarea {
  resize: none;
  min-height: 120px;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #705519;

  box-shadow: 0 0 0 4px rgba(112, 85, 25, 0.12);
}

.booking-summary {
  margin-top: 10px;

  background: #f8f8f8;
  border-radius: 16px;

  padding: 18px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.booking-summary div {
  display: flex;
  justify-content: space-between;
}

.confirm-booking {
  margin-top: 10px;

  width: 100%;
  padding: 16px;

  border: none;
  border-radius: 14px;

  background: #705519;
  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.3s;
}

.confirm-booking:hover {
  background: #8a6b1f;
  transform: translateY(-2px);
}

.logged {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logged h1 {
  font-size: 20px;
  max-width: 500px;
  text-align: center;
  margin-bottom: 15px;
}

.transport-card {
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0, 0.08);
  margin-bottom: 40px;
  transition: 0.3s;
}

.transport-card:hover {
  transform: translateY(-3px);
}

.transport-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.transport-header img {
  width: 28px;
}

.transport-header h2 {
  font-size: 20px;
  color: #111;
}

/* BODY */
.transport-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ITEM */
.transport-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  background: #f7f7f7;
  border-radius: 10px;
}

.label {
  color: #777;
  font-size: 13px;
}

.value {
  font-weight: 600;
  color: #111;
}

/* EMPTY STATE */
.transport-empty {
  text-align: center;
  padding: 40px 20px;
  color: #888;
}

.transport-empty img {
  width: 50px;
  margin-bottom: 10px;
}

.transport-empty h3 {
  margin-bottom: 5px;
  color: #666;
}

@media (max-width: 900px) {
  .details-page {
    padding-top: 140px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .container {
    width: 100%;
  }

  /* TOP TEXT */
  .top-text {
    margin-bottom: 60px;
  }

  .top-text h1 {
    font-size: 22px;
    line-height: 1.3;
  }

  .location {
    font-size: 13px;
  }

  /* HERO */
  .hero {
    height: 260px;
    margin-bottom: 20px;
  }

  .hero-img {
    border-radius: 16px;
  }

  .hero-overlay {
    bottom: 10px;
    left: 10px;
    padding: 10px 14px;
    font-size: 12px;
  }

  /* CONTENT STACK */
  .content {
    flex-direction: column;
    gap: 20px;
  }

  .booking-card {
    width: 100%;
    padding: 16px;
    border-radius: 14px;
  }

  /* ACCOMMODATION */
  .acc-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 60px;
  }

  .acc-card {
    height: 100px;
  }

  .acc-info h3 {
    font-size: 14px;
  }

  .room {
    font-size: 12px;
  }

  /* GALLERY */
  .acc-images {
    grid-template-columns: 1fr;
    height: auto;
    gap: 8px;
  }

  .thumb-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }

  .main-img {
    height: 220px;
  }

  .thumb img {
    height: 90px;
  }

  /* REVIEWS */
  .reviews-section {
    grid-template-columns: 1fr;
    padding: 20px;
    margin: 60px auto;
  }

  .reviews-left h2 {
    font-size: 22px;
  }

  .stat-box h3 {
    font-size: 22px;
  }

  /* ADD REVIEW */
  .add-review {
    padding: 18px;
  }

  .add-review h3 {
    font-size: 18px;
  }

  .star-select {
    height: 26px;
  }

  /* MODAL */
  .booking-content {
    max-width: 95%;
    max-height: 90vh;
    padding: 20px;
    border-radius: 18px;
  }

  .booking-header h2 {
    font-size: 22px;
  }

  .close-btn {
    top: 10px;
    right: 10px;
    width: 34px;
    height: 34px;
  }

  /* TRANSPORT */
  .transport-card {
    padding: 14px;
  }

  .transport-header h2 {
    font-size: 16px;
  }

  .transport-item {
    font-size: 13px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
}

.modal h2 {
  margin-bottom: 15px;
}

.modal input,
.modal textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.save {
  background: green;
  color: white;
  padding: 8px 12px;
}

.cancel {
  background: red;
  color: white;
  padding: 8px 12px;
}
</style>
