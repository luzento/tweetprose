import { SplitOptions } from './index';

const urlRegex = /\w+\:\/\/[^ ]+/;

export class Spanned {
  static parse(value: string, options: SplitOptions) {
    const rawValue = value;

    const spans: Span[] = [];

    for (
      let match: RegExpMatchArray | null;
      (match = value.match(urlRegex));

    ) {
      const [matchedValue] = match;

      spans.push(
        {
          value: value.substring(0, match.index!),
          length: match.index!,
        },
        {
          value: matchedValue,
          length:
            options.countUrlsAs === 'actual'
              ? matchedValue.length
              : options.countUrlsAs,
        }
      );

      value = value.substring(match.index! + matchedValue.length);
    }

    spans.push({
      value: value,
      length: value.length,
    });

    return new Spanned(spans, rawValue);
  }

  length: number;

  constructor(public spans: Span[], public rawValue: string) {
    this.length = spans.reduce((agg, span) => agg + span.length, 0);
  }

  toString() {
    return this.rawValue;
  }
}

export type Span = {
  value: string;
  length: number;
};
