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
// config.js
window.FS_CONFIG = {
  socials: {
    instagram: "https://www.instagram.com/futuresprouts",
    x: "https://x.com/futuresprouts",        // formerly Twitter
    linkedin: "https://www.linkedin.com/company/futuresprouts",
    youtube: "https://www.youtube.com/@futuresprouts",
    facebook: "https://www.facebook.com/futuresprouts"
  }
};
  // Your canonical site URL (update once live)
  canonicalBase: "https://futuresprouts.org"
};
window.FS_CONFIG = window.FS_CONFIG || {};
window.FS_CONFIG.googlePlacesKey = "PASTE_YOUR_KEY_HERE";

(function attachSocialLinks() {
  const cfg = window.FS_CONFIG;
  if (!cfg || !cfg.socials) return;

  document.querySelectorAll("[data-social]").forEach(el => {
    const key = el.getAttribute("data-social");
    const url = cfg.socials[key];
    if (!url) return;

    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
})();

