'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, MapPin, Package, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, logout } = useAuth();

  const activeTab = searchParams.get('tab') || 'profile';

  // If not authenticated, redirect to sign in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin?redirect=/account');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#FAF8F4]">
        <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'address', label: 'My Address', icon: MapPin },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'returns', label: 'My Returns', icon: RotateCcw },
  ];

  return (
    <main className="w-full min-h-[calc(100vh-140px)] bg-[#FAF8F4] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 border-b border-champagne/70 pb-5">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold mb-1">
            Personal Account
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal">
            Welcome, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Manage your personal profile, addresses, luxury orders and exchange requests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="md:col-span-4 bg-white border border-border-soft rounded-2xl p-3 shadow-xs">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      router.replace(`/account?tab=${tab.id}`, { scroll: false });
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-burgundy text-white shadow-xs'
                        : 'text-charcoal hover:bg-ivory hover:text-burgundy'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                  </button>
                );
              })}

              <div className="pt-3 border-t border-champagne/60 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.push('/signin');
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-700 hover:text-red-900 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Active Tab Panel */}
          <section className="md:col-span-8 bg-white border border-border-soft rounded-2xl p-6 sm:p-8 shadow-xs animate-in fade-in duration-300">
            {/* Tab 1: Profile */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-champagne/60 pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                      Profile Details
                    </h2>
                    <p className="text-xs text-muted mt-0.5">Your verified personal information</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium rounded-full">
                    Active Member
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-ivory/60 border border-champagne/50">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
                      Full Name
                    </span>
                    <p className="text-sm font-medium text-charcoal">{user.name}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory/60 border border-champagne/50">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
                      Email Address
                    </span>
                    <p className="text-sm font-medium text-charcoal truncate">{user.email}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory/60 border border-champagne/50">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
                      Mobile Number
                    </span>
                    <p className="text-sm font-medium text-charcoal">{user.phone || '+91 98765 43210'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory/60 border border-champagne/50">
                    <span className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-1">
                      Member Since
                    </span>
                    <p className="text-sm font-medium text-charcoal">{user.joinedDate || 'Nov 2026'}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-champagne/60 flex items-center gap-2 text-xs text-muted">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>Your profile credentials are secured under 256-bit encryption.</span>
                </div>
              </div>
            )}

            {/* Tab 2: Address */}
            {activeTab === 'address' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-champagne/60 pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                      Saved Addresses
                    </h2>
                    <p className="text-xs text-muted mt-0.5">Manage your delivery and billing locations</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-champagne/80 bg-ivory/40 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-burgundy/10 text-burgundy">
                      Default Shipping Address
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-charcoal">{user.name}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/80 mt-1 leading-relaxed">
                    Plot No. 42, Civil Lines, Near City Centre Mall,<br />
                    Jaipur, Rajasthan — 302001
                  </p>
                  <p className="text-xs text-muted mt-2">Mobile: {user.phone || '+91 98765 43210'}</p>
                </div>
              </div>
            )}

            {/* Tab 3: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-champagne/60 pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                      Order History
                    </h2>
                    <p className="text-xs text-muted mt-0.5">Track your past purchases and certificates</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-champagne/80 bg-ivory/40">
                  <div className="flex items-center justify-between border-b border-champagne/40 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted block">
                        Order #JJ-2026-8941
                      </span>
                      <p className="text-xs text-muted mt-0.5">Placed on 12 Nov 2026</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Delivered
                    </span>
                  </div>
                  <p className="text-sm font-medium text-charcoal">
                    Luminescence Solitaire Diamond Studs (18KT White Gold)
                  </p>
                  <p className="text-xs text-muted mt-1">Total: ₹84,500 (Paid via Net Banking)</p>
                </div>
              </div>
            )}

            {/* Tab 4: Returns */}
            {activeTab === 'returns' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-champagne/60 pb-4">
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-normal text-charcoal">
                      Returns &amp; Lifetime Exchanges
                    </h2>
                    <p className="text-xs text-muted mt-0.5">
                      Request returns, resizing or hallmarked buyback valuation
                    </p>
                  </div>
                </div>

                <div className="p-8 text-center rounded-2xl border border-dashed border-champagne bg-ivory/30">
                  <RotateCcw className="w-8 h-8 text-burgundy/60 mx-auto mb-2" />
                  <h3 className="font-serif text-base font-medium text-charcoal">No Active Return Requests</h3>
                  <p className="text-xs text-muted max-w-sm mx-auto mt-1 leading-relaxed">
                    All Jain Jewellers items are eligible for our 15-day return policy and lifetime exchange guarantee.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center bg-[#FAF8F4]">
          <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
