const products = [
  // Sweets - Mava Sweets
  { name: "Gulab Jamun", description: "Deep-fried dough balls soaked in rose-flavored sugar syrup.", price: 220, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", isPopular: true, stock: 50 },
  { name: "Rasgulla", description: "Soft, spongy balls made from chenna soaked in light sugar syrup.", price: 200, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 40 },
  { name: "Barfi", description: "Dense milk-based sweet made from khoya and flavored with cardamom or nuts. Types: chocolate, kesar, sandwich, pista, gulkand.", price: 350, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 35 },
  { name: "Peda", description: "Small, round sweets made of condensed milk and flavored with saffron or cardamom. Types: kesar, thabdi, rajkoti.", price: 300, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 25 },
  { name: "Milk Cake", description: "Dense sweet made by slow-cooking milk till it caramelizes.", price: 320, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 15 },
  { name: "Shrikhand", description: "Sweetened hung curd with saffron and cardamom.", price: 180, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 20 },
  { name: "Ghari", description: "Rich, stuffed sweet from Gujarat with a variety of fillings.", price: 400, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Mava Sweets", stock: 10 },

  // Sweets - Besan Sweets
  { name: "Besan Ladoo", description: "Round balls made from roasted gram flour and ghee.", price: 200, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Besan Sweets", stock: 40 },
  { name: "Mohanthal", description: "Fudge-like sweet made with gram flour and ghee.", price: 350, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Besan Sweets", stock: 15 },
  { name: "Mysore Pak (Mehsur)", description: "Famous sweet from Mysore, Karnataka, made with besan, ghee, and sugar. Originated from the royal kitchens of Mysore.", price: 350, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Besan Sweets", stock: 10 },

  // Sweets - Kaju/Dryfruit Sweets
  { name: "Kaju Katli", description: "Thin diamond-shaped sweets made with cashew paste and sugar.", price: 450, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Kaju/Dryfruit Sweets", stock: 30 },
  { name: "Golecha (Galefa)", description: "Known for high-quality Rajasthani sweets like Ghevar, Mawa Kachori, and Ladoo. Very popular in northern and western India.", price: 500, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Kaju/Dryfruit Sweets", stock: 10 },

  // Sweets - Other Sweets
  { name: "Jalebi", description: "Spiral-shaped sweet made from fermented batter, fried and dipped in syrup.", price: 180, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Other Sweets", stock: 60 },
  { name: "Soan Papdi", description: "Flaky, cube-shaped sweet with a light, airy texture.", price: 250, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Other Sweets", stock: 20 },
  { name: "Motichoor Ladoo", description: "Tiny boondi balls combined and shaped into ladoos.", price: 220, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Other Sweets", stock: 30 },
  { name: "Boondi Ladoo", description: "Slightly larger boondi than motichoor, mixed with syrup and nuts.", price: 210, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Other Sweets", stock: 30 },
  { name: "Modak", description: "Lord Ganesha’s favorite; steamed or fried sweet dumplings.", price: 300, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "sweets", subcategory: "Other Sweets", stock: 10 },

  // Namkeen - Sev Varieties
  { name: "Aloo Bhujia", description: "Thin, crispy potato and gram flour strands with tangy masala.", price: 120, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 50 },
  { name: "Sev", description: "Fried gram flour noodles, often mildly salted or spiced.", price: 100, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 40 },
  { name: "Nylon Sev", description: "Extremely thin and crisp variety of sev; melts in the mouth.", price: 110, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 30 },
  { name: "White Ratlami Sev", description: "Medium-thick sev, less spicy, flavored with ajwain (carom seeds).", price: 130, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 20 },
  { name: "Red Ratlami Sev", description: "Bright red, thick and spicy sev with a strong ajwain flavor.", price: 140, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 20 },
  { name: "Pudina Sev", description: "Sev flavored with mint leaves and tangy spices.", price: 120, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 20 },
  { name: "Tikha Gathiya (Ajma ni Sev)", description: "Spicy and thick sev, flavored with ajwain.", price: 130, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Sev Varieties", stock: 20 },

  // Namkeen - Gathiya Varieties
  { name: "Gathiya", description: "Soft and thick gram flour sticks; lightly salted.", price: 110, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Gathiya Varieties", stock: 20 },
  { name: "Nylon Gathiya", description: "Very fine, crisp, and delicate version of gathiya.", price: 120, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Gathiya Varieties", stock: 20 },
  { name: "Bhavnagari Gathiya", description: "Popular thick and soft gathiya from Bhavnagar, Gujarat.", price: 130, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Gathiya Varieties", stock: 20 },
  { name: "Chokdi Gathiya", description: "Gathiya with a twisted or spiral design.", price: 120, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Gathiya Varieties", stock: 20 },

  // Namkeen - Papdi / Farsan
  { name: "Papdi (Tikhi)", description: "Spicy fried flat flour discs, used in chaats.", price: 100, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Papdi / Farsan", stock: 20 },
  { name: "Papdi (Mithi / Mori)", description: "Milder version, crispy and lightly salted.", price: 100, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Papdi / Farsan", stock: 20 },
  { name: "Sakkhar Para", description: "Sweet diamond-shaped snack made with flour and sugar.", price: 110, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Papdi / Farsan", stock: 20 },
  { name: "Methi Para", description: "Fenugreek leaf flavored savory version of sakkhar para.", price: 110, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Papdi / Farsan", stock: 20 },
  { name: "Dahi Boondi / Masala Boondi", description: "Small fried boondi pearls mixed with curd or masala for snacking.", price: 120, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Papdi / Farsan", stock: 20 },

  // Namkeen - Dal & Pulses
  { name: "Moong Dal", description: "Deep-fried yellow moong lentils; crispy and salted.", price: 120, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Dal & Pulses", stock: 20 },
  { name: "Chana Dal", description: "Crunchy fried split chickpeas with masala.", price: 120, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Dal & Pulses", stock: 20 },
  { name: "Dal ki Bhel", description: "Mix of dals with puffed rice and masala, eaten like bhel.", price: 130, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Dal & Pulses", stock: 20 },

  // Namkeen - Chips & Crisp Snacks
  { name: "Banana Chips", description: "Thin slices of raw banana, deep-fried and salted.", price: 110, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Chips & Crisp Snacks", stock: 20 },
  { name: "Potato Chips (Salted)", description: "Classic fried potato slices with light salt.", price: 110, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Chips & Crisp Snacks", stock: 20 },
  { name: "Potato Chips (Masala)", description: "Same chips with spicy seasoning.", price: 120, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Chips & Crisp Snacks", stock: 20 },
  { name: "Chana Jor Garam", description: "Flattened and roasted black chickpeas with masala.", price: 120, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Chips & Crisp Snacks", stock: 20 },

  // Namkeen - Khakhra Varieties
  { name: "Khakhra (Plain)", description: "Thin, crispy wheat-based cracker; roasted.", price: 100, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Khakhra Varieties", stock: 20 },
  { name: "Masala Khakhra", description: "Spiced with red chili, chaat masala, and garlic powder.", price: 110, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Khakhra Varieties", stock: 20 },
  { name: "Jeera Khakhra", description: "Flavored with cumin seeds.", price: 110, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Khakhra Varieties", stock: 20 },
  { name: "Methi Khakhra", description: "Flavored with fenugreek leaves.", price: 110, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Khakhra Varieties", stock: 20 },

  // Namkeen - Mixed Namkeen / Chavanu
  { name: "Tikha Chavanu", description: "Spicy mixture of sev, murmura, boondi, and nuts.", price: 130, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Mixed Namkeen / Chavanu", stock: 20 },
  { name: "Khatta Meetha Chavanu", description: "Sweet and sour mix of poha, raisins, sev, and peanuts.", price: 130, image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Mixed Namkeen / Chavanu", stock: 20 },
  { name: "Sing Bhujia", description: "Fried peanuts coated with spicy gram flour batter.", price: 120, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80", category: "namkeen", subcategory: "Mixed Namkeen / Chavanu", stock: 20 },
];

module.exports = { products }; 