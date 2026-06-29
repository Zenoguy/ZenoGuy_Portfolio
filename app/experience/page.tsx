import type { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Shreyan Ghosh",
  description:
    "How I built a production ERP platform at S.N. Polymers Pvt. Ltd. — authentication, project cost estimates, daily progress reporting, and material requisitions — before graduating.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
