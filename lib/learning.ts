export type LearningModule = {
  id: string;
  title: string;
  description: string;
};

export type LearningLesson = {
  id: string;
  module_id: string;
  title: string;
};

export const FALLBACK_LEARNING_MODULES: LearningModule[] = [
  {
    id: "what-is-democracy",
    title: "What is Democracy?",
    description: "Understand the foundations of democratic governance",
  },
  {
    id: "voter-registration",
    title: "Voter Registration",
    description: "Step-by-step guide to registering as a voter",
  },
  {
    id: "how-elections-work",
    title: "How Elections Work",
    description: "From candidate nomination to result declaration",
  },
  {
    id: "the-evm-vvpat",
    title: "The EVM & VVPAT",
    description: "Understanding electronic voting machines",
  },
  {
    id: "your-voting-rights",
    title: "Your Voting Rights",
    description: "Rights and protections at the polling booth",
  },
  {
    id: "spotting-fake-news",
    title: "Spotting Fake News",
    description: "How to verify claims before sharing",
  },
  {
    id: "model-code-of-conduct",
    title: "Model Code of Conduct",
    description: "Rules governing elections and candidates",
  },
  {
    id: "after-the-vote-results",
    title: "After the Vote: Results",
    description: "How votes are counted and results certified",
  },
];

export const FALLBACK_LESSONS: Record<string, LearningLesson[]> = {
  "what-is-democracy": [
    { id: "democracy-basics", module_id: "what-is-democracy", title: "Democracy in simple words" },
    { id: "democracy-values", module_id: "what-is-democracy", title: "Why participation matters" },
  ],
  "voter-registration": [
    { id: "registration-checklist", module_id: "voter-registration", title: "Documents you need" },
    { id: "registration-status", module_id: "voter-registration", title: "How to check your voter status" },
  ],
  "how-elections-work": [
    { id: "election-phases", module_id: "how-elections-work", title: "Election phases explained" },
  ],
  "the-evm-vvpat": [
    { id: "evm-workflow", module_id: "the-evm-vvpat", title: "How voting works on an EVM" },
  ],
  "your-voting-rights": [
    { id: "rights-at-polling-booth", module_id: "your-voting-rights", title: "Your rights at the polling booth" },
  ],
  "spotting-fake-news": [
    { id: "fact-checking", module_id: "spotting-fake-news", title: "How to verify a claim" },
  ],
  "model-code-of-conduct": [
    { id: "mcc-rules", module_id: "model-code-of-conduct", title: "Election conduct rules" },
  ],
  "after-the-vote-results": [
    { id: "counting-process", module_id: "after-the-vote-results", title: "Counting and certification" },
  ],
};
