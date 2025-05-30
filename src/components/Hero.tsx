function Hero() {
  return (
    <section className="bg-soft-gold py-12 px-4 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-8">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="coin.png"
            alt="Old book"
            className="max-w-[200px] md:max-w-[250px] h-auto"
          />
        </div>

        {/* Center Text */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-dark ">
            Connecting Capital to Opportunity
          </h1>
          <p className="text-lg text-dark max-w-md mx-auto md:mx-0">
            Delivering comprehensive financial services with integrity and
            professionalism.
          </p>
          <button className="bg-[#ADF802] text-dark px-6 py-2 rounded-full hover:bg-[#FACC15] transition">
            Start a Project
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="idea.png"
            className="filter invert sepia saturate-[800%] hue-rotate-[20deg] brightness-[1.1] contrast-[1.2]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
