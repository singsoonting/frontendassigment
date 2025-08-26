function submitForm(event) {
  event.preventDefault(); 
  
  const form = document.getElementById('contactForm');

  if (!form.checkValidity()) {
    
    event.stopPropagation();
    form.classList.add('was-validated');
    return; 
  }

  
  window.alert("Thank you for contacting with us! We will get back to you soon.");
  form.reset();
  window.location.replace("about.html");
}


(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', submitForm, false);
  });
})();
