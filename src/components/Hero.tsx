function Hero() {
  return (
    <section className="bg-white">
      {/* Hero Image */}
      <div className="w-full h-80 md:h-100 overflow-hidden">
        <img
          src="final coin.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Partner Logos (no heading/paragraph) */}
      <div className="bg-soft-gold px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center">
            {/* Hypothetical Logos */}
            <div className="flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full  bg-[#ADF802]  shadow hover:shadow-md transition">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#1d6ceb]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#ADF802] shadow hover:shadow-md transition">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#1d6ceb]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12h18M12 3v18" />
                </svg>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#F8FFE5] shadow hover:shadow-md transition">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#1d6ceb]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#FFFFFF]  shadow hover:shadow-md transition">
                <svg
                  className="h-6 w-6 sm:h-8 sm:w-8 text-[#1d6ceb]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {/* Add more logo blocks if needed */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
