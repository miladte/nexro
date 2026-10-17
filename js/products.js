const products = [
  {
    id: 1,
    name: 'پروتئین وی گلد استاندارد',
    brand: 'Optimum Nutrition',
    category: 'powder',
    price: 2690000,
    image: 'assets/images/whey-gold.jpg',
    description: 'پروتئین وی با فرمول کم‌کربوهیدرات و فاقد مواد افزودنی غیرضروری برای حمایت از بازسازی عضلات پس از تمرین.'
  },
  {
    id: 2,
    name: 'کراتین مونوهیدرات',
    brand: 'MyProtein',
    category: 'powder',
    price: 1190000,
    image: 'assets/images/creatine.jpg',
    description: 'فرمول ساده و کارآمد کراتین برای بهبود قدرت انفجاری، عملکرد کوتاه‌مدت و تمرینات با شدت بالا.'
  },
  {
    id: 3,
    name: 'پری‌ورک‌اوت C4',
    brand: 'Cellucor',
    category: 'powder',
    price: 1990000,
    image: 'assets/images/c4-preworkout.jpg',
    description: 'مکمل پیش‌ازتمرین با ترکیب انرژِی و تمرکز مناسب برای جلسات تمرینی شدید و با شدت بالا.'
  },
  {
    id: 4,
    name: 'پروتئین وی ایمپکت',
    brand: 'MyProtein',
    category: 'powder',
    price: 2290000,
    image: 'assets/images/impact-whey.jpg',
    description: 'پروتئین وی با طعم‌های متنوع و ترکیب مناسب برای افراد فعال و کسانی که دنبال رشد عضله هستند.'
  },
  {
    id: 5,
    name: 'مولتی‌ویتامین روزانه',
    brand: 'Optimum Nutrition',
    category: 'tablet',
    price: 790000,
    image: 'assets/images/multivitamin.jpg',
    description: 'مکمل روزانه برای حمایت از سلامت عمومی، انرژی و نیازهای تغذیه‌ای روزمره.'
  },
  {
    id: 6,
    name: 'قرص زینک',
    brand: 'Universal Nutrition',
    category: 'tablet',
    price: 490000,
    image: 'assets/images/zinc-tablets.jpg',
    description: 'زینک با نقش مهم در سیستم ایمنی، ترمیم سلولی و عملکرد طبیعی بدن.'
  },
  {
    id: 7,
    name: 'کپسول امگا ۳',
    brand: 'Optimum Nutrition',
    category: 'capsule',
    price: 650000,
    image: 'assets/images/omega-3.jpg',
    description: 'کپسول‌های امگا ۳ برای حمایت از سلامت قلب و سیستم عصبی در یک برنامه روزانه ساده.'
  },
  {
    id: 8,
    name: 'قرص ویتامین C',
    brand: 'Universal Nutrition',
    category: 'tablet',
    price: 390000,
    image: 'assets/images/vitamin-c.jpg',
    description: 'ویتامین C با فرمول ساده برای حمایت از سیستم ایمنی و بازسازی سلولی.'
  },
  {
    id: 9,
    name: 'کپسول BCAA',
    brand: 'Cellucor',
    category: 'capsule',
    price: 910000,
    image: 'assets/images/bcaa-capsules.jpg',
    description: 'ترکیب BCAA برای حمایت از کاهش خستگی و حفظ سازگاری عضلانی در دوره‌های تمرینی.'
  }
];

const brandOptions = ['Optimum Nutrition', 'MyProtein', 'Cellucor', 'Universal Nutrition'];
const state = {
  category: 'all',
  search: '',
  sort: 'default',
  minPrice: '',
  maxPrice: '',
  selectedBrands: new Set(brandOptions)
};

const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const cartBadge = document.querySelector('.cart-badge');
const cartToast = document.getElementById('cart-toast');
const modal = document.getElementById('details-modal');
const modalImage = document.getElementById('modal-image');
const modalMeta = document.getElementById('modal-meta');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const typeRadios = [...document.querySelectorAll('input[name="product-type"]')];
const brandCheckboxes = [...document.querySelectorAll('input[name="brand"]')];
const categoryCards = [...document.querySelectorAll('.category-card')];
const filterPanel = document.querySelector('.filter-panel');
const mobileFilterButton = document.querySelector('.mobile-filter-button');
const mobileCloseFilterButton = document.querySelector('.mobile-close-filter');
const applyFiltersButton = document.getElementById('apply-filters');
const clearFiltersButton = document.getElementById('clear-filters');
const emptyResetButton = document.getElementById('empty-reset');

let cartCount = 0;

function toPersianDigits(value) {
  return value.toString().replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

function formatPrice(value) {
  return `${toPersianDigits(new Intl.NumberFormat('fa-IR').format(value))} تومان`;
}

function formatCount(value) {
  return `نمایش ${toPersianDigits(value)} محصول`;
}

function toPlainText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function buildPlaceholderImage(label, tone) {
  const safeLabel = encodeURIComponent(label);
  const color = tone === 'powder' ? '#b98d57' : '#d0af7d';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <rect width="320" height="320" fill="#171716"/>
      <rect x="118" y="64" width="84" height="170" rx="18" fill="${color}"/>
      <rect x="132" y="42" width="56" height="26" rx="7" fill="#f4d4a7"/>
      <rect x="104" y="104" width="112" height="78" rx="8" fill="rgba(255,255,255,0.08)"/>
      <text x="160" y="240" text-anchor="middle" fill="#f2f0ed" font-size="24" font-family="Tahoma, Arial, sans-serif">${safeLabel}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getCategoryLabel(category) {
  const labels = {
    powder: 'مکمل‌های پودری',
    tablet: 'قرص / کپسول',
    capsule: 'کپسول'
  };

  return labels[category] || 'مکمل';
}

function isProductVisible(product) {
  const matchesCategory = state.category === 'all'
    ? true
    : state.category === 'tablet'
      ? ['tablet', 'capsule'].includes(product.category)
      : product.category === state.category;

  const matchesBrand = state.selectedBrands.size === 0 || state.selectedBrands.has(product.brand);
  const matchesSearch = !state.search ||
    `${product.name} ${product.brand}`.toLowerCase().includes(state.search.toLowerCase());
  const minValue = state.minPrice === '' || Number(state.minPrice) <= product.price;
  const maxValue = state.maxPrice === '' || Number(state.maxPrice) >= product.price;

  return matchesCategory && matchesBrand && matchesSearch && minValue && maxValue;
}

function sortProducts(items) {
  const sorted = [...items];

  switch (state.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
      break;
    default:
      sorted.sort((a, b) => a.id - b.id);
      break;
  }

  return sorted;
}

function renderProducts() {
  const visibleProducts = sortProducts(products.filter(isProductVisible));
  const countText = formatCount(visibleProducts.length);

  resultsCount.textContent = countText;

  if (!visibleProducts.length) {
    productGrid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-visual">
        <span class="product-category-tag">${getCategoryLabel(product.category)}</span>
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='${buildPlaceholderImage(product.name, product.category)}';"
        />
      </div>
      <div class="product-content">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-meta">
          <p class="product-price">${formatPrice(product.price)}</p>
        </div>
        <div class="product-actions">
          <button class="text-button details-trigger" type="button" data-product-id="${product.id}">مشاهده جزئیات</button>
          <button class="button button-primary add-to-cart" type="button" data-product-id="${product.id}">افزودن به سبد</button>
        </div>
      </div>
    </article>
  `).join('');
}

function updateSelectedBrands() {
  const allChecked = brandCheckboxes[0]?.checked;
  const checkedBrandValues = brandCheckboxes
    .filter((checkbox) => checkbox.value !== 'all' && checkbox.checked)
    .map((checkbox) => checkbox.value);

  if (allChecked || checkedBrandValues.length === 0) {
    state.selectedBrands = new Set(brandOptions);
    return;
  }

  state.selectedBrands = new Set(checkedBrandValues);
}

function setTypeFilter(type) {
  const matchingRadio = typeRadios.find((radio) => radio.value === type);
  if (matchingRadio) {
    matchingRadio.checked = true;
  }
  state.category = type;

  categoryCards.forEach((card) => {
    const isActive = card.dataset.category === type;
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-pressed', String(isActive));
  });
}

function syncTypeFromCards(category) {
  const matchedRadio = typeRadios.find((radio) => radio.value === category);
  if (matchedRadio) {
    matchedRadio.checked = true;
  }

  state.category = category;

  categoryCards.forEach((card) => {
    const active = card.dataset.category === category;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-pressed', String(active));
  });
}

function applyCurrentFilters() {
  state.search = searchInput.value.trim();
  state.sort = sortSelect.value;
  state.minPrice = minPriceInput.value.trim();
  state.maxPrice = maxPriceInput.value.trim();

  updateSelectedBrands();
  renderProducts();
}

function resetFilters() {
  state.category = 'all';
  state.search = '';
  state.sort = 'default';
  state.minPrice = '';
  state.maxPrice = '';
  state.selectedBrands = new Set(brandOptions);

  searchInput.value = '';
  sortSelect.value = 'default';
  minPriceInput.value = '';
  maxPriceInput.value = '';

  typeRadios.forEach((radio) => {
    radio.checked = radio.value === 'all';
  });

  brandCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkbox.value === 'all' || checkbox.value === 'Optimum Nutrition' || checkbox.value === 'MyProtein' || checkbox.value === 'Cellucor' || checkbox.value === 'Universal Nutrition';
  });

  categoryCards.forEach((card) => {
    const isActive = false;
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-pressed', 'false');
  });

  renderProducts();
}

function showToast(message) {
  cartToast.textContent = message;
  cartToast.classList.add('is-visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    cartToast.classList.remove('is-visible');
  }, 1800);
}

function updateCartCount() {
  cartBadge.textContent = String(cartCount);
}

function openModal(productId) {
  const product = products.find((item) => item.id === Number(productId));
  if (!product) return;

  modalImage.innerHTML = `<img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${buildPlaceholderImage(product.name, product.category)}';" />`;
  modalMeta.innerHTML = `<span>${product.brand}</span><span>${getCategoryLabel(product.category)}</span>`;
  modalTitle.textContent = product.name;
  modalPrice.textContent = formatPrice(product.price);
  modalDescription.textContent = product.description;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

searchInput.addEventListener('input', () => {
  state.search = searchInput.value.trim();
  renderProducts();
});

sortSelect.addEventListener('change', () => {
  state.sort = sortSelect.value;
  renderProducts();
});

typeRadios.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    const value = event.target.value;
    state.category = value;

    if (value === 'all') {
      categoryCards.forEach((card) => {
        card.classList.remove('is-active');
        card.setAttribute('aria-pressed', 'false');
      });
      renderProducts();
      return;
    }

    syncTypeFromCards(value);
    renderProducts();
  });
});

categoryCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const chosenCategory = card.dataset.category;
    if (event.target.closest('.category-button')) {
      syncTypeFromCards(chosenCategory);
      renderProducts();
      return;
    }

    syncTypeFromCards(chosenCategory);
    renderProducts();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      syncTypeFromCards(card.dataset.category);
      renderProducts();
    }
  });
});

brandCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (checkbox.value === 'all') {
      brandCheckboxes.forEach((item) => {
        item.checked = item.value === 'all';
      });
      updateSelectedBrands();
      renderProducts();
      return;
    }

    if (!checkbox.checked) {
      const allCheckbox = brandCheckboxes.find((item) => item.value === 'all');
      if (allCheckbox) {
        allCheckbox.checked = false;
      }
    }

    const checkedValues = brandCheckboxes
      .filter((item) => item.value !== 'all' && item.checked)
      .map((item) => item.value);

    const allCheckbox = brandCheckboxes.find((item) => item.value === 'all');
    if (allCheckbox && checkedValues.length === brandOptions.length) {
      allCheckbox.checked = true;
      brandCheckboxes.forEach((item) => {
        if (item.value !== 'all') item.checked = true;
      });
    }

    updateSelectedBrands();
    renderProducts();
  });
});

applyFiltersButton.addEventListener('click', () => {
  applyCurrentFilters();
});

clearFiltersButton.addEventListener('click', () => {
  resetFilters();
});

emptyResetButton.addEventListener('click', () => {
  resetFilters();
});

productGrid.addEventListener('click', (event) => {
  const detailsButton = event.target.closest('.details-trigger');
  const addButton = event.target.closest('.add-to-cart');

  if (detailsButton) {
    openModal(detailsButton.dataset.productId);
    return;
  }

  if (addButton) {
    cartCount += 1;
    updateCartCount();
    showToast('محصول به سبد خرید اضافه شد.');
  }
});

mobileFilterButton.addEventListener('click', () => {
  filterPanel.classList.toggle('is-open');
  mobileFilterButton.setAttribute('aria-expanded', String(filterPanel.classList.contains('is-open')));
});

mobileCloseFilterButton.addEventListener('click', () => {
  filterPanel.classList.remove('is-open');
  mobileFilterButton.setAttribute('aria-expanded', 'false');
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1023) {
    filterPanel.classList.remove('is-open');
    mobileFilterButton.setAttribute('aria-expanded', 'false');
  }
});

updateCartCount();
resetFilters();
