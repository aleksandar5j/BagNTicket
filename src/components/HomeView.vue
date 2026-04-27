<script setup lang="ts"></script>

<template>
  <div class="home">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Find the best destinations, hotels and travel deals worldwide</p>

        <!-- SEARCH BAR (osnova za kasnije backend) -->
        <div class="search-box">
          <input type="text" placeholder="Where do you want to go?" />
          <button>Search</button>
        </div>
      </div>
    </section>

    <!-- FEATURED DESTINATIONS -->
    <section class="featured">
      <h2>Popular Destinations</h2>

      <div class="grid">
        <div class="card">Bali</div>
        <div class="card">Paris</div>
        <div class="card">New York</div>
        <div class="card">Tokyo</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 80px;
}

/* HERO */
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

/* SEARCH */
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

/* FEATURED */
.featured {
  text-align: center;
}

.featured h2 {
  margin-bottom: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.card {
  height: 120px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 500;
  transition: 0.2s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  background: #eee;
}
</style>
