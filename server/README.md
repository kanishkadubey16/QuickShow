# QuickShow – Modern Movie Booking & Management System

## Problem Statement
Traditional movie booking experiences can be cumbersome, with fragmented interfaces and a lack of real-time visibility into seat availability and show timings. Users often struggle to find trailers and detailed movie information in one place, while theater administrators face challenges in managing show schedules and monitoring booking performance.

**QuickShow** solves this by providing a sleek, centralized movie platform. Users can discover the latest movies, watch trailers, and book their preferred seats with ease. Simultaneously, administrators can manage the entire show cycle through a powerful, data-driven dashboard.

## System Architecture

### Architecture Flow
**Frontend (React/Vite)** → **Backend (Node.js + Express APIs)** → **Database (MongoDB)**

### Frontend
- **Framework:** React with Vite (Fast & Optimized)
- **Styling:** Tailwind CSS (Modern & Responsive)
- **Icons:** Lucide-React & Heroicons
- **Animations:** Framer Motion
- **API Client:** Axios / Fetch

### Backend
- **Framework:** Node.js & Express.js
- **Security:** JWT Authentication
- **Database Logic:** Mongoose ODM
- **Environment Management:** Dotenv

### Database
- **Primary Database:** MongoDB Atlas (NoSQL)

### Hosting
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

## Key Features

### 🔐 Authentication & Authorization
- Secure login and registration using **JWT**.
- Persistent user sessions with localStorage.
- Protected user and admin routes using specialized **Context Providers**.

### 🎫 Movie Discovery & Booking
- Browse "Now Showing" and high-rated movies.
- Real-time movie details including cast, overview, and integrated **YouTube trailers**.
- Interactive **Seat Selection** system.
- Personal booking history and ticket management.

### 🛠️ Admin Dashboard
- **Live Statistics:** Track total bookings, revenue, active shows, and users.
- **Show Management:** Add new movie shows with custom timings and prices.
- **Movie Control:** Catalog management and database seeding.

### 👤 User Dashboard / Profile
- Manage account details and profile photos.
- View and track personal bookings.
- Curate a list of "Favourite" movies.

### 🧱 Scalable Architecture
- Decoupled Frontend and Backend for independent scaling.
- Clean **RESTful API** design.
- Reusable React components and specialized Context API for state management.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB (Mongoose)

### Tools
- Git & GitHub
- Netlify (Frontend Deployment)
- Render (Backend Deployment)
- TMDB API (Movie Data)

## API Overview
All API routes are mounted under `/api`. Protected routes require a valid JWT token.

### Authentication
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register a new user | Public |
| `/api/auth/login` | `POST` | Authenticate user | Public |
| `/api/auth/dashboard`| `GET` | Get user profile data | User |

### Admin & Shows
| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/admin/stats` | `GET` | Get dashboard analytics | Admin |
| `/api/admin/shows` | `GET` | List all scheduled shows | Public |
| `/api/admin/shows` | `POST` | Create a new show | Admin |

## Ticket Booking Lifecycle
1. **Discovery:** User browses movies and selects a show.
2. **Selection:** User picks available seats from the interactive layout.
3. **Payment:** User proceeds to the payment interface.
4. **Confirmation:** System generates a booking and updates seat availability.
5. **Management:** User tracks the booking in their "My Bookings" section.
