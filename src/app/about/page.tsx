import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Our Agency",
  description: "Learn more about Aeronox Solutions, our engineering philosophy, digital capabilities, and leadership team.",
};

export default function AboutPage() {
  return <AboutContent />;
}
