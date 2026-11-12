export const allJewelleryMenuData = {
  tabs: [
    { id: 'category', label: 'Category' },
    { id: 'metal', label: 'Metal' },
    { id: 'gender', label: 'Gender' },
    { id: 'occasion', label: 'Occasion' },
  ],
  content: {
    category: {
      columns: [
        {
          title: 'JEWELLERY',
          items: [
            { name: 'Earrings', href: '/all-jewellery?category=earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '/all-jewellery?category=rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '/all-jewellery?category=pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '/all-jewellery?category=necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '/all-jewellery?category=bangles', icon: 'Circle' },
            { name: 'Chains', href: '/all-jewellery?category=chains', icon: 'Link2' },
            { name: 'Mangalsutra', href: '/all-jewellery?category=mangalsutra', icon: 'Heart' },
            { name: 'Nose Pins', href: '/all-jewellery?category=nose-pins', icon: 'Star' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Anklets', href: '/all-jewellery?category=anklets', icon: 'Layers' },
            { name: 'Maang Tikka', href: '/all-jewellery?category=maang-tikka', icon: 'Sun' },
            { name: 'Coins', href: '/all-jewellery?category=coins', icon: 'Coins' },
            { name: 'Waist Belts', href: '/all-jewellery?category=waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '/all-jewellery?category=haath-phool', icon: 'Sparkle' },
            { name: 'Crowns', href: '/all-jewellery?category=crowns', icon: 'Crown' },
            { name: 'Accessories', href: '/all-jewellery?category=accessories', icon: 'Gem' },
            { name: 'Silver Articles', href: '/all-jewellery?category=silver-articles', icon: 'Gift' },
          ],
        },
      ],
    },
    metal: {
      columns: [
        {
          title: 'PRECIOUS METALS',
          items: [
            { name: 'Gold', href: '/all-jewellery?metal=gold', icon: 'Sun', detail: '22KT BIS Hallmarked & 18KT Fine Gold' },
            { name: 'Diamond', href: '/all-jewellery?metal=diamond', icon: 'Gem', detail: 'Natural IGI & VVS-EF Certified Solitaires' },
            { name: 'Silver', href: '/all-jewellery?metal=silver', icon: 'Coins', detail: '925 Sterling Silver & 999 Fine Silver' },
            { name: 'Platinum', href: '/all-jewellery?metal=platinum', icon: 'Award', detail: '950 Rare Platinum Jewellery' },
          ],
        },
      ],
    },
    gender: {
      columns: [
        {
          title: 'BY GENDER',
          items: [
            { name: 'Women', href: '/all-jewellery?gender=women', icon: 'Sparkles', detail: 'Bridal, festive & everyday fine jewellery' },
            { name: 'Men', href: '/all-jewellery?gender=men', icon: 'User', detail: 'Kadas, solid chains, rings & wedding styles' },
            { name: 'Kids', href: '/all-jewellery?gender=kids', icon: 'Sun', detail: 'Delicate charm bracelets, nazariya & earrings' },
          ],
        },
      ],
    },
    occasion: {
      columns: [
        {
          title: 'CURATED BY OCCASION',
          items: [
            { name: 'Wedding', href: '/all-jewellery?occasion=wedding', icon: 'Crown', detail: 'Imperial bridal sets, chokers & rani haars' },
            { name: 'Festive', href: '/all-jewellery?occasion=festive', icon: 'Sparkles', detail: 'Traditional jhumkas, chandbalis & temple gold' },
            { name: 'Daily Wear', href: '/all-jewellery?occasion=daily-wear', icon: 'CircleDot', detail: 'Lightweight, sleek minimalist essentials' },
            { name: 'Office Wear', href: '/all-jewellery?occasion=office-wear', icon: 'Wine', detail: 'Modern understated fine jewellery' },
            { name: 'Gifting', href: '/all-jewellery?occasion=gifting', icon: 'Gift', detail: 'Precious coins, pendants & festive gifting' },
          ],
        },
      ],
    },
  },
};
