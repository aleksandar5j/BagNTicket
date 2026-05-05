<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const success = ref('')
const error = ref('')

function sendMessage() {
  success.value = ''
  error.value = ''

  if (!name.value || !email.value || !message.value) {
    error.value = 'Please fill all fields'
    return
  }

  // ovde ces kasnije API poziv
  console.log({
    name: name.value,
    email: email.value,
    message: message.value,
  })

  success.value = 'Message sent successfully!'
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <!-- HEADER -->
      <div class="contact-header">
        <h1>Contact <span>Us</span></h1>
        <p>
          Have questions or need help planning your trip? We're here for you. Reach out and our team
          will get back to you as soon as possible.
        </p>
      </div>

      <!-- CONTENT -->
      <div class="contact-content">
        <!-- LEFT INFO -->
        <div class="contact-info">
          <h3>Get in touch</h3>

          <div class="info-item">📍 <span>Belgrade, Serbia</span></div>

          <div class="info-item">📞 <span>+381 60 123 4567</span></div>

          <div class="info-item">✉️ <span>info@bagnticket.com</span></div>

          <p class="info-desc">
            Our support team is available every day to help you find the perfect destination and
            answer all your questions.
          </p>
        </div>

        <!-- RIGHT FORM -->
        <div class="contact-form">
          <h3>Send a Message</h3>

          <input v-model="name" type="text" placeholder="Your Name" />
          <input v-model="email" type="email" placeholder="Your Email" />
          <textarea v-model="message" placeholder="Your Message"></textarea>

          <button @click="sendMessage">Send Message</button>

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">{{ success }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  padding-top: 300px;
  padding-bottom: 80px;
}

/* CONTAINER */
.container {
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}

/* HEADER */
.contact-header h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.contact-header span {
  color: #705519;
}

.contact-header p {
  max-width: 700px;
  margin: auto;
  opacity: 0.8;
  margin-bottom: 180px;
}

/* CONTENT */
.contact-content {
  display: flex;
  gap: 40px;
  margin-top: 60px;
}

/* INFO */
.contact-info {
  flex: 1;
  text-align: left;

  background: #fff;
  padding: 30px;
  border-radius: 16px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.contact-info h3 {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 12px;
  font-size: 15px;
}

.info-desc {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

/* FORM */
.contact-form {
  flex: 1;

  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);

  padding: 30px;
  border-radius: 16px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.contact-form h3 {
  margin-bottom: 20px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid #ccc;

  font-size: 14px;
}

.contact-form textarea {
  height: 120px;
  resize: none;
}

/* FOCUS */
.contact-form input:focus,
.contact-form textarea:focus {
  border: 1px solid #705519;
  outline: none;

  box-shadow: 0 0 8px rgba(112, 85, 25, 0.4);
}

/* BUTTON */
.contact-form button {
  width: 100%;
  padding: 12px;

  border: none;
  border-radius: 10px;

  background: #705519;
  color: #fff;

  cursor: pointer;
  transition: 0.3s;
}

.contact-form button:hover {
  background: #8a6a22;
}

/* MSG */
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }
}
</style>
