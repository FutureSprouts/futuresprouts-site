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
  googlePlacesKey: "PASTE_YOUR_KEY_HERE"
};
  catalog: [
    // --- Individual seeds (examples)
    {
      key: "seed-tomato",
      title: "Tomato Seeds",
      type: "seed",
      tags: ["vegetables", "beginner", "summer"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },
    {
      key: "seed-corn",
      title: "Corn Seeds",
      type: "seed",
      tags: ["vegetables", "summer"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },

    // --- Packs (examples)
    {
      key: "seed-pollinator-pack",
      title: "Pollinator Pack",
      type: "pack",
      tags: ["packs", "flowers", "spring", "summer", "beginner"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-beginner-pack",
      title: "Beginner Pack",
      type: "pack",
      tags: ["packs", "beginner"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-fall-pack",
      title: "Fall Pack",
      type: "pack",
      tags: ["packs", "fall"],
      inv: { available: true, remaining: 200, note: "In stock" }
    }
  ],

