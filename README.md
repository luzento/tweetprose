# tweetprose

Create tweetable strings from prose (paragraphs, sentences, long words, urls, etc)

We try to keep sentences together if possible to fit within a tweet, otherwise split on a sentence boundary; if sentences are too long for a tweet, split on word boundary; if a word is too long then split the word, etc.

Urls count as 23 characters by default which matches how Twitter counts urls.

```typescript
import { splitProse } from 'tweetprose';

const tweets = splitProse(
  `
 first paragraph

second paragraph
`,
  {
    maxLength: 280, // number default: 280
    countUrlsAs: 23, // number,'actual' default: 23 ('actual' counts the actual length of the url)
  }
); // ['first paragraph', 'second paragraph']
```
