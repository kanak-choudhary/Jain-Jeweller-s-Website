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
            { name: 'Earrings', href: '/all-jewellery?metal=gold&category=earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '/all-jewellery?metal=gold&category=rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '/all-jewellery?metal=gold&category=pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '/all-jewellery?metal=gold&category=necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '/all-jewellery?metal=gold&category=bangles', icon: 'Circle' },
            { name: 'Chains', href: '/all-jewellery?metal=gold&category=chains', icon: 'Link2' },
            { name: 'Mangalsutra', href: '/all-jewellery?metal=gold&category=mangalsutra', icon: 'Heart' },
            { name: 'Nose Pins', href: '/all-jewellery?metal=gold&category=nose-pins', icon: 'Star' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Anklets', href: '/all-jewellery?metal=gold&category=anklets', icon: 'Layers' },
            { name: 'Maang Tikka', href: '/all-jewellery?metal=gold&category=maang-tikka', icon: 'Sun' },
            { name: 'Coins', href: '/all-jewellery?metal=gold&category=coins', icon: 'Coins' },
            { name: 'Waist Belts', href: '/all-jewellery?metal=gold&category=waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '/all-jewellery?metal=gold&category=haath-phool', icon: 'Sparkle' },
            { name: 'Crowns', href: '/all-jewellery?metal=gold&category=crowns', icon: 'Crown' },
            { name: 'Accessories', href: '/all-jewellery?metal=gold&category=accessories', icon: 'Gem' },
          ],
        },
      ],
    },
    coins: {
      title: 'GOLD COINS',
      items: [
        { name: '0.100g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '0.250g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '0.5g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '1g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '2g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '5g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '10g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: 'View All Gold Coins', href: '/all-jewellery?metal=gold&category=coins', isHighlight: true },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '/all-jewellery?metal=gold&gender=women' },
        { name: 'Men', href: '/all-jewellery?metal=gold&gender=men' },
        { name: 'Kids', href: '/all-jewellery?metal=gold&gender=kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹10,000', href: '/all-jewellery?metal=gold&price=under-10000' },
        { name: '₹10,000 – ₹25,000', href: '/all-jewellery?metal=gold&price=10000-25000' },
        { name: '₹25,000 – ₹50,000', href: '/all-jewellery?metal=gold&price=25000-50000' },
        { name: '₹50,000 – ₹1,00,000', href: '/all-jewellery?metal=gold&price=50000-100000' },
        { name: 'Above ₹1,00,000', href: '/all-jewellery?metal=gold&price=above-100000' },
      ],
    },
    purity: {
      title: 'GOLD PURITY',
      items: [
        { name: '18 KT', href: '/all-jewellery?metal=gold&purity=18K' },
        { name: '22 KT', href: '/all-jewellery?metal=gold&purity=22K' },
        { name: '24 KT', href: '/all-jewellery?metal=gold&purity=24K' },
      ],
    },
    collections: {
      title: 'GOLD COLLECTIONS',
      items: [
        { name: 'Everyday Collection', href: '/all-jewellery?metal=gold&collection=daily-wear-collection' },
        { name: 'Traditional Collection', href: '/all-jewellery?metal=gold&collection=traditional-collection' },
        { name: 'Wedding Collection', href: '/bridal-collection' },
        { name: 'Contemporary Collection', href: '/all-jewellery?metal=gold&collection=contemporary-collection' },
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
            { name: 'Earrings', href: '/all-jewellery?metal=diamond&category=earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '/all-jewellery?metal=diamond&category=rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '/all-jewellery?metal=diamond&category=pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '/all-jewellery?metal=diamond&category=necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '/all-jewellery?metal=diamond&category=bangles', icon: 'Circle' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Mangalsutra', href: '/all-jewellery?metal=diamond&category=mangalsutra', icon: 'Heart' },
            { name: 'Nose Pins', href: '/all-jewellery?metal=diamond&category=nose-pins', icon: 'Star' },
            { name: 'Maang Tikka', href: '/all-jewellery?metal=diamond&category=maang-tikka', icon: 'Sun' },
            { name: 'Waist Belts', href: '/all-jewellery?metal=diamond&category=waist-belts', icon: 'Award' },
            { name: 'Haath Phool', href: '/all-jewellery?metal=diamond&category=haath-phool', icon: 'Sparkle' },
          ],
        },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '/all-jewellery?metal=diamond&gender=women' },
        { name: 'Men', href: '/all-jewellery?metal=diamond&gender=men' },
        { name: 'Kids', href: '/all-jewellery?metal=diamond&gender=kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹10,000', href: '/all-jewellery?metal=diamond&price=under-10000' },
        { name: '₹10,000 – ₹25,000', href: '/all-jewellery?metal=diamond&price=10000-25000' },
        { name: '₹25,000 – ₹50,000', href: '/all-jewellery?metal=diamond&price=25000-50000' },
        { name: '₹50,000 – ₹1,00,000', href: '/all-jewellery?metal=diamond&price=50000-100000' },
        { name: 'Above ₹1,00,000', href: '/all-jewellery?metal=diamond&price=above-100000' },
      ],
    },
    purity: {
      title: 'DIAMOND GOLD PURITY',
      items: [
        { name: '18 KT', href: '/all-jewellery?metal=diamond&purity=18K' },
        { name: '14 KT', href: '/all-jewellery?metal=diamond&purity=14K' },
      ],
    },
    collections: {
      title: 'DIAMOND COLLECTIONS',
      items: [
        { name: 'Solitaire Collection', href: '/all-jewellery?metal=diamond&collection=luminescence-solitaires' },
        { name: 'Everyday Diamond Collection', href: '/all-jewellery?metal=diamond&collection=daily-wear-collection' },
        { name: 'Wedding Collection', href: '/bridal-collection' },
        { name: 'Contemporary Collection', href: '/all-jewellery?metal=diamond&collection=contemporary-collection' },
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
            { name: 'Earrings', href: '/all-jewellery?metal=silver&category=earrings', icon: 'Sparkles' },
            { name: 'Rings', href: '/all-jewellery?metal=silver&category=rings', icon: 'CircleDot' },
            { name: 'Pendants & Sets', href: '/all-jewellery?metal=silver&category=pendants', icon: 'Gem' },
            { name: 'Necklaces & Sets', href: '/all-jewellery?metal=silver&category=necklaces', icon: 'Crown' },
            { name: 'Bangles & Bracelets', href: '/all-jewellery?metal=silver&category=bangles', icon: 'Circle' },
            { name: 'Chains', href: '/all-jewellery?metal=silver&category=chains', icon: 'Link2' },
            { name: 'Anklets', href: '/all-jewellery?metal=silver&category=anklets', icon: 'Layers' },
          ],
        },
        {
          title: 'OTHER JEWELLERY',
          items: [
            { name: 'Silver Articles', href: '/all-jewellery?metal=silver&category=silver-articles', icon: 'Gift' },
            { name: 'Idols', href: '/all-jewellery?metal=silver&category=silver-articles', icon: 'Sun' },
            { name: 'Pooja Items', href: '/all-jewellery?metal=silver&category=silver-articles', icon: 'Sparkle' },
            { name: 'Gifting Articles', href: '/all-jewellery?metal=silver&category=silver-articles', icon: 'Award' },
          ],
        },
      ],
    },
    coins: {
      title: 'SILVER COINS',
      items: [
        { name: '10g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: '25g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: '50g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: 'View All Silver Coins', href: '/all-jewellery?metal=silver&category=coins', isHighlight: true },
      ],
    },
    gender: {
      title: 'SHOP BY GENDER',
      items: [
        { name: 'Women', href: '/all-jewellery?metal=silver&gender=women' },
        { name: 'Men', href: '/all-jewellery?metal=silver&gender=men' },
        { name: 'Kids', href: '/all-jewellery?metal=silver&gender=kids' },
      ],
    },
    price: {
      title: 'SHOP BY PRICE',
      items: [
        { name: 'Under ₹10,000', href: '/all-jewellery?metal=silver&price=under-10000' },
        { name: '₹10,000 – ₹25,000', href: '/all-jewellery?metal=silver&price=10000-25000' },
        { name: '₹25,000 – ₹50,000', href: '/all-jewellery?metal=silver&price=25000-50000' },
        { name: 'Above ₹50,000', href: '/all-jewellery?metal=silver&price=50000-100000' },
      ],
    },
    purity: {
      title: 'SILVER PURITY',
      items: [
        { name: '925 Silver', href: '/all-jewellery?metal=silver' },
        { name: '999 Silver', href: '/all-jewellery?metal=silver' },
      ],
    },
    collections: {
      title: 'SILVER COLLECTIONS',
      items: [
        { name: 'Daily Wear', href: '/all-jewellery?metal=silver&collection=daily-wear-collection' },
        { name: 'Silver Gifts', href: '/all-jewellery?metal=silver&occasion=gifting' },
        { name: 'Traditional Silver', href: '/all-jewellery?metal=silver&collection=traditional-collection' },
        { name: 'Home & Pooja', href: '/all-jewellery?metal=silver&category=silver-articles' },
      ],
    },
  },
};

export const coinsMenuData = {
  columns: [
    {
      title: 'GOLD COINS',
      items: [
        { name: '0.100g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '0.250g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '0.5g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '1g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '2g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '5g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: '10g Coins', href: '/all-jewellery?metal=gold&category=coins' },
        { name: 'View All Gold Coins', href: '/all-jewellery?metal=gold&category=coins', isHighlight: true },
      ],
    },
    {
      title: 'SILVER COINS',
      items: [
        { name: '10g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: '25g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: '50g Coins', href: '/all-jewellery?metal=silver&category=coins' },
        { name: 'View All Silver Coins', href: '/all-jewellery?metal=silver&category=coins', isHighlight: true },
      ],
    },
  ],
};

