# 🎫 Bag n Ticket – Travel Agency Web Platform

A modern full-stack web application for managing travel bookings, destinations, arrangements, reviews, and user interactions.

**Bag n Ticket** is a travel agency system that allows users to explore destinations, book trips, leave reviews, and manage their travel activity in one place.

---

## 🌍 About the Project

**Bag n Ticket** is built as a real-world tourism platform where users can:

- Browse travel destinations (countries & cities)
- View detailed travel arrangements (hotels, transport, pricing)
- Book trips and calculate total cost
- Leave ratings and comments on trips
- Manage favorite destinations
- Upload and view image galleries
- Register and log into personal accounts
- Edit or delete their own bookings and reviews

The system simulates a real travel agency workflow from browsing → booking → reviewing.

---

## ✨ Core Features

### 👤 User System

- User registration & login
- Session-based authentication
- Protected user actions
- Personal booking & review management

---

### 🏝️ Destinations

- List of destinations (countries & cities)
- Filtering system (country, category, price)
- Destination details page
- Image gallery per destination

---

### 🏨 Arrangements

- Travel packages with:
  - Hotel information
  - Transport type (plane, bus, etc.)
  - Price calculation
  - Duration & description

---

### 📦 Bookings

- Book selected arrangements
- Select number of people
- Automatic total price calculation
- View booking history per user
- Delete bookings

---

### ⭐ Reviews System

- Add review (rating + comment)
- Edit review (popup modal UI)
- Delete review (only owner access)
- Linked to user and arrangement

---

### ❤️ Favorites

- Add/remove favorite destinations
- Personalized user favorites list
- Persistent storage per user

---

### 🖼️ Media System

- Image galleries for destinations
- Visual presentation of travel locations

---

## 🛠️ Tech Stack

### Frontend

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router
- Pinia (state management)
- Axios (API communication)

---

### Backend

- Custom REST API architecture
- Param-based request handling (`param()`)
- SQL queries via `db.query()`
- Modular utility system (`main_utils`)

---

### Database

- MySQL relational database
- Main tables:
  - users
  - destinations
  - arrangements
  - bookings
  - reviews
  - favorites
  - transport
  - hotels

---

## 🔌 API Structure

Frontend communicates with backend via Axios wrapper:

### Main endpoints:

- `front/destinations`
- `front/arrangements`
- `front/bookings`
- `front/reviews`
- `front/favorites`

### Example actions:

- `POST` → create booking / review
- `PUT` → update review
- `DELETE` → remove booking/favorite
- `GET` → fetch data with filters

---

## 🎨 UI / UX

- Responsive mobile-first design
- Modal popups for editing reviews
- Clean card-based layout system
- Toast notifications for feedback
- Smooth transitions between pages
- Filter & search functionality

---

## 🔐 Authentication System

- Login / Register flow
- Pinia session store
- Protected routes and actions
- User-based permissions:
  - Only owner can edit/delete reviews
  - Only logged-in users can book

---

## 🚀 Installation Guide

Follow these steps to run the project locally on your machine.

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bag-n-ticket.git
cd bag-n-ticket
pnpm install
pnpm dev
```

stallation Guide

Follow these steps to run the project locally on your machine.

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bag-n-ticket.git
cd bag-n-ticket
pnpm install
pnpm dev
```
