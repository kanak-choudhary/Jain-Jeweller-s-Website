export const FILTER_SECTIONS = [
  {
    id: 'category',
    label: 'Category',
    type: 'nested', // has core & other groups
    groups: [
      {
        title: 'Core Jewellery',
        items: [
          { value: 'earrings', label: 'Earrings' },
          { value: 'rings', label: 'Rings' },
          { value: 'pendants', label: 'Pendants & Sets' },
          { value: 'necklaces', label: 'Necklaces & Sets' },
          { value: 'bangles', label: 'Bangles & Bracelets' },
          { value: 'chains', label: 'Chains' },
          { value: 'mangalsutra', label: 'Mangalsutra' },
          { value: 'nose-pins', label: 'Nose Pins' },
          { value: 'anklets', label: 'Anklets' },
          { value: 'maang-tikka', label: 'Maang Tikka' },
          { value: 'waist-belts', label: 'Waist Belts' },
          { value: 'haath-phool', label: 'Haath Phool' },
          { value: 'crowns', label: 'Crowns' },
          { value: 'accessories', label: 'Accessories' },
        ],
      },
      {
        title: 'Other Jewellery',
        items: [
          { value: 'coins', label: 'Coins' },
          { value: 'silver-articles', label: 'Silver Articles' },
          { value: 'idols', label: 'Idols' },
          { value: 'pooja-items', label: 'Pooja Items' },
          { value: 'gifting-articles', label: 'Gifting Articles' },
        ],
      },
    ],
  },
  {
    id: 'metal',
    label: 'Metal',
    items: [
      { value: 'gold', label: 'Gold' },
      { value: 'diamond', label: 'Diamond' },
      { value: 'silver', label: 'Silver' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    items: [
      { value: 'under-10000', label: 'Under ₹10,000', min: 0, max: 10000 },
      { value: '10000-25000', label: '₹10,000 – ₹25,000', min: 10000, max: 25000 },
      { value: '25000-50000', label: '₹25,000 – ₹50,000', min: 25000, max: 50000 },
      { value: '50000-100000', label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
      { value: 'above-100000', label: 'Above ₹1,00,000', min: 100000, max: Infinity },
    ],
  },
  {
    id: 'purity',
    label: 'Purity',
    items: [
      { value: '14K', label: '14K' },
      { value: '18K', label: '18K' },
      { value: '22K', label: '22K' },
      { value: '24K', label: '24K' },
      { value: '925', label: '925 Silver' },
      { value: '999', label: '999 Silver' },
    ],
  },
  {
    id: 'gender',
    label: 'Gender',
    items: [
      { value: 'women', label: 'Women' },
      { value: 'men', label: 'Men' },
      { value: 'kids', label: 'Kids' },
      { value: 'unisex', label: 'Unisex' },
    ],
  },
  {
    id: 'occasion',
    label: 'Occasion',
    items: [
      { value: 'daily-wear', label: 'Daily Wear' },
      { value: 'office-wear', label: 'Office Wear' },
      { value: 'festive', label: 'Festive' },
      { value: 'wedding', label: 'Wedding' },
      { value: 'bridal', label: 'Bridal' },
      { value: 'gifting', label: 'Gifting' },
    ],
  },
  {
    id: 'collection',
    label: 'Collection',
    items: [
      { value: 'bridal-collection', label: 'Bridal Collection' },
      { value: 'daily-wear-collection', label: 'Daily Wear' },
      { value: 'traditional-collection', label: 'Traditional Collection' },
      { value: 'contemporary-collection', label: 'Contemporary Collection' },
      { value: 'festive-shringaar', label: 'Festive Shringaar' },
      { value: 'royal-nizam', label: 'Royal Nizam' },
      { value: 'luminescence-solitaires', label: 'Luminescence Solitaires' },
    ],
  },
];

export const matchesCategory = (productCategory, filterCategory) => {
  if (productCategory === filterCategory) return true;
  if (filterCategory === 'silver-articles' && ['silver-articles', 'idols', 'pooja-items', 'gifting-articles'].includes(productCategory)) return true;
  if (filterCategory === 'pendants' && productCategory === 'pendants-sets') return true;
  if (filterCategory === 'pendants-sets' && productCategory === 'pendants') return true;
  if (filterCategory === 'necklaces' && productCategory === 'necklaces-sets') return true;
  if (filterCategory === 'necklaces-sets' && productCategory === 'necklaces') return true;
  if ((filterCategory === 'bangles' || filterCategory === 'bracelets') && productCategory === 'bangles-bracelets') return true;
  if (filterCategory === 'bangles-bracelets' && (productCategory === 'bangles' || productCategory === 'bracelets')) return true;
  if ((filterCategory === 'mangalsutra' || filterCategory === 'mangalsutras') && (productCategory === 'mangalsutra' || productCategory === 'mangalsutras')) return true;
  return false;
};

