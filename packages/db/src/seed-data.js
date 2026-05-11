import { fileURLToPath } from "node:url";

const local = (tk, ru, en) => ({ tk, ru, en });

function cat(order, code, name, slug, icon) {
  return {
    id: `cat-${code}`,
    order,
    code,
    name,
    slug,
    icon,
    featured: order <= 12,
    seoTitle: {
      tk: `${name.tk} - Mirasly`,
      ru: `${name.ru} - Mirasly`,
      en: `${name.en} - Mirasly`,
    },
    seoDescription: {
      tk: `${name.tk} boýunça ygtybarly ýerli bildirişler.`,
      ru: `Надежные местные объявления: ${name.ru}.`,
      en: `Trusted local listings for ${name.en}.`,
    },
  };
}

export const mainCategories = [
  cat(1, "promotions", local("Aksiýalar we arzanlaşyklar", "Акции и скидки", "Promotions and discounts"), local("aksiyalar-arzanlasyklar", "akcii-skidki", "promotions-discounts"), "spark"),
  cat(2, "vehicles", local("Ulaglar", "Авто", "Vehicles"), local("ulaglar", "avto", "vehicles"), "road"),
  cat(3, "buying_requests", local("Satyn alaryn", "Куплю", "Buying requests"), local("satyn-alaryn", "kuplyu", "buying-requests"), "hand"),
  cat(4, "animals", local("Haýwanlar", "Животные", "Animals"), local("haywanlar", "zhivotnye", "animals"), "paw"),
  cat(5, "medical_goods", local("Lukmançylyk harytlary", "Медицинские товары", "Medical goods"), local("lukmancylyk-harytlary", "medicinskie-tovary", "medical-goods"), "cross"),
  cat(6, "found_charity", local("Tapylanlar / Haýyr-sahawat", "Находки / Благотворительность", "Found items / Charity"), local("tapylanlar-hayyr-sahawat", "nahodki-blagotvoritelnost", "found-charity"), "heart"),
  cat(7, "electronics", local("Elektronika", "Электроника", "Electronics"), local("elektronika", "elektronika", "electronics"), "chip"),
  cat(8, "real_estate", local("Gozgalmaýan emläk", "Недвижимость", "Real estate"), local("gozgalmayan-emlak", "nedvizhimost", "real-estate"), "building"),
  cat(9, "home_garden", local("Öý we howly üçin", "Для дома и дачи", "Home and garden"), local("oy-we-howly", "dom-dacha", "home-garden"), "home"),
  cat(10, "household_appliances", local("Öý durmuş tehnikalary", "Бытовая техника", "Household appliances"), local("oy-durmus-tehnikalary", "bytovaya-tehnika", "household-appliances"), "washer"),
  cat(11, "clothing_personal", local("Geýimler, şahsy zatlar", "Одежда и личные вещи", "Clothing and personal items"), local("geyimler-sahsy-zatlar", "odezhda-lichnye-veshchi", "clothing-personal"), "shirt"),
  cat(12, "services", local("Hyzmatlar", "Услуги", "Services"), local("hyzmatlar", "uslugi", "services"), "tools"),
  cat(13, "jobs_staff", local("Iş we işgär", "Работа и персонал", "Jobs and staff"), local("is-we-isgar", "rabota-personal", "jobs-staff"), "briefcase"),
  cat(14, "rental_lease", local("Prokat we kärende", "Прокат и аренда", "Rental and lease"), local("prokat-karende", "prokat-arenda", "rental-lease"), "calendar"),
  cat(15, "children", local("Çagalar dünýäsi", "Детский мир", "Children's world"), local("cagalar-dunyasi", "detskiy-mir", "childrens-world"), "toy"),
  cat(16, "repair_construction", local("Abatlaýyş we gurluşyk", "Ремонт и строительство", "Repair and construction"), local("abatlayys-gurlusyk", "remont-stroitelstvo", "repair-construction"), "hammer"),
  cat(17, "sports_hobbies", local("Sport we hobbi", "Спорт и хобби", "Sports and hobbies"), local("sport-hobbi", "sport-hobbi", "sports-hobbies"), "ball"),
  cat(18, "business_equipment", local("Biznes we enjamlar", "Бизнес и оборудование", "Business and equipment"), local("biznes-enjamlar", "biznes-oborudovanie", "business-equipment"), "store"),
  cat(19, "food_groceries", local("Iýmit we azyk", "Еда и продукты", "Food and groceries"), local("iymit-azyk", "eda-produkty", "food-groceries"), "basket"),
  cat(20, "pharmacy", local("Dermanhana", "Аптека", "Pharmacy"), local("dermanhana", "apteka", "pharmacy"), "pharmacy"),
  cat(21, "beauty", local("Gözellik", "Красота", "Beauty"), local("gozellik", "krasota", "beauty"), "sparkle"),
  cat(22, "flowers", local("Güller", "Цветы", "Flowers"), local("guller", "cvety", "flowers"), "flower"),
  cat(23, "books", local("Kitaplar", "Книги", "Books"), local("kitaplar", "knigi", "books"), "book"),
  cat(24, "stationery", local("Kanselýariýa", "Канцелярия", "Stationery"), local("kanselyariya", "kancelyariya", "stationery"), "pen"),
  cat(25, "jewelry", local("Şaý-sepler", "Украшения", "Jewelry"), local("say-sepler", "ukrasheniya", "jewelry"), "gem"),
  cat(26, "pet_supplies", local("Öý haýwanlary üçin", "Зоотовары", "Pet supplies"), local("oy-haywanlary", "zootovary", "pet-supplies"), "pet"),
  cat(27, "accessibility", local("Elýeterlilik harytlary", "Товары доступности", "Accessibility products"), local("elyeterlilik-harytlary", "tovary-dostupnosti", "accessibility-products"), "accessibility"),
  cat(28, "made_locally", local("Türkmenistanda öndürilen", "Сделано локально", "Made locally"), local("turkmenistanda-ondurilen", "sdelano-lokalno", "made-locally"), "sun"),
  cat(29, "travel_hotels", local("Syýahat we oteller", "Путешествия и отели", "Travel and hotels"), local("syyahat-oteller", "puteshestviya-oteli", "travel-hotels"), "suitcase"),
  cat(30, "transport_delivery", local("Transport we eltip bermek", "Транспорт и доставка", "Transport and delivery"), local("transport-eltip-bermek", "transport-dostavka", "transport-delivery"), "truck"),
  cat(31, "fuel_charging", local("Ýangyç we zarýad", "Топливо и зарядка", "Fuel and charging"), local("yangyc-zaryad", "toplivo-zaryadka", "fuel-charging"), "bolt"),
  cat(32, "events", local("Afisha", "Афиша", "Events"), local("afisha", "afisha", "events"), "ticket"),
  cat(33, "insurance", local("Ätiýaçlandyryş", "Страхование", "Insurance"), local("atiyaclandyrysh", "strahovanie", "insurance"), "shield"),
  cat(34, "cultural_products", local("Medeni önümler", "Культурные товары", "Cultural products"), local("medeni-onumler", "kulturnye-tovary", "cultural-products"), "pattern"),
];

export const categoryFilters = {
  goods: [
    { code: "price", type: "range", label: local("Bahasy", "Цена", "Price") },
    { code: "condition", type: "select", options: ["new", "used"] },
    { code: "brand", type: "text" },
    { code: "delivery_available", type: "boolean" },
    { code: "verified_seller_only", type: "boolean" },
  ],
  vehicles: [
    { code: "make", type: "text" },
    { code: "model", type: "text" },
    { code: "year", type: "range" },
    { code: "mileage", type: "range" },
    { code: "fuel_type", type: "select", options: ["gasoline", "diesel", "hybrid", "ev", "gas"] },
    { code: "rent_or_sale", type: "select", options: ["rent", "sale"] },
  ],
  real_estate: [
    { code: "deal_type", type: "select", options: ["sale", "rent", "daily_rent"] },
    { code: "rooms", type: "range" },
    { code: "area", type: "range" },
    { code: "floor", type: "range" },
    { code: "owner_or_agent", type: "select", options: ["owner", "agent"] },
  ],
  services: [
    { code: "available_today", type: "boolean" },
    { code: "remote_or_onsite", type: "select", options: ["remote", "onsite", "both"] },
    { code: "provider_rating", type: "range" },
  ],
  jobs: [
    { code: "salary", type: "range" },
    { code: "schedule", type: "select", options: ["full_time", "part_time", "shift", "remote"] },
    { code: "verified_employer", type: "boolean" },
  ],
  rental: [
    { code: "price_period", type: "select", options: ["hour", "day", "month"] },
    { code: "deposit", type: "range" },
    { code: "id_verification_required", type: "boolean" },
  ],
  pharmacy: [
    { code: "restricted_goods_rule", type: "policy", moderationRequired: true },
    { code: "pickup_or_delivery", type: "select", options: ["pickup", "delivery", "both"] },
  ],
};

export const seedCities = [
  "Ashgabat",
  "Turkmenabat",
  "Mary",
  "Dashoguz",
  "Balkanabat",
  "Turkmenbashi",
  "Baherden",
  "Tejen",
  "Bayramaly",
  "Serdar",
];

export const seedHomepageTiles = [
  { code: "rent_car", categoryCode: "vehicles", title: local("Awtoulag kärendesi", "Аренда авто", "Rent a car") },
  { code: "charge_go", categoryCode: "fuel_charging", title: local("Charge'n'Go", "Charge'n'Go", "Charge'n'Go") },
  { code: "shops", categoryCode: "business_equipment", title: local("Dükanlar", "Магазины", "Shops") },
  { code: "pharmacy", categoryCode: "pharmacy", title: local("Dermanhana", "Аптека", "Pharmacy") },
  { code: "hotels", categoryCode: "travel_hotels", title: local("Oteller", "Отели", "Hotels") },
  { code: "food", categoryCode: "food_groceries", title: local("Iýmit", "Еда", "Food") },
  { code: "taxi", categoryCode: "transport_delivery", title: local("Taksi", "Такси", "Taxi") },
  { code: "made_local", categoryCode: "made_locally", title: local("Ýerli önüm", "Сделано локально", "Made locally") },
];

export const demoUsers = [
  { id: "usr-admin", role: "super_admin", phone: "+99361000001", displayName: "Mirasly Admin", city: "Ashgabat" },
  { id: "usr-seller", role: "shop_owner", phone: "+99361000002", displayName: "Altyn Dükan", city: "Mary" },
  { id: "usr-buyer", role: "buyer", phone: "+99361000003", displayName: "Aman", city: "Turkmenabat" },
];

export const demoListings = [
  {
    id: "lst-camry-2018",
    categoryCode: "vehicles",
    sellerId: "usr-seller",
    title: local("Toyota Camry 2018", "Toyota Camry 2018", "Toyota Camry 2018"),
    price: 18500,
    currency: "USD",
    city: "Ashgabat",
    status: "approved",
    promoted: true,
  },
  {
    id: "lst-phone",
    categoryCode: "electronics",
    sellerId: "usr-seller",
    title: local("Täze telefon", "Новый телефон", "New phone"),
    price: 1500,
    currency: "TMT",
    city: "Mary",
    status: "approved",
    promoted: false,
  },
];

export const demoShops = [
  { id: "shop-altyn", ownerId: "usr-seller", name: local("Altyn Dükan", "Алтын Магазин", "Altyn Shop"), city: "Mary" },
];

export const demoPlaces = [
  { id: "place-cafe", categoryCode: "food_groceries", name: local("Miras Kafe", "Мирас Кафе", "Miras Cafe"), city: "Ashgabat" },
];

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log(
    JSON.stringify(
      {
        categories: mainCategories.length,
        cities: seedCities.length,
        homepageTiles: seedHomepageTiles.length,
        demoListings: demoListings.length,
      },
      null,
      2,
    ),
  );
}
