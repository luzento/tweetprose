import { Spanned } from '../src/Spanned';

describe('spanned', () => {
  it('should find https:// link', () => {
    expect(
      Spanned.parse(`foo https://example.org bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
  it('should find domain only link', () => {
    expect(
      Spanned.parse(`foo example.org bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
  it('should find subdomain links', () => {
    expect(
      Spanned.parse(`foo www2.example.co.uk bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
  it('should find link with path, query, fragment', () => {
    expect(
      Spanned.parse(`foo example.co.uk/foo/bar.html?uh=oh&_=123#anchor1 bar`, {
        maxLength: 280,
        countUrlsAs: 23,
      })
    ).toHaveLength(4 + 23 + 4);
  });
});
