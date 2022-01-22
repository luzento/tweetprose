import { Spanned } from './Spanned';

export function splitProse(
  text: string,
  { maxLength = 280, countLinksAs = 23 }: Partial<SplitOptions> = {}
): string[] {
  const options = { maxLength, countLinksAs };
  const paragraphs = text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => Spanned.parse(p.trim(), options))
    .flatMap((p) =>
      p.length <= maxLength
        ? [p.toString()]
        : splitLongParagraph(p.toString(), options)
    );

  return paragraphs;
}

export function splitLongParagraph(
  paragraph: string,
  options: SplitOptions
): string[] {
  const sentences = paragraph
    .split(/(?<=[?.!]\s)/)
    .map((s) => Spanned.parse(s, options))
    .flatMap((s) =>
      s.length <= options.maxLength
        ? [s.toString()]
        : splitLongSentence(s.toString(), options)
    );
  const paragraphs = [''];
  for (const sentence of sentences) {
    if (
      paragraphs[paragraphs.length - 1].length + sentence.length >
      options.maxLength
    ) {
      paragraphs[paragraphs.length - 1] =
        paragraphs[paragraphs.length - 1].trim();
      paragraphs.push('');
    }
    paragraphs[paragraphs.length - 1] += sentence;
  }
  return paragraphs;
}

export function splitLongSentence(
  sentence: string,
  options: SplitOptions
): string[] {
  const words = sentence.split(/(?<=\s)/);

  const phrases = [''];
  for (let word of words) {
    // if the word fits on this line, put it on this line
    if (phrases[phrases.length - 1].length + word.length <= options.maxLength) {
      phrases[phrases.length - 1] += word;
    } else {
      while (word) {
        // if the word doesn't fit on this line but also doesn't fit on the next line, then use as much as you can here
        if (word.length > options.maxLength) {
          const useLength =
            options.maxLength - phrases[phrases.length - 1].length;
          phrases[phrases.length - 1] += word.substring(0, useLength);
          word = '...' + word.substring(useLength);
          phrases.push('');
        } else {
          // if the word doesn't fit on this line but does fit on the next line, use it there
          phrases.push(word);
          word = '';
        }
      }
    }
  }

  return phrases;
}

export type SplitOptions = {
  countLinksAs: number | 'actual';
  maxLength: number;
};
