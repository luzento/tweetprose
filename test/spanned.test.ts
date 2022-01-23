import { Spanned } from '../src/Spanned';

describe('spanned', () => {
  it('should find link', () => {
    expect(
      Spanned.parse(`foo https://example.org bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
  it('should find link', () => {
    expect(
      Spanned.parse(`foo example.org bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
  it('should find link', () => {
    expect(
      Spanned.parse(`foo example.co.uk bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
});
