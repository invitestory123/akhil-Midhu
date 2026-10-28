import { motion, useReducedMotion, useTransform } from "motion/react";
import { useCallback, useRef, useState } from "react";
import coupleImg from "@/assets/couple-caricature.jpg";
import { invite } from "@/config/invite";
import { useParallax } from "@/hooks/use-parallax";
import { getLenis } from "@/lib/lenis";
import { PetalBurst } from "./PetalBurst";
import { Petals } from "./Petals";
import { ScriptNames } from "./Reveal";

type Burst = { id: number; x: number; y: number };

export function Hero({ ready = true }: { ready?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { y, progress } = useParallax(ref, [0, 70]);
  const fade = useTransform(progress, [0, 0.75], [1, 0]);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const ease = [0.22, 0.61, 0.36, 1] as const;
  const anim = ready ? "show" : "hidden";

  /** Tap anywhere on the hero to scatter petals — pure delight. */
  const scatter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const id = Date.now();
      setBursts((b) => [...b.slice(-2), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      if (navigator.vibrate) navigator.vibrate(8);
      window.setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 2600);
    },
    [reduced],
  );

  const scrollOn = () => {
    const target = ref.current?.nextElementSibling as HTMLElement | null;
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: -20 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      onPointerDown={scatter}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center select-none"
    >
      <Petals />
      {bursts.map((b) => (
        <PetalBurst key={b.id} x={b.x} y={b.y} count={14} spread={130} seed={b.id % 11} />
      ))}

      <motion.div
        className="flex flex-col items-center gap-1.5"
        initial={{ opacity: 0, y: 12 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 1, ease }}
      >
        <span className="caps text-[0.62rem] text-sepia sm:text-xs tracking-[0.25em]">
          Forever Fest · Save The Date
        </span>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[0.52rem] caps text-olive">
          Married 26.10.26 · Party 29.10.26
        </span>
      </motion.div>

      <motion.p
        className="script mt-4 text-5xl tracking-[0.06em] text-ink sm:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 1.1, delay: 0.15, ease }}
      >
        {invite.dateLabel}
      </motion.p>

      <motion.div style={{ y, opacity: fade }} className="mt-7 w-full max-w-xs sm:max-w-sm">
        <div className="relative mx-auto aspect-square overflow-hidden rounded-full border-2 border-gold/50 p-2 shadow-[0_20px_50px_-20px_rgba(60,45,25,0.45)] ring-8 ring-gold/10">
          <motion.img
            src={coupleImg}
            alt={`Caricature illustration of ${invite.bride} and ${invite.groom} celebrating Forever Fest`}
            width={1024}
            height={1024}
            draggable={false}
            className="size-full rounded-full object-cover select-none"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 1.4, delay: 0.3, ease }}
          />
        </div>
      </motion.div>

      <motion.p
        className="caps mt-6 max-w-xs text-[0.62rem] leading-[2.1] text-olive sm:text-xs tracking-[0.25em]"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        Join us for the friends&apos; after-party of
      </motion.p>

      <motion.h1
        className="script mt-3 text-[3.25rem] leading-[1.05] text-ink sm:text-7xl"
        initial="hidden"
        animate={anim}
      >
        <ScriptNames text={invite.bride} delay={0.85} trigger={anim} />
        <span className="mx-3 text-gold sm:mx-5">&amp;</span>
        <ScriptNames text={invite.groom} delay={1.2} trigger={anim} />
      </motion.h1>


      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          scrollOn();
        }}
        aria-label="Scroll to the invitation"
        className="mt-10 flex min-h-14 flex-col items-center justify-end gap-2 px-8 pb-1"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="caps text-[0.55rem] text-sepia/70">Scroll</span>
        <motion.span
          aria-hidden="true"
          className="h-10 w-px bg-gradient-to-b from-sepia/60 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}
