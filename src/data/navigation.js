export const navigationCategories = [
  {
    id: "all-jewellery",
    label: "All Jewellery",
    href: "#all-jewellery",
    hasMegaMenu: true,
  },
  {
    id: "trending",
    label: "What's Trending",
    href: "#trending",
    badge: "Hot",
  },
  {
    id: "gold",
    label: "Gold",
    href: "#gold",
    hasMegaMenu: true,
    subcategories: [
      {
        title: "Gold Categories",
        items: [
          { name: "Gold Rings", href: "#gold-rings", description: "Timeless handcrafted bands & cocktail rings" },
          { name: "Gold Earrings", href: "#gold-earrings", description: "Jhumkas, studs, hoops & drops" },
          { name: "Gold Chains", href: "#gold-chains", description: "Classic daily wear & festive rope chains" },
          { name: "Gold Bangles", href: "#gold-bangles", description: "Kadas, traditional & sleek bangles" },
        ],
      },
      {
        title: "Purity & Metal",
        items: [
          { name: "22KT BIS Hallmarked Gold", href: "#22kt-gold" },
          { name: "18KT Everyday Fine Gold", href: "#18kt-gold" },
          { name: "Rose Gold Accents", href: "#rose-gold" },
          { name: "Antique Temple Jewellery", href: "#antique-gold" },
        ],
      },
      {
        title: "Featured Highlight",
        featured: {
          title: "The Royal Nizam Collection",
          subtitle: "Heritage 22KT gold craftsmanship",
          cta: "Explore Collection",
          href: "#royal-nizam",
        },
      },
    ],
  },
  {
    id: "diamond",
    label: "Diamond",
    href: "#diamond",
    hasMegaMenu: true,
    subcategories: [
      {
        title: "Diamond Categories",
        items: [
          { name: "Diamond Rings", href: "#diamond-rings", description: "Solitaires, eternity bands & halo designs" },
          { name: "Diamond Earrings", href: "#diamond-earrings", description: "Solitaire studs & chandelier drops" },
          { name: "Diamond Necklaces", href: "#diamond-necklaces", description: "Chokers, tennis necklaces & pendants" },
        ],
      },
      {
        title: "Cut & Certification",
        items: [
          { name: "IGI Certified Solitaires", href: "#igi-diamonds" },
          { name: "VVS-EF Natural Diamonds", href: "#vvs-diamonds" },
          { name: "Uncut Polki & Rose Cuts", href: "#polki-diamonds" },
        ],
      },
      {
        title: "Featured Highlight",
        featured: {
          title: "Luminescence Solitaires",
          subtitle: "Certified brilliant round & emerald cuts",
          cta: "View Solitaires",
          href: "#luminescence",
        },
      },
    ],
  },
  {
    id: "silver",
    label: "Silver",
    href: "#silver",
    hasMegaMenu: true,
    subcategories: [
      {
        title: "Silver Categories",
        items: [
          { name: "Silver Jewellery", href: "#silver-jewellery", description: "925 Sterling silver necklaces, rings & bracelets" },
          { name: "Silver Gifts", href: "#silver-gifts", description: "Puja articles, silverware & auspicious gifts" },
          { name: "Silver Coins", href: "#silver-coins", description: "999 Fine silver embossed coins & bars" },
        ],
      },
      {
        title: "Silver Styles",
        items: [
          { name: "Oxidised Tribal Silver", href: "#oxidised-silver" },
          { name: "Rhodium Plated 925", href: "#rhodium-silver" },
          { name: "Silver Anklets (Payal)", href: "#silver-anklets" },
        ],
      },
    ],
  },
  {
    id: "coins",
    label: "Coins",
    href: "#coins",
  },
  {
    id: "collections",
    label: "Collections",
    href: "#collections",
    hasMegaMenu: true,
    subcategories: [
      {
        title: "Curated Collections",
        items: [
          { name: "Bridal Collection", href: "#bridal-collection", description: "Majestic regal bridal sets for the big day" },
          { name: "Daily Wear", href: "#daily-wear", description: "Lightweight, sleek luxury for everyday elegance" },
          { name: "Traditional Collection", href: "#traditional-collection", description: "Heritage Kundan, Jadau & Meenakari designs" },
          { name: "Contemporary Collection", href: "#contemporary-collection", description: "Modern architectural and geometric motifs" },
        ],
      },
      {
        title: "Special Editions",
        items: [
          { name: "Festive Shringaar", href: "#festive-shringaar" },
          { name: "Royal Rajputana", href: "#royal-rajputana" },
          { name: "Heirloom Vintage", href: "#heirloom-vintage" },
        ],
      },
    ],
  },
  {
    id: "about-us",
    label: "About Us",
    href: "#about-us",
  },
];

export const trendingSearches = [
  "Gold Necklace",
  "Diamond Solitaire Ring",
  "Kundan Bridal Set",
  "Silver Payal",
  "24K Gold Coin",
  "Daily Wear Earrings",
  "Rose Gold Bangles",
  "Jadau Choker",
];

export const mockSearchProducts = [
  { id: 1, name: "22KT Royal Nizam Choker Necklace", category: "Gold", price: "₹2,45,000", tag: "Bestseller" },
  { id: 2, name: "Solitaire Diamond Engagement Ring 1.5ct", category: "Diamond", price: "₹1,85,000", tag: "Certified" },
  { id: 3, name: "Traditional Kundan & Pearl Jhumkas", category: "Gold", price: "₹78,500", tag: "Trending" },
  { id: 4, name: "925 Sterling Silver Royal Kada", category: "Silver", price: "₹12,400", tag: "Gift Pick" },
  { id: 5, name: "24K Lakshmi Ganesh Gold Coin 10g", category: "Coins", price: "₹76,000", tag: "999 Purity" },
  { id: 6, name: "Imperial Polki Bridal Set with Emeralds", category: "Collections", price: "₹4,95,000", tag: "Exclusive" },
];

