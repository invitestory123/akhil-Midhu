import { motion } from "motion/react";
import venueImg from "@/assets/venue.jpg";
import { directionsUrl, invite, mapsUrl } from "@/config/invite";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";
import { MapPin, Navigation } from "lucide-react";

const tapFeedback = () => {
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(10);
};

export function Venue() {
  return (
    <section className="px-6 pb-20 text-center sm:pb-28">
      <Reveal>
        <Divider className="mb-10" />
        <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">The Celebration Venue</p>
        <h2 className="script mt-4 text-4xl text-ink sm:text-5xl">{invite.venue.name}</h2>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-sepia">
          {invite.venue.address}
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <motion.a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={tapFeedback}
          whileTap={{ scale: 0.985 }}
          className="grain group mx-auto mt-8 block max-w-md overflow-hidden rounded-2xl border border-gold/40 shadow-[0_20px_40px_-30px_rgba(60,45,25,0.6)]"
        >
          <div className="relative">
            <img
              src={venueImg}
              alt={`Illustration of ${invite.venue.name}, Vattiyoorkavu`}
              width={1024}
              height={768}
              loading="lazy"
              className="h-60 w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <motion.span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-8 ring-gold/30"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="caps absolute bottom-4 left-1/2 flex min-h-10 -translate-x-1/2 items-center gap-1.5 rounded-full bg-paper/90 px-5 text-[0.52rem] text-ink shadow-md backdrop-blur-md border border-gold/30">
              <MapPin className="size-3 text-gold" />
              Open In Google Maps
            </span>
          </div>
        </motion.a>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={tapFeedback}
            whileTap={{ scale: 0.96 }}
            className="caps inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/25 bg-paper-deep/60 px-7 text-[0.55rem] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
          >
            <Navigation className="size-3 text-gold" />
            Get Directions
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}

