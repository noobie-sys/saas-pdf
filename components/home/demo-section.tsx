import { Pizza } from "lucide-react";
import React from "react";

const DemoSection = () => {
  return (
    <section className="relative py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 ">
        <div className="flex flex-col space-y-4 text-center items-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 p-2">
            <Pizza className="w-6 h-6 text-rose-500 " />
          </div>
          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-3xl mx-auto px-4 sm:px-6">
              Watch hpw Sommaire transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              inot an easy-to-read summary!
            </h3>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50% + 3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50% + 36rem)] sm:w-[72.1875rem] "
            style={{
              clipPath:
                "polygon (74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%,47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6 ">
        {/* {summary viewer} */}
      </div>
    </section>
  );
};

export default DemoSection;
