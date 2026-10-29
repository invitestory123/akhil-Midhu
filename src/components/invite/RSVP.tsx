import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Check, Heart, MessageCircle, Minus, Plus, Users, Sparkles, RotateCcw } from "lucide-react";
import { invite } from "@/config/invite";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";

interface RsvpData {
  status: "attending" | "declined";
  name: string;
  guestCount: number;
  phone: string;
  note: string;
  timestamp: number;
}

const STORAGE_KEY = "forefest_rsvp_data";

export function RSVP() {
  const [status, setStatus] = useState<"attending" | "declined">("attending");
  const [name, setName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState<RsvpData | null>(null);

  // Load any previously saved RSVP
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as RsvpData;
        setSavedData(parsed);
        setStatus(parsed.status);
        setName(parsed.name || "");
        setGuestCount(parsed.guestCount || 1);
        setPhone(parsed.phone || "");
        setNote(parsed.note || "");
        setSubmitted(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data: RsvpData = {
      status,
      name: name.trim(),
      guestCount: status === "attending" ? guestCount : 0,
      phone: phone.trim(),
      note: note.trim(),
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage quota or disabled */
    }

    setSavedData(data);
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  // Generate pre-filled WhatsApp message
  const whatsappUrl = (() => {
    const isAttending = status === "attending";
    const msg = isAttending
      ? `✨ *RSVP for Forever Fest* ✨\n\n` +
        `Hi ${invite.bride} & ${invite.groom}! 👋\n\n` +
        `I will be happily attending your celebration on ${invite.dayLine}!\n\n` +
        `👤 *Name:* ${name}\n` +
        `👥 *Persons Attending:* ${guestCount}\n` +
        (phone ? `📞 *Contact:* ${phone}\n` : "") +
        (note ? `💬 *Note:* "${note}"\n\n` : "\n") +
        `Can't wait to celebrate together! 🥂🎉`
      : `🤍 *RSVP for Forever Fest*\n\n` +
        `Hi ${invite.bride} & ${invite.groom},\n\n` +
        `Warmest congratulations on your wedding! Regretfully I won't be able to make it to the party on ${invite.dayLine}, but sending you both lots of love and best wishes! 🥂\n\n` +
        `👤 *From:* ${name}`;

    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <section id="rsvp" className="relative px-6 py-20 sm:py-28 text-center overflow-hidden">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <Divider className="mb-10" />
          <p className="caps text-[0.6rem] text-olive tracking-[0.3em]">
            RSVP · Kindly Respond
          </p>
          <h2 className="script mt-3 text-4xl sm:text-5xl text-ink">
            Will You Attend The Event?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-sepia">
            Please let us know if you will be celebrating with us so we can arrange the very best night for everyone!
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grain mt-10 rounded-2xl border border-gold/40 bg-paper-deep/60 p-6 sm:p-10 shadow-[0_20px_50px_-25px_rgba(60,45,25,0.35)] backdrop-blur-xs text-left">
            <AnimatePresence mode="wait">
              {submitted && savedData ? (
                /* Confirmation Screen */
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-gold/20 text-gold border border-gold/40 shadow-inner">
                    <Check className="size-8 stroke-[2.5]" />
                  </div>

                  <h3 className="script mt-5 text-3xl sm:text-4xl text-ink">
                    {savedData.status === "attending"
                      ? "See You There!"
                      : "Thank You For Letting Us Know"}
                  </h3>

                  <p className="mt-3 text-base sm:text-lg text-sepia font-serif">
                    {savedData.status === "attending" ? (
                      <>
                        We are thrilled to celebrate with you,{" "}
                        <span className="font-semibold text-ink">{savedData.name}</span>!
                      </>
                    ) : (
                      <>
                        We will miss you,{" "}
                        <span className="font-semibold text-ink">{savedData.name}</span>. Thank you for your warm wishes!
                      </>
                    )}
                  </p>

                  {savedData.status === "attending" && (
                    <div className="mx-auto my-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 shadow-xs">
                      <Users className="size-4 text-gold" />
                      <span className="caps text-[0.68rem] text-ink font-semibold tracking-wider">
                        {savedData.guestCount} {savedData.guestCount === 1 ? "Person" : "Persons"} Confirmed
                      </span>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="caps flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-white px-7 text-[0.55rem] font-semibold tracking-widest shadow-md transition-opacity hover:opacity-90 active:scale-98"
                    >
                      <MessageCircle className="size-4" />
                      Send Confirmation to Hosts on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="caps flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 text-ink/80 hover:text-ink px-6 text-[0.52rem] tracking-widest transition-colors"
                    >
                      <RotateCcw className="size-3.5" />
                      Change RSVP Details
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* RSVP Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Attendance Choice */}
                  <div>
                    <label className="caps block text-[0.62rem] text-olive font-medium tracking-[0.2em] mb-3">
                      Will you attend? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setStatus("attending")}
                        className={`flex items-center justify-center gap-2 rounded-xl p-3.5 border transition-all text-sm font-medium ${
                          status === "attending"
                            ? "border-gold bg-gold/20 text-ink shadow-sm ring-1 ring-gold"
                            : "border-border/80 bg-paper/70 text-sepia hover:bg-paper"
                        }`}
                      >
                        <Sparkles className="size-4 text-gold" />
                        <span>Yes, Count Me In!</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatus("declined")}
                        className={`flex items-center justify-center gap-2 rounded-xl p-3.5 border transition-all text-sm font-medium ${
                          status === "declined"
                            ? "border-sepia/70 bg-sepia/15 text-ink shadow-sm ring-1 ring-sepia/50"
                            : "border-border/80 bg-paper/70 text-sepia hover:bg-paper"
                        }`}
                      >
                        <Heart className="size-4 text-sepia" />
                        <span>Regretfully Cannot</span>
                      </button>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="caps block text-[0.62rem] text-olive font-medium tracking-[0.2em] mb-2"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-border bg-paper/80 px-4 py-3 text-ink placeholder:text-sepia/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Number of Persons (only if attending) */}
                  {status === "attending" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <label className="caps block text-[0.62rem] text-olive font-medium tracking-[0.2em]">
                        Number of Persons Attending (including you) *
                      </label>

                      {/* Stepper counter */}
                      <div className="flex items-center justify-between rounded-xl border border-border bg-paper/80 p-2">
                        <button
                          type="button"
                          aria-label="Decrease persons"
                          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                          disabled={guestCount <= 1}
                          className="grid size-10 place-items-center rounded-lg bg-paper-deep text-ink hover:bg-gold/20 disabled:opacity-40 transition-colors"
                        >
                          <Minus className="size-4" />
                        </button>

                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-semibold text-ink tabular-nums">
                            {guestCount}
                          </span>
                          <span className="caps text-[0.5rem] text-sepia tracking-widest">
                            {guestCount === 1 ? "Person" : "Persons"}
                          </span>
                        </div>

                        <button
                          type="button"
                          aria-label="Increase persons"
                          onClick={() => setGuestCount((c) => Math.min(10, c + 1))}
                          disabled={guestCount >= 10}
                          className="grid size-10 place-items-center rounded-lg bg-paper-deep text-ink hover:bg-gold/20 disabled:opacity-40 transition-colors"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      {/* Quick Chips */}
                      <div className="flex items-center justify-center gap-2 pt-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuestCount(num)}
                            className={`size-8 rounded-full border text-xs font-medium transition-all ${
                              guestCount === num
                                ? "border-gold bg-gold text-paper shadow-xs"
                                : "border-border bg-paper/60 text-sepia hover:bg-paper"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Phone / WhatsApp */}
                  <div>
                    <label
                      htmlFor="guest-phone"
                      className="caps block text-[0.62rem] text-olive font-medium tracking-[0.2em] mb-2"
                    >
                      Phone / WhatsApp Number (Optional)
                    </label>
                    <input
                      id="guest-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-border bg-paper/80 px-4 py-3 text-ink placeholder:text-sepia/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label
                      htmlFor="guest-note"
                      className="caps block text-[0.62rem] text-olive font-medium tracking-[0.2em] mb-2"
                    >
                      A Note or Song Request (Optional)
                    </label>
                    <textarea
                      id="guest-note"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Can't wait to dance! Play some 90s hits..."
                      className="w-full rounded-xl border border-border bg-paper/80 px-4 py-3 text-ink placeholder:text-sepia/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="caps mt-2 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-[0.55rem] text-paper font-semibold tracking-[0.25em] shadow-md transition-opacity hover:opacity-90"
                  >
                    Confirm RSVP
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
