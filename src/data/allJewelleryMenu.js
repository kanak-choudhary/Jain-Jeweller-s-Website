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
            { name: 'Earrings', href: '#earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '#rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '#pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '#necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '#bracelets', icon: 'Circle' },
            { name: 'Chains', href: '#chains', icon: 'Link2' },
            { name: 'Mangalsutra', href: '#mangalsutras', icon: 'Heart' },
            { name: 'Nose Pins', href: '#nose-pins', icon: 'Star' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Anklets', href: '#anklets', icon: 'Layers' },
            { name: 'Maang Tikka', href: '#bridal-maang-tikka', icon: 'Sun' },
            { name: 'Coins', href: '#coins', icon: 'Coins' },
            { name: 'Waist Belts', href: '#waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '#haath-phool', icon: 'Sparkle' },
            { name: 'Crowns', href: '#crowns', icon: 'Crown' },
            { name: 'Accessories', href: '#accessories', icon: 'Gem' },
            { name: 'Silver Articles', href: '#silver-gifts', icon: 'Gift' },
          ],
        },
      ],
    },
    metal: {
      columns: [
        {
          title: 'PRECIOUS METALS',
          items: [
            { name: 'Gold', href: '#gold', icon: 'Sun', detail: '22KT BIS Hallmarked & 18KT Fine Gold' },
            { name: 'Diamond', href: '#diamond', icon: 'Gem', detail: 'Natural IGI & VVS-EF Certified Solitaires' },
            { name: 'Silver', href: '#silver', icon: 'Coins', detail: '925 Sterling Silver & 999 Fine Silver' },
            { name: 'Platinum', href: '#platinum', icon: 'Award', detail: '950 Rare Platinum Jewellery' },
          ],
        },
      ],
    },
    gender: {
      columns: [
        {
          title: 'BY GENDER',
          items: [
            { name: 'Women', href: '#women', icon: 'Sparkles', detail: 'Bridal, festive & everyday fine jewellery' },
            { name: 'Men', href: '#men', icon: 'User', detail: 'Kadas, solid chains, rings & wedding styles' },
            { name: 'Kids', href: '#kids', icon: 'Sun', detail: 'Delicate charm bracelets, nazariya & earrings' },
          ],
        },
      ],
    },
    occasion: {
      columns: [
        {
          title: 'CURATED BY OCCASION',
          items: [
            { name: 'Wedding', href: '/bridal-collection', icon: 'Crown', detail: 'Imperial bridal sets, chokers & rani haars' },
            { name: 'Festive', href: '#festive', icon: 'Sparkles', detail: 'Traditional jhumkas, chandbalis & temple gold' },
            { name: 'Daily Wear', href: '#daily-wear', icon: 'CircleDot', detail: 'Lightweight, sleek minimalist essentials' },
            { name: 'Party Wear', href: '#party-wear', icon: 'Wine', detail: 'Modern statement cocktail rings & diamonds' },
            { name: 'Gifting', href: '#gifting', icon: 'Gift', detail: 'Precious coins, pendants & festive gifting' },
          ],
        },
      ],
    },
  },
};

