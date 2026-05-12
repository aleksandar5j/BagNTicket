<template>
  <div class="bookings-page">
    <div class="container">
      <h1 class="title">Your <strong style="color: #705519">Booked Adventures</strong></h1>
      <p class="desc">
        Here you can find all your confirmed and upcoming trips. Every booking is a step closer to
        your next unforgettable experience, carefully planned and ready to enjoy.
      </p>

      <div v-if="bookings.length" class="bookings-list">
        <div class="booking-card" v-for="bok in bookings" :key="bok.bok_id">
          <!-- IMAGE -->
          <div class="img-box">
            <img :src="imageUrl + bok.image" />
          </div>

          <div class="info">
            <div class="top-row">
              <h2>{{ bok.arr_title }}</h2>
            </div>

            <p class="location">
              <img src="/src/videos-images/for-all/location.png" />
              {{ bok.des_name }}, {{ bok.des_country }}
            </p>

            <div class="meta-row">
              <div class="meta-item">
                <img src="/src/videos-images/for-all/userforlogin.png" />
                <span>{{ bok.bok_num_people }} people</span>
              </div>

              <div class="meta-item">
                <img src="/src/videos-images/for-all/calendar.png" />
                <span>{{ bok.bok_booking_date }}</span>
              </div>

              <div class="meta-item">
                <img src="/src/videos-images/for-all/money.png" />
                <span>{{ bok.bok_total_price }}€</span>
              </div>
            </div>

            <p class="dates">{{ bok.arr_available_from }} → {{ bok.arr_available_to }}</p>
          </div>

          <div class="actions">
            <button @click="goToDetails(bok.arr_id)">View</button>
            <button class="danger" @click="deleteBook(bok.bok_id)">Cancel</button>
            <span class="status" :class="bok.bok_status">
              {{ bok.bok_status }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="no-fav" style="margin-top: 200px; margin-bottom: 150px">
        <h2>No bookings yet</h2>
        <p>Start exploring and book perfect arrangement.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import { imageUrl } from '@/api/config'
import { useSessionStore } from '@/stores/sessionUser'
import router from '@/router'

const session = useSessionStore()

type Booking = {
  bok_id: number
  bok_num_people: number
  bok_total_price: number
  bok_booking_date: string
  bok_status: string

  usr_fullname: string

  arr_id: number
  arr_title: string
  arr_available_from: string
  arr_available_to: string

  des_name: string
  des_country: string

  image: string
}

function goToDetails(id: number) {
  router.push({
    name: 'arrangement-details',
    params: { id },
  })
}

const bookings = ref<Booking[]>([])

async function deleteBook(bok_id) {
  try {
    await api.deleteBooking(session.user.usr_id, bok_id)

    await getBookings()
  } catch (error) {
    console.log(error)
  }
}

async function getBookings() {
  try {
    const res = await api.getBookings(session.user.usr_id)
    bookings.value = res.data.data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  if (session.isLoggedIn) {
    getBookings()
  }
})
</script>

<style scoped>
.bookings-page {
  padding-top: 300px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1300px;
}

.title {
  font-size: 50px;
  text-align: center;
}

.desc {
  margin: auto;
  max-width: 700px;
  text-align: center;
  margin-bottom: 200px;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
}

.booking-card {
  display: flex;
  align-items: stretch;

  width: 100%;
  height: 170px;

  background: #f7f7f7;
  border-radius: 18px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0, 0.08);

  overflow: hidden;
  transition: 0.3s;
}

.booking-card:hover {
  transform: translateY(-4px);
}

.img-box {
  width: 240px;
  flex-shrink: 0;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
  padding: 15px 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-row h2 {
  font-size: 20px;
}

.status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.status.approved {
  background: #d4edda;
  color: #155724;
}

.status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #777;
  font-size: 14px;
}

.location img {
  width: 16px;
}

.meta-row {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #555;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item img {
  width: 16px;
}

.dates {
  font-size: 13px;
  color: #888;
}

.actions {
  width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 15px;
}

.actions button {
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #111;
  color: #fff;
  transition: 0.3s;
}

.actions button:hover {
  background: #705519;
}

.actions .danger {
  background: #88342f;
}

.actions .danger:hover {
  background: darkred;
}

.no-fav {
  text-align: center;
  margin-top: 50px;
}

@media (max-width: 900px) {
  /* PAGE */
  .bookings-page {
    padding-top: 140px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .title {
    font-size: 26px;
  }

  .desc {
    margin-bottom: 60px;
    font-size: 14px;
    padding: 0 10px;
  }

  /* LIST */
  .bookings-list {
    gap: 15px;
  }

  /* CARD → STACK */
  .booking-card {
    flex-direction: column;
    height: auto;
    border-radius: 16px;
  }

  /* IMAGE */
  .img-box {
    width: 100%;
    height: 180px;
  }

  .img-box img {
    height: 100%;
  }

  /* INFO */
  .info {
    padding: 12px 14px;
    gap: 8px;
  }

  .top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .top-row h2 {
    font-size: 16px;
  }

  /* STATUS */
  .status {
    font-size: 11px;
    padding: 4px 10px;
  }

  /* LOCATION */
  .location {
    font-size: 12px;
  }

  /* META */
  .meta-row {
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
  }

  /* DATES */
  .dates {
    font-size: 12px;
  }

  .actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px;
  }

  .actions button {
    flex: 1;
    font-size: 13px;
  }
}
</style>
