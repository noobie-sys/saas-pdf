import { BrainCircuit, FileOutput, FileText } from "lucide-react";
import React, { ReactNode } from "react";
type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};
const steps: Step[] = [
  {
    icon: <FileText className="" size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description:
      "Drag and drop or click to upload your PDF. It should be less than 5MB in size.",
  },
  {
    icon: <BrainCircuit className="" size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description:
      "Our AI-powered tool will analyze your PDF and generate a summary.",
  },
  {
    icon: <FileOutput className="" size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your documents",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 ">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 lg:pt-12 ">
        <div className="text-center mb-16 ">
          <h2 className="uppercase font-bold text-xl mb-4 text-rose-500  ">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative ">
          {steps.map((item, idx) => {
            return <StepItem key={idx} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative p-5  rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/50 transition-colors group w-full ">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors  ">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-1 flex-col gap-1 justify-between bg-red-">
          <h3 className="font-bold text-xl  text-center">{label}</h3>
          <p className="text-sm text-center text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;
