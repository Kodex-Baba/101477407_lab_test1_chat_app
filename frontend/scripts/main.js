$(document).ready(function() {
    const socket = io();  // Connecting to the Socket.io server

    // Get user information from localStorage
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwt_decode(token); // Decode the token to get user info
        $('#username').text(decoded.username); // Display username
    }

    // Handle Join Room button click
    $('#join-room-btn').click(function() {
        const roomName = $('#room-name').val();
        if (roomName) {
            // Join the room
            socket.emit('joinRoom', roomName);
            $('#chat-room').show();
            $('#room-selection').hide();
            $('#messages-container').html(''); // Clear messages container
        }
    });

    // Handle Message Form Submission
    $('#message-form').submit(function(event) {
        event.preventDefault();
        const message = $('#message-input').val();
        const roomName = $('#room-name').val();
        const username = $('#username').text();

        if (message && roomName) {
            // Send message to the server
            socket.emit('sendGroupMessage', {
                from_user: username,
                room: roomName,
                message: message
            });

            // Clear message input
            $('#message-input').val('');
        }
    });

    // Listen for group messages and display them
    socket.on('receiveGroupMessage', function(data) {
        const { from_user, message } = data;
        const messageElement = `<div><strong>${from_user}:</strong> ${message}</div>`;
        $('#messages-container').append(messageElement);
        $('#messages-container').scrollTop($('#messages-container')[0].scrollHeight);  // Scroll to the bottom
    });

    // Handle Logout
    $('#logout-btn').click(function() {
        localStorage.removeItem('token'); // Remove token from localStorage
        window.location.href = '../views/login.html'; // Redirect to login
    });
});
