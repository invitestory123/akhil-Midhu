import { invite } from "@/config/invite";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";

export function Note() {
  return (
    <section className="px-6 py-20 text-center sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Divider className="mb-10" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">
            A Celebration of Friendship
          </p>
          <h2 className="script mt-3 text-3xl sm:text-4xl text-ink">
            Not Just An After-Party… A Celebration of Us
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 space-y-6 text-base sm:text-lg leading-[1.9] text-ink/85 font-serif">
            <p className="italic text-sepia text-lg sm:text-xl font-normal">
              &ldquo;Some people are part of our story. Some become the reason our story is beautiful.&rdquo;
            </p>
            <p>
              Our wedding on <span className="font-semibold text-ink">26th October</span> was an intimate
              celebration with family, but there is one chapter we simply cannot celebrate without you —
              the friends who made our journey so extraordinarily special.
            </p>
            <p>
              You&apos;ve been there for the crazy memories, the endless late-night conversations, the laughter,
              the little moments, and the stories we&apos;ll cherish for a lifetime. You haven&apos;t just been friends;
              you&apos;ve been family we found along the way.
            </p>
            <div className="my-8 rounded-xl border border-gold/30 bg-gold/5 py-4 px-6">
              <p className="caps text-[0.62rem] text-ink font-semibold tracking-[0.25em]">
                It&apos;s About Our People · Our Memories · Our Kind of Night
              </p>
              <p className="script mt-1 text-2xl text-sepia">And honestly, it wouldn&apos;t be complete without you.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-1">
            <p className="script text-3xl text-sepia sm:text-4xl">{invite.dayLine}</p>
            <p className="caps text-[0.65rem] text-olive font-semibold tracking-[0.25em]">
              {invite.timeLine}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

