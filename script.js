                                                 /*  show menu */
const navMenu = document.getElementById('nav--menu'),
 navToggle = document.getElementById('nav-toggle'),
 navClose = document.getElementById('nav--close');

 if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

   if(navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
 }

                                                /*  swiper categories */
var swiperCategories = new Swiper('.categories--container', {
    spaceBetween: 24,
    loop: true,
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

       breakpoints: {
        350: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
    },
    });

                                                 /*  swiper products */
var swiperProducts = new Swiper('.new--container', {
    spaceBetween: 24,
    loop: true,
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

       breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
    },
    });
                                                 /*  image gallery */
function imgGallery() {
  const mainImg = document.querySelector('.details--img'),
  smallImg = document.querySelectorAll('.details--small-img');

  smallImg.forEach((img) => {
    img.addEventListener('click', function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();
                                                 /*  product tabs */
    const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[content]');

    tabs.forEach((tab) => {
      tab.addEventListener('click' , () => {
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach((tabContent) => {
          tabContent.classList.remove('active-tab');
        });
        target.classList.add('active-tab');

        tabs.forEach((tab) => {
          tab.classList.remove('active-tab');
          });
          tab.classList.add('active-tab');
      });
    });

                                                 /*  cart */
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

let cart = [];

cartIcon.addEventListener('click', () => {
  cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});

addToCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      ${item.name} ($${item.price}) x ${item.qty}
      <button onclick="changeQty('${item.id}', -1)">-</button>
      <button onclick="changeQty('${item.id}', 1)">+</button>
      <button onclick="removeItem('${item.id}')">🗑️</button>
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price * item.qty;
    count += item.qty;
  });

  cartCount.innerText = count;
  cartTotal.innerText = total.toFixed(2);
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}
