# 🎉 Event Platform – MERN Stack (React + Node + MongoDB)

A fully functional event management web application built using the **MERN Stack**.  
Users can sign up, log in, create events, upload images, RSVP to events, and manage events they created.

---

## 🌐 Live Demo

Frontend (Live Website):  
👉 **https://event-platform-fe-05o0.onrender.com**

Backend API:  
👉 **https://event-platform-6ro9.onrender.com/api**

---

## ✨ Features

### 👤 Authentication
- User Signup & Login
- JWT Authentication
- Protected API routes
- Stored user session in localStorage

### 📅 Event Management
- Create new events  
- Upload event images  
- Edit event details  
- Delete events (only creator can delete)  
- View all upcoming events  

### 🙋 RSVP System
- Join events (RSVP)
- Cancel RSVP
- Shows attendee count
- Prevents exceeding event capacity

### 🖼️ Image Upload
- Supports image uploads  
- Cloudinary / Local uploads (depending on setup)

### 🎨 Frontend UI
- Clean and simple React interface
- Responsive layout
- Dynamic navbar based on login status

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API (Auth)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image uploads)

### Deployment
- Render (Backend & Frontend)

## 📦 Installation & Setup (Local Environment)

- Backend :
  (1) cd server
  (2) npm install
  
- Create .env file inside server/:
  (3) MONGO_URI = your-mongodb-url
  (4) JWT_SECRET = any-secret-string
  (5) CLIENT_URL = http://localhost:5173

- Start Backend (server) :
  (6) npm run dev

- Frontend :
  (1) cd client
  (2) npm install

- Create .env file inside client/ :
  (3) VITE_API_URL = http://localhost:5000/api

- Start Frontend (client) :
  (4) npm run dev

🧑‍💻 Author : Yugendhar Reddy
Username : YugendharReddyV
