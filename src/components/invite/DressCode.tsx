import { motion } from "motion/react";
import { Sparkles, Shirt, Waves, SunMedium } from "lucide-react";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";

const palette = [
  { name: "Sunset Coral", color: "bg-[#FF6B6B]", border: "border-[#FF6B6B]/40" },
  { name: "Tropical Citrus", color: "bg-[#FFB84C]", border: "border-[#FFB84C]/40" },
  { name: "Island Turquoise", color: "bg-[#2EC4B6]", border: "border-[#2EC4B6]/40" },
  { name: "Palm Green", color: "bg-[#38B000]", border: "border-[#38B000]/40" },
  { name: "Golden Glow", color: "bg-[#E0A96D]", border: "border-[#E0A96D]/40" },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Vibrant Colours",
    desc: "Think bright, joyful hues that scream celebration — corals, yellows, turquoise, sunset pinks.",
  },
  {
    icon: Waves,
    title: "Tropical Prints",
    desc: "Florals, palm motifs, botanical botanicals, or breezy resort patterns.",
  },
  {
    icon: Shirt,
    title: "Stylish Casuals",
    desc: "Relaxed linen shirts, playful sundresses, chic co-ord sets, party-ready fits.",
  },
  {
    icon: SunMedium,
    title: "Foam & Dance Ready",
    desc: "Comfortable footwear & fits you won't mind getting wild and splashed in!",
  },
];

export function DressCode() {
  return (
    <section className="relative px-6 py-20 sm:py-28 text-center overflow-hidden">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Divider className="mb-10" />
          <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">Style The Vibe</p>
          <h2 className="script mt-3 text-4xl text-ink sm:text-5xl">
            Dress Code &amp; Mood
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-ink/85 italic font-serif">
            &ldquo;Come dressed for the vibe, bring your wildest energy, and leave your worries behind.&rdquo;
          </p>
        </Reveal>

        {/* Color Palette Swatches */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {palette.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-paper-deep/60 px-3.5 py-1.5 shadow-xs"
              >
                <span className={`size-3.5 rounded-full ${item.color} shadow-xs ring-1 ring-black/10`} />
                <span className="caps text-[0.52rem] text-sepia tracking-wider">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Style Guide Cards */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="grain flex items-start gap-4 rounded-xl border border-border/70 bg-paper-deep/40 p-5 shadow-xs"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold border border-gold/30">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="caps text-[0.65rem] font-medium text-ink tracking-widest">
                      {h.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-sepia">
                      {h.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="caps mt-10 text-[0.55rem] text-olive/80 tracking-[0.25em]">
            Vibrant • Tropical • Carefree • Party Chic
          </p>
        </Reveal>
      </div>
    </section>
  );
}
