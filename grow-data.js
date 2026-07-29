/* =========================================================
   grow-data.js  (FutureSprouts "What can I grow right now?" data)

   Hardcoded crop calendar for USDA zone 6b/7a (Chester County, PA).
   Frost assumptions: last spring frost mid April to early May,
   first fall frost late October to early November.

   Load this file with a plain <script> tag BEFORE grow-widget.js.
   No modules, no fetch, no JSON. It defines one global:

   window.FS_CROPS = {
     zone: "6b/7a",
     crops: [
       {
         key:           "string unique id",
         name:          "Display Name",
         seedPackKey:   "matching config.js catalog key, or null when
                         FutureSprouts does not stock a pack for it",
         spaces:        array of "windowsill" | "raised-bed" | "yard",
                        every space the crop can be grown to harvest in,
         sowDepthIn:    seed sowing depth in inches (number),
         daysToHarvest: typical days from sowing to first harvest (number),
         startIndoors:  month numbers 1-12 when seed can be sown indoors.
                        For crops that can live their whole life on a
                        windowsill (herbs, salad greens) this includes
                        every month indoor sowing works, not only the
                        classic transplant season,
         directSow:     month numbers 1-12 when seed can go straight
                        into outdoor soil in zone 6b/7a,
         harvest:       month numbers 1-12 of the typical outdoor
                        harvest window
       },
       ...
     ]
   };
   ========================================================= */

window.FS_CROPS = {
  zone: "6b/7a",
  crops: [
    {
      key: "tomato",
      name: "Tomato",
      seedPackKey: "seed-tomato",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 75,
      startIndoors: [3, 4],
      directSow: [],
      harvest: [7, 8, 9]
    },
    {
      key: "cherry-tomato",
      name: "Cherry Tomato",
      seedPackKey: "seed-cherry-tomato",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 60,
      startIndoors: [3, 4],
      directSow: [],
      harvest: [7, 8, 9, 10]
    },
    {
      key: "bell-pepper",
      name: "Bell Pepper",
      seedPackKey: "seed-bell-pepper",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 75,
      startIndoors: [2, 3],
      directSow: [],
      harvest: [7, 8, 9]
    },
    {
      key: "cucumber",
      name: "Bush Cucumber",
      seedPackKey: "seed-cucumber-bush",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 55,
      startIndoors: [4],
      directSow: [5, 6],
      harvest: [7, 8, 9]
    },
    {
      key: "zucchini",
      name: "Zucchini",
      seedPackKey: "seed-zucchini",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 1,
      daysToHarvest: 50,
      startIndoors: [4],
      directSow: [5, 6],
      harvest: [7, 8, 9]
    },
    {
      key: "green-bean",
      name: "Green Bean",
      seedPackKey: "seed-green-bean",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 1,
      daysToHarvest: 55,
      startIndoors: [],
      directSow: [5, 6, 7],
      harvest: [7, 8, 9]
    },
    {
      key: "broccoli",
      name: "Broccoli",
      seedPackKey: "seed-broccoli",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 65,
      startIndoors: [2, 3, 7],
      directSow: [],
      harvest: [6, 9, 10]
    },
    {
      key: "kale",
      name: "Kale",
      seedPackKey: "seed-kale",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 55,
      startIndoors: [2, 3, 7],
      directSow: [4, 5, 8],
      harvest: [5, 6, 9, 10, 11]
    },
    {
      key: "swiss-chard",
      name: "Swiss Chard",
      seedPackKey: "seed-swiss-chard",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 55,
      startIndoors: [3, 4],
      directSow: [4, 5, 6, 7],
      harvest: [6, 7, 8, 9, 10]
    },
    {
      key: "lettuce",
      name: "Lettuce Mix",
      seedPackKey: "seed-lettuce-mix",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 45,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [3, 4, 5, 9],
      harvest: [4, 5, 6, 10, 11]
    },
    {
      key: "spinach",
      name: "Spinach",
      seedPackKey: "seed-spinach",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 40,
      startIndoors: [1, 2, 3, 9, 10, 11, 12],
      directSow: [3, 4, 9, 10],
      harvest: [4, 5, 6, 10, 11]
    },
    {
      key: "arugula",
      name: "Arugula",
      seedPackKey: "seed-arugula",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 30,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [3, 4, 5, 9, 10],
      harvest: [4, 5, 6, 10, 11]
    },
    {
      key: "radish",
      name: "Radish",
      seedPackKey: "seed-radish",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 25,
      startIndoors: [],
      directSow: [3, 4, 5, 9, 10],
      harvest: [4, 5, 6, 10, 11]
    },
    {
      key: "carrot",
      name: "Carrot",
      seedPackKey: "seed-carrot",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 70,
      startIndoors: [],
      directSow: [4, 5, 6, 7],
      harvest: [6, 7, 8, 9, 10]
    },
    {
      key: "beet",
      name: "Beet",
      seedPackKey: "seed-beet",
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 0.5,
      daysToHarvest: 55,
      startIndoors: [],
      directSow: [4, 5, 7, 8],
      harvest: [6, 7, 9, 10]
    },
    {
      key: "green-onion",
      name: "Green Onion",
      seedPackKey: "seed-green-onion",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 60,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [4, 5, 6],
      harvest: [6, 7, 8, 9]
    },
    {
      key: "basil",
      name: "Basil",
      seedPackKey: "seed-basil",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 60,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [5, 6],
      harvest: [6, 7, 8, 9]
    },
    {
      key: "cilantro",
      name: "Cilantro",
      seedPackKey: "seed-cilantro",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 50,
      startIndoors: [1, 2, 3, 4, 9, 10, 11, 12],
      directSow: [4, 5, 9],
      harvest: [5, 6, 10]
    },
    {
      key: "parsley",
      name: "Parsley",
      seedPackKey: "seed-parsley",
      spaces: ["windowsill", "raised-bed", "yard"],
      sowDepthIn: 0.25,
      daysToHarvest: 75,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [4, 5],
      harvest: [6, 7, 8, 9, 10]
    },
    {
      key: "chives",
      name: "Chives",
      seedPackKey: "seed-chives",
      spaces: ["windowsill", "raised-bed"],
      sowDepthIn: 0.25,
      daysToHarvest: 80,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [4, 5],
      harvest: [6, 7, 8, 9, 10]
    },
    {
      key: "thyme",
      name: "Thyme",
      seedPackKey: "seed-thyme",
      spaces: ["windowsill", "raised-bed"],
      sowDepthIn: 0.125,
      daysToHarvest: 90,
      startIndoors: [1, 2, 3, 4],
      directSow: [5],
      harvest: [6, 7, 8, 9]
    },
    {
      key: "mint",
      name: "Mint",
      seedPackKey: "seed-mint",
      spaces: ["windowsill"],
      sowDepthIn: 0.125,
      daysToHarvest: 70,
      startIndoors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      directSow: [],
      harvest: [5, 6, 7, 8, 9]
    },
    {
      key: "garlic",
      name: "Garlic",
      seedPackKey: null,
      spaces: ["raised-bed", "yard"],
      sowDepthIn: 2,
      daysToHarvest: 240,
      startIndoors: [],
      directSow: [10, 11],
      harvest: [6, 7]
    }
  ]
};
