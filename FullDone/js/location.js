
document.getElementById('search-input').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const sections = document.querySelectorAll('.region-section');
  
  sections.forEach(section => {
    const regionName = section.querySelector('.region-title').textContent.toLowerCase();
    const shouldShow = regionName.includes(searchTerm);
    section.style.display = shouldShow ? 'block' : 'none';
    
    if (shouldShow) {
      const cards = section.querySelectorAll('.location-card');
      cards.forEach(card => card.style.display = 'flex');
    }
  });
});


function isLocationBookmarked(name) {
  const saved = JSON.parse(localStorage.getItem('locationBookmarks')) || [];
  return saved.some(item => item.name === name);
}

function toggleLocationBookmark(name, btn) {
  let saved = JSON.parse(localStorage.getItem('locationBookmarks')) || [];

  const card = btn.closest('.location-card');
  const img = card.querySelector('img')?.src || '';
  const desc = card.querySelector('p')?.textContent || '';
  const time = card.querySelector('.food-time div')?.textContent || '';
  const recommendations = Array.from(card.querySelectorAll('.food-recommendations span')).map(span => span.textContent);
  const linkEl = card.querySelector('.location-address a');
  const link = linkEl?.href || '';
  const address = linkEl?.textContent?.replace('📍', '').trim() || '';

  const locationObj = { name, img, desc, time, recommendations, link, address };

  const index = saved.findIndex(loc => loc.link === link);
  if (index !== -1) {
    saved.splice(index, 1);
    btn.classList.remove('bookmarked');
    btn.title = "Add to favorites";
  } else {
    saved.push(locationObj);
    btn.classList.add('bookmarked');
    btn.title = "Remove from favorites";
  }

  localStorage.setItem('locationBookmarks', JSON.stringify(saved));
}


document.querySelectorAll('.location-card').forEach(card => {
  const locationName = card.querySelector('h3').textContent;
  const footer = card.querySelector('.location-address').parentElement;

  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'bookmark-btn';
  bookmarkBtn.innerHTML = '❤';
  bookmarkBtn.title = isLocationBookmarked(locationName) ? "Remove from favorites" : "Add to favorites";
  if (isLocationBookmarked(locationName)) {
    bookmarkBtn.classList.add('bookmarked');
  }

  bookmarkBtn.addEventListener('click', () => toggleLocationBookmark(locationName, bookmarkBtn));

  footer.appendChild(bookmarkBtn);
});



function getWeather(city) {
  const apiKey = 'f8e4b62307cb7f21542f2a85112c099b'; 
  let query = city;
  if (!city.includes(',')) {
    query = city + ',MY'; // Append country code
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`;

  return new Promise((resolve) => {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        const description = data.weather[0].description;
        const temp = data.main.temp;
        resolve(`${description}, ${temp}°C`);
      },
      error: function(xhr) {
        console.error('Weather fetch error:', xhr.statusText);
        resolve('Weather info not available');
      }
    });
  });
}

document.querySelectorAll('.location-card').forEach(async (card) => {
  const regionSection = card.closest('.region-section');
  let city = regionSection ? regionSection.querySelector('.region-title').textContent.trim() : '';

  const weatherText = await getWeather(city);

  const weatherElem = document.createElement('p');
  weatherElem.className = 'weather-info';
  weatherElem.textContent = `🌤️ Weather in ${city}: ${weatherText}`;

  const infoDiv = card.querySelector('.location-info');
  infoDiv.appendChild(weatherElem);
});