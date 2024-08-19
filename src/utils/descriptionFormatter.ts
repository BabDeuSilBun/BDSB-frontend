export const limitWordsPerLine = (
  text: string,
  wordsPerLine: number,
): string => {
  const words = text.split(' ');
  let result = '';
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length <= wordsPerLine) {
      currentLine += `${word} `;
    } else {
      result += `${currentLine.trim()}<br />`;
      currentLine = `${word} `;
    }
  });

  result += currentLine.trim();
  return result;
};
