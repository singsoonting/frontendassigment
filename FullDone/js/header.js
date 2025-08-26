document.addEventListener("DOMContentLoaded", function () {
   document.getElementById("header").innerHTML = `
    <header>
        <div class="header-container">
            <a href="index.html" class="logo">
                Malaysian <span>Street Food</span>
            </a>
            <div class="menu-toggle" id="menu-toggle">☰</div>
            <nav>
                <div class="nav-container">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="about.html" class="nav-link">About Us</a>
                    <a href="food.html" class="nav-link">Food</a>
                    <a href="location.html" class="nav-link">Location</a>
                    <a href="myfavourite.html" class="nav-link">My Favourite</a>
                    <a href="events.html" class="nav-link">Events</a>
                    <a href="Feedback.html" class="nav-link">Feedback</a>
                    <a href="ContactUs.html" class="nav-link">Contact Us</a>
                    <a href="faq.html" class="nav-link">FAQ</a>
                </div>
               <a href="#" id="logout-btn" class="nav-link">Logout</a>
            </nav>
        </div>
    </header>
   `;

   const menuToggle = document.getElementById("menu-toggle");
   const nav = document.querySelector("nav");

   if (menuToggle && nav) {
       menuToggle.addEventListener("click", function () {
           nav.classList.toggle("active");
       });
   }

   const logoutBtn = document.getElementById("logout-btn");
   if(logoutBtn) {
        logoutBtn.addEventListener("click", function(){
            removeCookie("loggedInUser"); 
            alert("Logout successful!");
            window.location.href = "login.html";
        });
   }
});