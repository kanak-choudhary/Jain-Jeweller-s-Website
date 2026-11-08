// Data configuration for Gold, Diamond, Silver and Coins Mega Menus

export const goldMenuData = {
  id: 'gold',
  title: 'Gold',
  tabs: [
    { id: 'category', label: 'Category' },
    { id: 'coins', label: 'Coins' },
    { id: 'gender', label: 'Gender' },
    { id: 'price', label: 'Price' },
    { id: 'purity', label: 'Purity' },
    { id: 'collections', label: 'Collections' },
  ],
  content: {
    category: {
      columns: [
        {
          title: 'JEWELLERY',
          items: [
            { name: 'Earrings', href: '#gold-earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '#gold-rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '#gold-pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '#gold-necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '#gold-bangles', icon: 'Circle' },
            { name: 'Chains', href: '#gold-chains', icon: 'Link2' },
            { name: 'Mangalsutra', href: '#gold-mangalsutra', icon: 'Heart' },
            { name: 'Nose Pins', href: '#gold-nose-pins', icon: 'Star' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Mangalsutra', href: '#gold-mangalsutra-other', icon: 'Heart' },
            { name: 'Nose Pins', href: '#gold-nose-pins-other', icon: 'Star' },
            { name: 'Maang Tikka', href: '#gold-maang-tikka', icon: 'Sun' },
            { name: 'Waist Belts', href: '#gold-waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '#gold-haath-phool', icon: 'Sparkle' },
          ],
        },
      ],
    },
    coins: {
      title: 'GOLD COINS',
      items: [
        { name: '0.100g Coins', href: '#gold-coin-0-100g' },
        { name: '0.250g Coins', href: '#gold-coin-0-250g' },
        { name: '0.5g Coins', href: '#gold-coin-0-5g' },
        { name: '1g Coins', href: '#gold-coin-1g' },
        { name: '2g Coins', href: '#gold-coin-2g' },
        { name: '5g Coins', href: '#gold-coin-5g' },
        { name: '10g Coins', href: '#gold-coin-10g' },
        { name: 'View All Gold Coins', href: '#gold-coins-all', isHighlight: true },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '#gold-women' },
        { name: 'Men', href: '#gold-men' },
        { name: 'Kids', href: '#gold-kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹10,000', href: '#gold-price-under-10k' },
        { name: '₹10,000 – ₹25,000', href: '#gold-price-10k-25k' },
        { name: '₹25,000 – ₹50,000', href: '#gold-price-25k-50k' },
        { name: '₹50,000 – ₹1,00,000', href: '#gold-price-50k-100k' },
        { name: 'Above ₹1,00,000', href: '#gold-price-above-100k' },
      ],
    },
    purity: {
      title: 'GOLD PURITY',
      items: [
        { name: '18 KT', href: '#gold-18kt' },
        { name: '22 KT', href: '#gold-22kt' },
        { name: '24 KT', href: '#gold-24kt' },
      ],
    },
    collections: {
      title: 'GOLD COLLECTIONS',
      items: [
        { name: 'Everyday Collection', href: '#gold-everyday' },
        { name: 'Traditional Collection', href: '#gold-traditional' },
        { name: 'Wedding Collection', href: '/bridal-collection' },
        { name: 'Contemporary Collection', href: '#gold-contemporary' },
      ],
    },
  },
};

export const diamondMenuData = {
  id: 'diamond',
  title: 'Diamond',
  tabs: [
    { id: 'category', label: 'Category' },
    { id: 'gender', label: 'Gender' },
    { id: 'price', label: 'Price' },
    { id: 'purity', label: 'Purity' },
    { id: 'collections', label: 'Collections' },
  ],
  content: {
    category: {
      columns: [
        {
          title: 'JEWELLERY',
          items: [
            { name: 'Earrings', href: '#diamond-earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '#diamond-rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '#diamond-pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '#diamond-necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '#diamond-bangles', icon: 'Circle' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Mangalsutra', href: '#diamond-mangalsutra', icon: 'Heart' },
            { name: 'Nose Pins', href: '#diamond-nose-pins', icon: 'Star' },
            { name: 'Maang Tikka', href: '#diamond-maang-tikka', icon: 'Sun' },
            { name: 'Waist Belts', href: '#diamond-waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '#diamond-haath-phool', icon: 'Sparkle' },
          ],
        },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '#diamond-women' },
        { name: 'Men', href: '#diamond-men' },
        { name: 'Kids', href: '#diamond-kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹10,000', href: '#diamond-price-under-10k' },
        { name: '₹10,000 – ₹25,000', href: '#diamond-price-10k-25k' },
        { name: '₹25,000 – ₹50,000', href: '#diamond-price-25k-50k' },
        { name: '₹50,000 – ₹1,00,000', href: '#diamond-price-50k-100k' },
        { name: 'Above ₹1,00,000', href: '#diamond-price-above-100k' },
      ],
    },
    purity: {
      title: 'DIAMOND GOLD PURITY',
      items: [
        { name: '18 KT', href: '#diamond-18kt' },
        { name: '14 KT', href: '#diamond-14kt' },
      ],
    },
    collections: {
      title: 'DIAMOND COLLECTIONS',
      items: [
        { name: 'Solitaire Collection', href: '#diamond-solitaires' },
        { name: 'Everyday Diamond Collection', href: '#diamond-everyday' },
        { name: 'Wedding Collection', href: '/bridal-collection' },
        { name: 'Contemporary Collection', href: '#diamond-contemporary' },
      ],
    },
  },
};

export const silverMenuData = {
  id: 'silver',
  title: 'Silver',
  tabs: [
    { id: 'category', label: 'Category' },
    { id: 'coins', label: 'Coins' },
    { id: 'gender', label: 'Gender' },
    { id: 'price', label: 'Price' },
    { id: 'purity', label: 'Purity' },
    { id: 'collections', label: 'Collections' },
  ],
  content: {
    category: {
      columns: [
        {
          title: 'JEWELLERY',
          items: [
            { name: 'Earrings', href: '#silver-earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '#silver-rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '#silver-pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '#silver-necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '#silver-bangles', icon: 'Circle' },
            { name: 'Chains', href: '#silver-chains', icon: 'Link2' },
            { name: 'Anklets', href: '#silver-anklets', icon: 'Layers' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Silver Articles', href: '#silver-articles', icon: 'Gift' },
            { name: 'Idols', href: '#silver-idols', icon: 'Sun' },
            { name: 'Pooja Items', href: '#silver-pooja', icon: 'Sparkle' },
            { name: 'Gifting Articles', href: '#silver-gifting', icon: 'Award' },
          ],
        },
      ],
    },
    coins: {
      title: 'SILVER COINS',
      items: [
        { name: '10g Coins', href: '#silver-coin-10g' },
        { name: '25g Coins', href: '#silver-coin-25g' },
        { name: '50g Coins', href: '#silver-coin-50g' },
        { name: 'View All Silver Coins', href: '#silver-coins-all', isHighlight: true },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '#silver-women' },
        { name: 'Men', href: '#silver-men' },
        { name: 'Kids', href: '#silver-kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹1,000', href: '#silver-price-under-1k' },
        { name: '₹1,000 – ₹5,000', href: '#silver-price-1k-5k' },
        { name: '₹5,000 – ₹10,000', href: '#silver-price-5k-10k' },
        { name: 'Above ₹10,000', href: '#silver-price-above-10k' },
      ],
    },
    purity: {
      title: 'SILVER PURITY',
      items: [
        { name: '925 Silver', href: '#silver-925' },
        { name: '999 Silver', href: '#silver-999' },
      ],
    },
    collections: {
      title: 'SILVER COLLECTIONS',
      items: [
        { name: 'Daily Wear', href: '#silver-daily' },
        { name: 'Silver Gifts', href: '#silver-gifts' },
        { name: 'Traditional Silver', href: '#silver-traditional' },
        { name: 'Home & Pooja', href: '#silver-pooja-home' },
      ],
    },
  },
};

export const coinsMenuData = {
  columns: [
    {
      title: 'GOLD COINS',
      items: [
        { name: '0.100g Coins', href: '#gold-coin-0-100g' },
        { name: '0.250g Coins', href: '#gold-coin-0-250g' },
        { name: '0.5g Coins', href: '#gold-coin-0-5g' },
        { name: '1g Coins', href: '#gold-coin-1g' },
        { name: '2g Coins', href: '#gold-coin-2g' },
        { name: '5g Coins', href: '#gold-coin-5g' },
        { name: '10g Coins', href: '#gold-coin-10g' },
        { name: 'View All Gold Coins', href: '#gold-coins-all', isHighlight: true },
      ],
    },
    {
      title: 'SILVER COINS',
      items: [
        { name: '10g Coins', href: '#silver-coin-10g' },
        { name: '25g Coins', href: '#silver-coin-25g' },
        { name: '50g Coins', href: '#silver-coin-50g' },
        { name: 'View All Silver Coins', href: '#silver-coins-all', isHighlight: true },
      ],
    },
  ],
};

