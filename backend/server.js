require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const GroupMessage = require('./models/GroupMessage');
const PrivateMessage = require('./models/PrivateMessage');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow all origins for now
        methods: ['GET', 'POST']
    }
});


// Connect to MongoDB
connectDB();

// Middleware


app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Chat server is running...');
});

// Routes
app.use('/api/users', userRoutes);

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a room
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room: ${room}`);
    });

    // Handle sending a group message
    socket.on('sendGroupMessage', async (data) => {
        const { from_user, room, message } = data;

        const groupMessage = new GroupMessage({
            from_user,
            room,
            message,
        });

        await groupMessage.save();
        io.to(room).emit('receiveGroupMessage', groupMessage); // Broadcast to the room
    });

    // Handle sending a private message
    socket.on('sendPrivateMessage', async (data) => {
        const { from_user, to_user, message } = data;

        const privateMessage = new PrivateMessage({
            from_user,
            to_user,
            message,
        });

        await privateMessage.save();
        io.to(to_user).emit('receivePrivateMessage', privateMessage); // Send only to the recipient
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});