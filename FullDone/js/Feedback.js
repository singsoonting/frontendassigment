// Handle form submission
function Submit(event) {
  event.preventDefault();
  const form = document.getElementById("FeedbackForm");
  const rate = document.getElementById("rate");

  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  if (rate.value == 5) {
    window.alert("We’re thrilled you enjoyed our service. Thank you for the 5 stars!");
  } else {
    window.alert("Feedback submitted! Thank you for helping us improve.");
  }

  sessionStorage.clear();

  // clear stars
  document.querySelectorAll("#rating span").forEach(star => star.classList.remove("selected"));

  form.reset();
  form.classList.remove("was-validated");

  window.location.replace("about.html");
}

// Run when page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const star = document.querySelectorAll("#rating span");
  const rate = document.getElementById("rate");
  const message = document.getElementById("message");

  // Load saved data
  if (sessionStorage.getItem("name")) name.value = sessionStorage.getItem("name");
  if (sessionStorage.getItem("email")) email.value = sessionStorage.getItem("email");
  if (sessionStorage.getItem("message")) message.value = sessionStorage.getItem("message");
  if (sessionStorage.getItem("rating")) {
    rate.value = sessionStorage.getItem("rating");
    LoadStar(rate.value);
  }

  // Save data live
  name.addEventListener("input", () => sessionStorage.setItem("name", name.value));
  email.addEventListener("input", () => sessionStorage.setItem("email", email.value));
  message.addEventListener("input", () => sessionStorage.setItem("message", message.value));

  // Star rating
  star.forEach(star => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      rate.value = value;
      sessionStorage.setItem("rating", value);
      LoadStar(value);
    });
  });

  //update stars
  function LoadStar(value) {
    document.querySelectorAll("#rating span").forEach(s => {
      if (s.getAttribute("data-value") <= parseInt(value)) {
        s.classList.add("selected");
      } else {
        s.classList.remove("selected");
      }
    });
  }
});

