'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SlidersHorizontal, Sparkles, Flame } from 'lucide-react';
import allProductsData from '@/data/products.json';
import Breadcrumb from './Breadcrumb';
import ProductSortDropdown from './ProductSortDropdown';
import ActiveFilterChips from './ActiveFilterChips';
import ProductFilterSidebar from './ProductFilterSidebar';
import ProductFilterDrawer from './ProductFilterDrawer';
import ProductGrid from './ProductGrid';
import { FILTER_SECTIONS, matchesCategory } from './filterData';

export default function ProductListingLayout({
  pageTitle = 'All Jewellery',
  pageSubtitle = 'Explore our complete heritage collection of handcrafted BIS hallmarked gold, certified diamonds, and precious gemstone jewellery.',
  breadcrumbLabel = 'All Jewellery',
  basePath = '/all-jewellery',
  isTrendingOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Derive selected filters directly from searchParams (Single Source of Truth)
  const selectedFilters = useMemo(() => {
    const initial = {
      category: [],
      metal: [],
      price: [],
      purity: [],
      gender: [],
      occasion: [],
      collection: [],
    };

    ['category', 'metal', 'price', 'purity', 'gender', 'occasion', 'collection'].forEach((key) => {
      const paramVal = searchParams.get(key);
      if (paramVal) {
        initial[key] = paramVal.split(',').filter(Boolean);
      }
    });

    return initial;
  }, [searchParams]);

  // Base dataset scoped by isTrendingOnly flag
  const baseProducts = useMemo(() => {
    return isTrendingOnly
      ? allProductsData.filter((p) => p.isTrending)
      : allProductsData;
  }, [isTrendingOnly]);

  // Derive sort directly from searchParams
  const currentSort = searchParams.get('sort') || 'relevance';

  // Sync state to URL without full page reload
  const updateURL = useCallback(
    (newFilters, newSort) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          params.set(key, values.join(','));
        }
      });

      if (newSort && newSort !== 'relevance') {
        params.set('sort', newSort);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Toggle individual filter value
  const handleFilterToggle = (sectionId, value) => {
    const currentList = selectedFilters[sectionId] || [];
    const isAlreadySelected = currentList.includes(value);

    const updatedList = isAlreadySelected
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];

    const newFilters = {
      ...selectedFilters,
      [sectionId]: updatedList,
    };

    updateURL(newFilters, currentSort);
  };

  // Clear specific filter section
  const handleClearSection = (sectionId) => {
    const newFilters = {
      ...selectedFilters,
      [sectionId]: [],
    };
    updateURL(newFilters, currentSort);
  };

  // Clear all filters
  const handleClearAll = () => {
    const emptyFilters = {
      category: [],
      metal: [],
      price: [],
      purity: [],
      gender: [],
      occasion: [],
      collection: [],
    };
    updateURL(emptyFilters, currentSort);
  };

  // Remove single active filter chip
  const handleRemoveFilter = (sectionId, value) => {
    handleFilterToggle(sectionId, value);
  };

  // Sort change handler
  const handleSortChange = (newSort) => {
    updateURL(selectedFilters, newSort);
  };

  // Helper function to check if a product matches a price filter
  const matchesPriceFilter = (price, priceFilterValues) => {
    if (!priceFilterValues || priceFilterValues.length === 0) return true;

    return priceFilterValues.some((val) => {
      if (val === 'under-10000') return price < 10000;
      if (val === '10000-25000') return price >= 10000 && price <= 25000;
      if (val === '25000-50000') return price >= 25000 && price <= 50000;
      if (val === '50000-100000') return price >= 50000 && price <= 100000;
      if (val === 'above-100000') return price > 100000;
      return false;
    });
  };

  // Filtered and Sorted Products computation
  const filteredProducts = useMemo(() => {
    let result = baseProducts.filter((product) => {
      // Category filter
      if (
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.some((catVal) => matchesCategory(product.category, catVal))
      ) {
        return false;
      }

      // Metal filter
      if (
        selectedFilters.metal.length > 0 &&
        !selectedFilters.metal.includes(product.metal)
      ) {
        return false;
      }

      // Price filter
      if (
        selectedFilters.price.length > 0 &&
        !matchesPriceFilter(product.price, selectedFilters.price)
      ) {
        return false;
      }

      // Purity filter
      if (
        selectedFilters.purity.length > 0 &&
        !selectedFilters.purity.includes(product.purity)
      ) {
        return false;
      }

      // Gender filter
      if (
        selectedFilters.gender.length > 0 &&
        !selectedFilters.gender.includes(product.gender) &&
        product.gender !== 'unisex'
      ) {
        return false;
      }

      // Occasion filter
      if (
        selectedFilters.occasion.length > 0 &&
        !selectedFilters.occasion.includes(product.occasion)
      ) {
        return false;
      }

      // Collection filter
      if (
        selectedFilters.collection.length > 0 &&
        !selectedFilters.collection.includes(product.collection)
      ) {
        return false;
      }

      return true;
    });

    // Apply Sorting
    if (currentSort === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'new-arrivals') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (currentSort === 'best-selling') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [baseProducts, selectedFilters, currentSort]);

  // Compute live count badges for each filter option based on current baseProducts
  const counts = useMemo(() => {
    const countsMap = {};

    FILTER_SECTIONS.forEach((section) => {
      const items =
        section.type === 'nested'
          ? section.groups.flatMap((g) => g.items)
          : section.items;

      items.forEach((item) => {
        const key = `${section.id}:${item.value}`;
        const matchCount = baseProducts.filter((product) => {
          if (section.id === 'category') return matchesCategory(product.category, item.value);
          if (section.id === 'metal') return product.metal === item.value;
          if (section.id === 'price') return matchesPriceFilter(product.price, [item.value]);
          if (section.id === 'purity') return product.purity === item.value;
          if (section.id === 'gender') return product.gender === item.value || product.gender === 'unisex';
          if (section.id === 'occasion') return product.occasion === item.value;
          if (section.id === 'collection') return product.collection === item.value;
          return false;
        }).length;

        countsMap[key] = matchCount;
      });
    });

    return countsMap;
  }, [baseProducts]);

  // Compute Active Filter Chips
  const activeChips = useMemo(() => {
    const chips = [];

    FILTER_SECTIONS.forEach((section) => {
      const selected = selectedFilters[section.id] || [];
      const items =
        section.type === 'nested'
          ? section.groups.flatMap((g) => g.items)
          : section.items;

      selected.forEach((val) => {
        const matchedItem = items.find((i) => i.value === val);
        chips.push({
          type: section.id,
          value: val,
          label: matchedItem ? matchedItem.label : val,
        });
      });
    });

    return chips;
  }, [selectedFilters]);

  // Dynamic Page Title & Description
  const { title, subtitle } = useMemo(() => {
    if (selectedFilters.category.length === 1) {
      const catVal = selectedFilters.category[0];
      const allItems = FILTER_SECTIONS[0].groups.flatMap((g) => g.items);
      const catItem = allItems.find((i) => i.value === catVal);
      const catName = catItem ? catItem.label : 'Jewellery';
      return {
        title: isTrendingOnly ? `Trending ${catName}` : `${catName} Collection`,
        subtitle: isTrendingOnly
          ? `Explore currently trending and most-desired handcrafted ${catName.toLowerCase()}.`
          : `Discover handcrafted royal ${catName.toLowerCase()}, hallmarked in BIS gold and certified solitaires.`,
      };
    }
    if (selectedFilters.metal.length === 1) {
      const metalVal = selectedFilters.metal[0];
      const metalName = metalVal.charAt(0).toUpperCase() + metalVal.slice(1);
      return {
        title: isTrendingOnly ? `Trending ${metalName} Jewellery` : `${metalName} Jewellery`,
        subtitle: isTrendingOnly
          ? `Explore our most popular ${metalName.toLowerCase()} creations with royal craftsmanship.`
          : `Explore royal ${metalName.toLowerCase()} jewellery crafted with timeless heritage and contemporary allure.`,
      };
    }
    return {
      title: pageTitle,
      subtitle: pageSubtitle,
    };
  }, [selectedFilters, isTrendingOnly, pageTitle, pageSubtitle]);

  const activeCategoryTitle = useMemo(() => {
    if (selectedFilters.category.length !== 1) return null;
    const catVal = selectedFilters.category[0];
    const allItems = FILTER_SECTIONS[0]?.groups?.flatMap((g) => g.items) || [];
    const catItem = allItems.find((i) => i.value === catVal);
    return catItem ? catItem.label : catVal;
  }, [selectedFilters.category]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Bar */}
      <Breadcrumb
        categoryTitle={activeCategoryTitle}
        totalCount={filteredProducts.length}
        basePath={basePath}
        baseLabel={breadcrumbLabel}
      />

      {/* Main Container */}
      <div className="container-custom py-6 sm:py-8 lg:py-10">
        {/* Editorial Collection Header Banner */}
        <div className="mb-8 pb-6 border-b border-champagne">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/40 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
                {isTrendingOnly ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-burgundy" />
                    <span className="text-burgundy">Curated Trends</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Heritage Fine Jewellery</span>
                  </>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted font-serif max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Total Count & Desktop Sort */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Showing <strong className="text-charcoal font-bold">{filteredProducts.length}</strong> Products
              </span>
              <ProductSortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Mobile Filter & Sort Bar */}
          <div className="flex lg:hidden items-center justify-between gap-3 mt-6 pt-4 border-t border-champagne/60">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border-soft bg-ivory text-xs font-serif font-semibold text-charcoal hover:border-gold transition-colors shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-burgundy" />
              <span>Filters</span>
              {activeChips.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-burgundy text-white text-[10px] font-bold flex items-center justify-center">
                  {activeChips.length}
                </span>
              )}
            </button>

            <div className="flex-1 flex justify-end">
              <ProductSortDropdown
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>

          {/* Active Filter Chips */}
          <ActiveFilterChips
            activeFilters={activeChips}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAll}
          />
        </div>

        {/* 2-Column Layout: Sidebar (Desktop) + Product Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Left Sidebar (Sticky & Static on Scroll) */}
          <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-[136px] self-start z-20">
            <ProductFilterSidebar
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
              onClearSection={handleClearSection}
              onClearAll={handleClearAll}
              counts={counts}
            />
          </div>

          {/* Right Product Grid Area */}
          <main className="flex-1 min-w-0" id="product-listing">
            <ProductGrid
              products={filteredProducts}
              onClearAll={handleClearAll}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <ProductFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
        onClearSection={handleClearSection}
        onClearAll={handleClearAll}
        counts={counts}
        totalFilteredCount={filteredProducts.length}
      />
    </div>
  );
}
