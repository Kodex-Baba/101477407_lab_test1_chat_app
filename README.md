# 101477407_lab_test1_chat_app

# Chat Application - Real-Time Messaging System

This is a real-time chat application built with **Socket.io**, **Express**, **MongoDB**, and **JWT Authentication**. It allows users to sign up, log in, join different chat rooms (for both private and group chats), and send/receive messages.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [Routes](#routes)
- [How to Use](#how-to-use)
- [Contributing](#contributing)

---

## Project Overview

This project is designed to provide users with the ability to:

- **Register** and **log in** using a secure JWT-based authentication system.
- Join **group chat rooms** or **private chats** with other users.
- Send and receive messages in real-time via **Socket.io**.
- Use **MongoDB** to persist user data, group messages, and private messages.

The application is structured with a **frontend** built using basic HTML, CSS, and JavaScript, and a **backend** powered by **Express.js** and **MongoDB**.

---

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript, Socket.io (for frontend WebSocket communication)
- **Backend**: Node.js, Express.js, Socket.io (for backend WebSocket communication)
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt.js
- **Real-Time Communication**: Socket.io (for broadcasting messages in real-time)
- **CORS**: Cross-Origin Resource Sharing configuration for frontend-backend communication

---

## Features

- **User Registration**: Users can register with their username, first name, last name, and password.
- **User Login**: Existing users can log in using their username and password.
- **JWT Authentication**: Secure login via JWT tokens to authenticate requests.
- **Join Rooms**: Users can join group chat rooms or private chats with other users.
- **Send/Receive Messages**: Real-time message exchange between users, whether in private chats or group chats.
- **MongoDB Persistence**: All messages are saved to MongoDB for historical purposes.
- **Socket

