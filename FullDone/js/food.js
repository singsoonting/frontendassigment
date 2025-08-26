
const searchInput = document.getElementById("searchInput");
const container = document.getElementById("food-container");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  container.innerHTML = "";
  foods
    .filter((food) => food.name.toLowerCase().includes(keyword))
    .forEach((food) => {
      const card = createCard(food);
      container.appendChild(card);
    });
});


const foods = [
  {
    name: "Nasi Lemak",
    img: "image/nasilemak.jpg",
    desc: "A fragrant rice dish cooked in coconut milk, typically served with sambal, fried anchovies, peanuts, boiled egg, and cucumber slices.",
    link: "https://en.wikipedia.org/wiki/Nasi_lemak"
  },
  {
    name: "Satay",
    img: "image/satay.jpg",
    desc: "Grilled skewered meat served with a delicious peanut sauce, often accompanied by rice cakes and fresh cucumber.",
    link: "https://en.wikipedia.org/wiki/Satay"
  },
  {
    name: "Char Kway Teow",
    img: "image/CharKwayTeow.jpg",
    desc: "Stir-fried flat rice noodles with egg, prawns, Chinese sausage, bean sprouts, and chives in a rich soy sauce.",
    link: "https://en.wikipedia.org/wiki/Char_kway_teow"
  },
  {
    name: "Roti Canai",
    img: "image/RotiCanai.jpg",
    desc: "Flaky and crispy flatbread served with dhal or curry sauce, perfect for breakfast or a snack.",
    link: "https://en.wikipedia.org/wiki/Roti_canai"
  },
  {
    name: "Laksa",
    img: "image/Laksa.jpg",
    desc: "A spicy noodle soup with coconut milk or sour asam base, filled with prawns, fish, tofu, and herbs.",
    link: "https://en.wikipedia.org/wiki/Laksa"
  },
  {
    name: "Cendol",
    img: "image/cendol.jpg",
    desc: "A refreshing dessert of shaved ice with coconut milk, palm sugar syrup, green rice flour jelly, and red beans.",
    link: "https://en.wikipedia.org/wiki/Cendol"
  },
  {
    name: "Mee Goreng",
    img: "image/MeeGoreng.jpg",
    desc: "Spicy fried yellow noodles cooked with egg, tofu, potatoes, and sometimes seafood or chicken.",
    link: "https://en.wikipedia.org/wiki/Mee_goreng"
  },
  {
    name: "Hokkien Mee",
    img: "image/HokkienMee.jpg",
    desc: "A noodle dish with prawn and pork broth, usually stir-fried with prawns, squid, and vegetables.",
    link: "https://en.wikipedia.org/wiki/Hokkien_mee"
  },
  {
    name: "Apam Balik",
    img: "image/ApamBalik.jpg",
    desc: "A sweet turnover pancake filled with crushed peanuts, sugar, and sometimes corn or coconut.",
    link: "https://en.wikipedia.org/wiki/Apam_balik"
  },
  {
    name: "Teh Tarik",
    img: "image/TehTarik.jpg",
    desc: "Malaysia’s famous “pulled tea” made with strong black tea and condensed milk, known for its frothy top.",
    link: "https://en.wikipedia.org/wiki/Teh_tarik"
  },
  {
    name: "Rojak",
    img: "image/Rojak.jpg",
    desc: "A Malaysian fruit and vegetable salad tossed with thick, spicy peanut sauce.",
    link: "https://en.wikipedia.org/wiki/Rojak"
  },
  {
    name: "Nasi Kerabu",
    img: "image/NasiKerabu.jpg",
    desc: "A blue-colored rice dish served with dried fish, salted egg, crackers, and fresh herbs.",
    link: "https://en.wikipedia.org/wiki/Nasi_kerabu"
  },
  {
    name: "Kuih Lapis",
    img: "image/KuihLapis.jpg",
    desc: "A colorful layered steamed cake, often enjoyed as a sweet snack or dessert.",
    link: "https://en.wikipedia.org/wiki/Kuih_lapis"
  },
  {
    name: "Maggi Goreng",
    img: "image/MaggiGoreng.jpg",
    desc: "Instant noodles stir-fried with vegetables, egg, and chili sauce for a quick savory meal.",
    link: "https://en.wikipedia.org/wiki/Maggi_goreng"
  },
  {
    name: "Bak Kut Teh",
    img: "image/BakKutTeh.jpg",
    desc: "A rich and aromatic pork rib soup infused with Chinese herbs and spices, commonly served with rice or fried dough sticks.",
    link: "https://en.wikipedia.org/wiki/Bak_kut_teh"
  }
];

let bookmarks = JSON.parse(localStorage.getItem("foodBookmarks")) || [];

function saveBookmarks() {
  localStorage.setItem("foodBookmarks", JSON.stringify(bookmarks));
}

function isBookmarked(name) {
  const saved = JSON.parse(localStorage.getItem("foodBookmarks")) || [];
  return saved.some((item) => item.name === name);
}

function toggleBookmark(food, btn) {
  let saved = JSON.parse(localStorage.getItem("foodBookmarks")) || [];

  const index = saved.findIndex((item) => item.name === food.name);
  if (index !== -1) {
    saved.splice(index, 1);
    btn.classList.remove("bookmarked");
    btn.title = "Add to favorites";
  } else {
    saved.push(food);
    btn.classList.add("bookmarked");
    btn.title = "Remove from favorites";
  }

  localStorage.setItem("foodBookmarks", JSON.stringify(saved));
}

function createCard(food) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = food.img;
  img.alt = food.name;

  const body = document.createElement("div");
  body.className = "card-body";

  const h3 = document.createElement("h3");
  h3.textContent = food.name;

  const p = document.createElement("p");
  p.textContent = food.desc;

  body.appendChild(h3);
  body.appendChild(p);

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const moreBtn = document.createElement("a");
  moreBtn.href = food.link;
  moreBtn.target = "_blank";
  moreBtn.className = "btn";
  moreBtn.textContent = "More";

  
  const shareWrapper = document.createElement("div");
  shareWrapper.style.position = "relative";

  const shareBtn = document.createElement("button");
  shareBtn.className = "share-btn";
  shareBtn.textContent = "🔗 Share";
  shareBtn.title = "Share this food";

  const shareOptions = document.createElement("div");
  shareOptions.style.position = "absolute";
  shareOptions.style.bottom = "110%";
  shareOptions.style.right = "0";  
  shareOptions.style.backgroundColor = "white";
  shareOptions.style.border = "1px solid #ddd";
  shareOptions.style.borderRadius = "6px";
  shareOptions.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  shareOptions.style.padding = "8px 0";
  shareOptions.style.display = "none";
  shareOptions.style.zIndex = "1000";
  shareOptions.style.minWidth = "160px";

  
  const platforms = [
    {
      name: "Facebook",
      icon: `<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" 
       alt="Facebook" 
       style="width:14px; height:14px; filter: invert(29%) sepia(96%) saturate(1634%) hue-rotate(203deg) brightness(92%) contrast(101%);">`,
      link: (food) => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(food.link)}`;
        
        
        const width = 600;
        const height = 500;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
    
        window.open(
          url,
          "facebook-share-dialog",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
        );
    
        return null;
      },
    },
    
    {
      name: "WhatsApp",
      icon: `<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" 
       alt="WhatsApp" 
       style="width:14px; height:14px; filter: invert(51%) sepia(80%) saturate(800%) hue-rotate(89deg) brightness(105%) contrast(102%);">`,

      link: (food) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this food: " + food.name + " " + food.link)}`,
    },

    {
      name: "Line",
      icon: `<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/line.svg" 
       alt="Line" 
       style="width:14px; height:14px; filter: invert(60%) sepia(100%) saturate(300%) hue-rotate(80deg) brightness(95%) contrast(105%);">`,

      link: (food) => {
        const text = `Check out this food: ${food.name} - ${food.link}`;
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(food.link)}&text=${encodeURIComponent(text)}`;
        window.open(lineUrl, '_blank');
        return lineUrl;
      },
    }
    
  ];

  platforms.forEach((p) => {
    const opt = document.createElement("div");
    opt.innerHTML = `${p.icon} <span style="margin-left: 8px;">${p.name}</span>`;
    opt.style.padding = "8px 16px";
    opt.style.cursor = "pointer";
    opt.style.fontSize = "0.9rem";
    opt.style.userSelect = "none";

    opt.addEventListener("click", () => {
      const url = p.link(food);
      if (url) window.open(url, "_blank");
      shareOptions.style.display = "none";
    });

    opt.addEventListener("mouseover", () => (opt.style.backgroundColor = "#f0f0f0"));
    opt.addEventListener("mouseout", () => (opt.style.backgroundColor = "white"));

    shareOptions.appendChild(opt);
  });

  shareBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    shareOptions.style.display = shareOptions.style.display === "none" ? "block" : "none";
  });

  document.body.addEventListener("click", () => {
    shareOptions.style.display = "none";
  });

  shareWrapper.appendChild(shareBtn);
  shareWrapper.appendChild(shareOptions);
  

  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.className = "bookmark-btn";
  bookmarkBtn.innerHTML = "❤";
  bookmarkBtn.title = isBookmarked(food.name) ? "Remove from favorites" : "Add to favorites";
  if (isBookmarked(food.name)) bookmarkBtn.classList.add("bookmarked");

  bookmarkBtn.addEventListener("click", () => toggleBookmark(food, bookmarkBtn));

  footer.appendChild(moreBtn);
  footer.appendChild(shareWrapper);
  footer.appendChild(bookmarkBtn);

  card.appendChild(img);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}

foods.forEach((food) => {
  const card = createCard(food);
  container.appendChild(card);

});

