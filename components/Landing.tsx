'use client';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollElement = scrollRef.current;
    if (!container || !scrollElement) return;

    let ticking = false;

    const easeInOutCubic = (t: number): number => {
      if (t < 0) return 0;
      if (t > 1) return 1;
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const update = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrollWidth = scrollElement.scrollWidth - window.innerWidth;

      const rawProgress =
        (window.innerHeight - rect.top) / (window.innerHeight + containerHeight);

      const scrollProgress = easeInOutCubic(rawProgress);
      const translateX = -scrollProgress * scrollWidth;

      scrollElement.style.transform = `translateX(${translateX}px)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images: string[] = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center'
  ];

  return (
    <div className="bg-black text-white">
      {/* Initial content */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Horizontal Section
          </h1>
          <p className="text-xl text-gray-300">With React and smooth scrolling</p>
          <p className="text-sm text-gray-500 mt-4">Scroll down to see the magic ✨</p>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: '400vh' }} // 4x viewport height for scroll distance
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={scrollRef}
            className="flex items-center h-full transition-transform duration-100 ease-out will-change-transform"
            style={{ width: 'max-content' }}
          >
            {/* Content sections */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
              <div className="max-w-2xl text-center">
                <h2 className="text-4xl font-bold mb-6">Lorem Ipsum</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Sed neque purus, imperdiet eu purus sit amet, hendrerit semper quam.
                  Praesent elementum, nisl sit amet tincidunt tincidunt, ex tortor cursus lorem,
                  non tempus purus libero et metus.
                </p>
              </div>
            </div>

            {/* Image grid section 1 */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
              <div className="grid grid-cols-2 gap-6 max-w-4xl">
                {images.slice(0, 4).map((src, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg group">
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Text section */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
              <div className="max-w-2xl text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Amazing Journey
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Aliquam metus lacus, efficitur sit amet ligula a, vehicula eleifend dolor.
                  Pellentesque vulputate consectetur lectus, sit amet pellentesque leo congue ut.
                  Vivamus turpis est, mollis et elit eget, venenatis dictum nisl.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                  <div className="w-8 h-1 bg-gray-600 rounded-full" />
                  <div className="w-6 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>

            {/* Image grid section 2 */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
              <div className="grid grid-cols-2 gap-6 max-w-4xl">
                {images.slice(4, 8).map((src, index) => (
                  <div key={index + 4} className="relative overflow-hidden rounded-lg group">
                    <img
                      src={src}
                      alt={`Gallery ${index + 5}`}
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Final text section */}
            <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
              <div className="max-w-2xl text-center">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  The End
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Suspendisse sit amet erat vel ipsum elementum mattis. In vel sagittis velit.
                  This horizontal scrolling section demonstrates smooth animations and
                  beautiful transitions.
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-200">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Thanks for scrolling!</h2>
          <p className="text-xl text-gray-400">Hope you enjoyed the horizontal journey</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
