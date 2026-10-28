import { motion } from "motion/react";
import cocktailImg from "@/assets/cocktail-hour.jpg";
import foamImg from "@/assets/foam-party.jpg";
import djImg from "@/assets/dj-night.jpg";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";

const experiences = [
  {
    tag: "01 · Sunset Prelude",
    title: "The Cocktail Hour",
    time: "4:00 PM Onwards",
    image: cocktailImg,
    alt: "Friends toasting colorful cocktails together under fairy lights",
    quote: "Raise a glass to friendship, celebrate new beginnings, and toast to the memories we've made and all the ones yet to come.",
    highlight: "Clinking glasses & golden hour conversations",
  },
  {
    tag: "02 · Carefree Splash",
    title: "The Foam Party",
    time: "Dusk Celebration",
    image: foamImg,
    alt: "Friends laughing joyfully in giant clouds of foam and soap bubbles",
    quote: "Forget the rules, embrace the madness, and get ready to turn the evening into a splash of pure happiness. Some memories are best made when nobody cares about getting wet!",
    highlight: "Giant foam cannons, wild laughter & zero worries",
  },
  {
    tag: "03 · Dance Till Midnight",
    title: "The DJ Night",
    time: "Under The Stars",
    image: djImg,
    alt: "DJ mixing high energy dance beats with crowd dancing under neon disco lights",
    quote: "When the beats drop, the lights come alive, and our favourite people hit the dance floor — that's when the real memories begin. Dance like there's no tomorrow, sing at the top of your lungs, and make this a night we'll talk about for years.",
    highlight: "Pounding bass, electric lights & non-stop dance",
  },
];

export function Experiences() {
  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center">
            <Divider className="mb-10" />
            <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">Three Experiences · One Unforgettable Night</p>
            <h2 className="script mt-3 text-4xl text-ink sm:text-5xl">
              What Awaits You
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-sepia">
              A curated festival of love, laughter, splash, and music designed exclusively for our tribe.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 1;
            return (
              <Reveal key={exp.title} delay={index * 0.15}>
                <div
                  className={`grain flex flex-col ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } items-center gap-8 md:gap-12 rounded-2xl border border-border/80 bg-paper-deep/40 p-6 sm:p-8 shadow-[0_20px_50px_-30px_rgba(60,45,25,0.4)] backdrop-blur-xs`}
                >
                  {/* Image container */}
                  <div className="relative w-full md:w-1/2 overflow-hidden rounded-xl border border-gold/30 shadow-md group">
                    <motion.img
                      src={exp.image}
                      alt={exp.alt}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-paper/85 px-3 py-1 backdrop-blur-md border border-gold/40">
                      <span className="caps text-[0.5rem] text-ink font-semibold tracking-wider">
                        {exp.time}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <span className="caps text-[0.58rem] text-olive font-medium tracking-[0.25em]">
                      {exp.tag}
                    </span>
                    <h3 className="script mt-2 text-3xl sm:text-4xl text-ink">
                      {exp.title}
                    </h3>
                    <p className="mt-4 text-base sm:text-lg leading-[1.8] text-ink/85 italic font-serif">
                      &ldquo;{exp.quote}&rdquo;
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5">
                      <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="caps text-[0.52rem] text-sepia tracking-wider">
                        {exp.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
