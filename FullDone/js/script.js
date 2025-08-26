
// Cookie Utility Functions

function setCookie(name, value, days = 0) {
    let expires = "";
    if (days > 0) {
        const date = new Date();
        date.setTime(date.getTime() + days*24*60*60*1000);
        expires = ";expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";
    console.log("Cookie set:", name, "=", value);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let c of ca) {
        c = c.trim();
        if(c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}

function removeCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    console.log("Cookie removed:", name);
}

// Registration//
const registerForm = document.getElementById('register-form');
if(registerForm) {
    registerForm.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim().toLowerCase();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if(!username || !email || !password) {
            alert("Please fill all fields!");
            return;
        }
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = getCookie('users');
        users = users ? JSON.parse(users) : [];

        if(users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            alert("Username already exists!");
            return;
        }
        if(users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            alert("Email already exists!");
            return;
        }

        users.push({username, email, password});
        setCookie('users', JSON.stringify(users), 365); // Users are saved for 1 year
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
    });
}

//login

const loginForm = document.getElementById('login-form');
if(loginForm) {
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const usernameOrEmail = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const stayLoggedIn = document.getElementById('stay-logged-in')?.checked;

        if(!usernameOrEmail || !password) {
            alert("Please fill all fields!");
            return;
        }

        let users = getCookie('users');
        users = users ? JSON.parse(users) : [];

        const user = users.find(u => 
            (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
            u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
            u.password === password
        );

        if(user) {
            if(stayLoggedIn) {
                setCookie('loggedInUser', JSON.stringify(user), 7); // Stay logged in for 7 days
            } else {
                setCookie('loggedInUser', JSON.stringify(user)); // session cookie，expires when the browser is closed
            }
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            const userExists = users.some(u => u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase());
            if(userExists) {
                alert("Incorrect password!");
            } else {
                alert("Username or email not found. Please register.");
            }
        }
    });
}


//logout
const logoutBtn = document.getElementById('logout-btn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', function(){
        removeCookie('loggedInUser');
        alert("Logout successful!");
        window.location.href = "login.html";
    });
}

//page protection
document.addEventListener('DOMContentLoaded', function(){
    const protectedPages = ["index.html", "dashboard.html", "profile.html"]; // Pages that require protection
    const currentPage = window.location.pathname.split("/").pop();
    if(protectedPages.includes(currentPage)) {
        const loggedInUser = getCookie('loggedInUser');
        if(!loggedInUser) {
            window.location.href = "login.html";
        }
    }
});
// Auto-slider for 
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${-slideIndex * 100}%)`;
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.fcontact-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting

            // Show a success message
            alert('Form successfully submitted! Thank you for your message.');

            // Optionally, you could clear the form fields after submission
            form.reset();
        });
    }
});