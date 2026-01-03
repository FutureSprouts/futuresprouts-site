// config.js
window.FS_CONFIG = {
  siteName: "FutureSprouts",
  contactEmail: "info@futuresprouts.org",

  // Flip to true ONLY once you have IRS 501(c)(3) approval.
  is501c3Approved: false,

  // Replace these when you set them up:
  paypalDonateUrl: "#",            // e.g. PayPal donate link
  stripePaymentLinkSmall: "#",     // Stripe payment link (small)
  stripePaymentLinkKit: "#",       // Stripe payment link (sponsor a kit)
  stripePaymentLinkBed: "#",       // Stripe payment link (sponsor a bed)

  // Donorbox: replace with your Donorbox embed code snippet (iframe) when ready.
  donorboxEmbedHtml: "",

  // Social links (update)
  socials: {
    instagram: "#",
    tiktok: "#",
    youtube: "#"
  },

  // Your canonical site URL (update once live)
  canonicalBase: "https://futuresprouts.org"
};
window.FS_CONFIG = window.FS_CONFIG || {};
window.FS_CONFIG.googlePlacesKey = "PASTE_YOUR_KEY_HERE";
