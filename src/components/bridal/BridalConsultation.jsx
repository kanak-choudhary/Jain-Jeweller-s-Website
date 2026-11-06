'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BridalConsultation() {
  const handleScrollToConsultation = (e) => {
    const target = document.querySelector('#consultation');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="bridal-consultation"
      aria-labelledby="bridal-consultation-heading"
      className="py-16 sm:py-24 bg-white border-b border-champagne/60 relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#FAF8F4] border border-champagne/70 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            {/* Left Content (7 cols) */}
            <div className="md:col-span-7 space-y-4 text-left">
              <p className="text-xs font-semibold tracking-[0.25em] text-burgundy uppercase">
                BESPOKE TROUSSEAU SERVICE
              </p>

              <h2
                id="bridal-consultation-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-charcoal tracking-tight leading-tight"
              >
                Your Bridal Journey Starts Here
              </h2>

              <p className="font-sans text-sm sm:text-base text-charcoal/75 leading-relaxed font-light max-w-md">
                Find jewellery that feels as special as your big day. Enjoy dedicated one-on-one styling with master jewellers.
              </p>

              <div className="pt-3">
                <Link
                  href="#consultation"
                  onClick={handleScrollToConsultation}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-burgundy hover:bg-burgundy-dark text-white text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg shadow-burgundy/20 border border-gold/30 hover:border-gold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Image (5 cols) */}
            <div className="md:col-span-5">
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-charcoal/5 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1667522589430-10839f374743?q=80&w=1000&auto=format&fit=crop"
                  alt="Bride being adorned with wedding jewellery"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

