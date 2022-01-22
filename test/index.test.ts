import { assertSplitProse } from './util';

describe('tweetsplit', () => {
  it('splits paragraphs into tweets', () => {
    assertSplitProse(
      `
      first paragraph


second paragraph
    `,
      { maxLength: 20, countUrlsAs: 23 },
      ['first paragraph', 'second paragraph']
    );
  });

  it('splits long prose into tweets', () => {
    assertSplitProse(
      `It seems that the great buzzword that defines all things today is identity. And people are defining their identity in a way that has never been used before in all of history. It is confusing. And when things get confusing, we have to go back to the original purpose for which something was created. That is what we will be doing in our new series “Image is Everything.” 

For the full online experience, please join us at https://live.abcd.org during the service.

Fill out a connection card and more at https://ab.churchcenter.com.

CCLI Copyright License Info: Acct #1234567


#leadership #image #immeasurablymore #multiply #moments #movement #livestream #christianity #jesus #christian #god #bible #jesuschrist #faith #church #gospel #christ #prayer #holyspirit #pray #bibleverse #religion #hope #christians #truth #grace #amen #worship #scripture #blessed`,
      { maxLength: 280, countUrlsAs: 23 },
      [
        'It seems that the great buzzword that defines all things today is identity. And people are defining their identity in a way that has never been used before in all of history. It is confusing.',
        'And when things get confusing, we have to go back to the original purpose for which something was created. That is what we will be doing in our new series “Image is Everything.”',
        'For the full online experience, please join us at https://live.abcd.org during the service.',
        'Fill out a connection card and more at https://ab.churchcenter.com.',
        'CCLI Copyright License Info: Acct #1234567',
        '#leadership #image #immeasurablymore #multiply #moments #movement #livestream #christianity #jesus #christian #god #bible #jesuschrist #faith #church #gospel #christ #prayer #holyspirit #pray #bibleverse #religion #hope #christians #truth #grace #amen #worship #scripture #blessed',
      ]
    );
  });

  it('splits long prose into tweets', () => {
    assertSplitProse(
      `So glad you joined us for this morning’s live worship experience! Hop over to https://abcdefghijkl.online.church for the live conversation with other attendees. Our guest hosts are ready to pray with you and answer any questions.


ABCDE ABCDEFG Church is a community of people experiencing the gospel of Jesus while allowing it to transform their heart, home, & neighborhood. Introduce yourself in the chat and let us know where you're from! 👋 

Next Steps 💪

1. Say hi. 👋 https://abcdefghijkl.org/ab
2. Learn more about our ABCDE Track at https://abcdefghijkl.org/abcde
3. Download the ABCDE ABCDEFG Church App https://abcdefghijkl.org/abc`,
      { maxLength: 280, countUrlsAs: 23 },
      [
        'So glad you joined us for this morning’s live worship experience! Hop over to https://abcdefghijkl.online.church for the live conversation with other attendees. Our guest hosts are ready to pray with you and answer any questions.',
        "ABCDE ABCDEFG Church is a community of people experiencing the gospel of Jesus while allowing it to transform their heart, home, & neighborhood. Introduce yourself in the chat and let us know where you're from! 👋",
        `Next Steps 💪`,
        `1. Say hi. 👋 https://abcdefghijkl.org/ab
2. Learn more about our ABCDE Track at https://abcdefghijkl.org/abcde
3. Download the ABCDE ABCDEFG Church App https://abcdefghijkl.org/abc`,
      ]
    );
  });

  it('treats long links as short', () => {
    assertSplitProse(
      `Lorem ipsum dolor sit amet, sunt cillum excepteur https://example.org/Loremipsumdolorsitametsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiat ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat`,
      { maxLength: 280, countUrlsAs: 23 },
      [
        `Lorem ipsum dolor sit amet, sunt cillum excepteur https://example.org/Loremipsumdolorsitametsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiat ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat, ad laboris proident veniam minim cupidatat fugiat`,
      ]
    );
  });

  it('split long words', () => {
    assertSplitProse(
      `Lorem mipsumdolorsitametsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiatsuntcillumexcepteuradlaborisproidentveniamminimcupidatatfugiat`,
      { maxLength: 30, countUrlsAs: 23 },
      [
        'Lorem mipsumdolorsitametsuntci',
        '...llumexcepteuradlaborisproid',
        '...entveniamminimcupidatatfugi',
        '...atsuntcillumexcepteuradlabo',
        '...risproidentveniamminimcupid',
        '...atatfugiatsuntcillumexcepte',
        '...uradlaborisproidentveniammi',
        '...nimcupidatatfugiat',
      ]
    );
  });
});
