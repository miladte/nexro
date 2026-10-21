(() => {
  "use strict";

  const STORAGE_KEY = "nexro_admin_demo_v1";
  const names = {
    dashboard: "داشبورد",
    products: "محصولات",
    inventory: "مدیریت موجودی",
    orders: "سفارش‌ها",
    customers: "مشتریان",
    workouts: "برنامه‌های تمرین",
    nutrition: "برنامه‌های تغذیه",
    content: "محتوای وب‌سایت",
    coupons: "تخفیف و کدها",
    messages: "پیام‌های مشتریان",
    reviews: "دیدگاه‌ها",
    reports: "گزارش‌ها و تحلیل",
    settings: "تنظیمات"
  };
  const categories = ["پروتئین", "کراتین", "پیش‌تمرین", "ویتامین", "سلامت عمومی"];
  const orderStatuses = ["جدید", "در حال پردازش", "آماده ارسال", "ارسال‌شده", "تحویل‌شده", "لغوشده"];
  const paymentStatuses = ["پرداخت‌نشده", "پرداخت‌شده", "ناموفق", "مستردشده"];
  const publicationStatuses = ["منتشرشده", "پیش‌نویس"];

  const initialData = {
    products: [
      { id: "p1", name: "پروتئین وی گلد استاندارد", sku: "NXR-WHY-001", brand: "Optimum Nutrition", category: "پروتئین", price: 2690000, stock: 18, status: "منتشرشده", description: "محصول نمونه بر پایه اطلاعات فهرست فعلی وب‌سایت." },
      { id: "p2", name: "کراتین مونوهیدرات", sku: "NXR-CRT-002", brand: "MyProtein", category: "کراتین", price: 1190000, stock: 4, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p3", name: "پری‌ورک‌اوت C4", sku: "NXR-PWO-003", brand: "Cellucor", category: "پیش‌تمرین", price: 1990000, stock: 0, status: "پیش‌نویس", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p4", name: "پروتئین وی ایمپکت", sku: "NXR-WHY-004", brand: "MyProtein", category: "پروتئین", price: 2290000, stock: 26, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p5", name: "مولتی‌ویتامین روزانه", sku: "NXR-MTV-005", brand: "Optimum Nutrition", category: "ویتامین", price: 790000, stock: 12, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p6", name: "قرص زینک", sku: "NXR-ZNC-006", brand: "Universal Nutrition", category: "سلامت عمومی", price: 490000, stock: 3, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p7", name: "کپسول امگا ۳", sku: "NXR-OMG-007", brand: "Optimum Nutrition", category: "سلامت عمومی", price: 650000, stock: 9, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p8", name: "قرص ویتامین C", sku: "NXR-VTC-008", brand: "Universal Nutrition", category: "ویتامین", price: 390000, stock: 21, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." },
      { id: "p9", name: "کپسول BCAA", sku: "NXR-BCA-009", brand: "Cellucor", category: "پروتئین", price: 910000, stock: 7, status: "منتشرشده", description: "محصول نمونه از فهرست فعلی وب‌سایت." }
    ],
    orders: [
      { id: "o1", number: "NX-2408", date: "۱۴۰۵/۰۷/۲۸", customerId: "c1", customer: "آرمان راد", phone: "۰۹۱۲ ۴۵۶ ۷۸۹۰", email: "arman.demo@example.test", address: "تهران، خیابان نمونه، پلاک ۱۲", items: [{ productId: "p1", name: "پروتئین وی گلد استاندارد", qty: 1, price: 2690000 }, { productId: "p2", name: "کراتین مونوهیدرات", qty: 1, price: 1190000 }], subtotal: 3880000, discount: 150000, shipping: 65000, total: 3795000, payment: "پرداخت‌شده", status: "در حال پردازش" },
      { id: "o2", number: "NX-2407", date: "۱۴۰۵/۰۷/۲۷", customerId: "c2", customer: "سارا نادری", phone: "۰۹۳۵ ۱۱۱ ۲۲۳۳", email: "sara.demo@example.test", address: "اصفهان، محله نمونه، کوچه ۴", items: [{ productId: "p4", name: "پروتئین وی ایمپکت", qty: 2, price: 2290000 }], subtotal: 4580000, discount: 0, shipping: 0, total: 4580000, payment: "پرداخت‌شده", status: "آماده ارسال" },
      { id: "o3", number: "NX-2406", date: "۱۴۰۵/۰۷/۲۶", customerId: "c3", customer: "پارسا کیانی", phone: "۰۹۱۰ ۸۸۸ ۴۴۵۵", email: "parsa.demo@example.test", address: "شیراز، بلوار فرضی، واحد ۸", items: [{ productId: "p5", name: "مولتی‌ویتامین روزانه", qty: 1, price: 790000 }], subtotal: 790000, discount: 0, shipping: 55000, total: 845000, payment: "پرداخت‌نشده", status: "جدید" },
      { id: "o4", number: "NX-2405", date: "۱۴۰۵/۰۷/۲۵", customerId: "c4", customer: "نیلوفر زمانی", phone: "۰۹۱۳ ۲۲۲ ۳۳۴۴", email: "niloufar.demo@example.test", address: "تبریز، خیابان آزمایشی، پلاک ۲", items: [{ productId: "p7", name: "کپسول امگا ۳", qty: 1, price: 650000 }, { productId: "p8", name: "قرص ویتامین C", qty: 2, price: 390000 }], subtotal: 1430000, discount: 100000, shipping: 55000, total: 1385000, payment: "پرداخت‌شده", status: "ارسال‌شده" },
      { id: "o5", number: "NX-2404", date: "۱۴۰۵/۰۷/۲۴", customerId: "c1", customer: "آرمان راد", phone: "۰۹۱۲ ۴۵۶ ۷۸۹۰", email: "arman.demo@example.test", address: "تهران، خیابان نمونه، پلاک ۱۲", items: [{ productId: "p6", name: "قرص زینک", qty: 1, price: 490000 }], subtotal: 490000, discount: 0, shipping: 55000, total: 545000, payment: "پرداخت‌شده", status: "تحویل‌شده" },
      { id: "o6", number: "NX-2403", date: "۱۴۰۵/۰۷/۲۳", customerId: "c5", customer: "امیرحسین مرادی", phone: "۰۹۱۷ ۷۷۷ ۸۸۹۹", email: "amir.demo@example.test", address: "کرج، نشانی خیالی، ساختمان ۳", items: [{ productId: "p3", name: "پری‌ورک‌اوت C4", qty: 1, price: 1990000 }], subtotal: 1990000, discount: 0, shipping: 65000, total: 2055000, payment: "ناموفق", status: "لغوشده" }
    ],
    customers: [
      { id: "c1", name: "آرمان راد", email: "arman.demo@example.test", phone: "۰۹۱۲ ۴۵۶ ۷۸۹۰", registered: "۱۴۰۵/۰۶/۱۲", status: "فعال", role: "مشتری" },
      { id: "c2", name: "سارا نادری", email: "sara.demo@example.test", phone: "۰۹۳۵ ۱۱۱ ۲۲۳۳", registered: "۱۴۰۵/۰۶/۱۸", status: "فعال", role: "مشتری" },
      { id: "c3", name: "پارسا کیانی", email: "parsa.demo@example.test", phone: "۰۹۱۰ ۸۸۸ ۴۴۵۵", registered: "۱۴۰۵/۰۷/۰۲", status: "فعال", role: "مشتری" },
      { id: "c4", name: "نیلوفر زمانی", email: "niloufar.demo@example.test", phone: "۰۹۱۳ ۲۲۲ ۳۳۴۴", registered: "۱۴۰۵/۰۷/۰۷", status: "فعال", role: "مشتری" },
      { id: "c5", name: "امیرحسین مرادی", email: "amir.demo@example.test", phone: "۰۹۱۷ ۷۷۷ ۸۸۹۹", registered: "۱۴۰۵/۰۷/۱۵", status: "غیرفعال", role: "مشتری" }
    ],
    workouts: [
      { id: "w1", title: "قدرت پایه", goal: "افزایش قدرت", level: "مبتدی", duration: "۴ هفته", description: "الگوی عمومی تمرین مقاومتی با پیشروی تدریجی و روزهای استراحت.", status: "منتشرشده" },
      { id: "w2", title: "تمرین تمام‌بدن", goal: "تناسب اندام", level: "متوسط", duration: "۶ هفته", description: "برنامه عمومی با حرکات پایه برای گروه‌های عضلانی اصلی.", status: "منتشرشده" },
      { id: "w3", title: "بازگشت به تمرین", goal: "شروع دوباره", level: "مبتدی", duration: "۳ هفته", description: "شروع تدریجی و قابل تنظیم برای بازگشت به روال فعالیت.", status: "پیش‌نویس" }
    ],
    nutrition: [
      { id: "n1", title: "الگوی تغذیه متعادل", goal: "سبک زندگی فعال", duration: "۴ هفته", description: "ایده‌های عمومی برای وعده‌های متنوع؛ متناسب‌سازی با متخصص انجام شود.", status: "منتشرشده" },
      { id: "n2", title: "وعده‌های روز تمرین", goal: "برنامه‌ریزی وعده‌ها", duration: "۲ هفته", description: "نمونه‌های آموزشی برای زمان‌بندی وعده‌ها در روزهای فعالیت.", status: "پیش‌نویس" }
    ],
    coupons: [
      { id: "d1", code: "NEXRO10", type: "درصدی", value: 10, start: "۱۴۰۵/۰۷/۰۱", expires: "۱۴۰۵/۰۸/۳۰", limit: 100, status: "فعال" },
      { id: "d2", code: "DEMO150", type: "مبلغ ثابت", value: 150000, start: "۱۴۰۵/۰۷/۱۰", expires: "۱۴۰۵/۰۷/۳۰", limit: 25, status: "غیرفعال" }
    ],
    messages: [
      { id: "m1", name: "مریم رضایی", email: "maryam.demo@example.test", subject: "پرسش درباره ارسال", message: "سلام، زمان تقریبی ارسال سفارش در شهرهای دیگر چقدر است؟ این پیام نمونه است.", date: "۱۴۰۵/۰۷/۲۸", read: false, archived: false },
      { id: "m2", name: "رضا حیدری", email: "reza.demo@example.test", subject: "راهنمای انتخاب محصول", message: "برای مشاهده مشخصات بیشتر محصولات از کدام بخش استفاده کنم؟ پیام آزمایشی.", date: "۱۴۰۵/۰۷/۲۶", read: true, archived: false },
      { id: "m3", name: "الهام شریفی", email: "elham.demo@example.test", subject: "همکاری", message: "برای ارسال پیشنهاد همکاری با چه بخشی در ارتباط باشم؟ محتوای ساختگی.", date: "۱۴۰۵/۰۷/۲۲", read: false, archived: false }
    ],
    reviews: [
      { id: "r1", product: "کراتین مونوهیدرات", name: "کیان صادقی", rating: 5, text: "بسته‌بندی مرتب بود و سفارش به‌موقع رسید. متن نمایشی.", date: "۱۴۰۵/۰۷/۲۸", status: "در انتظار بررسی" },
      { id: "r2", product: "پروتئین وی ایمپکت", name: "نگار احمدی", rating: 4, text: "توضیحات محصول برای انتخاب مفید بود. متن ساختگی.", date: "۱۴۰۵/۰۷/۲۵", status: "تأییدشده" },
      { id: "r3", product: "مولتی‌ویتامین روزانه", name: "سامان نوری", rating: 3, text: "این دیدگاه صرفاً برای نمایش گردش‌کار مدیریت است.", date: "۱۴۰۵/۰۷/۲۳", status: "در انتظار بررسی" }
    ],
    inventoryHistory: [
      { id: "h1", product: "پروتئین وی گلد استاندارد", change: "+۵", reason: "ورود نمونه", date: "۱۴۰۵/۰۷/۲۷" },
      { id: "h2", product: "کراتین مونوهیدرات", change: "-۲", reason: "اصلاح نمایشی", date: "۱۴۰۵/۰۷/۲۶" }
    ],
    content: {
      heroTitle: "بهترین مکمل‌ها برای بدنی قوی‌تر و عملکردی بهتر",
      heroDescription: "مکمل‌های ورزشی باکیفیت، همراه با برنامه‌های تمرینی و تغذیه متناسب با هدف شما.",
      announcement: "انتخابی مطمئن برای مسیر پیشرفت شما",
      promotion: "بخش معرفی پیشنهادهای ویژه — متن نمونه",
      about: "آشنایی با داستان، مأموریت و ارزش‌های نکسرو",
      contact: "اطلاعات تماس وب‌سایت در این نسخه صرفاً نمونه است.",
      footer: "قدرت، کیفیت، انتخاب حرفه‌ای",
      socialInstagram: "",
      socialTelegram: "",
      socialYoutube: "",
      featuredProducts: ["p1", "p2", "p4"]
    },
    settings: { storeName: "NEXRO", email: "hello@example.com", phone: "۰۲۱-۰۰۰۰۰۰۰۰", currency: "تومان", dateFormat: "شمسی", notifications: true, orderAlerts: true }
  };

  const viewRoot = document.getElementById("view-root");
  const modalRoot = document.getElementById("modal-root");
  const toastRegion = document.getElementById("toast-region");
  const state = { data: loadData(), view: "dashboard", query: "", filter: "همه", sort: "newest", chartPeriod: "weekly", reportPeriod: "۳۰ روز اخیر", pageSize: 10 };
  let focusBeforeModal = null;

  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return structuredClone(initialData);
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object") throw new Error("ساختار داده ذخیره‌شده معتبر نیست.");
      const result = structuredClone(initialData);
      for (const key of Object.keys(initialData)) {
        if (key === "content" || key === "settings") {
          if (parsed[key] && typeof parsed[key] === "object") result[key] = { ...result[key], ...parsed[key] };
        } else if (Array.isArray(parsed[key])) {
          result[key] = parsed[key];
        }
      }
      return result;
    } catch (error) {
      console.error("بارگذاری داده نمایشی نکسرو انجام نشد:", error);
      return structuredClone(initialData);
    }
  }

  function saveData() {
    try {
      // Backend integration point: replace browser storage with authenticated server operations.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      return true;
    } catch (error) {
      console.error("ذخیره داده نمایشی نکسرو انجام نشد:", error);
      return false;
    }
  }

  function persistAndNotify(message, notifySuccess = true) {
    const saved = saveData();
    if (saved && notifySuccess) toast(message);
    if (!saved) toast("تغییر در نشست جاری اعمال شد، اما در مرورگر ذخیره نشد.", "error");
    return saved;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function digits(value) {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  }

  function number(value) {
    return new Intl.NumberFormat("fa-IR").format(Number(value) || 0);
  }

  function money(value) {
    return `${number(value)} تومان`;
  }

  function id(prefix) {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  }

  function toast(message, type = "success") {
    if (!toastRegion) return;
    const item = document.createElement("div");
    item.className = `toast${type === "error" ? " error" : ""}`;
    item.setAttribute("role", "status");
    item.textContent = message;
    toastRegion.append(item);
    window.setTimeout(() => item.remove(), 3600);
  }

  function setView(view) {
    if (!names[view]) return;
    state.view = view;
    state.query = "";
    state.filter = "همه";
    document.getElementById("global-search").value = "";
    document.querySelectorAll(".nav-item").forEach((button) => {
      const active = button.dataset.view === view;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.getElementById("current-section").textContent = names[view];
    closeSidebar();
    renderView();
  }

  function header(title, subtitle, actions = "") {
    return `<div class="page-heading"><div><p class="eyebrow">NEXRO · محیط نمایشی</p><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`;
  }

  function actionButton(label, action, idValue, icon, extra = "") {
    return `<button class="btn-icon ${extra}" type="button" aria-label="${label}" title="${label}" data-action="${action}" data-id="${esc(idValue)}">${icon}</button>`;
  }

  function badge(text, variant = "neutral") {
    return `<span class="badge ${variant}">${esc(text)}</span>`;
  }

  function statusVariant(status) {
    if (["منتشرشده", "فعال", "پرداخت‌شده", "تحویل‌شده", "تأییدشده", "خوانده‌شده"].includes(status)) return "good";
    if (["در انتظار بررسی", "جدید", "در حال پردازش", "آماده ارسال", "پرداخت‌نشده", "پیش‌نویس", "خوانده‌نشده"].includes(status)) return "warn";
    if (["غیرفعال", "ناموفق", "مستردشده", "لغوشده", "ردشده"].includes(status)) return "bad";
    return "neutral";
  }

  function makeTable(headers, rows, emptyMessage = "موردی برای نمایش وجود ندارد.") {
    if (!rows.length) {
      return `<div class="empty-state"><div><span>⌕</span><strong>نتیجه‌ای پیدا نشد</strong><p>${esc(emptyMessage)}</p></div></div>`;
    }
    return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map((item) => `<th>${item}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
  }

  function toolbar(options = {}) {
    const filterOptions = options.filters || ["همه"];
    const sortOptions = options.sorts || [];
    return `<div class="toolbar">
      <label class="toolbar-search"><input class="table-search" type="search" placeholder="${esc(options.placeholder || "جست‌وجو در فهرست...")}" aria-label="جست‌وجو در جدول" value="${esc(state.query)}"></label>
      ${filterOptions.length > 1 ? `<select class="control-select table-filter" aria-label="فیلتر">${filterOptions.map((option) => `<option${option === state.filter ? " selected" : ""}>${esc(option)}</option>`).join("")}</select>` : ""}
      ${sortOptions.length ? `<select class="control-select table-sort" aria-label="مرتب‌سازی">${sortOptions.map((option) => `<option value="${esc(option.value)}"${option.value === state.sort ? " selected" : ""}>${esc(option.label)}</option>`).join("")}</select>` : ""}
      <span class="toolbar-count">${digits(options.count ?? "")} ${options.countLabel || ""}</span>
    </div>`;
  }

  function tableFooter(total) {
    return `<div class="table-footer"><span>نمایش ${digits(Math.min(total, state.pageSize))} از ${digits(total)} مورد · داده‌های نمونه</span><label>تعداد در صفحه <select class="control-select page-size" aria-label="تعداد ردیف در صفحه"><option value="10"${state.pageSize === 10 ? " selected" : ""}>۱۰</option><option value="20"${state.pageSize === 20 ? " selected" : ""}>۲۰</option><option value="50"${state.pageSize === 50 ? " selected" : ""}>۵۰</option></select></label></div>`;
  }

  function matching(items, fields) {
    const query = state.query.trim().toLocaleLowerCase("fa");
    let results = items.filter((item) => {
      const matchesQuery = !query || fields.some((field) => String(item[field] ?? "").toLocaleLowerCase("fa").includes(query));
      const filterFields = ["status", "payment", "category", "goal", "level", "type", "readStatus", "reviewStatus"];
      const values = filterFields.map((key) => item[key]).filter(Boolean);
      const matchesFilter = state.filter === "همه" || values.length === 0 || values.includes(state.filter);
      return matchesQuery && matchesFilter;
    });
    if (state.sort === "price-asc") results = [...results].sort((a, b) => Number(a.price) - Number(b.price));
    if (state.sort === "stock-asc") results = [...results].sort((a, b) => Number(a.stock) - Number(b.stock));
    if (state.sort === "name-asc") results = [...results].sort((a, b) => String(a.name || a.title || "").localeCompare(String(b.name || b.title || ""), "fa"));
    return results;
  }

  function dashboardStats() {
    const paidOrders = state.data.orders.filter((order) => order.payment === "پرداخت‌شده" && order.status !== "لغوشده");
    return {
      revenue: paidOrders.reduce((total, order) => total + Number(order.total || 0), 0),
      orderCount: state.data.orders.length,
      customerCount: state.data.customers.length,
      productCount: state.data.products.length,
      lowStock: state.data.products.filter((product) => Number(product.stock) <= 5).length,
      pending: state.data.orders.filter((order) => ["جدید", "در حال پردازش", "آماده ارسال"].includes(order.status)).length
    };
  }

  function statCard(label, value, hint, icon) {
    return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon" aria-hidden="true">${icon}</span></div><strong class="stat-value">${value}</strong><div class="stat-foot">${hint}</div></article>`;
  }

  function chartSvg(monthly = false) {
    const values = monthly ? [30, 44, 38, 60, 51, 76, 67, 92, 81, 104, 95, 120] : [42, 64, 52, 82, 69, 102, 88];
    const labels = monthly ? ["۱", "۳", "۵", "۷", "۹", "۱۱", "۱۳", "۱۵", "۱۷", "۱۹", "۲۱", "۲۳"] : ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
    const width = 690;
    const height = 205;
    const left = 30;
    const right = 675;
    const top = 14;
    const bottom = 166;
    const max = Math.max(...values) * 1.12;
    const points = values.map((value, index) => {
      const x = left + (index * (right - left)) / (values.length - 1);
      const y = bottom - (value / max) * (bottom - top);
      return `${x},${y}`;
    });
    const line = points.join(" ");
    const area = `${left},${bottom} ${line} ${right},${bottom}`;
    const grid = [0, 1, 2, 3].map((row) => {
      const y = top + row * ((bottom - top) / 3);
      return `<line class="chart-gridline" x1="${left}" x2="${right}" y1="${y}" y2="${y}"></line>`;
    }).join("");
    const pointMarkup = points.map((point) => {
      const [x, y] = point.split(",");
      return `<circle class="chart-point" cx="${x}" cy="${y}" r="3.5"></circle>`;
    }).join("");
    const labelMarkup = labels.map((label, index) => {
      const x = left + (index * (right - left)) / (labels.length - 1);
      return `<text class="chart-label" x="${x}" y="193" text-anchor="middle">${label}</text>`;
    }).join("");
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="نمودار نمونه فروش"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c9a57e" stop-opacity=".23"></stop><stop offset="1" stop-color="#c9a57e" stop-opacity="0"></stop></linearGradient></defs>${grid}<polygon class="chart-area" points="${area}"></polygon><polyline class="chart-line" points="${line}"></polyline>${pointMarkup}${labelMarkup}</svg>`;
  }

  function renderDashboard() {
    const stats = dashboardStats();
    const soldCounts = new Map();
    state.data.orders.forEach((order) => {
      if (order.status === "لغوشده") return;
      order.items.forEach((item) => soldCounts.set(item.productId, (soldCounts.get(item.productId) || 0) + item.qty));
    });
    const topProducts = [...state.data.products]
      .sort((a, b) => (soldCounts.get(b.id) || 0) - (soldCounts.get(a.id) || 0))
      .slice(0, 4);
    const lowProducts = state.data.products.filter((product) => Number(product.stock) <= 5);
    const recentOrders = [...state.data.orders].slice(0, 4);
    return `${header("نمای کلی فروشگاه", "آمارها از داده‌های ساختگی همین پنل محاسبه شده‌اند.", `<button class="btn btn-quiet" type="button" data-action="reset-demo">بازنشانی داده‌های نمایشی</button>`)}
      <div class="stats-grid">
        ${statCard("فروش ثبت‌شده نمونه", money(stats.revenue), "مجموع سفارش‌های پرداخت‌شده", "₪")}
        ${statCard("سفارش‌ها", digits(stats.orderCount), `<span class="up">${digits(stats.pending)} مورد</span> نیازمند پیگیری`, "▧")}
        ${statCard("مشتریان نمایشی", digits(stats.customerCount), "حساب‌های نمونه در پنل", "♙")}
        ${statCard("محصولات / موجودی کم", `${digits(stats.productCount)} <small>/ ${digits(stats.lowStock)}</small>`, "محصولات نمونه در کاتالوگ", "▣")}
      </div>
      <div class="dashboard-grid">
        <section class="panel"><div class="panel-heading"><div><h2>روند فروش نمایشی</h2><p>مبالغ، داده آزمایشی هستند و عملکرد واقعی نیستند.</p></div><select class="period-select chart-period" aria-label="دوره نمودار"><option value="weekly"${state.chartPeriod === "weekly" ? " selected" : ""}>هفتگی</option><option value="monthly"${state.chartPeriod === "monthly" ? " selected" : ""}>ماهانه</option></select></div><div class="chart-wrap">${chartSvg(state.chartPeriod === "monthly")}</div><div class="chart-legend"><i></i><span>فروش نمونه</span></div></section>
        <section class="panel"><div class="panel-heading"><div><h2>محصولات پرفروش نمونه</h2><p>مرتب‌سازی بر اساس تعداد اقلام سفارش‌های نمونه</p></div><button class="link-button" type="button" data-go="products">همه محصولات ←</button></div><div class="mini-list">${topProducts.map((product) => `<div class="mini-row"><span class="product-thumb">${esc(product.name.slice(0, 1))}</span><span class="mini-row-copy"><strong>${esc(product.name)}</strong><small>${digits(soldCounts.get(product.id) || 0)} فروش نمونه · ${esc(product.brand)}</small></span><span class="mini-row-value">${money(product.price)}</span></div>`).join("")}</div></section>
      </div>
      <div class="dashboard-grid equal">
        <section class="panel"><div class="panel-heading"><div><h2>آخرین سفارش‌ها</h2><p>فهرست سفارش‌های ساختگی</p></div><button class="link-button" type="button" data-go="orders">مشاهده همه ←</button></div>${makeTable(["شماره", "مشتری", "مبلغ", "وضعیت"], recentOrders.map((order) => `<tr><td><span class="order-id">${esc(order.number)}</span></td><td>${esc(order.customer)}</td><td>${money(order.total)}</td><td>${badge(order.status, statusVariant(order.status))}</td></tr>`))}</section>
        <section class="panel"><div class="panel-heading"><div><h2>هشدار موجودی</h2><p>آستانه هشدار: ۵ عدد یا کمتر</p></div><button class="link-button" type="button" data-go="inventory">مدیریت موجودی ←</button></div>${lowProducts.length ? lowProducts.map((product) => `<div class="low-stock-row"><span>${esc(product.name)}</span><strong>${Number(product.stock) === 0 ? "ناموجود" : `${digits(product.stock)} عدد`}</strong></div>`).join("") : `<div class="empty-state"><div><span>✓</span><strong>موجودی کم ندارید</strong></div></div>`}</section>
      </div>
      <div class="dashboard-grid equal"><section class="panel"><div class="panel-heading"><div><h2>فعالیت‌های اخیر</h2><p>رویدادهای نمونه</p></div></div><div class="mini-list"><div class="mini-row"><span class="product-thumb">۱</span><span class="mini-row-copy"><strong>سفارش NX-2408 ثبت شد</strong><small>امروز · داده نمایشی</small></span></div><div class="mini-row"><span class="product-thumb">۲</span><span class="mini-row-copy"><strong>موجودی کراتین نیاز به بررسی دارد</strong><small>دیروز · هشدار نمونه</small></span></div><div class="mini-row"><span class="product-thumb">۳</span><span class="mini-row-copy"><strong>دیدگاه جدید در انتظار بررسی</strong><small>۲ روز پیش · محتوای ساختگی</small></span></div></div></section><section class="panel"><div class="panel-heading"><div><h2>یادآوری محیط آزمایشی</h2><p>اقدام‌های این بخش روی سرور اعمال نمی‌شوند.</p></div></div><p class="confirm-copy">اطلاعات سفارش، مشتری و فعالیت‌ها کاملاً خیالی هستند. این اعداد را به‌عنوان گزارش فروش واقعی در نظر نگیرید.</p><button class="btn btn-small" type="button" data-go="reports">رفتن به گزارش‌های نمونه</button></section></div>`;
  }

  const entityConfig = {
    products: {
      title: "مدیریت محصولات",
      subtitle: "فهرست آزمایشی با الهام از کاتالوگ فعلی؛ تغییرات فقط محلی هستند.",
      singular: "محصول",
      prefix: "p",
      createLabel: "افزودن محصول",
      search: ["name", "sku", "brand"],
      filters: ["همه", "منتشرشده", "پیش‌نویس", ...categories],
      sorts: [{ value: "newest", label: "پیش‌فرض" }, { value: "name-asc", label: "نام: الف تا ی" }, { value: "price-asc", label: "قیمت: کم به زیاد" }, { value: "stock-asc", label: "موجودی: کم به زیاد" }],
      fields: [
        { name: "name", label: "نام محصول", required: true },
        { name: "sku", label: "شناسه کالا (SKU)", required: true },
        { name: "brand", label: "برند", required: true },
        { name: "category", label: "دسته‌بندی", type: "select", options: categories },
        { name: "price", label: "قیمت (تومان)", type: "number", min: 0, required: true },
        { name: "stock", label: "تعداد موجودی", type: "number", min: 0, required: true },
        { name: "status", label: "وضعیت انتشار", type: "select", options: publicationStatuses },
        { name: "description", label: "توضیحات", type: "textarea", full: true }
      ],
      renderRow(item) {
        return `<tr><td><div class="table-primary"><span class="product-thumb">${esc(item.name.slice(0, 1))}</span><span><strong>${esc(item.name)}</strong><small>${esc(item.sku)}</small></span></div></td><td>${esc(item.category)}</td><td>${esc(item.brand)}</td><td>${money(item.price)}</td><td class="stock-value">${digits(item.stock)}</td><td>${badge(item.status, statusVariant(item.status))}</td><td><div class="table-actions">${actionButton("مشاهده جزئیات", "detail", item.id, "◉")}${actionButton("ویرایش", "edit", item.id, "✎")}${actionButton("حذف", "delete", item.id, "×", "danger")}</div></td></tr>`;
      },
      headers: ["محصول / شناسه", "دسته", "برند", "قیمت", "موجودی", "وضعیت", "عملیات"]
    },
    workouts: {
      title: "برنامه‌های تمرینی",
      subtitle: "محتوای عمومی تمرین برای نمایش در پنل؛ بدون ادعای پزشکی یا تضمین نتیجه.",
      singular: "برنامه تمرینی",
      prefix: "w",
      createLabel: "افزودن برنامه",
      search: ["title", "goal", "level", "description"],
      filters: ["همه", ...publicationStatuses],
      fields: [
        { name: "title", label: "عنوان برنامه", required: true },
        { name: "goal", label: "هدف تمرینی", required: true },
        { name: "level", label: "سطح", type: "select", options: ["مبتدی", "متوسط", "پیشرفته"] },
        { name: "duration", label: "مدت", required: true },
        { name: "status", label: "وضعیت انتشار", type: "select", options: publicationStatuses },
        { name: "description", label: "توضیح کوتاه", type: "textarea", full: true }
      ],
      renderRow(item) {
        return `<tr><td><strong>${esc(item.title)}</strong></td><td>${esc(item.goal)}</td><td>${esc(item.level)}</td><td>${esc(item.duration)}</td><td>${badge(item.status, statusVariant(item.status))}</td><td><div class="table-actions">${actionButton("مشاهده", "detail", item.id, "◉")}${actionButton("ویرایش", "edit", item.id, "✎")}${actionButton("حذف", "delete", item.id, "×", "danger")}</div></td></tr>`;
      },
      headers: ["عنوان", "دسته / هدف", "سطح", "مدت", "وضعیت", "عملیات"]
    },
    nutrition: {
      title: "برنامه‌های تغذیه",
      subtitle: "محتوای آموزشی نمونه؛ برای راهنمایی فردی با متخصص مشورت شود.",
      singular: "برنامه تغذیه",
      prefix: "n",
      createLabel: "افزودن برنامه",
      search: ["title", "goal", "description"],
      filters: ["همه", ...publicationStatuses],
      fields: [
        { name: "title", label: "عنوان برنامه", required: true },
        { name: "goal", label: "گروه / هدف عمومی", required: true },
        { name: "duration", label: "مدت", required: true },
        { name: "status", label: "وضعیت انتشار", type: "select", options: publicationStatuses },
        { name: "description", label: "توضیح کوتاه", type: "textarea", full: true }
      ],
      renderRow(item) {
        return `<tr><td><strong>${esc(item.title)}</strong></td><td>${esc(item.goal)}</td><td>${esc(item.duration)}</td><td>${badge(item.status, statusVariant(item.status))}</td><td><div class="table-actions">${actionButton("مشاهده", "detail", item.id, "◉")}${actionButton("ویرایش", "edit", item.id, "✎")}${actionButton("حذف", "delete", item.id, "×", "danger")}</div></td></tr>`;
      },
      headers: ["عنوان", "دسته / هدف", "مدت", "وضعیت", "عملیات"]
    },
    coupons: {
      title: "تخفیف و کدهای کوپن",
      subtitle: "کوپن‌ها فقط نمایشی هستند و در فروشگاه عمومی اعمال نمی‌شوند.",
      singular: "کد تخفیف",
      prefix: "d",
      createLabel: "ساخت کد",
      search: ["code", "type"],
      filters: ["همه", "فعال", "غیرفعال"],
      fields: [
        { name: "code", label: "کد", required: true },
        { name: "type", label: "نوع تخفیف", type: "select", options: ["درصدی", "مبلغ ثابت"] },
        { name: "value", label: "مقدار", type: "number", min: 1, required: true },
        { name: "start", label: "تاریخ شروع", required: true },
        { name: "expires", label: "تاریخ پایان", required: true },
        { name: "limit", label: "محدودیت استفاده", type: "number", min: 1, required: true },
        { name: "status", label: "وضعیت", type: "select", options: ["فعال", "غیرفعال"] }
      ],
      renderRow(item) {
        const value = item.type === "درصدی" ? `${digits(item.value)}٪` : money(item.value);
        return `<tr><td><span class="order-id">${esc(item.code)}</span></td><td>${esc(item.type)}</td><td>${value}</td><td>${esc(item.start)}</td><td>${esc(item.expires)}</td><td>${digits(item.limit)}</td><td>${badge(item.status, statusVariant(item.status))}</td><td><div class="table-actions">${actionButton("ویرایش", "edit", item.id, "✎")}${actionButton("حذف", "delete", item.id, "×", "danger")}</div></td></tr>`;
      },
      headers: ["کد", "نوع", "مقدار", "شروع", "پایان", "محدودیت", "وضعیت", "عملیات"]
    }
  };

  function renderEntity(view) {
    const config = entityConfig[view];
    const items = state.data[view];
    const found = matching(items, config.search);
    const rows = found.slice(0, state.pageSize).map((item) => config.renderRow(item));
    const add = `<button class="btn btn-primary" type="button" data-action="create"><span>＋</span>${config.createLabel}</button>`;
    return `${header(config.title, config.subtitle, add)}${toolbar({ filters: config.filters, sorts: config.sorts, count: items.length, countLabel: "رکورد نمونه", placeholder: `جست‌وجو در ${config.singular}...` })}<section class="panel">${makeTable(config.headers, rows)}${tableFooter(found.length)}</section>`;
  }

  function renderInventory() {
    const filtered = state.data.products.filter((item) => {
      const query = state.query.trim().toLocaleLowerCase("fa");
      const matchesQuery = !query || `${item.name} ${item.sku}`.toLocaleLowerCase("fa").includes(query);
      const matchesFilter = state.filter === "همه" || (state.filter === "ناموجود" ? Number(item.stock) === 0 : state.filter === "کم‌موجود" ? Number(item.stock) > 0 && Number(item.stock) <= 5 : Number(item.stock) > 5);
      return matchesQuery && matchesFilter;
    }).sort((a, b) => a.stock - b.stock);
    const products = filtered.slice(0, state.pageSize);
    const rows = products.map((item) => {
      const status = item.stock === 0 ? "ناموجود" : item.stock <= 5 ? "کم‌موجود" : "موجود";
      const variant = item.stock === 0 ? "bad" : item.stock <= 5 ? "warn" : "good";
      return `<tr><td><div class="table-primary"><span class="product-thumb">${esc(item.name.slice(0, 1))}</span><span><strong>${esc(item.name)}</strong><small>${esc(item.sku)}</small></span></div></td><td>${esc(item.category)}</td><td class="stock-value">${digits(item.stock)} عدد</td><td>${badge(status, variant)}</td><td>${actionButton("اصلاح موجودی", "adjust-stock", item.id, "±")}</td></tr>`;
    });
    const history = [...state.data.inventoryHistory].slice(0, 6).map((entry) => `<tr><td>${esc(entry.date)}</td><td>${esc(entry.product)}</td><td>${esc(entry.change)}</td><td>${esc(entry.reason)}</td></tr>`);
    return `${header("مدیریت موجودی", "هشدار برای ۵ عدد و کمتر؛ اصلاح موجودی فقط در داده نمایشی مرورگر اعمال می‌شود.", `<button class="btn btn-quiet" type="button" data-action="show-history">تاریخچه حرکت‌ها</button>`)}
      ${toolbar({ filters: ["همه", "کم‌موجود", "ناموجود", "موجود"], count: state.data.products.length, countLabel: "محصول", placeholder: "جست‌وجو بر اساس نام یا شناسه..." })}
      <section class="panel"><div class="panel-heading"><div><h2>سطح فعلی موجودی</h2><p>داده‌های نمونه محصولات فروشگاه</p></div></div>${makeTable(["محصول", "دسته‌بندی", "موجودی فعلی", "وضعیت", "عملیات"], rows)}${tableFooter(filtered.length)}</section>
      <section class="panel panel-spaced"><div class="panel-heading"><div><h2>آخرین گردش‌های موجودی</h2><p>تغییرهای محلی نمونه</p></div></div>${makeTable(["تاریخ", "محصول", "تغییر", "علت"], history)}</section>`;
  }

  function renderOrders() {
    const filterList = ["همه", ...orderStatuses];
    let orders = state.data.orders.filter((order) => {
      const query = state.query.trim().toLocaleLowerCase("fa");
      const matchesQuery = !query || `${order.number} ${order.customer} ${order.phone}`.toLocaleLowerCase("fa").includes(query);
      return matchesQuery && (state.filter === "همه" || order.status === state.filter);
    });
    if (state.sort === "amount-desc") orders = [...orders].sort((a, b) => b.total - a.total);
    const visible = orders.slice(0, state.pageSize);
    const rows = visible.map((order) => `<tr><td><span class="order-id">${esc(order.number)}</span></td><td>${esc(order.date)}</td><td>${esc(order.customer)}</td><td>${digits(order.items.reduce((sum, item) => sum + item.qty, 0))} قلم</td><td>${money(order.total)}</td><td>${badge(order.payment, statusVariant(order.payment))}</td><td><select class="control-select order-status" data-id="${esc(order.id)}" aria-label="وضعیت سفارش ${esc(order.number)}">${orderStatuses.map((status) => `<option${status === order.status ? " selected" : ""}>${status}</option>`).join("")}</select></td><td>${actionButton("جزئیات سفارش", "order-detail", order.id, "◉")}</td></tr>`);
    return `${header("مدیریت سفارش‌ها", "همه سفارش‌ها و اطلاعات تماس این بخش ساختگی هستند.", `<button class="btn btn-quiet" type="button" data-action="print-orders">چاپ فهرست</button>`)}
      ${toolbar({ filters: filterList, sorts: [{ value: "newest", label: "ترتیب تاریخ" }, { value: "amount-desc", label: "مبلغ: زیاد به کم" }], count: state.data.orders.length, countLabel: "سفارش", placeholder: "شماره سفارش، نام یا تلفن..." })}
      <section class="panel">${makeTable(["شماره سفارش", "تاریخ", "مشتری", "اقلام", "مبلغ کل", "پرداخت", "وضعیت ارسال", "جزئیات"], rows)}${tableFooter(orders.length)}</section>`;
  }

  function renderCustomers() {
    const customers = state.data.customers.filter((customer) => {
      const query = state.query.trim().toLocaleLowerCase("fa");
      const matchesQuery = !query || `${customer.name} ${customer.email} ${customer.phone}`.toLocaleLowerCase("fa").includes(query);
      return matchesQuery && (state.filter === "همه" || customer.status === state.filter);
    });
    const visible = customers.slice(0, state.pageSize);
    const rows = visible.map((customer) => {
      const orders = state.data.orders.filter((order) => order.customerId === customer.id);
      const total = orders.reduce((sum, order) => sum + (order.payment === "پرداخت‌شده" ? order.total : 0), 0);
      return `<tr><td><div class="table-primary"><span class="avatar">${esc(customer.name.slice(0, 1))}</span><span><strong>${esc(customer.name)}</strong><small>${esc(customer.role)}</small></span></div></td><td>${esc(customer.email)}</td><td>${esc(customer.phone)}</td><td>${esc(customer.registered)}</td><td>${digits(orders.length)}</td><td>${money(total)}</td><td>${badge(customer.status, statusVariant(customer.status))}</td><td><div class="table-actions">${actionButton("مشاهده مشتری", "customer-detail", customer.id, "◉")}${actionButton("تغییر وضعیت حساب", "toggle-customer", customer.id, "↻")}</div></td></tr>`;
    });
    return `${header("مشتریان", "حساب‌های مشتریان، اطلاعات تماس و خریدها ساختگی هستند؛ نقش مدیر جداگانه تعریف شده است.", "")}
      ${toolbar({ filters: ["همه", "فعال", "غیرفعال"], count: state.data.customers.length, countLabel: "مشتری", placeholder: "جست‌وجو با نام، ایمیل یا تلفن..." })}
      <section class="panel">${makeTable(["مشتری", "ایمیل", "تلفن", "ثبت‌نام", "سفارش", "مجموع خرید نمونه", "وضعیت", "عملیات"], rows)}${tableFooter(customers.length)}</section>`;
  }

  function renderMessages() {
    const all = state.data.messages.filter((message) => !message.archived);
    const messages = all.filter((message) => {
      const query = state.query.trim().toLocaleLowerCase("fa");
      const matchesQuery = !query || `${message.name} ${message.email} ${message.subject} ${message.message}`.toLocaleLowerCase("fa").includes(query);
      const status = message.read ? "خوانده‌شده" : "خوانده‌نشده";
      return matchesQuery && (state.filter === "همه" || state.filter === status);
    });
    const visible = messages.slice(0, state.pageSize);
    const rows = visible.map((message) => `<tr><td>${esc(message.name)}</td><td>${esc(message.email)}</td><td><strong>${esc(message.subject)}</strong><div class="message-preview">${esc(message.message)}</div></td><td>${esc(message.date)}</td><td>${badge(message.read ? "خوانده‌شده" : "خوانده‌نشده", message.read ? "good" : "warn")}</td><td><div class="table-actions">${actionButton("مشاهده پیام", "message-detail", message.id, "◉")}${actionButton(message.read ? "علامت‌گذاری به‌عنوان خوانده‌نشده" : "علامت‌گذاری به‌عنوان خوانده‌شده", "toggle-message-read", message.id, message.read ? "↶" : "✓")}${actionButton("بایگانی پیام", "archive-message", message.id, "▱")}${actionButton("حذف پیام", "delete-message", message.id, "×", "danger")}</div></td></tr>`);
    return `${header("پیام‌های مشتریان", "پیام‌های ساختگی برای نمایش گردش‌کار inbox؛ به فرم عمومی سایت متصل نیستند.", "")}
      ${toolbar({ filters: ["همه", "خوانده‌نشده", "خوانده‌شده"], count: all.length, countLabel: "پیام", placeholder: "نام، ایمیل یا موضوع پیام..." })}
      <section class="panel">${makeTable(["فرستنده", "ایمیل", "موضوع / پیش‌نمایش", "تاریخ", "وضعیت", "عملیات"], rows)}${tableFooter(messages.length)}</section>`;
  }

  function renderReviews() {
    const reviews = state.data.reviews.filter((review) => {
      const query = state.query.trim().toLocaleLowerCase("fa");
      const matchesQuery = !query || `${review.product} ${review.name} ${review.text}`.toLocaleLowerCase("fa").includes(query);
      return matchesQuery && (state.filter === "همه" || review.status === state.filter);
    });
    const visible = reviews.slice(0, state.pageSize);
    const rows = visible.map((review) => `<tr><td>${esc(review.product)}</td><td>${esc(review.name)}</td><td><span class="rating-stars" aria-label="${digits(review.rating)} از ۵">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span></td><td><div class="message-preview">${esc(review.text)}</div></td><td>${esc(review.date)}</td><td>${badge(review.status, statusVariant(review.status))}</td><td><div class="table-actions">${actionButton("مشاهده دیدگاه", "review-detail", review.id, "◉")}${actionButton("تأیید دیدگاه", "approve-review", review.id, "✓")}${actionButton("رد دیدگاه", "reject-review", review.id, "×", "danger")}</div></td></tr>`);
    return `${header("مدیریت دیدگاه‌ها", "همه دیدگاه‌ها ساختگی هستند و تأیید آن‌ها روی وب‌سایت عمومی اثری ندارد.", "")}
      ${toolbar({ filters: ["همه", "در انتظار بررسی", "تأییدشده", "ردشده"], count: state.data.reviews.length, countLabel: "دیدگاه", placeholder: "محصول، نام یا متن دیدگاه..." })}
      <section class="panel">${makeTable(["محصول", "نام نمایشی", "امتیاز", "متن", "تاریخ", "وضعیت", "مدیریت"], rows)}${tableFooter(reviews.length)}</section>`;
  }

  function renderContent() {
    const content = state.data.content;
    const selectedProducts = content.featuredProducts || [];
    return `${header("محتوای وب‌سایت", "ویرایش‌ها فقط در داده‌های محلی این پنل ذخیره می‌شوند و در صفحات عمومی منتشر نمی‌شوند.", "")}
      <div class="content-grid"><section class="panel"><h2 class="form-section-title">مقادیر قابل ویرایش نمایشی</h2><form id="content-form" class="inline-form">
        <div class="field full"><label for="hero-title-field">تیتر اصلی صفحه نخست</label><input id="hero-title-field" name="heroTitle" required value="${esc(content.heroTitle)}"></div>
        <div class="field full"><label for="hero-description-field">توضیح صفحه نخست</label><textarea id="hero-description-field" name="heroDescription" required>${esc(content.heroDescription)}</textarea></div>
        <div class="field full"><label for="announcement-field">نوار اطلاع‌رسانی</label><input id="announcement-field" name="announcement" value="${esc(content.announcement)}"></div>
        <div class="field full"><label for="promotion-field">متن بخش پیشنهادهای ویژه</label><textarea id="promotion-field" name="promotion">${esc(content.promotion || "")}</textarea></div>
        <div class="field full"><label for="about-field">خلاصه صفحه درباره ما</label><textarea id="about-field" name="about">${esc(content.about)}</textarea></div>
        <div class="field full"><label for="contact-field">متن اطلاعات تماس نمایشی</label><textarea id="contact-field" name="contact">${esc(content.contact)}</textarea></div>
        <div class="field full"><label for="footer-field">متن پاورقی</label><input id="footer-field" name="footer" value="${esc(content.footer)}"></div>
        <div class="field"><label for="social-instagram">پیوند اینستاگرام</label><input id="social-instagram" name="socialInstagram" type="url" placeholder="در صورت نیاز وارد کنید" value="${esc(content.socialInstagram || "")}"></div>
        <div class="field"><label for="social-telegram">پیوند تلگرام</label><input id="social-telegram" name="socialTelegram" type="url" placeholder="در صورت نیاز وارد کنید" value="${esc(content.socialTelegram || "")}"></div>
        <div class="field"><label for="social-youtube">پیوند یوتیوب</label><input id="social-youtube" name="socialYoutube" type="url" placeholder="در صورت نیاز وارد کنید" value="${esc(content.socialYoutube || "")}"></div>
        <div class="field full"><span class="field-label">تصویر بنر نمایشی (پیش‌نمایش محلی)</span><div class="image-picker"><div class="image-preview" id="content-image-preview">N</div><div><input type="file" accept="image/*" data-preview-target="content-image-preview"><small>انتخاب تصویر فقط برای پیش‌نمایش همین نشست است؛ در سایت منتشر نمی‌شود.</small></div></div></div>
        <div class="field full"><span class="field-label">محصولات منتخب نمایشی</span><div class="featured-products">${state.data.products.map((product) => `<label class="toggle-row"><span class="toggle-copy"><strong>${esc(product.name)}</strong><small>${money(product.price)}</small></span><input type="checkbox" name="featuredProducts" value="${esc(product.id)}"${selectedProducts.includes(product.id) ? " checked" : ""}></label>`).join("")}</div></div>
        <div class="field full"><div class="form-actions"><button class="btn btn-primary" type="submit">ذخیره محلی محتوا</button><button class="btn" type="button" data-action="reset-content">بازگردانی متن نمونه</button></div></div>
      </form></section><aside class="content-preview"><span class="preview-brand">NEXRO · PREVIEW</span><h3 id="content-preview-title">${esc(content.heroTitle)}</h3><p id="content-preview-description">${esc(content.heroDescription)}</p><small>این پیش‌نمایش با محتوای عمومی سایت ارتباطی ندارد.</small></aside></div>`;
  }

  function renderReports() {
    const stats = dashboardStats();
    const statusCounts = orderStatuses.map((status) => ({ status, count: state.data.orders.filter((order) => order.status === status).length }));
    const productRows = [...state.data.products].sort((a, b) => b.price - a.price).slice(0, 5).map((product) => `<tr><td>${esc(product.name)}</td><td>${money(product.price)}</td><td>${digits(product.stock)}</td></tr>`);
    return `${header("گزارش‌ها و تحلیل", "تحلیل‌ها از داده‌های آزمایشی پنل ساخته شده‌اند و آمار واقعی نیستند.", "")}
      <div class="stats-grid">${statCard("فروش پرداخت‌شده", money(stats.revenue), "جمع سفارش‌های غیرلغوشده", "₪")}${statCard("حجم سفارش‌ها", digits(stats.orderCount), "تمام وضعیت‌ها", "▧")}${statCard("ثبت‌نام مشتریان", digits(stats.customerCount), "حساب‌های نمونه", "♙")}${statCard("موجودی نیازمند بررسی", digits(stats.lowStock), "آستانه ۵ عدد", "▣")}</div>
      <div class="dashboard-grid"><section class="panel"><div class="panel-heading"><div><h2>درآمد نمونه در بازه</h2><p>نمودار غیرواقعی برای نمایش رابط</p></div><select class="control-select report-period" aria-label="بازه گزارش"><option${state.reportPeriod === "۷ روز اخیر" ? " selected" : ""}>۷ روز اخیر</option><option${state.reportPeriod === "۳۰ روز اخیر" ? " selected" : ""}>۳۰ روز اخیر</option><option${state.reportPeriod === "این ماه" ? " selected" : ""}>این ماه</option></select></div><div class="chart-wrap">${chartSvg(state.reportPeriod !== "۷ روز اخیر")}</div></section>
      <section class="panel"><div class="panel-heading"><div><h2>توزیع وضعیت سفارش</h2><p>تعداد سفارش در هر وضعیت</p></div></div><div class="mini-list">${statusCounts.map((item) => `<div class="low-stock-row"><span>${esc(item.status)}</span><strong>${digits(item.count)} سفارش</strong></div>`).join("")}</div></section></div>
      <div class="dashboard-grid equal"><section class="panel"><div class="panel-heading"><div><h2>فهرست محصولات نمونه</h2><p>مرتب‌سازی نمایشی بر اساس قیمت</p></div></div>${makeTable(["محصول", "قیمت نمونه", "موجودی"], productRows)}</section>
      <section class="panel"><div class="panel-heading"><div><h2>ثبت‌نام کاربران</h2><p>بر اساس تاریخ‌های نمونه ثبت‌شده</p></div></div><div class="mini-list">${state.data.customers.map((customer) => `<div class="mini-row"><span class="product-thumb">${esc(customer.name.slice(0, 1))}</span><span class="mini-row-copy"><strong>${esc(customer.name)}</strong><small>${esc(customer.registered)}</small></span><span>${badge(customer.status, statusVariant(customer.status))}</span></div>`).join("")}</div></section></div>`;
  }

  function renderSettings() {
    const settings = state.data.settings;
    return `${header("تنظیمات پنل", "تنظیمات آزمایشی در مرورگر ذخیره می‌شوند؛ هیچ رمز، کلید یا اعتبارنامه‌ای نگهداری نمی‌شود.", "")}
      <form id="settings-form" class="settings-grid">
        <section class="settings-card"><h2>اطلاعات عمومی فروشگاه</h2><p>اطلاعات تماس فعلی وب‌سایت را به‌عنوان مقدار نمونه نمایش می‌دهیم.</p><div class="inline-form">
          <div class="field"><label for="store-name">نام فروشگاه</label><input id="store-name" name="storeName" required value="${esc(settings.storeName)}"></div>
          <div class="field"><label for="store-email">ایمیل نمونه</label><input id="store-email" name="email" type="email" required value="${esc(settings.email)}"></div>
          <div class="field"><label for="store-phone">تلفن نمونه</label><input id="store-phone" name="phone" required value="${esc(settings.phone)}"></div>
          <div class="field"><label for="store-currency">واحد قیمت</label><select id="store-currency" name="currency">${["تومان", "ریال"].map((value) => `<option${value === settings.currency ? " selected" : ""}>${value}</option>`).join("")}</select></div>
          <div class="field"><label for="date-format">قالب تاریخ</label><select id="date-format" name="dateFormat">${["شمسی", "میلادی"].map((value) => `<option${value === settings.dateFormat ? " selected" : ""}>${value}</option>`).join("")}</select></div>
        </div><div class="form-actions"><button class="btn btn-primary" type="submit">ذخیره تنظیمات نمایشی</button></div></section>
        <section class="settings-card"><h2>پروفایل مدیر نمایشی</h2><p>این پروفایل صرفاً برای نمایش رابط است و ورود یا نقش واقعی ایجاد نمی‌کند.</p><div class="detail-grid"><div class="detail-cell"><small>نام نمایشی</small><strong>مدیر نکسرو</strong></div><div class="detail-cell"><small>نقش نمونه</small><strong>مدیر فروشگاه</strong></div><div class="detail-cell"><small>وضعیت احراز هویت</small><strong>پیاده‌سازی نشده</strong></div></div><div class="detail-note">پیش از انتشار باید احراز هویت و مجوزدهی سمت سرور پیاده‌سازی شود.</div></section>
        <section class="settings-card"><h2>ترجیحات اعلان</h2><p>تنظیمات صرفاً برای ظاهر نمایشی پنل هستند.</p>
          <div class="toggle-row"><span class="toggle-copy"><strong>اعلان‌های پنل</strong><small>نمایش اعلان‌های نمونه در رابط</small></span><label class="switch"><input name="notifications" type="checkbox"${settings.notifications ? " checked" : ""}><span></span></label></div>
          <div class="toggle-row"><span class="toggle-copy"><strong>هشدار سفارش</strong><small>یادآوری سفارش‌های در انتظار</small></span><label class="switch"><input name="orderAlerts" type="checkbox"${settings.orderAlerts ? " checked" : ""}><span></span></label></div>
        </section>
        <section class="settings-card"><h2>ترجیحات نمایش</h2><p>قالب کلی و زبان رابط</p><div class="detail-grid"><div class="detail-cell"><small>زبان</small><strong>فارسی</strong></div><div class="detail-cell"><small>جهت نوشتار</small><strong>راست‌چین (RTL)</strong></div><div class="detail-cell"><small>پوسته</small><strong>تیره · NEXRO</strong></div></div></section>
      </form>
      <section class="settings-card danger-zone"><h2>بازنشانی داده‌های نمایشی</h2><p>تغییرهای محلی ذخیره‌شده در این مرورگر حذف و داده‌های نمونه اولیه جایگزین می‌شوند.</p><button class="btn btn-danger" type="button" data-action="reset-demo">بازنشانی همه داده‌های نمونه</button></section>`;
  }

  function renderView() {
    document.getElementById("low-stock-count").textContent = digits(state.data.products.filter((product) => product.stock <= 5).length);
    document.getElementById("unread-count").textContent = digits(state.data.messages.filter((message) => !message.read && !message.archived).length);
    if (state.view === "dashboard") viewRoot.innerHTML = renderDashboard();
    else if (entityConfig[state.view]) viewRoot.innerHTML = renderEntity(state.view);
    else if (state.view === "inventory") viewRoot.innerHTML = renderInventory();
    else if (state.view === "orders") viewRoot.innerHTML = renderOrders();
    else if (state.view === "customers") viewRoot.innerHTML = renderCustomers();
    else if (state.view === "messages") viewRoot.innerHTML = renderMessages();
    else if (state.view === "reviews") viewRoot.innerHTML = renderReviews();
    else if (state.view === "content") viewRoot.innerHTML = renderContent();
    else if (state.view === "reports") viewRoot.innerHTML = renderReports();
    else if (state.view === "settings") viewRoot.innerHTML = renderSettings();
  }

  function fieldMarkup(field, value) {
    const full = field.full ? " full" : "";
    const required = field.required ? " required" : "";
    const current = value ?? "";
    let input;
    if (field.type === "select") {
      input = `<select name="${field.name}"${required}>${field.options.map((option) => `<option${String(current) === option ? " selected" : ""}>${esc(option)}</option>`).join("")}</select>`;
    } else if (field.type === "textarea") {
      input = `<textarea name="${field.name}"${required}>${esc(current)}</textarea>`;
    } else {
      const type = field.type || "text";
      const attrs = `${field.min !== undefined ? ` min="${field.min}"` : ""}${type === "number" ? ' step="1"' : ""}`;
      input = `<input name="${field.name}" type="${type}"${attrs}${required} value="${esc(current)}">`;
    }
    const controlId = `field-${field.name}`;
    input = input.replace(`name="${field.name}"`, `id="${controlId}" name="${field.name}"`);
    return `<div class="field${full}"><label for="${controlId}">${esc(field.label)}</label>${input}</div>`;
  }

  function showModal(title, body, footer, wide = false) {
    focusBeforeModal = document.activeElement;
    modalRoot.innerHTML = `<div class="modal-backdrop" data-modal-backdrop><section class="modal-card${wide ? " wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-header"><div><h2 id="modal-title">${esc(title)}</h2><p>اقدام‌ها فقط در داده‌های نمایشی مرورگر انجام می‌شوند.</p></div><button class="modal-close" type="button" aria-label="بستن پنجره" data-close-modal>×</button></header>${body ? `<div class="modal-body">${body}</div>` : ""}${footer ? `<footer class="modal-footer">${footer}</footer>` : ""}</section></div>`;
    modalRoot.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modalRoot.innerHTML = "";
    if (focusBeforeModal && typeof focusBeforeModal.focus === "function") focusBeforeModal.focus();
  }

  function openEntityForm(view, item = null) {
    const config = entityConfig[view];
    const values = item || { status: view === "coupons" ? "فعال" : "منتشرشده", type: "درصدی", category: categories[0], level: "مبتدی" };
    const fields = config.fields.map((field) => fieldMarkup(field, values[field.name])).join("");
    const imageField = view === "products" ? `<div class="field full"><span class="field-label">تصویر محصول</span><div class="image-picker"><div class="image-preview" id="product-image-preview">${values.image ? `<img src="${esc(values.image)}" alt="پیش‌نمایش تصویر">` : esc((values.name || "N").slice(0, 1))}</div><div><input type="file" accept="image/*" data-preview-target="product-image-preview"><small>انتخاب تصویر برای پیش‌نمایش این نشست (حداکثر ۱ مگابایت).</small></div></div></div>` : "";
    showModal(item ? `ویرایش ${config.singular}` : `افزودن ${config.singular}`, `<form id="entity-form" class="inline-form" data-entity="${view}" data-id="${esc(item?.id || "")}">${fields}${imageField}<div class="field full"><div class="form-actions"><button class="btn btn-primary" type="submit">${item ? "ذخیره تغییرات" : "افزودن به داده نمایشی"}</button><button class="btn" type="button" data-close-modal>انصراف</button></div></div></form>`, "", view === "products");
    modalRoot.querySelector("input, select, textarea")?.focus();
  }

  function openEntityDetail(view, item) {
    const config = entityConfig[view];
    const fields = config.fields.filter((field) => item[field.name] !== undefined).map((field) => `<div class="detail-cell"><small>${esc(field.label)}</small><strong>${esc(item[field.name])}</strong></div>`).join("");
    const image = item.image ? `<div class="field full"><div class="image-preview"><img src="${esc(item.image)}" alt="${esc(item.name)}"></div></div>` : "";
    showModal(`جزئیات ${config.singular}`, `<div class="detail-grid">${fields}</div>${image}${item.description ? `<div class="detail-section"><h3>توضیحات</h3><p class="confirm-copy">${esc(item.description)}</p></div>` : ""}`, `<button class="btn btn-primary" type="button" data-close-modal>بستن</button>`, view === "products");
  }

  function openDeleteConfirm(view, item) {
    const config = entityConfig[view];
    showModal(`حذف ${config.singular}`, `<p class="confirm-copy">آیا از حذف «${esc(item.name || item.title || item.code)}» از داده‌های محلی مطمئن هستید؟ این عمل فقط روی نسخه نمایشی اثر می‌گذارد.</p>`, `<button class="btn btn-danger" type="button" data-confirm-delete="${view}" data-id="${esc(item.id)}">حذف نمایشی</button><button class="btn" type="button" data-close-modal>انصراف</button>`);
  }

  function openOrderDetail(order) {
    const items = order.items.map((item) => `<tr><td>${esc(item.name)}</td><td>${digits(item.qty)}</td><td>${money(item.price)}</td><td>${money(item.qty * item.price)}</td></tr>`).join("");
    const body = `<div class="detail-grid"><div class="detail-cell"><small>شماره سفارش</small><strong>${esc(order.number)}</strong></div><div class="detail-cell"><small>تاریخ</small><strong>${esc(order.date)}</strong></div><div class="detail-cell"><small>وضعیت پرداخت</small><strong>${esc(order.payment)}</strong></div><div class="detail-cell"><small>نام مشتری نمونه</small><strong>${esc(order.customer)}</strong></div><div class="detail-cell"><small>تلفن ساختگی</small><strong>${esc(order.phone)}</strong></div><div class="detail-cell"><small>ایمیل آزمایشی</small><strong>${esc(order.email)}</strong></div></div>
      <div class="detail-section"><h3>اقلام سفارش</h3><div class="table-wrap"><table class="detail-table"><thead><tr><th>محصول</th><th>تعداد</th><th>قیمت</th><th>جمع</th></tr></thead><tbody>${items}</tbody></table></div><div class="detail-total"><div><span>جمع جزء</span><span>${money(order.subtotal)}</span></div><div><span>تخفیف</span><span>− ${money(order.discount)}</span></div><div><span>هزینه ارسال</span><span>${money(order.shipping)}</span></div><div><span>مبلغ کل</span><span>${money(order.total)}</span></div></div></div>
      <div class="detail-section"><h3>نشانی ارسال نمونه</h3><p class="confirm-copy">${esc(order.address)}</p></div><div class="detail-note">اطلاعات کاملاً ساختگی است؛ پرداخت، بازپرداخت و ارسال واقعی انجام نمی‌شود.</div>
      <div class="field" style="margin-top:14px"><label for="detail-order-status">وضعیت سفارش نمایشی</label><select id="detail-order-status" class="control-select" data-order-detail-status="${esc(order.id)}">${orderStatuses.map((status) => `<option${status === order.status ? " selected" : ""}>${status}</option>`).join("")}</select></div>`;
    showModal(`جزئیات سفارش ${order.number}`, body, `<button class="btn btn-primary" type="button" data-close-modal>بستن</button><button class="btn" type="button" data-action="print-order" data-id="${esc(order.id)}">چاپ خلاصه</button>`, true);
  }

  function openCustomerDetail(customer) {
    const orders = state.data.orders.filter((order) => order.customerId === customer.id);
    const paid = orders.filter((order) => order.payment === "پرداخت‌شده").reduce((sum, order) => sum + order.total, 0);
    const rows = orders.map((order) => `<tr><td>${esc(order.number)}</td><td>${esc(order.date)}</td><td>${money(order.total)}</td><td>${badge(order.status, statusVariant(order.status))}</td></tr>`);
    showModal(`جزئیات مشتری ${customer.name}`, `<div class="detail-grid"><div class="detail-cell"><small>نام</small><strong>${esc(customer.name)}</strong></div><div class="detail-cell"><small>ایمیل ساختگی</small><strong>${esc(customer.email)}</strong></div><div class="detail-cell"><small>تلفن ساختگی</small><strong>${esc(customer.phone)}</strong></div><div class="detail-cell"><small>تاریخ ثبت‌نام</small><strong>${esc(customer.registered)}</strong></div><div class="detail-cell"><small>وضعیت حساب نمایشی</small><strong>${esc(customer.status)}</strong></div><div class="detail-cell"><small>خرید پرداخت‌شده نمونه</small><strong>${money(paid)}</strong></div></div><div class="detail-section"><h3>سفارش‌های نمونه</h3>${makeTable(["شماره", "تاریخ", "مبلغ", "وضعیت"], rows)}</div><div class="detail-note">این مشتری خیالی است و از پایگاه داده واقعی دریافت نشده است.</div>`, `<button class="btn btn-primary" type="button" data-close-modal>بستن</button>`, true);
  }

  function openMessage(message) {
    message.read = true;
    persistAndNotify("", false);
    renderView();
    showModal(`پیام: ${message.subject}`, `<div class="detail-grid"><div class="detail-cell"><small>فرستنده ساختگی</small><strong>${esc(message.name)}</strong></div><div class="detail-cell"><small>ایمیل آزمایشی</small><strong>${esc(message.email)}</strong></div><div class="detail-cell"><small>تاریخ نمونه</small><strong>${esc(message.date)}</strong></div></div><div class="detail-section"><h3>متن پیام</h3><p class="confirm-copy">${esc(message.message)}</p></div><div class="detail-note">این پیام فقط داده نمونه است و از فرم عمومی دریافت نشده است.</div>`, `<button class="btn btn-primary" type="button" data-close-modal>بستن</button>`);
  }

  function confirmAction(title, message, action, itemId) {
    showModal(title, `<p class="confirm-copy">${message}</p>`, `<button class="btn btn-danger" type="button" data-action="${action}" data-id="${esc(itemId)}">تأیید</button><button class="btn" type="button" data-close-modal>انصراف</button>`);
  }

  function handleAction(action, itemId) {
    if (action === "create") return openEntityForm(state.view);
    if (action === "reset-demo") {
      confirmAction("بازنشانی داده‌های نمایشی", "همه تغییرهای محلی حذف و داده‌های نمونه اولیه جایگزین می‌شوند. ادامه می‌دهید؟", "confirm-reset", "all");
      return;
    }
    if (action === "confirm-reset") {
      state.data = clone(initialData);
      const saved = saveData();
      state.view = "dashboard";
      state.query = "";
      document.getElementById("global-search").value = "";
      document.getElementById("current-section").textContent = names.dashboard;
      document.querySelectorAll(".nav-item").forEach((button) => {
        button.classList.toggle("active", button.dataset.view === "dashboard");
        if (button.dataset.view === "dashboard") button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      closeModal();
      renderView();
      toast(saved ? "داده‌های نمایشی به حالت اولیه بازگشتند." : "نمونه‌ها در نشست جاری بازنشانی شدند، اما در مرورگر ذخیره نشدند.", saved ? "success" : "error");
      return;
    }
    if (action === "edit" || action === "detail" || action === "delete") {
      const config = entityConfig[state.view];
      const item = state.data[state.view].find((record) => record.id === itemId);
      if (!item) return toast("رکورد موردنظر پیدا نشد.", "error");
      if (action === "edit") openEntityForm(state.view, item);
      else if (action === "detail") openEntityDetail(state.view, item);
      else openDeleteConfirm(state.view, item);
      return;
    }
    if (action === "adjust-stock") {
      const product = state.data.products.find((item) => item.id === itemId);
      if (!product) return toast("محصول پیدا نشد.", "error");
      showModal("اصلاح موجودی", `<form id="stock-form" data-id="${esc(product.id)}" class="inline-form"><div class="field full"><label>محصول</label><input value="${esc(product.name)}" disabled></div><div class="field"><label for="stock-change">مقدار تغییر (مثبت یا منفی)</label><input id="stock-change" name="change" type="number" step="1" required value="1"></div><div class="field"><label for="stock-reason">علت اصلاح</label><input id="stock-reason" name="reason" required value="اصلاح نمایشی"></div><div class="field full"><small class="confirm-copy">موجودی فعلی: ${digits(product.stock)} · اگر موجودی جدید منفی شود، ثبت انجام نمی‌شود.</small></div><div class="field full"><div class="form-actions"><button class="btn btn-primary" type="submit">ثبت اصلاح محلی</button><button class="btn" type="button" data-close-modal>انصراف</button></div></div></form>`, "");
      return;
    }
    if (action === "order-detail") {
      const order = state.data.orders.find((item) => item.id === itemId);
      if (order) openOrderDetail(order);
      return;
    }
    if (action === "customer-detail") {
      const customer = state.data.customers.find((item) => item.id === itemId);
      if (customer) openCustomerDetail(customer);
      return;
    }
    if (action === "toggle-customer") {
      const customer = state.data.customers.find((item) => item.id === itemId);
      if (!customer) return;
      customer.status = customer.status === "فعال" ? "غیرفعال" : "فعال";
      persistAndNotify("وضعیت نمایشی حساب تغییر کرد."); renderView();
      return;
    }
    if (action === "message-detail") {
      const message = state.data.messages.find((item) => item.id === itemId);
      if (message) openMessage(message);
      return;
    }
    if (action === "toggle-message-read") {
      const message = state.data.messages.find((item) => item.id === itemId);
      if (message) { message.read = !message.read; persistAndNotify("وضعیت پیام به‌روزرسانی شد."); renderView(); }
      return;
    }
    if (action === "archive-message" || action === "delete-message") {
      const message = state.data.messages.find((item) => item.id === itemId);
      if (!message) return;
      confirmAction(action === "archive-message" ? "بایگانی پیام" : "حذف پیام", `پیام «${esc(message.subject)}» ${action === "archive-message" ? "بایگانی" : "از داده محلی حذف"} شود؟`, `confirm-${action}`, itemId);
      return;
    }
    if (action === "confirm-archive-message" || action === "confirm-delete-message") {
      if (action === "confirm-archive-message") {
        const message = state.data.messages.find((item) => item.id === itemId);
        if (message) message.archived = true;
      } else {
        state.data.messages = state.data.messages.filter((item) => item.id !== itemId);
      }
      persistAndNotify("تغییر پیام در نسخه نمایشی اعمال شد."); closeModal(); renderView();
      return;
    }
    if (action === "approve-review" || action === "reject-review" || action === "review-detail") {
      const review = state.data.reviews.find((item) => item.id === itemId);
      if (!review) return;
      if (action === "review-detail") {
        showModal("جزئیات دیدگاه نمونه", `<div class="detail-grid"><div class="detail-cell"><small>محصول</small><strong>${esc(review.product)}</strong></div><div class="detail-cell"><small>نام نمایشی</small><strong>${esc(review.name)}</strong></div><div class="detail-cell"><small>امتیاز</small><strong>${digits(review.rating)} از ۵</strong></div><div class="detail-cell"><small>تاریخ</small><strong>${esc(review.date)}</strong></div></div><p class="confirm-copy">${esc(review.text)}</p><div class="detail-note">این دیدگاه ساختگی است و انتشار آن به سایت عمومی متصل نیست.</div>`, `<button class="btn btn-primary" type="button" data-close-modal>بستن</button>`);
      } else {
        review.status = action === "approve-review" ? "تأییدشده" : "ردشده";
        persistAndNotify(`وضعیت دیدگاه: ${review.status}.`); renderView();
      }
      return;
    }
    if (action === "reset-content") {
      state.data.content = clone(initialData.content);
      persistAndNotify("متن‌های نمونه بازگردانی شدند."); renderView();
      return;
    }
    if (action === "show-history") {
      const rows = [...state.data.inventoryHistory].map((entry) => `<tr><td>${esc(entry.date)}</td><td>${esc(entry.product)}</td><td>${esc(entry.change)}</td><td>${esc(entry.reason)}</td></tr>`);
      showModal("تاریخچه گردش موجودی", makeTable(["تاریخ", "محصول", "تغییر", "علت"], rows), `<button class="btn btn-primary" type="button" data-close-modal>بستن</button>`, true);
      return;
    }
    if (action === "print-orders" || action === "print-order") {
      window.print();
      return;
    }
  }

  function formValues(form) {
    const values = Object.fromEntries(new FormData(form).entries());
    form.querySelectorAll('input[type="number"]').forEach((input) => {
      if (input.name) values[input.name] = Number(values[input.name]);
    });
    return values;
  }

  function handleEntitySubmit(form) {
    const view = form.dataset.entity;
    const config = entityConfig[view];
    if (!config) return;
    const values = formValues(form);
    if (view === "coupons") values.code = values.code.trim().toUpperCase();
    if (view === "products") {
      const duplicateSku = state.data.products.some((item) => item.sku.toLowerCase() === String(values.sku).toLowerCase() && item.id !== form.dataset.id);
      if (duplicateSku) return toast("این شناسه کالا در فهرست نمونه وجود دارد.", "error");
      if (form.dataset.image) values.image = form.dataset.image;
      else if (form.dataset.id) {
        const previous = state.data.products.find((item) => item.id === form.dataset.id);
        if (previous?.image) values.image = previous.image;
      }
    }
    if (view === "coupons" && values.type === "درصدی" && values.value > 100) {
      return toast("مقدار تخفیف درصدی نمی‌تواند بیشتر از ۱۰۰ باشد.", "error");
    }
    const recordId = form.dataset.id;
    if (recordId) {
      const index = state.data[view].findIndex((item) => item.id === recordId);
      if (index < 0) return toast("رکورد برای ویرایش پیدا نشد.", "error");
      state.data[view][index] = { ...state.data[view][index], ...values };
    } else {
      state.data[view].unshift({ id: id(config.prefix), ...values });
    }
    const saved = saveData();
    closeModal();
    renderView();
    toast(saved
      ? (recordId ? "تغییرات در نسخه نمایشی ذخیره شد." : "رکورد نمونه افزوده شد.")
      : "تغییر در نشست جاری اعمال شد، اما در مرورگر ذخیره نشد.", saved ? "success" : "error");
  }

  function handleFormSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.id === "entity-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      handleEntitySubmit(form);
    } else if (form.id === "stock-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const product = state.data.products.find((item) => item.id === form.dataset.id);
      const values = formValues(form);
      if (!product) return toast("محصول برای اصلاح پیدا نشد.", "error");
      const next = Number(product.stock) + values.change;
      if (!Number.isInteger(next) || next < 0) return toast("موجودی جدید نمی‌تواند منفی باشد.", "error");
      product.stock = next;
      state.data.inventoryHistory.unshift({ id: id("h"), product: product.name, change: values.change > 0 ? `+${digits(values.change)}` : digits(values.change), reason: values.reason, date: "امروز" });
      persistAndNotify("موجودی در داده نمایشی اصلاح شد."); closeModal(); renderView();
    } else if (form.id === "content-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = formValues(form);
      values.featuredProducts = new FormData(form).getAll("featuredProducts");
      state.data.content = { ...state.data.content, ...values };
      persistAndNotify("محتوا فقط در نسخه نمایشی ذخیره شد."); renderView();
    } else if (form.id === "settings-form") {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = formValues(form);
      values.notifications = form.elements.notifications.checked;
      values.orderAlerts = form.elements.orderAlerts.checked;
      state.data.settings = { ...state.data.settings, ...values };
      persistAndNotify("تنظیمات محلی ذخیره شد."); renderView();
    }
  }

  function updateQuery(value) {
    state.query = value;
    const start = document.activeElement?.selectionStart;
    renderView();
    const target = document.querySelector(".table-search");
    if (target) {
      target.focus();
      if (typeof start === "number") target.setSelectionRange(start, start);
    }
  }

  function openSidebar() {
    document.querySelector(".sidebar").classList.add("open");
    document.querySelector(".sidebar-scrim").classList.add("visible");
    document.querySelector("[data-open-sidebar]").setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    document.querySelector(".sidebar").classList.remove("open");
    document.querySelector(".sidebar-scrim").classList.remove("visible");
    document.querySelector("[data-open-sidebar]").setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const nav = target.closest("[data-view]");
    if (nav) return setView(nav.dataset.view);
    const go = target.closest("[data-go]");
    if (go) return setView(go.dataset.go);
    if (target.closest("[data-open-sidebar]")) return openSidebar();
    if (target.closest("[data-close-sidebar]")) return closeSidebar();
    const popoverButton = target.closest("[data-popover]");
    if (popoverButton) {
      const name = popoverButton.dataset.popover;
      const panel = document.querySelector(`[data-panel="${name}"]`);
      const willOpen = panel.hidden;
      document.querySelectorAll("[data-panel]").forEach((item) => { item.hidden = true; });
      document.querySelectorAll("[data-popover]").forEach((item) => item.setAttribute("aria-expanded", "false"));
      panel.hidden = !willOpen;
      popoverButton.setAttribute("aria-expanded", String(willOpen));
      return;
    }
    if (target.closest("[data-dismiss-banner]")) {
      target.closest(".demo-banner").remove();
      return;
    }
    if (target.closest("[data-close-modal]") || target.matches("[data-modal-backdrop]")) {
      if (target.matches("[data-modal-backdrop]") && target.querySelector(".modal-card")) return;
      return closeModal();
    }
    const confirmDelete = target.closest("[data-confirm-delete]");
    if (confirmDelete) {
      const { confirmDelete: view, id: itemId } = confirmDelete.dataset;
      state.data[view] = state.data[view].filter((item) => item.id !== itemId);
      persistAndNotify("رکورد از داده‌های نمایشی حذف شد."); closeModal(); renderView();
      return;
    }
    const action = target.closest("[data-action]");
    if (action) return handleAction(action.dataset.action, action.dataset.id);
    if (!target.closest(".popover-wrap")) {
      document.querySelectorAll("[data-panel]").forEach((item) => { item.hidden = true; });
      document.querySelectorAll("[data-popover]").forEach((item) => item.setAttribute("aria-expanded", "false"));
    }
  });

  document.addEventListener("submit", handleFormSubmit);
  document.addEventListener("input", (event) => {
    const input = event.target;
    if (input.matches(".table-search")) updateQuery(input.value);
    if (input.id === "global-search") {
      state.query = input.value;
      if (!["dashboard", "reports", "settings", "content"].includes(state.view)) renderView();
      const global = document.getElementById("global-search");
      if (global) { global.focus(); global.setSelectionRange(global.value.length, global.value.length); }
    }
    if (input.matches("#content-form input, #content-form textarea")) {
      const title = document.getElementById("content-preview-title");
      const description = document.getElementById("content-preview-description");
      if (input.name === "heroTitle" && title) title.textContent = input.value;
      if (input.name === "heroDescription" && description) description.textContent = input.value;
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches(".table-filter")) { state.filter = target.value; renderView(); }
    if (target.matches(".table-sort")) { state.sort = target.value; renderView(); }
    if (target.matches(".page-size")) { state.pageSize = Number(target.value); renderView(); }
    if (target.matches(".chart-period")) { state.chartPeriod = target.value; renderView(); }
    if (target.matches(".report-period")) { state.reportPeriod = target.value; renderView(); }
    if (target.matches(".order-status")) {
      const order = state.data.orders.find((item) => item.id === target.dataset.id);
      if (order) { order.status = target.value; persistAndNotify("وضعیت سفارش نمایشی به‌روزرسانی شد."); renderView(); }
    }
    if (target.matches("[data-order-detail-status]")) {
      const order = state.data.orders.find((item) => item.id === target.dataset.orderDetailStatus);
      if (order) { order.status = target.value; persistAndNotify("وضعیت سفارش نمایشی به‌روزرسانی شد."); renderView(); openOrderDetail(order); }
    }
    if (target.matches('input[type="file"][data-preview-target]')) {
      const file = target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return toast("لطفاً یک فایل تصویری انتخاب کنید.", "error");
      if (file.size > 1024 * 1024) return toast("حجم تصویر باید کمتر از ۱ مگابایت باشد.", "error");
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const preview = document.getElementById(target.dataset.previewTarget);
        if (preview && typeof reader.result === "string") {
          preview.innerHTML = `<img src="${esc(reader.result)}" alt="پیش‌نمایش تصویر انتخاب‌شده">`;
          const form = target.closest("form");
          if (form?.id === "entity-form") form.dataset.image = reader.result;
        }
      });
      reader.addEventListener("error", () => toast("خواندن تصویر انتخاب‌شده انجام نشد.", "error"));
      reader.readAsDataURL(file);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (modalRoot.firstElementChild) closeModal();
      closeSidebar();
      document.querySelectorAll("[data-panel]").forEach((item) => { item.hidden = true; });
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      document.getElementById("global-search").focus();
    }
    const dialog = modalRoot.querySelector('[role="dialog"]');
    if (event.key === "Tab" && dialog) {
      const focusable = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  renderView();
})();
