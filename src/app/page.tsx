import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { Intro } from "@/components/sections/home/Intro";
import { Solutions } from "@/components/sections/home/Solutions";
import { Featured } from "@/components/sections/home/Featured";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { Approach } from "@/components/sections/home/Approach";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { IndustriesPreview } from "@/components/sections/home/IndustriesPreview";
import { HomeContact } from "@/components/sections/home/HomeContact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: `${site.legalName} — Technology That Moves Businesses Forward` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Solutions />
      <Featured />
      <WhyChoose />
      <Approach />
      <Capabilities />
      <IndustriesPreview />
      <HomeContact />
    </>
  );
}
