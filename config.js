// config.js (FULL REPLACEMENT) — with all new items integrated + ordered by “most popular first”
window.FS_CONFIG = {
  siteName: "FutureSprouts",
  contactEmail: "info@futuresprouts.org",
  is501c3Approved: false,
  paypalDonateUrl: "#",
  socials: {
    instagram: "https://www.instagram.com/futuresprouts",
    x: "https://x.com/futuresprouts",
    linkedin: "https://www.linkedin.com/company/futuresprouts",
    youtube: "https://www.youtube.com/@futuresprouts",
    facebook: "https://www.facebook.com/futuresprouts"
  },
  canonicalBase: "https://futuresprouts.org",
  googlePlacesKey: "PASTE_YOUR_KEY_HERE",

  // ✅ Single source of truth:
  // Add new items here and they show up on Seed Packets page + Admin inventory defaults.
  // Order is “most popular / most requested” first.
  catalog: [
    // -------------------------
    // TOP PACKS (most popular)
    // -------------------------
    {
      key: "seed-beginner-pack",
      name: "Beginner Garden Pack",
      kind: "pack",
      image: "images/seed-beginner-pack.jpg",
      desc: "Easy-to-grow basics + simple instructions.",
      tags: ["pack", "beginner", "vegetable", "fruit", "spring", "summer"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pollinator-pack",
      name: "Pollinator Pack",
      kind: "pack",
      image: "images/seed-pollinator-pack.jpg",
      desc: "A curated mix that supports bees and butterflies.",
      tags: ["pack", "pollinator", "beginner", "spring", "summer", "fall"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-kids-garden-pack",
      name: "Kids Garden Pack",
      kind: "pack",
      image: "images/seed-kids-garden-pack.jpg",
      desc: "Fast, fun plants for classrooms: radish, lettuce, marigold, basil.",
      tags: ["pack", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-salad-greens-pack",
      name: "Salad Greens Pack",
      kind: "pack",
      image: "images/seed-salad-greens-pack.jpg",
      desc: "A quick-growing mix for continuous salads: lettuce, arugula, spinach.",
      tags: ["pack", "beginner", "spring", "fall", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-herb-kitchen-pack",
      name: "Kitchen Herb Pack",
      kind: "pack",
      image: "images/seed-herb-kitchen-pack.jpg",
      desc: "Basil, parsley, cilantro, and chives—perfect for a small planter box.",
      tags: ["pack", "beginner", "spring", "summer", "herb", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-salsa-garden-pack",
      name: "Salsa Garden Pack",
      kind: "pack",
      image: "images/seed-salsa-garden-pack.jpg",
      desc: "Tomatoes, peppers, cilantro, and green onions—classic raised-bed combo.",
      tags: ["pack", "beginner", "summer", "vegetable", "fruit", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pizza-garden-pack",
      name: "Pizza Garden Pack",
      kind: "pack",
      image: "images/seed-pizza-garden-pack.jpg",
      desc: "Tomatoes, basil, oregano, and peppers—grow your own pizza toppings.",
      tags: ["pack", "beginner", "summer", "herb", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-companion-flower-pack",
      name: "Companion Flower Pack",
      kind: "pack",
      image: "images/seed-companion-flower-pack.jpg",
      desc: "Planter-friendly flowers that support pollinators: marigold, nasturtium, calendula.",
      tags: ["pack", "pollinator", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },

    // -------------------------
    // CORE INDIVIDUAL VEG/Fruit (very popular)
    // -------------------------
    {
      key: "seed-tomato",
      name: "Tomato Package",
      kind: "seed",
      image: "images/seed-tomato.jpg",
      desc: "Includes tomato seed packets + basic planting guide.",
      tags: ["fruit", "vegetable", "summer", "beginner"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },
    {
      key: "seed-cherry-tomato",
      name: "Cherry Tomato (Container)",
      kind: "seed",
      image: "images/seed-cherry-tomato.jpg",
      desc: "High-yield container tomato—great for patio and planter boxes.",
      tags: ["fruit", "vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 280, note: "In stock" }
    },
    {
      key: "seed-bell-pepper",
      name: "Bell Pepper (Compact)",
      kind: "seed",
      image: "images/seed-bell-pepper.jpg",
      desc: "Compact pepper for raised beds and containers; sweet harvest.",
      tags: ["fruit", "vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 260, note: "In stock" }
    },
    {
      key: "seed-jalapeno",
      name: "Jalapeño Pepper",
      kind: "seed",
      image: "images/seed-jalapeno.jpg",
      desc: "Spicy, productive pepper that grows well in planters.",
      tags: ["fruit", "vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-cucumber-bush",
      name: "Bush Cucumber",
      kind: "seed",
      image: "images/seed-cucumber-bush.jpg",
      desc: "Container-friendly cucumber—great for small trellises.",
      tags: ["fruit", "vegetable", "summer", "planter", "container", "beginner"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-corn",
      name: "Corn Package",
      kind: "seed",
      image: "images/seed-corn.jpg",
      desc: "Includes corn seed packets + simple growing instructions.",
      tags: ["vegetable", "summer"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },

    // -------------------------
    // EASY GREENS (very popular for planters)
    // -------------------------
    {
      key: "seed-lettuce-mix",
      name: "Lettuce Mix",
      kind: "seed",
      image: "images/seed-lettuce-mix.jpg",
      desc: "Quick harvest in planter boxes; cut-and-come-again leaves.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 500, note: "In stock" }
    },
    {
      key: "seed-spinach",
      name: "Spinach",
      kind: "seed",
      image: "images/seed-spinach.jpg",
      desc: "Cool-season favorite that grows great in shallow raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 450, note: "In stock" }
    },
    {
      key: "seed-kale",
      name: "Kale",
      kind: "seed",
      image: "images/seed-kale.jpg",
      desc: "Hardy green—excellent for extended harvest in beds and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 380, note: "In stock" }
    },
    {
      key: "seed-arugula",
      name: "Arugula",
      kind: "seed",
      image: "images/seed-arugula.jpg",
      desc: "Peppery salad green that grows fast in containers.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 360, note: "In stock" }
    },
    {
      key: "seed-swiss-chard",
      name: "Swiss Chard",
      kind: "seed",
      image: "images/seed-swiss-chard.jpg",
      desc: "Colorful, productive leaves—great for planter boxes all season.",
      tags: ["vegetable", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 320, note: "In stock" }
    },

    // -------------------------
    // FAST ROOTS (kid-friendly + popular)
    // -------------------------
    {
      key: "seed-radish",
      name: "Radish",
      kind: "seed",
      image: "images/seed-radish.jpg",
      desc: "Fastest root crop—great for kid-friendly gardens and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 600, note: "In stock" }
    },
    {
      key: "seed-carrot",
      name: "Carrot",
      kind: "seed",
      image: "images/seed-carrot.jpg",
      desc: "Sweet roots in deeper planter boxes; keep soil loose for best results.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 420, note: "In stock" }
    },
    {
      key: "seed-beet",
      name: "Beet",
      kind: "seed",
      image: "images/seed-beet.jpg",
      desc: "Dual-purpose crop—tasty roots and greens; ideal for raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 350, note: "In stock" }
    },
    {
      key: "seed-green-onion",
      name: "Green Onion (Scallion)",
      kind: "seed",
      image: "images/seed-green-onion.jpg",
      desc: "Easy, compact crop for edges of planter boxes.",
      tags: ["vegetable", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 400, note: "In stock" }
    },

    // -------------------------
    // HERBS (high-utility, super popular)
    // -------------------------
    {
      key: "seed-basil",
      name: "Basil",
      kind: "seed",
      image: "images/seed-basil.jpg",
      desc: "Fast-growing herb for containers—perfect for pesto and salads.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-parsley",
      name: "Parsley",
      kind: "seed",
      image: "images/seed-parsley.jpg",
      desc: "Hardy herb that grows well in raised beds and containers.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-cilantro",
      name: "Cilantro",
      kind: "seed",
      image: "images/seed-cilantro.jpg",
      desc: "Cool-season herb that thrives in planter boxes; re-sow for continuous harvest.",
      tags: ["herb", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-chives",
      name: "Chives",
      kind: "seed",
      image: "images/seed-chives.jpg",
      desc: "Perennial-style herb for edges of planter boxes—great for pollinators too.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-dill",
      name: "Dill",
      kind: "seed",
      image: "images/seed-dill.jpg",
      desc: "Airy herb for containers; attracts beneficial insects.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-oregano",
      name: "Oregano",
      kind: "seed",
      image: "images/seed-oregano.jpg",
      desc: "Container-friendly herb that spreads—great for edges of a planter box.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-thyme",
      name: "Thyme",
      kind: "seed",
      image: "images/seed-thyme.jpg",
      desc: "Low-growing herb that thrives in small planters and raised beds.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-mint",
      name: "Mint",
      kind: "seed",
      image: "images/seed-mint.jpg",
      desc: "Aromatically strong and vigorous—best kept contained in a planter.",
      tags: ["herb", "beginner", "spring", "summer", "container", "planter"],
      inv: { available: true, remaining: 180, note: "In stock" }
    },

    // -------------------------
    // FLOWERS / POLLINATORS (popular add-ons)
    // -------------------------
    {
      key: "seed-marigold",
      name: "Marigold",
      kind: "seed",
      image: "images/seed-marigold.jpg",
      desc: "Bright companion flower—helps support a healthy garden ecosystem.",
      tags: ["pollinator", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 400, note: "In stock" }
    },
    {
      key: "seed-nasturtium",
      name: "Nasturtium",
      kind: "seed",
      image: "images/seed-nasturtium.jpg",
      desc: "Edible flowers and leaves—excellent planter companion plant.",
      tags: ["pollinator", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 320, note: "In stock" }
    },
    {
      key: "seed-calendula",
      name: "Calendula",
      kind: "seed",
      image: "images/seed-calendula.jpg",
      desc: "Easy blooms that attract pollinators; great in raised beds.",
      tags: ["pollinator", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 260, note: "In stock" }
    },
    {
      key: "seed-sunflower-dwarf",
      name: "Dwarf Sunflower",
      kind: "seed",
      image: "images/seed-sunflower-dwarf.jpg",
      desc: "Compact sunflowers for planters—big impact, small footprint.",
      tags: ["pollinator", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },

    // -------------------------
    // SEASONAL / SPECIALTY PACKS
    // -------------------------
    {
      key: "seed-fall-pack",
      name: "Fall Harvest Pack",
      kind: "pack",
      image: "images/seed-fall-pack.jpg",
      desc: "Cool-season favorites for late-summer planting and fall harvests.",
      tags: ["pack", "fall", "beginner", "vegetable"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-fall-greens-pack",
      name: "Fall Greens Pack",
      kind: "pack",
      image: "images/seed-fall-greens-pack.jpg",
      desc: "Cool-season favorites for fall planting: kale, spinach, arugula.",
      tags: ["pack", "beginner", "fall", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-tea-herb-pack",
      name: "Herbal Tea Pack",
      kind: "pack",
      image: "images/seed-tea-herb-pack.jpg",
      desc: "Mint and calming herbs for containers—great for a tea garden setup.",
      tags: ["pack", "beginner", "spring", "summer", "herb", "planter", "container"],
      inv: { available: true, remaining: 160, note: "In stock" }
    },

    // -------------------------
    // SWEET/FRUIT EXTRAS
    // -------------------------
    {
      key: "seed-strawberry",
      name: "Strawberry (Container)",
      kind: "seed",
      image: "images/seed-strawberry.jpg",
      desc: "Sweet berries for pots and planter boxes; great for kids.",
      tags: ["fruit", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    }
  ]
};
