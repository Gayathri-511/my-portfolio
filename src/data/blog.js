const blog = [
  {
    slug: 'exploratory-testing-still-matters',
    title: 'Why exploratory testing still matters',
    date: '2026-03-02',
    tag: 'QA',
    excerpt:
      'Scripted test cases catch what you thought to write down. Exploratory testing catches what you didn\'t.',
    content: [
      'Scripted test cases are great at proving a feature does what the spec says. They are much weaker at finding the bugs nobody thought to write a case for — the empty search, the double-tap, the coupon applied twice.',
      'Exploratory testing treats the app like a real, slightly impatient user would: no fixed script, just a goal and a willingness to poke at the edges. It tends to surface exactly the kind of issue that scripted regression suites miss release after release.',
      'The two approaches aren\'t in competition. Scripted tests protect against known regressions; exploratory sessions are how you find the next class of bug before a user does.',
    ],
  },
  {
    slug: 'brds-engineers-actually-read',
    title: 'Writing BRDs that engineers actually read',
    date: '2026-02-14',
    tag: 'Business Analysis',
    excerpt:
      'A business requirements doc that nobody reads is worse than no doc at all — it creates false confidence.',
    content: [
      'A BRD\'s job is to get everyone — product, design, and engineering — aligned on the same problem before anyone writes a line of code. That only works if people actually read it.',
      'The BRDs that get read are short, lead with the user problem instead of the solution, and separate "must have" from "nice to have" explicitly. The ones that get skimmed and ignored bury the one important constraint on page four.',
      'When in doubt, a one-page AS-IS/TO-BE diagram does more work than three paragraphs of prose — engineers will look at the picture before they read the text.',
    ],
  },
  {
    slug: 'bugs-into-revenue-conversations',
    title: 'Turning bugs into revenue conversations',
    date: '2026-01-20',
    tag: 'Business Analysis',
    excerpt:
      '"The button is broken" gets deprioritized. "This is costing us checkouts" gets fixed this sprint.',
    content: [
      'Every bug report competes for the same limited engineering time. A ticket that says "the coupon field sometimes fails" is easy to deprioritize. A ticket that says "10% of checkout attempts silently fail here" is not.',
      'The difference isn\'t the bug — it\'s whether someone took the time to connect it to a number the business already cares about: conversion, retention, support ticket volume.',
      'This is the real value a QA or BA background adds beyond "found a bug": translating a defect into the language the roadmap is actually prioritized in.',
    ],
  },
];

export default blog;
