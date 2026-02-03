// config.js (FULL REPLACEMENT)
// Updated: added explicit `category` to enforce tabs (seeds / supplies / education)
// Updated: seed + pack descriptions no longer claim brochures/instructions are included
// Notes: Education items remain in catalog but will only appear under Education tab when filtered by `category`.

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
siteUrl: "https://futuresprouts.org",
logoPath: "/images/leaf-spring-icon_24911-115668.png",
googlePlacesKey: "PASTE_YOUR_KEY_HERE",


  // ✅ Single source of truth:
  // Add new items here and they show up on Catalog + Admin inventory defaults.
  // Order is “most popular / most requested” first.
  catalog: [
    // =========================
    // SEEDS (PACKS)
    // =========================
    {
      key: "seed-beginner-pack",
      name: "Beginner Garden Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-beginner-pack.jpg",
      desc: "Includes: beginner-friendly seed packs. A best-of starter set for first-time gardeners.",
      tags: ["pack", "beginner", "vegetable", "spring", "summer"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pollinator-pack",
      name: "Pollinator Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-pollinator-pack.jpg",
      desc: "Includes: pollinator-friendly flower seed packs. Helps support bees and butterflies all season.",
      tags: ["pack", "pollinator", "beginner", "spring", "summer", "fall"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-kids-garden-pack",
      name: "Kids Garden Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-kids-garden-pack.jpg",
      desc: "Includes: radish, lettuce, marigold, and basil seed packs. Fast, fun plants for classrooms and family gardens.",
      tags: ["pack", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-salad-greens-pack",
      name: "Salad Greens Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-salad-greens-pack.jpg",
      desc: "Includes: lettuce, arugula, and spinach seed packs. Quick-growing mix for continuous salads.",
      tags: ["pack", "beginner", "spring", "fall", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-herb-kitchen-pack",
      name: "Kitchen Herb Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-herb-kitchen-pack.jpg",
      desc: "Includes: basil, parsley, cilantro, and chives seed packs. Perfect for a small planter box or windowsill setup.",
      tags: ["pack", "beginner", "spring", "summer", "herb", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-salsa-garden-pack",
      name: "Salsa Garden Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-salsa-garden-pack.jpg",
      desc: "Includes: tomato, pepper, cilantro, and green onion seed packs. Classic combo for fresh salsa.",
      tags: ["pack", "beginner", "summer", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-pizza-garden-pack",
      name: "Pizza Garden Pack",
      category: "seeds",
      kind: "pack",
      image: "images/seed-pizza-garden-pack.jpg",
      desc: "Includes: tomato, basil, oregano, and pepper seed packs. Grow your own pizza toppings at home.",
      tags: ["pack", "beginner", "summer", "herb", "vegetable", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },

    // =========================
    // SEEDS (INDIVIDUAL)
    // =========================
    {
      key: "seed-tomato",
      name: "Tomato Package",
      category: "seeds",
      kind: "seed",
      image: "images/seed-tomato.jpg",
      desc: "Includes: tomato seed packs. Reliable summer staple for beds, buckets, and backyard gardens.",
      tags: ["vegetable", "summer", "beginner"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },
    {
      key: "seed-cherry-tomato",
      name: "Cherry Tomato (Container)",
      category: "seeds",
      kind: "seed",
      image: "images/seed-cherry-tomato.jpg",
      desc: "Includes: cherry tomato seed packs. High-yield container tomato—great for patios and planter boxes.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 280, note: "In stock" }
    },
    {
      key: "seed-bell-pepper",
      name: "Bell Pepper (Compact)",
      category: "seeds",
      kind: "seed",
      image: "images/seed-bell-pepper.jpg",
      desc: "Includes: bell pepper seed packs. Compact, sweet harvest—great for raised beds and containers.",
      tags: ["vegetable", "beginner", "summer", "planter", "container"],
      inv: { available: true, remaining: 260, note: "In stock" }
    },
    {
      key: "seed-jalapeno",
      name: "Jalapeño Pepper",
      category: "seeds",
      kind: "seed",
      image: "images/seed-jalapeno.jpg",
      desc: "Includes: jalapeño seed packs. Spicy, productive pepper that grows well in planters.",
      tags: ["vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-cucumber-bush",
      name: "Cucumber (Bush)",
      category: "seeds",
      kind: "seed",
      image: "images/seed-cucumber-bush.jpg",
      desc: "Includes: bush cucumber seed packs. Container-friendly and great for small trellises.",
      tags: ["vegetable", "summer", "planter", "container", "beginner", "trellis"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cucumber-pickling",
      name: "Pickling Cucumber",
      category: "seeds",
      kind: "seed",
      image: "images/seed-cucumber-pickling.jpg",
      desc: "Includes: pickling cucumber seed packs. Crisp, firm cucumbers ideal for homemade pickles.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-zucchini",
      name: "Zucchini",
      category: "seeds",
      kind: "seed",
      image: "images/seed-zucchini.jpg",
      desc: "Includes: zucchini seed packs. Fast-growing summer squash with big harvests from a few plants.",
      tags: ["vegetable", "summer", "beginner", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-green-bean",
      name: "Green Bean",
      category: "seeds",
      kind: "seed",
      image: "images/seed-green-bean.jpg",
      desc: "Includes: green bean seed packs. High-yield plants that do great with a simple stake or trellis.",
      tags: ["vegetable", "summer", "beginner", "trellis", "raised-bed", "garden", "container"],
      inv: { available: true, remaining: 240, note: "In stock" }
    },
    {
      key: "seed-broccoli",
      name: "Broccoli",
      category: "seeds",
      kind: "seed",
      image: "images/seed-broccoli.jpg",
      desc: "Includes: broccoli seed packs. Cool-season staple—best planted for spring and fall harvests.",
      tags: ["vegetable", "beginner", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-cauliflower",
      name: "Cauliflower",
      category: "seeds",
      kind: "seed",
      image: "images/seed-cauliflower.jpg",
      desc: "Includes: cauliflower seed packs. Cool-season crop that rewards patience with dense, flavorful heads.",
      tags: ["vegetable", "spring", "fall", "raised-bed", "garden"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-eggplant",
      name: "Eggplant",
      category: "seeds",
      kind: "seed",
      image: "images/seed-eggplant.jpg",
      desc: "Includes: eggplant seed packs. Warm-season veggie that thrives in sunny beds and large containers.",
      tags: ["vegetable", "summer", "planter", "container"],
      inv: { available: true, remaining: 999, note: "In stock" }
    },

    // =========================
    // SEEDS (GREENS)
    // =========================
    {
      key: "seed-lettuce-mix",
      name: "Lettuce Mix",
      category: "seeds",
      kind: "seed",
      image: "images/seed-lettuce-mix.jpg",
      desc: "Includes: lettuce mix seed packs. Quick harvest in planter boxes—cut-and-come-again leaves.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 500, note: "In stock" }
    },
    {
      key: "seed-spinach",
      name: "Spinach",
      category: "seeds",
      kind: "seed",
      image: "images/seed-spinach.jpg",
      desc: "Includes: spinach seed packs. Cool-season favorite that grows great in shallow raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 450, note: "In stock" }
    },
    {
      key: "seed-kale",
      name: "Kale",
      category: "seeds",
      kind: "seed",
      image: "images/seed-kale.jpg",
      desc: "Includes: kale seed packs. Hardy green—excellent for extended harvest in beds and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 380, note: "In stock" }
    },
    {
      key: "seed-arugula",
      name: "Arugula",
      category: "seeds",
      kind: "seed",
      image: "images/seed-arugula.jpg",
      desc: "Includes: arugula seed packs. Peppery salad green that grows fast in containers.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 360, note: "In stock" }
    },
    {
      key: "seed-swiss-chard",
      name: "Swiss Chard",
      category: "seeds",
      kind: "seed",
      image: "images/seed-swiss-chard.jpg",
      desc: "Includes: Swiss chard seed packs. Colorful, productive leaves—great for planter boxes all season.",
      tags: ["vegetable", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 320, note: "In stock" }
    },

    // =========================
    // SEEDS (ROOTS)
    // =========================
    {
      key: "seed-radish",
      name: "Radish",
      category: "seeds",
      kind: "seed",
      image: "images/seed-radish.jpg",
      desc: "Includes: radish seed packs. Fastest root crop—great for kid-friendly gardens and planters.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 600, note: "In stock" }
    },
    {
      key: "seed-carrot",
      name: "Carrot",
      category: "seeds",
      kind: "seed",
      image: "images/seed-carrot.jpg",
      desc: "Includes: carrot seed packs. Sweet roots in deeper planter boxes—keep soil loose for best results.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 420, note: "In stock" }
    },
    {
      key: "seed-beet",
      name: "Beet",
      category: "seeds",
      kind: "seed",
      image: "images/seed-beet.jpg",
      desc: "Includes: beet seed packs. Dual-purpose crop—tasty roots and greens; ideal for raised beds.",
      tags: ["vegetable", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 350, note: "In stock" }
    },
    {
      key: "seed-green-onion",
      name: "Green Onion (Scallion)",
      category: "seeds",
      kind: "seed",
      image: "images/seed-green-onion.jpg",
      desc: "Includes: green onion (scallion) seed packs. Easy, compact crop for edges of planter boxes.",
      tags: ["vegetable", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 400, note: "In stock" }
    },

    // =========================
    // SEEDS (HERBS)
    // =========================
    {
      key: "seed-basil",
      name: "Basil",
      category: "seeds",
      kind: "seed",
      image: "images/seed-basil.jpg",
      desc: "Includes: basil seed packs. Fast-growing herb for containers—perfect for pesto and salads.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-parsley",
      name: "Parsley",
      category: "seeds",
      kind: "seed",
      image: "images/seed-parsley.jpg",
      desc: "Includes: parsley seed packs. Hardy herb that grows well in raised beds and containers.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-cilantro",
      name: "Cilantro",
      category: "seeds",
      kind: "seed",
      image: "images/seed-cilantro.jpg",
      desc: "Includes: cilantro seed packs. Cool-season herb that thrives in planter boxes—re-sow for continuous harvest.",
      tags: ["herb", "beginner", "spring", "fall", "planter", "container"],
      inv: { available: true, remaining: 300, note: "In stock" }
    },
    {
      key: "seed-chives",
      name: "Chives",
      category: "seeds",
      kind: "seed",
      image: "images/seed-chives.jpg",
      desc: "Includes: chives seed packs. Great for the edges of planter boxes and helpful for pollinators.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 250, note: "In stock" }
    },
    {
      key: "seed-dill",
      name: "Dill",
      category: "seeds",
      kind: "seed",
      image: "images/seed-dill.jpg",
      desc: "Includes: dill seed packs. Airy herb that attracts beneficial insects—great in containers.",
      tags: ["herb", "beginner", "spring", "summer", "pollinator", "planter", "container"],
      inv: { available: true, remaining: 220, note: "In stock" }
    },
    {
      key: "seed-oregano",
      name: "Oregano",
      category: "seeds",
      kind: "seed",
      image: "images/seed-oregano.jpg",
      desc: "Includes: oregano seed packs. Container-friendly herb that spreads—great for planter edges.",
      tags: ["herb", "beginner", "spring", "summer", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-thyme",
      name: "Thyme",
      category: "seeds",
      kind: "seed",
      image: "images/seed-thyme.jpg",
      desc: "Includes: thyme seed packs. Low-growing herb that thrives in small planters and raised beds.",
      tags: ["herb", "beginner", "spring", "summer", "fall", "planter", "container"],
      inv: { available: true, remaining: 200, note: "In stock" }
    },
    {
      key: "seed-mint",
      name: "Mint",
      category: "seeds",
      kind: "seed",
      image: "images/seed-mint.jpg",
      desc: "Includes: mint seed packs. Vigorous grower—best kept contained in a planter.",
      tags: ["herb", "beginner", "spring", "summer", "container", "planter"],
      inv: { available: true, remaining: 180, note: "In stock" }
    },

    // =========================
    // EDUCATION RESOURCES
    // =========================
    {
      key: "edu-brochure-tomato",
      name: "Tomato Brochure",
      category: "education",
      kind: "edu",
      image: "images/edu-brochure-tomato.jpg",
      desc: "Printable one-page guide: planting, watering, spacing, and harvest tips.",
      tags: ["education", "brochure", "tomato", "beginner"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-brochure-lettuce",
      name: "Lettuce Brochure",
      category: "education",
      kind: "edu",
      image: "images/edu-brochure-lettuce.jpg",
      desc: "Quick-start guide for planter boxes and cut-and-come-again harvesting.",
      tags: ["education", "brochure", "lettuce", "beginner"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-brochure-basil",
      name: "Basil Brochure",
      category: "education",
      kind: "edu",
      image: "images/edu-brochure-basil.jpg",
      desc: "Container-friendly herb guide with pruning tips for bigger yields.",
      tags: ["education", "brochure", "basil", "herb"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-coloring-pollinators",
      name: "Pollinator Coloring Sheet Pack",
      category: "education",
      kind: "edu",
      image: "images/edu-coloring-pollinators.jpg",
      desc: "Kid-friendly pages featuring bees, butterflies, and flowers.",
      tags: ["education", "coloring", "kids", "pollinator"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-coloring-vegetables",
      name: "Vegetables Coloring Sheet Pack",
      category: "education",
      kind: "edu",
      image: "images/edu-coloring-vegetables.jpg",
      desc: "Classroom-ready sheets that match the crops you can request.",
      tags: ["education", "coloring", "kids"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-manual-wicking-bucket",
      name: "Wicking Bucket Manual",
      category: "education",
      kind: "edu",
      image: "images/edu-manual-wicking-bucket.jpg",
      desc: "Step-by-step build guide with materials list and diagrams.",
      tags: ["education", "manual", "container", "wicking"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-manual-raised-bed",
      name: "Raised Bed Build Manual",
      category: "education",
      kind: "edu",
      image: "4x4-garden-bed.jpg",
      desc: "How to assemble, fill, and plant a basic raised bed for schools.",
      tags: ["education", "manual", "raised-bed", "beginner"],
      inv: { available: true, remaining: 999, note: "Available" }
    },
    {
      key: "edu-manual-compost",
      name: "Composting Basics Guide",
      category: "education",
      kind: "edu",
      image: "images/edu-manual-compost.jpg",
      desc: "Simple composting guide designed for classrooms and clubs.",
      tags: ["education", "manual", "compost"],
      inv: { available: true, remaining: 999, note: "Available" }
    },

    // =========================
    // GARDEN SUPPLIES
    // =========================
    {
      key: "sup-gloves",
      name: "Gardening Gloves (Pair)",
      category: "supplies",
      kind: "supply",
      image: "images/hybrid-storytellers-qHD4Yj8E6WQ-unsplash.jpg",
      desc: "Durable gloves for school gardens and community plots.",
      tags: ["supply", "tools", "beginner"],
      inv: { available: true, remaining: 120, note: "In stock" }
    },
    {
      key: "sup-trowel",
      name: "Hand Trowel",
      category: "supplies",
      kind: "supply",
      image: "images/gryffyn-m-JR7IPWMMXcc-unsplash1 (1).jpg",
      desc: "Great for transplanting seedlings and container gardens.",
      tags: ["supply", "tools", "container", "beginner"],
      inv: { available: true, remaining: 90, note: "In stock" }
    },
    {
      key: "sup-pruners",
      name: "Hand Pruners",
      category: "supplies",
      kind: "supply",
      image: "images/pexels-tamara-elnova-218645958-12142540.jpg",
      desc: "For harvesting herbs and trimming plants safely.",
      tags: ["supply", "tools", "harvest"],
      inv: { available: true, remaining: 35, note: "In stock" }
    }
    {
  key: "sup-cultivator",
  name: "Hand Cultivator (3-Tine)",
  category: "supplies",
  kind: "supply",
  image: "images/hand-cultivator.jpg",
  desc: "Compact 3-tine cultivator for loosening soil and removing weeds.",
  tags: ["supply", "tools", "soil", "beginner"],
  inv: { available: true, remaining: 75, note: "In stock" }
},
{
  key: "sup-soil-scoop",
  name: "Soil Scoop",
  category: "supplies",
  kind: "supply",
  image: "images/soil-scoop.jpg",
  desc: "Lightweight scoop for potting mix, compost, and soil transfer.",
  tags: ["supply", "tools", "potting"],
  inv: { available: true, remaining: 110, note: "In stock" }
},
{
  key: "sup-soil-pucks",
  name: "Compressed Soil Pucks (Coco Coir)",
  category: "supplies",
  kind: "supply",
  image: "images/soil-pucks.jpg",
  desc: "Peat-free coco coir pucks that expand with water for seed starting.",
  tags: ["supply", "soil", "eco", "classroom"],
  inv: { available: true, remaining: 500, note: "In stock" }
},
{
  key: "sup-seed-tray",
  name: "Seedling Starter Tray",
  category: "supplies",
  kind: "supply",
  image: "images/seedling-tray.jpg",
  desc: "Reusable seed starter tray with 6 or 12 cells for seedlings.",
  tags: ["supply", "seed-starting", "beginner"],
  inv: { available: true, remaining: 140, note: "In stock" }
},
{
  key: "sup-ph-strips",
  name: "Soil pH Test Strips",
  category: "supplies",
  kind: "supply",
  image: "images/ph-strips.jpg",
  desc: "Strip-based soil pH tests for learning and garden planning.",
  tags: ["supply", "education", "soil"],
  inv: { available: true, remaining: 200, note: "In stock" }
},
{
  key: "sup-spacing-ruler",
  name: "Plant Spacing Ruler",
  category: "supplies",
  kind: "supply",
  image: "images/spacing-ruler.jpg",
  desc: "Marked ruler showing ideal spacing for common garden crops.",
  tags: ["supply", "planning", "beginner"],
  inv: { available: true, remaining: 95, note: "In stock" }
},
{
  key: "sup-jute-twine",
  name: "Jute Twine Spool",
  category: "supplies",
  kind: "supply",
  image: "images/jute-twine.jpg",
  desc: "Biodegradable jute twine for tying plants and garden projects.",
  tags: ["supply", "eco", "garden-accessory"],
  inv: { available: true, remaining: 180, note: "In stock" }
},
{
  key: "sup-mesh-bag",
  name: "Reusable Mesh Produce Bag",
  category: "supplies",
  kind: "supply",
  image: "images/mesh-produce-bag.jpg",
  desc: "Washable mesh bag for harvesting, storing, and washing produce.",
  tags: ["supply", "harvest", "sustainable"],
  inv: { available: true, remaining: 85, note: "In stock" }
},
{
  key: "sup-garden-markers",
  name: "Garden Markers (Set)",
  category: "supplies",
  kind: "supply",
  image: "images/garden-markers.jpg",
  desc: "Reusable garden markers for labeling plants and seedlings.",
  tags: ["supply", "seed-starting", "organization"],
  inv: { available: true, remaining: 300, note: "In stock" }
},

/* ======================
   STARTER KITS
   ====================== */

{
  key: "kit-beginner-garden",
  name: "Beginner Garden Starter Kit",
  category: "kits",
  kind: "kit",
  image: "images/beginner-kit.jpg",
  desc: "An affordable starter kit with everything needed to begin gardening.",
  tags: ["kit", "beginner", "classroom", "gift"],
  includes: [
    "Compressed Soil Pucks (6–8)",
    "Seedling Starter Tray",
    "Garden Markers (5–10)",
    "Plant Spacing Ruler",
    "Jute Twine Spool",
    "Printed Planting Guide"
  ],
  inv: { available: true, remaining: 40, note: "Limited stock" }
},
{
  key: "kit-soil-setup",
  name: "Soil & Setup Starter Kit",
  category: "kits",
  kind: "kit",
  image: "images/soil-setup-kit.jpg",
  desc: "Educational kit focused on soil prep and garden setup fundamentals.",
  tags: ["kit", "education", "soil"],
  includes: [
    "Hand Cultivator",
    "Soil Scoop",
    "Soil pH Test Strips",
    "Compressed Soil Pucks",
    "Plant Spacing Ruler"
  ],
  inv: { available: true, remaining: 30, note: "Limited stock" }
}

  ]
};





