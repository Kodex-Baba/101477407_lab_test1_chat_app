document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, firstname, lastname, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Signup successful! Redirecting to join groups...');
            window.location.href = 'joinGroups.html'; // Redirect to join groups page
        } else {
            alert(result.message); // Show error message
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showError("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Server Response:', data);  // Debugging line

        if (!response.ok) {
            showError(data.message || "Login failed.");
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.href = 'chat.html';  // Redirect to chat after login
    } catch (error) {
        showError("Server error. Please try again.");
    }
});

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerText = message;
    errorDiv.classList.remove('d-none');
}
