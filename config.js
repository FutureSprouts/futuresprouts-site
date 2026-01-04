// config.js (FULL REPLACEMENT)
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
  catalog: [
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
      key: "seed-corn",
      name: "Corn Package",
      kind: "seed",
      image: "images/seed-corn.jpg",
      desc: "Includes corn seed packets + simple growing instructions.",
      tags: ["vegetable", "summer"],
      inv: { available: true, remaining: 999, note: "In stock" }
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
      key: "seed-beginner-pack",
      name: "Beginner Garden Pack",
      kind: "pack",
      image: "images/seed-beginner-pack.jpg",
      desc: "Easy-to-grow basics + simple instructions.",
      tags: ["pack", "beginner", "vegetable", "fruit", "spring", "summer"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-fall-pack",
      name: "Fall Harvest Pack",
      kind: "pack",
      image: "images/seed-fall-pack.jpg",
      desc: "Cool-season favorites for late-summer planting and fall harvests.",
      tags: ["pack", "fall", "beginner", "vegetable"],
      inv: { available: true, remaining: 200, note: "In stock" }
    }
  ]
};
