export const parseSection = (
  section: string
): { title: string; point: string[] } => {
  const [title, ...content] = section.split("\n");
  const clenaTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const point: string[] = [];
  let currentPoint = "";
  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("")) {
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
  // console.log(point);
  return {
    title: clenaTitle,
    point: point.filter(
      (point) => point && !point.startsWith("-") && !point.startsWith("#")
    ),
  };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  const isMainPoint = /^[A-Z]/.test(point);

  //   console.log("This is point", isEmpty, isMainPoint, hasEmoji, isNumbered);

  return {
    isNumbered,
    hasEmoji,
    isEmpty,
    isMainPoint,
  };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content
    .replace(/[•]\s*/, " ")
    .replace(/(\p{Emoji}+)/u, "\n$1")
    .trim();
  const matchs = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  //   console.log("This is mathces", matchs);
  if (!matchs) return null;
  const [_, emoji, text] = matchs;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}
