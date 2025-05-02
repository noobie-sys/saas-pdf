"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { NavigationControls } from "./navigation-control";

const parseSection = (section: string) => {
  const [title, ...content] = section.split("\n");
  const clenaTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const point: string[] = [];
  let currentPoint = "";
  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("-")) {
      if (currentPoint) {
        point.push(currentPoint);
      }
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) {
        point.push(currentPoint);
      }
      currentPoint = trimmedLine;
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  if (currentPoint) {
    point.push(currentPoint);
  }
  console.log(point);
  return {
    title: clenaTitle,
    point: point.filter(
      (point) => point && !point.startsWith("-") && !point.startsWith("#")
    ),
  };
};

const SummaryViewer = ({ summary_text }: { summary_text: string }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const section = summary_text
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <h2>{section[currentSection].title}</h2>
          <ul>
            {section[currentSection].point.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
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

export default SummaryViewer;
