import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import paper from "@/assets/paper.jpg";
import { ActionBar } from "@/components/invite/ActionBar";
import { AddToCalendar } from "@/components/invite/AddToCalendar";
import { Countdown } from "@/components/invite/Countdown";
import { DressCode } from "@/components/invite/DressCode";
import { Envelope } from "@/components/invite/Envelope";
import { Experiences } from "@/components/invite/Experiences";
import { Hero } from "@/components/invite/Hero";
import { InviteFooter } from "@/components/invite/InviteFooter";
import { MusicPlayer } from "@/components/invite/MusicPlayer";
import { Note } from "@/components/invite/Note";

import { RSVP } from "@/components/invite/RSVP";
import { ScrollThread } from "@/components/invite/ScrollThread";
import { Venue } from "@/components/invite/Venue";
import { invite } from "@/config/invite";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const title = `${invite.bride} & ${invite.groom} — ${invite.tagline} · ${invite.dateLabel}`;
const description = `${invite.bride} & ${invite.groom} invite you to their Forever Fest on ${invite.dayLine} at ${invite.venue.name}, ${invite.venue.area}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${title} · Friends' Party` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · Friends' Party` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Invitation,
});

function Invitation() {
  useSmoothScroll();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MusicPlayer autoPlayTrigger={opened} />
      <Envelope onOpen={() => setOpened(true)} />
      <ScrollThread />
      <main
        className="grain relative min-h-screen bg-paper text-ink"
        style={{ backgroundImage: `url(${paper})`, backgroundSize: "480px" }}
      >
        <Hero ready={opened} />
        <Note />
        <Experiences />
        <DressCode />

        <Countdown />
        <Venue />
        <RSVP />
        <AddToCalendar />
        <InviteFooter />
      </main>
      <ActionBar />
    </>
  );
}

