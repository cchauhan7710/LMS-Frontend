import React from "react";

const logos = [
  { src: "brandImg/Brand1.png", alt: "HDFC Bank" },
  { src: "brandImg/Brand2.png", alt: "ICICI Bank" },
  { src: "brandImg/Brand3.png", alt: "Axis Bank" },
  { src: "brandImg/Brand4.png", alt: "State Bank of India" },
  { src: "brandImg/Brand5.png", alt: "Kotak Mahindra Bank" },
  { src: "brandImg/Brand6.png", alt: "Punjab National Bank" },
  { src: "brandImg/Brand7.png", alt: "Bank of Baroda" },
  { src: "brandImg/Brand8.png", alt: "Canara Bank" },
  { src: "brandImg/Brand9.png", alt: "Union Bank of India" },
  { src: "brandImg/Brand10.png", alt: "Yes Bank" },
  { src: "brandImg/Brand11.png", alt: "IndusInd Bank" },
  { src: "brandImg/Brand12.png", alt: "IDBI Bank" },
  { src: "brandImg/Brand13.png", alt: "Federal Bank" },
  { src: "brandImg/Brand14.png", alt: "DBS Bank" },
  { src: "brandImg/Brand15.png", alt: "Standard Chartered" },
  { src: "brandImg/Brand16.png", alt: "Citi Bank" },
  { src: "brandImg/Brand17.png", alt: "HSBC" },
  { src: "brandImg/Brand18.png", alt: "JPMorgan Chase" },
  { src: "brandImg/Brand19.png", alt: "Goldman Sachs" },
  { src: "brandImg/Brand20.png", alt: "Morgan Stanley" },
];

const logos1 = logos.slice(0, Math.ceil(logos.length / 2));
const logos2 = logos.slice(Math.ceil(logos.length / 2));

// Duplicate for seamless scrolling
const allLogos1 = [...logos1, ...logos1];
const allLogos2 = [...logos2, ...logos2];

const BrandCarousel = () => {
  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll {
          animation: scroll 80s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-scroll-reverse {
          animation: scroll-reverse 80s linear infinite;
        }

        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section
        id="brands"
        className="relative w-full py-16 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-10">
            Powering learners at{" "}
            <span className="text-orange-600 dark:text-orange-400">
              world-class companies
            </span>
          </h2>

          <div className="space-y-10">
            {/* Row 1 - scrolls left */}
            <div
              className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-20 before:bg-gradient-to-r from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent after:absolute after:right-0 after:top-0 after:h-full after:w-20 after:bg-gradient-to-l from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent"
              aria-hidden="true"
            >
              <div className="flex w-max animate-scroll py-6">
                {allLogos1.map(({ src, alt }, index) => (
                  <div
                    key={`fwd-${index}`}
                    className="shrink-0 mx-10 flex items-center justify-center opacity-80 hover:opacity-100 transition duration-300"
                    title={alt}
                  >
                    <img
                      className="h-16 sm:h-20 w-auto object-contain hover:scale-105 transition-transform"
                      src={src}
                      alt={alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div
              className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-20 before:bg-gradient-to-r from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent after:absolute after:right-0 after:top-0 after:h-full after:w-20 after:bg-gradient-to-l from-white via-white/70 to-transparent dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent"
              aria-hidden="true"
            >
              <div className="flex w-max animate-scroll-reverse py-6">
                {allLogos2.map(({ src, alt }, index) => (
                  <div
                    key={`rev-${index}`}
                    className="shrink-0 mx-10 flex items-center justify-center opacity-80 hover:opacity-100 transition duration-300"
                    title={alt}
                  >
                    <img
                      className="h-16 sm:h-20 w-auto object-contain hover:scale-105 transition-transform"
                      src={src}
                      alt={alt}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandCarousel;
