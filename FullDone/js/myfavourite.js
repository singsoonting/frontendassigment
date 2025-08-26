
function getFoodBookmarks() {
  return JSON.parse(localStorage.getItem('foodBookmarks')) || [];
}

function getLocationBookmarks() {
  return JSON.parse(localStorage.getItem('locationBookmarks')) || [];
}

function saveFoodBookmarks(data) {
  localStorage.setItem('foodBookmarks', JSON.stringify(data));
}

function saveLocationBookmarks(data) {
  localStorage.setItem('locationBookmarks', JSON.stringify(data));
}

function removeFoodBookmark(link) {
  let bookmarks = getFoodBookmarks();
  bookmarks = bookmarks.filter(item => item.link !== link);
  saveFoodBookmarks(bookmarks);
  renderBookmarks();
}

function removeLocationBookmark(link) {
  let bookmarks = getLocationBookmarks();
  bookmarks = bookmarks.filter(item => item.link !== link);
  saveLocationBookmarks(bookmarks);
  renderBookmarks();
}


function createFoodCard(food) {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = food.img;
  img.alt = food.name;

  const body = document.createElement('div');
  body.className = 'card-body';

  const h3 = document.createElement('h3');
  h3.textContent = food.name;

  const p = document.createElement('p');
  p.textContent = food.desc;

  body.appendChild(h3);
  body.appendChild(p);

  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const moreBtn = document.createElement('a');
  moreBtn.href = food.link;
  moreBtn.target = '_blank';
  moreBtn.className = 'btn';
  moreBtn.textContent = 'More';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'btn';
  removeBtn.style.marginLeft = '10px';
  removeBtn.style.backgroundColor = '#c0392b';
  removeBtn.addEventListener('click', () => removeFoodBookmark(food.link));

  footer.appendChild(moreBtn);
  footer.appendChild(removeBtn);

  card.appendChild(img);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}


function createLocationCard(location) {
  const card = document.createElement('div');
  card.className = 'location-card';

  const img = document.createElement('img');
  img.src = location.img || 'image/location-placeholder.jpg';
  img.alt = location.name;

  const info = document.createElement('div');
  info.className = 'location-info';

  const h3 = document.createElement('h3');
  h3.textContent = location.name;

  const p = document.createElement('p');
  p.textContent = location.desc || 'A great food location';

  const foodTime = document.createElement('div');
  foodTime.className = 'food-time';
  const timeBox = document.createElement('div');
  timeBox.textContent = location.time || '⏰ Unknown';
  foodTime.appendChild(timeBox);

  const recDiv = document.createElement('div');
  recDiv.className = 'food-recommendations';
  if (Array.isArray(location.recommendations)) {
    location.recommendations.forEach(item => {
      const span = document.createElement('span');
      span.textContent = item;
      if (["Teh Tarik", "Cendol", "Nasi Lemak"].includes(item)) {
        span.className = 'highlight';
      }
      recDiv.appendChild(span);
    });
  }

  const linkP = document.createElement('p');
  linkP.className = 'location-address';
  const link = document.createElement('a');
  link.href = location.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = `📍${location.address || 'View on Map'}`;
  linkP.appendChild(link);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'btn';
  removeBtn.style.marginTop = '10px';
  removeBtn.style.backgroundColor = '#c0392b';
  removeBtn.addEventListener('click', () => removeLocationBookmark(location.link));

  info.appendChild(h3);
  info.appendChild(p);
  info.appendChild(foodTime);
  info.appendChild(recDiv);
  info.appendChild(linkP);
  info.appendChild(removeBtn);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}


function renderBookmarks() {
  const favContainer = document.getElementById('favourite-container');
  favContainer.innerHTML = '';

  if (currentTab === 'food') {
    favContainer.classList.remove('single-column');
    const list = getFoodBookmarks();
    if (list.length === 0) {
      favContainer.innerHTML = '<p style="text-align:center; color:#999;">No food favourites yet.</p>';
    } else {
      list.forEach(f => favContainer.appendChild(createFoodCard(f)));
    }
  } else if (currentTab === 'location') {
    favContainer.classList.add('single-column');
    const list = getLocationBookmarks();
    if (list.length === 0) {
      favContainer.innerHTML = '<p style="text-align:center; color:#999;">No location favourites yet.</p>';
    } else {
      list.forEach(loc => favContainer.appendChild(createLocationCard(loc)));
    }
  }
}


let currentTab = 'food';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('favourite'); //
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  tabs.innerHTML = `
    <button class="tab-btn active" data-tab="food">🍽 Food</button>
    <button class="tab-btn" data-tab="location">📍 Location</button>
  `;
  header.insertAdjacentElement('afterend', tabs);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderBookmarks();
    });
  });

  renderBookmarks();
});