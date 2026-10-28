import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";
import { invite } from "@/config/invite";

export function OneLastThing() {
  return (
    <section className="relative px-6 py-20 sm:py-28 text-center overflow-hidden">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Divider className="mb-10" />
          <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">
            A Note From The Heart
          </p>
          <h2 className="script mt-3 text-4xl text-ink sm:text-5xl">
            One Last Thing…
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grain mt-10 rounded-2xl border border-gold/40 bg-paper-deep/50 p-7 sm:p-10 shadow-[0_20px_50px_-30px_rgba(60,45,25,0.45)]">
            <p className="text-base sm:text-lg leading-[1.9] text-ink/85 font-serif">
              Years from now, when we look back at this chapter of our lives, we don&apos;t want to remember just the wedding day.
            </p>
            <p className="mt-5 text-base sm:text-lg leading-[1.9] text-ink/85 font-serif">
              We want to remember the friends who showed up, the hugs that lasted a little longer, the laughter that echoed through the night, the songs we screamed together, and the beautiful madness that made us feel young forever.
            </p>
            <p className="mt-5 text-base sm:text-lg leading-[1.9] text-ink/85 font-serif">
              Because life changes, priorities shift, and everyone gets busy building their own world. But some friendships will always feel like home.
            </p>

            <div className="my-8 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/50" />
              <Heart className="size-4 text-gold fill-gold/40 animate-pulse" />
              <span className="h-px w-12 bg-gold/50" />
            </div>

            <p className="caps text-[0.62rem] font-semibold text-ink tracking-[0.22em] leading-relaxed">
              Our next chapter begins with love.
              <br />
              <span className="text-olive">But this night belongs to friendship.</span>
            </p>

            <p className="script mt-6 text-3xl sm:text-4xl text-ink">
              ♡ With love, {invite.bride} &amp; {invite.groom}
            </p>

            <div className="mt-6 flex flex-col items-center gap-1 text-[0.52rem] text-sepia caps tracking-[0.2em]">
              <span>For the friends who became family.</span>
              <span>For the memories that never get old.</span>
              <span className="text-olive font-semibold">For one night that belongs to all of us.</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
