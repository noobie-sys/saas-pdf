"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { NavigationControls } from "./navigation-control";
import ProgressBar from "./progress-bar";
import { parseSection } from "@/utils/summary-helpers";
import ContentSection from "../content-section";

const SummaryViewer = ({ summary_text }: { summary_text: string }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const section = summary_text
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar section={section} currentSection={currentSection} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <SectionTitle title={section[currentSection]?.title} />
        <ContentSection
          title={section[currentSection]?.title}
          point={section[currentSection]?.point}
        />
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={section.length}
        onNext={() => {
          setCurrentSection((prev) => Math.min(prev + 1, section.length - 1));
        }}
        onPrevious={() => {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
};

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <div className="text-3xl lg:text-4xl font-bold text-center flex justify-center items-center">
        {title}
      </div>
    </div>
  );
}

export default SummaryViewer;
