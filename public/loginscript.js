
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const passwordToggles = document.querySelectorAll('.password-toggle');

// Form switching
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

//password
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            toggle.classList.replace('fa-eye-slash', 'fa-eye');
        } else {
            input.type = 'password';
            toggle.classList.replace('fa-eye', 'fa-eye-slash');
        }
    });
});

// validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validatePhone(phone) {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
}

function showError(input, message) {
    const inputGroup = input.parentElement;
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
    
    let errorMessage = inputGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        inputGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

function showSuccess(input) {
    const inputGroup = input.parentElement;
    inputGroup.classList.remove('error');
    inputGroup.classList.add('success');
    
    const errorMessage = inputGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Signup form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Get form values
    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const phone = document.getElementById('signup-phone');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm-password');
    const terms = document.getElementById('terms');

    // Validate name
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        showSuccess(name);
    }

    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        showSuccess(email);
    }

    // Validate phone
    if (!validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    } else {
        showSuccess(phone);
    }

    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        showSuccess(password);
    }

    // Validate confirm password
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else {
        showSuccess(confirmPassword);
    }

    // Validate terms
    if (!terms.checked) {
        alert('Please accept the terms and conditions');
        isValid = false;
    }

    if (isValid) {
        const userData = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            password: password.value, 
            timestamp: new Date().toISOString()
        };

        try {
            // Store in localStorage
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Check if email already exists
            if (users.some(user => user.email === email.value)) {
                showError(email, 'Email already registered');
                return;
            }

            

            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.cssText = `
                background-color: var(--success-color);
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin-bottom: 20px;
                text-align: center;
                position: fixed;
                top: 20px;
                right: 20px;
                animation: slideIn 0.5s ease;
            `;
            successMessage.textContent = 'Registration successful! Please login.';
            document.body.appendChild(successMessage);

            
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);

            // Reset form
            signupForm.reset();
            
            // Switch to login section
            setTimeout(() => {
                signupSection.classList.add('hidden');
                loginSection.classList.remove('hidden');
            }, 2000);

        } catch (error) {
            console.error('Error saving user data:', error);
            alert('An error occurred. Please try again.');
        }
    }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Get form values
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');
    const rememberMe = document.getElementById('remember-me');

    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        showSuccess(email);
    }

    // Validate password
    if (password.value.trim() === '') {
        showError(password, 'Password is required');
        isValid = false;
    } else {
        showSuccess(password);
    }

    if (isValid) {
        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email.value && u.password === password.value);

            if (user) {
                
                if (rememberMe.checked) {
                    localStorage.setItem('rememberedEmail', email.value);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

            
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    background-color: var(--success-color);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    text-align: center;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    animation: slideIn 0.5s ease;
                `;
                successMessage.textContent = 'Login successful! Redirecting...';
                document.body.appendChild(successMessage);

           
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);

            } else {
                // Show error message
                showError(email, 'Invalid email or password');
                showError(password, 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    }
});

// Add input event listeners for real-time validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        const inputGroup = input.parentElement;
        inputGroup.classList.remove('error', 'success');
        const errorMessage = inputGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
});

// Check for remembered email on page load
window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        const loginEmail = document.getElementById('login-email');
        loginEmail.value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
});

// Add floating label animation
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Check if input has value on page load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .success-message {
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);