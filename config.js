// config.js (FULL REPLACEMENT) — updated: removed Tea + Strawberry, added Zucchini/Green Bean/Broccoli/Cauliflower/Pickling Cucumbers,
// updated descriptions to "Includes: ... + simple growing instructions." + a clear one-line benefit,
// and removed ALL "fruit" tags everywhere.
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
      desc: "Includes: beginner-friendly seed packs and simple growing instructions.",
      desc: "A best-of starter set for first-time gardeners.",
      tags: ["pack", "beginner", "vegetable", "spring", "summer"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pollinator-pack",
      name: "Pollinator Pack",
      kind: "pack",
      image: "images/seed-pollinator-pack.jpg",
      desc: "Includes: pollinator-friendly flower seed packs and simple growing instructions. Helps support bees and butterflies all season.",
      tags: ["pack", "pollinator", "beginner", "spring", "summer", "fall"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-kids-garden-pack",
      name: "Kids Garden Pack",
      kind: "pack",
      image: "images/seed-kids-garden-pack.jpg",
      desc: "Includes: radish, lettuce, marigold, and basil seed packs plus simple growing instructions. Fast, fun plants for classrooms and family gardens.",
      tags: ["pack", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-salad-greens-pack",
      name: "Salad Greens Pack",
      kind: "pack",
      image: "images/seed-salad-greens-pack.jpg",
      desc: "Includes: lettuce, arugula, and spinach seed packs plus simple growing instructions. Quick-growing mix for continuous salads.",
      tags: ["pack", "beginner", "spring", "fall", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-herb-kitchen-pack",
      name: "Kitchen Herb Pack",
      kind: "pack",
      image: "images/seed-herb-kitchen-pack.jpg",
      desc: "Includes: basil, parsley, cilantro, and chives seed packs plus simple growing instructions. Perfect for a small planter box or windowsill setup.",
      tags: ["pack", "beginner", "spring", "summer", "herb", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-salsa-garden-pack",
      name: "Salsa Garden Pack",
      kind: "pack",
      image: "images/seed-salsa-garden-pack.jpg",
      desc: "Includes: tomato, pepper, cilantro, and green onion seed packs plus simple growing instructions. Classic raised-bed combo for fresh salsa.",
      tags: ["pack", "beginner", "summer", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pizza-garden-pack",
      name: "Pizza Garden Pack",
      kind: "pack",
      image: "images/seed-pizza-garden-pack.jpg",
      desc: "Includes: tomato, basil, oregano, and pepper seed packs plus simple growing instructions. Grow your own pizza toppings at home.",
      tags: ["pack", "beginner", "summer", "herb", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },

    // -------------------------
    // CORE INDIVIDUAL VEG (very popular)
    // -------------------------
    {
      key: "seed-tomato",
      name: "Tomato Package",
      kind: "seed",
      image: "images/seed-tomato.jpg",
      desc: "Includes: tomato seed packs and simple growing instructions. Reliable summer staple for beds, buckets, and backyard gardens.",
      tags: ["vegetable", "summer", "beginner"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },
    {
      key: "seed-cherry-tomato",
      name: "Cherry Tomato (Container)",
      kind: "seed",
      image: "images/seed-cherry-tomato.jpg",
      desc: "Includes: cherry tomato seed packs and simple growing instructions. High-yield container tomato—great for patios and planter boxes.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 280, note: "In stock" }
    },
    {
      key: "seed-bell-pepper",
      name: "Bell Pepper (Compact)",
      kind: "seed",
      image: "images/seed-bell-pepper.jpg",
      desc: "Includes: bell pepper seed packs and simple growing instructions. Compact, sweet harvest—great for raised beds and containers.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 260, note: "In stock" }
    },
    {
      key: "seed-jalapeno",
      name: "Jalapeño Pepper",
      kind: "seed",
      image: "images/seed-jalapeno.jpg",
      desc: "Includes: jalapeño seed packs and simple growing instructions. Spicy, productive pepper that grows well in planters.",
      tags: ["vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-cucumber-bush",
      name: "Cucumber (Bush)",
      kind: "seed",
      image: "images/seed-cucumber-bush.jpg",
      desc: "Includes: bush cucumber seed packs and simple growing instructions. Container-friendly and great for small trellises.",
      tags: ["vegetable", "summer", "planter", "container", "beginner", "trellis"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cucumber-pickling",
      name: "Pickling Cucumber",
      kind: "seed",
      image: "images/seed-cucumber-pickling.jpg",
      desc: "Includes: pickling cucumber seed packs and simple growing instructions. Crisp, firm cucumbers ideal for homemade pickles.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-zucchini",
      name: "Zucchini",
      kind: "seed",
      image: "images/seed-zucchini.jpg",
      desc: "Includes: zucchini seed packs and simple growing instructions. Fast-growing summer squash with big harvests from a few plants.",
      tags: ["vegetable", "summer", "beginner", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-green-bean",
      name: "Green Bean",
      kind: "seed",
      image: "images/seed-green-bean.jpg",
      desc: "Includes: green bean seed packs and simple growing instructions. High-yield plants that do great with a simple stake or trellis.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-broccoli",
      name: "Broccoli",
      kind: "seed",
      image: "images/seed-broccoli.jpg",
      desc: "Includes: broccoli seed packs and simple growing instructions. Cool-season staple—best planted for spring and fall harvests.",
      tags: ["vegetable", "beginner", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cauliflower",
      name: "Cauliflower",
      kind: "seed",
      image: "images/seed-cauliflower.jpg",
      desc: "Includes: cauliflower seed packs and simple growing instructions. Cool-season crop that rewards patience with dense, flavorful heads.",
      tags: ["vegetable", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-eggplant",
      name: "Eggplant",
      kind: "seed",
      image: "images/seed-eggplant.jpg",
      desc: "Includes: eggplant seed packs and simple growing instructions. Warm-season veggie that thrives in sunny beds and large containers.",
      tags: ["vegetable", "summer", "planter", "container"],
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
      desc: "Includes: lettuce mix seed packs and simple growing instructions. Quick harvest in planter boxes—cut-and-come-again leaves.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 500, note: "In stock" }
    },
    {
      key: "seed-spinach",
      name: "Spinach",
      kind: "seed",
      image: "images/seed-spinach.jpg",
      desc: "Includes: spinach seed packs and simple growing instructions. Cool-season favorite that grows great in shallow raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 450, note: "In stock" }
    },
    {
      key: "seed-kale",
      name: "Kale",
      kind: "seed",
      image: "images/seed-kale.jpg",
      desc: "Includes: kale seed packs and simple growing instructions. Hardy green—excellent for extended harvest in beds and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 380, note: "In stock" }
    },
    {
      key: "seed-arugula",
      name: "Arugula",
      kind: "seed",
      image: "images/seed-arugula.jpg",
      desc: "Includes: arugula seed packs and simple growing instructions. Peppery salad green that grows fast in containers.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 360, note: "In stock" }
    },
    {
      key: "seed-swiss-chard",
      name: "Swiss Chard",
      kind: "seed",
      image: "images/seed-swiss-chard.jpg",
      desc: "Includes: Swiss chard seed packs and simple growing instructions. Colorful, productive leaves—great for planter boxes all season.",
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
      desc: "Includes: radish seed packs and simple growing instructions. Fastest root crop—great for kid-friendly gardens and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 600, note: "In stock" }
    },
    {
      key: "seed-carrot",
      name: "Carrot",
      kind: "seed",
      image: "images/seed-carrot.jpg",
      desc: "Includes: carrot seed packs and simple growing instructions. Sweet roots in deeper planter boxes—keep soil loose for best results.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 420, note: "In stock" }
    },
    {
      key: "seed-beet",
      name: "Beet",
      kind: "seed",
      image: "images/seed-beet.jpg",
      desc: "Includes: beet seed packs and simple growing instructions. Dual-purpose crop—tasty roots and greens; ideal for raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 350, note: "In stock" }
    },
    {
      key: "seed-green-onion",
      name: "Green Onion (Scallion)",
      kind: "seed",
      image: "images/seed-green-onion.jpg",
      desc: "Includes: green onion (scallion) seed packs and simple growing instructions. Easy, compact crop for edges of planter boxes.",
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
      desc: "Includes: basil seed packs and simple growing instructions. Fast-growing herb for containers—perfect for pesto and salads.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-parsley",
      name: "Parsley",
      kind: "seed",
      image: "images/seed-parsley.jpg",
      desc: "Includes: parsley seed packs and simple growing instructions. Hardy herb that grows well in raised beds and containers.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-cilantro",
      name: "Cilantro",
      kind: "seed",
      image: "images/seed-cilantro.jpg",
      desc: "Includes: cilantro seed packs and simple growing instructions. Cool-season herb that thrives in planter boxes—re-sow for continuous harvest.",
      tags: ["herb", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-chives",
      name: "Chives",
      kind: "seed",
      image: "images/seed-chives.jpg",
      desc: "Includes: chives seed packs and simple growing instructions. Great for the edges of planter boxes and helpful for pollinators.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-dill",
      name: "Dill",
      kind: "seed",
      image: "images/seed-dill.jpg",
      desc: "Includes: dill seed packs and simple growing instructions. Airy herb that attracts beneficial insects—great in containers.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-oregano",
      name: "Oregano",
      kind: "seed",
      image: "images/seed-oregano.jpg",
      desc: "Includes: oregano seed packs and simple growing instructions. Container-friendly herb that spreads—great for planter edges.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-thyme",
      name: "Thyme",
      kind: "seed",
      image: "images/seed-thyme.jpg",
      desc: "Includes: thyme seed packs and simple growing instructions. Low-growing herb that thrives in small planters and raised beds.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-mint",
      name: "Mint",
      kind: "seed",
      image: "images/seed-mint.jpg",
      desc: "Includes: mint seed packs and simple growing instructions. Vigorous grower—best kept contained in a planter.",
      tags: ["herb", "beginner", "spring", "summer", "container", "planter"],
      inv: { available: true, remaining: 180, note: "In stock" }
    },

    // -------------------------
    // FLOWERS / POLLINATORS (popular add-ons)

    // ✅ Removed:
    // - Herbal Tea Pack (seed-tea-herb-pack)
    // - Strawberry (Container) (seed-strawberry)
  ]
};





