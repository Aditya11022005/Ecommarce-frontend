import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const heroTexts = [
  "New Season, New Vibe",
  "Trending Now in Store",
  "Best Deals on Fashion",
];

// Use a beautiful online image for hero
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
        style={{outline: 'none'}}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full p-2 transition hidden sm:block"
        onClick={handleNext}
        aria-label="Next Slide"
        style={{outline: 'none'}}
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Text Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 px-5 sm:py-0 relative z-10 min-h-[440px]">
        <div className={`text-[#18181b] space-y-7 transition-all duration-500 max-w-lg w-full ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {/* Modern Latest Arrivals Badge */}
          <div className="flex justify-center mb-2">
            <span className="inline-block font-bold text-xs sm:text-sm px-6 py-1.5 rounded-full shadow-lg tracking-widest uppercase animate-fade-in border border-black text-black bg-white">
              <svg className="inline-block w-4 h-4 mr-1 -mt-1 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.894.553l1.382 2.8 3.09.45a1 1 0 01.554 1.706l-2.236 2.18.528 3.08a1 1 0 01-1.451 1.054L10 12.347l-2.767 1.456a1 1 0 01-1.451-1.054l.528-3.08-2.236-2.18a1 1 0 01.554-1.706l3.09-.45L9.106 2.553A1 1 0 0110 2z"/></svg>
              Latest Arrivals
            </span>
          </div>
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center leading-tight mb-2 drop-shadow-xl text-black">
            <span className="inline-block">OWN IT</span>
            <span className="inline-block text-blue-700 px-2">|</span>
            <span className="inline-block">RENT IT</span>
            <span className="inline-block text-blue-700 px-2">|</span>
            <span className="inline-block">TRY IT</span>
          </h2>
          {/* Divider */}
          <div className="flex justify-center mb-2">
            <span className="block w-24 h-1 rounded-full bg-black/80" />
          </div>
          <p className="text-base sm:text-lg text-gray-700 font-medium text-center mt-1 mb-3">{heroTexts[currentIndex]}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  className="font-semibold text-base px-7 py-2 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-pink-500 text-white shadow-lg hover:from-fuchsia-700 hover:to-pink-600 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  onClick={() => navigate('/collection')}
                >
                  SHOP NOW
                </button>
                <a
                  href="https://wa.me/919322465522?text=I%20want%20to%20rent%20a%20product%20from%20Aruzz%20Clothing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-base px-7 py-2 rounded-full bg-gradient-to-r from-teal-500 via-green-400 to-lime-400 text-white shadow-lg hover:from-teal-700 hover:to-lime-500 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 012 12C2 6.48 6.48 2 12 2c2.4 0 4.68.84 6.5 2.36A9.94 9.94 0 0122 12c0 5.52-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                  Rent Now
                </a>
                <a
                  href="https://wa.me/919999999999?text=I%20want%20to%20book%20an%20appointment%20with%20Aruzz%20Clothing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-base px-7 py-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 text-white shadow-lg hover:from-blue-800 hover:to-cyan-500 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
                  Book Appointment
                </a>
          </div>
        </div>
      </div>

      {/* Image Section with overlay */}
      <div className="w-full sm:w-1/2 overflow-hidden relative min-h-[440px] flex items-center justify-center">
        <img
          src={heroImages[currentIndex]}
          alt="Hero Slide"
          className={`w-full h-full object-cover transition-transform duration-700 rounded-none ${animating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'} hover:scale-105`}
          style={{maxHeight: 440, minHeight: 220, borderRadius: '1.5rem'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-3xl" />
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => !animating && setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full border-2 ${currentIndex === idx ? 'bg-amber-400 border-amber-500 scale-125' : 'bg-white/80 border-gray-300'} transition-all duration-300`}
              aria-label={`Go to slide ${idx + 1}`}
              style={{outline: 'none'}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
