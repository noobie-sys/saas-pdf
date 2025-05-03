import { parseEmojiPoint, parsePoint } from "@/utils/summary-helpers";
import React from "react";

const ContentSection = ({
  title,
  point,
}: {
  title: string;
  point: string[];
}) => {
  return (
    <div className="space-y-4">
      <ul className="list-disc pl-5 space-y-1">
        {point.map((p, index) => {
          const { isNumbered, isMainPoint, hasEmoji, isEmpty } = parsePoint(p);
          if (isEmpty) return null;

          if (hasEmoji || isMainPoint) {
            return <EmojiPoint key={index} point={p} />;
          }
          return <RegularPoint key={index} point={p} />;
        })}
      </ul>
    </div>
  );
};

function EmojiPoint({ point }: { point: string }) {
  const emojiPoint = parseEmojiPoint(point);
  const emoji = emojiPoint?.emoji;
  const text = emojiPoint?.text;
  //   console.log(emoji, text);
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function RegularPoint({ point }: { point: string }) {
  return (
    <div className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </div>
  );
}

export default ContentSection;
