export interface VocabularyItem {
  word: string
  definition: string
  exampleSentence: string
  hint: string
}

export const DEFAULT_ITEMS: VocabularyItem[] = [
  {
    word: 'abundant',
    definition: 'Existing in large quantities; more than enough.',
    exampleSentence: 'The garden had an abundant supply of fresh tomatoes.',
    hint: "Starts with 'a' \u00b7 8 letters",
  },
  {
    word: 'cautious',
    definition: 'Careful to avoid danger, risks, or mistakes.',
    exampleSentence: 'She was cautious before crossing the busy street.',
    hint: "Starts with 'c' \u00b7 8 letters",
  },
  {
    word: 'demolish',
    definition: 'To destroy a building or structure completely.',
    exampleSentence: 'The crew will demolish the old factory next week.',
    hint: "Starts with 'd' \u00b7 8 letters",
  },
  {
    word: 'enormous',
    definition: 'Extremely large in size or amount.',
    exampleSentence: 'An enormous whale swam past our boat.',
    hint: "Starts with 'e' \u00b7 8 letters",
  },
  {
    word: 'fortunate',
    definition: 'Lucky; having good things happen to you.',
    exampleSentence: 'We were fortunate to find a parking spot.',
    hint: "Starts with 'f' \u00b7 9 letters",
  },
  {
    word: 'generous',
    definition: 'Giving more of something than is usual or necessary.',
    exampleSentence: 'The generous baker gave us an extra cake.',
    hint: "Starts with 'g' \u00b7 8 letters",
  },
  {
    word: 'hesitate',
    definition: 'To pause before doing something because you are unsure.',
    exampleSentence: 'Do not hesitate to ask for help if you need it.',
    hint: "Starts with 'h' \u00b7 8 letters",
  },
  {
    word: 'imitate',
    definition: 'To copy the actions, words, or style of someone.',
    exampleSentence: 'The parrot learned to imitate my laugh.',
    hint: "Starts with 'i' \u00b7 7 letters",
  },
  {
    word: 'investigate',
    definition: 'To examine something carefully to find out the truth.',
    exampleSentence: 'The detective came to investigate the strange noise.',
    hint: "Starts with 'i' \u00b7 11 letters",
  },
  {
    word: 'magnificent',
    definition: 'Extremely beautiful, impressive, or grand.',
    exampleSentence: 'We saw a magnificent view from the mountain top.',
    hint: "Starts with 'm' \u00b7 11 letters",
  },
  {
    word: 'obstacle',
    definition: 'Something that blocks your way or makes progress hard.',
    exampleSentence: 'The fallen tree was an obstacle on the running track.',
    hint: "Starts with 'o' \u00b7 8 letters",
  },
  {
    word: 'persuade',
    definition: 'To make someone agree to do something by giving reasons.',
    exampleSentence: 'I tried to persuade my brother to watch the film with me.',
    hint: "Starts with 'p' \u00b7 8 letters",
  },
]