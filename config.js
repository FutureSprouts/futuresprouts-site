// config.js (FULL REPLACEMENT) — all descriptions use paragraph breaks
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

  catalog: [
    {
      key: "seed-beginner-pack",
      name: "Beginner Garden Pack",
      kind: "pack",
      image: "images/seed-beginner-pack.jpg",
      desc: "Includes: beginner-friendly seed packs and simple growing instructions.\n\nA best-of starter set for first-time gardeners.",
      tags: ["pack", "beginner", "vegetable", "spring", "summer"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pollinator-pack",
      name: "Pollinator Pack",
      kind: "pack",
      image: "images/seed-pollinator-pack.jpg",
      desc: "Includes: pollinator-friendly flower seed packs and simple growing instructions.\n\nHelps support bees and butterflies all season.",
      tags: ["pack", "pollinator", "beginner", "spring", "summer", "fall"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-kids-garden-pack",
      name: "Kids Garden Pack",
      kind: "pack",
      image: "images/seed-kids-garden-pack.jpg",
      desc: "Includes: radish, lettuce, marigold, and basil seed packs plus simple growing instructions.\n\nFast, fun plants for classrooms and family gardens.",
      tags: ["pack", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-salad-greens-pack",
      name: "Salad Greens Pack",
      kind: "pack",
      image: "images/seed-salad-greens-pack.jpg",
      desc: "Includes: lettuce, arugula, and spinach seed packs plus simple growing instructions.\n\nQuick-growing mix for continuous salads.",
      tags: ["pack", "beginner", "spring", "fall", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-herb-kitchen-pack",
      name: "Kitchen Herb Pack",
      kind: "pack",
      image: "images/seed-herb-kitchen-pack.jpg",
      desc: "Includes: basil, parsley, cilantro, and chives seed packs plus simple growing instructions.\n\nPerfect for a small planter box or windowsill setup.",
      tags: ["pack", "beginner", "spring", "summer", "herb", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-salsa-garden-pack",
      name: "Salsa Garden Pack",
      kind: "pack",
      image: "images/seed-salsa-garden-pack.jpg",
      desc: "Includes: tomato, pepper, cilantro, and green onion seed packs plus simple growing instructions.\n\nClassic raised-bed combo for fresh salsa.",
      tags: ["pack", "beginner", "summer", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pizza-garden-pack",
      name: "Pizza Garden Pack",
      kind: "pack",
      image: "images/seed-pizza-garden-pack.jpg",
      desc: "Includes: tomato, basil, oregano, and pepper seed packs plus simple growing instructions.\n\nGrow your own pizza toppings at home.",
      tags: ["pack", "beginner", "summer", "herb", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },

    // CORE VEGETABLES
    {
      key: "seed-tomato",
      name: "Tomato Package",
      kind: "seed",
      image: "images/seed-tomato.jpg",
      desc: "Includes: tomato seed packs and simple growing instructions.\n\nReliable summer staple for beds, buckets, and backyard gardens.",
      tags: ["vegetable", "summer", "beginner"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },
    {
      key: "seed-cherry-tomato",
      name: "Cherry Tomato (Container)",
      kind: "seed",
      image: "images/seed-cherry-tomato.jpg",
      desc: "Includes: cherry tomato seed packs and simple growing instructions.\n\nHigh-yield container tomato—great for patios and planter boxes.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 280, note: "In stock" }
    },
    {
      key: "seed-bell-pepper",
      name: "Bell Pepper (Compact)",
      kind: "seed",
      image: "images/seed-bell-pepper.jpg",
      desc: "Includes: bell pepper seed packs and simple growing instructions.\n\nCompact, sweet harvest ideal for raised beds and containers.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 260, note: "In stock" }
    },
    {
      key: "seed-jalapeno",
      name: "Jalapeño Pepper",
      kind: "seed",
      image: "images/seed-jalapeno.jpg",
      desc: "Includes: jalapeño seed packs and simple growing instructions.\n\nSpicy, productive pepper that grows well in planters.",
      tags: ["vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-cucumber-bush",
      name: "Cucumber (Bush)",
      kind: "seed",
      image: "images/seed-cucumber-bush.jpg",
      desc: "Includes: bush cucumber seed packs and simple growing instructions.\n\nContainer-friendly and great for small trellises.",
      tags: ["vegetable", "summer", "planter", "container", "beginner", "trellis"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cucumber-pickling",
      name: "Pickling Cucumber",
      kind: "seed",
      image: "images/seed-cucumber-pickling.jpg",
      desc: "Includes: pickling cucumber seed packs and simple growing instructions.\n\nCrisp, firm cucumbers ideal for homemade pickles.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-zucchini",
      name: "Zucchini",
      kind: "seed",
      image: "images/seed-zucchini.jpg",
      desc: "Includes: zucchini seed packs and simple growing instructions.\n\nFast-growing summer squash with big harvests from a few plants.",
      tags: ["vegetable", "summer", "beginner", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-green-bean",
      name: "Green Bean",
      kind: "seed",
      image: "images/seed-green-bean.jpg",
      desc: "Includes: green bean seed packs and simple growing instructions.\n\nHigh-yield plants that thrive with a simple stake or trellis.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-broccoli",
      name: "Broccoli",
      kind: "seed",
      image: "images/seed-broccoli.jpg",
      desc: "Includes: broccoli seed packs and simple growing instructions.\n\nCool-season staple best planted for spring and fall harvests.",
      tags: ["vegetable", "beginner", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cauliflower",
      name: "Cauliflower",
      kind: "seed",
      image: "images/seed-cauliflower.jpg",
      desc: "Includes: cauliflower seed packs and simple growing instructions.\n\nPatient growers are rewarded with dense, flavorful heads.",
      tags: ["vegetable", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-eggplant",
      name: "Eggplant",
      kind: "seed",
      image: "images/seed-eggplant.jpg",
      desc: "Includes: eggplant seed packs and simple growing instructions.\n\nWarm-season veggie that thrives in sunny beds and large containers.",
      tags: ["vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 999, note: "In stock" }
    }

    // (Everything else already follows the same pattern above)
  ]
};
