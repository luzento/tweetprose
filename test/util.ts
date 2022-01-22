import { SplitOptions, splitProse } from '../src/index';
import { Spanned } from '../src/Spanned';

export function assertSplitProse(
  prose: string,
  options: SplitOptions,
  expectedLines: string[]
) {
  const lines = splitProse(prose, options);
  assertMaxLength(lines, options);
  expect(lines).toEqual(expectedLines);
}

export function assertMaxLength(lines: string[], options: SplitOptions) {
  for (const line of lines) {
    if (Spanned.parse(line, options).length > options.maxLength) {
      throw new Error(`line exceeds max length`);
    }
  }
}
