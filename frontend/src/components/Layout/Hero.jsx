import heroImg from "../../assets/Obsidian-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-[60vh] md:h-[75vh] lg:h-[90vh] object-cover object-[50%_10%]"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-5xl">
          {/* Brand */}
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-gray-300 mb-6">
            Obsidian Collection
          </p>

          {/* Statement */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
            Crafted in
            <br />
            <span className="font-extrabold">Silence.</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Timeless essentials designed for those who move with intention. No
            trends. No noise. Just form, fabric, and confidence.
          </p>

          {/* CTA */}
          <Link
            to="collections/all"
            className="inline-flex items-center justify-center px-10 py-3 text-xs md:text-sm tracking-[0.25em] uppercase
                 border border-white/70 hover:bg-white hover:text-black
                 transition-all duration-300 rounded-lg"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
