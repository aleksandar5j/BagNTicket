<script setup lang="ts"></script>

<template>
  <div class="about-page">
    <div class="container">
      <!-- HEADER -->
      <div class="about-header">
        <h1>About <span>Bag n Ticket</span></h1>
        <p>
          Your journey begins here. We turn travel dreams into unforgettable experiences across the
          world.
        </p>
      </div>

      <!-- MAIN CONTENT -->
      <div class="about-content">
        <!-- TEXT -->
        <div class="about-text">
          <h2>Who We Are</h2>
          <p>
            Baag n Ticket is a modern travel platform designed to make exploring the world simple,
            exciting, and accessible. We specialize in carefully selected destinations, premium
            accommodations, and unique travel experiences tailored to every type of traveler.
          </p>

          <p>
            Whether you're looking for a relaxing beach escape, a luxury getaway, or an adventurous
            city trip, our mission is to provide you with the best options — all in one place.
          </p>

          <h2>Our Mission</h2>
          <p>
            We aim to deliver seamless travel planning with trusted partners, transparent pricing,
            and unforgettable memories. Every journey matters, and we make sure yours is perfect.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Hand-picked destinations and hotels</li>
            <li>✔ Best price deals and last-minute offers</li>
            <li>✔ Easy booking experience</li>
            <li>✔ Reliable customer support</li>
          </ul>
        </div>
      </div>

      <!-- LOCATION -->
      <div class="location-section">
        <h2>Our Location</h2>
        <p>Visit us or get in touch — we are always ready to help you plan your next trip.</p>

        <div class="location-box">
          <div class="location-info">
            <p><strong>Address:</strong> Belgrade, Serbia</p>
            <p><strong>Phone:</strong> +381 60 123 4567</p>
            <p><strong>Email:</strong> info@bagnticket.com</p>
          </div>

          <!-- MAP -->
          <div class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4761.373469315629!2d20.465741789878237!3d44.79854730526869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1778020515344!5m2!1sen!2sus"
              width="600"
              height="450"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding-top: 300px;
  padding-bottom: 80px;
}

/* CONTAINER */
.container {
  max-width: 1300px;
  margin: 0 auto;
}

/* HEADER */
.about-header {
  text-align: center;
}

.about-header h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.about-header span {
  color: #705519;
}

.about-header p {
  max-width: 600px;
  margin: auto;
  opacity: 0.8;
}

/* CONTENT */
.about-content {
  display: flex;
  gap: 40px;
  margin-top: 180px;

  background: #fff;
  padding: 30px;
  border-radius: 16px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* TEXT */
.about-text {
  flex: 1;
}

.about-text h2 {
  margin-top: 20px;
}

.about-text p {
  margin-top: 10px;
  color: #555;
}

.about-text ul {
  margin-top: 10px;
  padding-left: 20px;
}

.about-text li {
  margin-bottom: 5px;
}

/* IMAGE */
.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
}

/* LOCATION */
.location-section {
  margin-top: 80px;
  text-align: center;
}

.location-section h2 {
  margin-bottom: 10px;
}

.location-box {
  margin-top: 30px;
  display: flex;
  gap: 30px;

  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);

  padding: 25px;
  border-radius: 16px;

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* INFO */
.location-info {
  flex: 1;
  text-align: left;
}

/* MAP */
.map {
  flex: 1;
}

.map iframe {
  width: 100%;
  height: 250px;
  border-radius: 12px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .about-content,
  .location-box {
    flex-direction: column;
  }
}
</style>
