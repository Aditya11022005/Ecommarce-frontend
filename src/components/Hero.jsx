import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const heroTexts = [
  "New Season, New Vibe",
  "Trending Now in Store",
  "Best Deals on Fashion",
];

const heroImages = [
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentIndex]);

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + heroTexts.length) % heroTexts.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <div className="relative flex flex-col sm:flex-row border border-gray-100 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-gray-100 min-h-[440px] shadow-2xl rounded-3xl">

      {/* Arrow Buttons */}
      <button
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2 transition hidden sm:block"
        onClick={handlePrev}
        aria-label="Previous Slide"
        style={{ outline: 'none' }}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2 transition hidden sm:block"
        onClick={handleNext}
        aria-label="Next Slide"
        style={{ outline: 'none' }}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Image Section with Overlay and Title */}
      <div className="w-full relative min-h-[440px] flex items-center justify-center">
        <img
          src={heroImages[currentIndex]}
          alt="Hero Slide"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${animating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'} hover:scale-105`}
          style={{ maxHeight: '100%', minHeight: 220, borderRadius: '1.5rem' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-3xl" />

        {/* Text Content */}
        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-full px-4 flex flex-col items-center">
          <div className="flex justify-center mb-2">
            <span className="inline-block font-bold text-xs sm:text-sm px-6 py-1.5 rounded-full shadow-lg tracking-widest uppercase border border-black text-black bg-white bg-opacity-90">
              <svg className="inline-block w-4 h-4 mr-1 -mt-1 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.894.553l1.382 2.8 3.09.45a1 1 0 01.554 1.706l-2.236 2.18.528 3.08a1 1 0 01-1.451 1.054L10 12.347l-2.767 1.456a1 1 0 01-1.451-1.054l.528-3.08-2.236-2.18a1 1 0 01.554-1.706l3.09-.45L9.106 2.553A1 1 0 0110 2z"/></svg>
              Latest Arrivals
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center leading-tight mb-2 drop-shadow-xl text-white">
            <span className="inline-block">OWN IT</span>
            <span className="inline-block text-blue-300 px-2">|</span>
            <span className="inline-block">RENT IT</span>
            <span className="inline-block text-blue-300 px-2">|</span>
            <span className="inline-block">TRY IT</span>
          </h2>
          <div className="flex justify-center mb-2">
            <span className="block w-24 h-1 rounded-full bg-white/80" />
          </div>
          <p className="text-base sm:text-lg text-gray-100 font-medium text-center mt-1 mb-3 drop-shadow-lg">{heroTexts[currentIndex]}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4">
          <button
            className="font-semibold text-base px-7 py-2 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => navigate('/collection')}
          >
            SHOP NOW
          </button>
          <a
            href="https://wa.me/919322465522?text=I%20want%20to%20rent%20a%20product%20from%20Aruzz%20Clothing."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-base px-7 py-2 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z"/></svg>
            Rent Now
          </a>
          <a
            href="https://wa.me/919999999999?text=I%20want%20to%20book%20an%20appointment%20with%20Aruzz%20Clothing."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-base px-7 py-2 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-500 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
            Book Appointment
          </a>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => !animating && setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full border-2 ${currentIndex === idx ? 'bg-amber-400 border-amber-500 scale-125' : 'bg-white/80 border-gray-300'} transition-all duration-300`}
              aria-label={`Go to slide ${idx + 1}`}
              style={{ outline: 'none' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
