$(document).ready(function () {
  // --- Load Upcoming Events ---
  $.getJSON("./data/upcomingEvents.json", function (events) {
    let html = "";
    events.forEach(e => {
      html += `
        <div class="col-md-6">
          <div class="card shadow p-3 h-100">
            <img src="${e.img}" alt="${e.title}" class="img-fluid mb-3">
            <h5>${e.title}</h5>
            <p><b>Date:</b> ${e.date}<br><b>Location:</b> ${e.location}</p>
            <p>${e.desc}</p>
          </div>
        </div>
      `;
    });
    $("#eventsList").html(html);
  }).fail(function () {
    $("#eventsList").html("<p class='text-danger'>Failed to load upcoming events.</p>");
  });

  // --- Load Past Festivals ---
  $.getJSON("./data/pastEvents.json", function (pastEvents) {
    let pastHtml = "";
    pastEvents.forEach(e => {
      pastHtml += `
        <div class="col-md-6">
          <div class="card shadow p-3 h-100">
            <img src="${e.img}" alt="${e.title}" class="img-fluid mb-3">
            <h5>${e.title}</h5>
            <p><b>Date:</b> ${e.date}<br><b>Location:</b> ${e.location}</p>
            <p>${e.desc}</p>
            <a href="${e.video}" target="_blank" class="btn btn-danger btn-sm">
              🎥 Watch on YouTube
            </a>
          </div>
        </div>
      `;
    });
    $("#pastEventsList").html(pastHtml);
  }).fail(function () {
    $("#pastEventsList").html("<p class='text-danger'>Failed to load past events.</p>");
  });
});
