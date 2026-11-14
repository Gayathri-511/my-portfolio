/*
 * Case study content.
 *
 * Each section has a `heading` plus any combination of these blocks
 * (rendered in this order by pages/CaseStudy.jsx):
 *   body      string | string[]               paragraphs
 *   cards     [{ tag?, title, text }]          grid of small cards
 *   steps     [{ title, text }]                numbered process
 *   compare   { before: {title, items}, after: {title, items} }
 *   table     { headers: [], rows: [[]] }
 *   findings  [{ severity, area, title, text, impact }]
 *   stories   [{ as, want, so, criteria: [] }]
 *   metrics   [{ label, target }]
 *   list      string[]
 *   tags      string[]
 *   highlight true                             renders the section as a callout
 */

const caseStudies = {
  pantaloons: {
    slug: 'pantaloons',
    icon: 'bag',
    art: 'pantaloons',
    title: 'Pantaloons App',
    category: 'Beta Testing · Business Analysis',
    summary:
      'Exploratory QA and business analysis on the Pantaloons Android/iOS beta app, mapping the search-to-checkout journey and tying every usability gap back to conversion impact.',
    meta: [
      { label: 'Role', value: 'Business Analyst (Exploratory Testing)' },
      { label: 'Platform', value: 'Android & iOS beta build' },
      { label: 'Journey', value: 'Search → Wishlist → Cart → Checkout' },
      { label: 'Benchmarked against', value: 'Myntra, Ajio' },
    ],
    context:
      "Pantaloons' app is part of ABFRL's digital push, competing with higher-rated apps like Myntra and Ajio in a fashion e-commerce market where small UX issues translate directly into lost sales. This project evaluated the beta build's user journey to surface usability gaps affecting conversion and trust.",
    role: 'Acted as both tester and analyst across the Android/iOS beta build, focusing on the user journeys that tie directly to revenue: search through checkout. I ran the sessions, logged the defects, mapped AS-IS/TO-BE flows and turned the findings into prioritised recommendations.',
    highlights: [
      { value: '6', label: 'Journey areas audited end to end' },
      { value: '6', label: 'Gaps mapped to root cause & fix' },
      { value: '2', label: 'Competitor apps benchmarked' },
      { value: '6', label: 'Success metrics defined for re-test' },
    ],
    sections: [
      {
        heading: 'Business problem',
        body: [
          'Fashion e-commerce converts a small share of visitors, so friction in search, navigation or checkout has an outsized effect on revenue. The beta app was suspected of causing drop-offs in exactly those areas, with cart abandonment and slow interactions flagged internally as risks.',
          'In India especially, most shopping traffic is mobile, but mobile has historically converted at a much lower rate than desktop. That makes reliability issues on the app carry extra weight: every failed search or unresponsive tap is a shopper who can switch to a competitor in seconds.',
        ],
      },
      {
        heading: 'Objectives',
        cards: [
          { tag: 'Discovery', title: 'Reliable search & filters', text: 'Make search and filters consistently surface relevant products, including for vague or misspelled queries.' },
          { tag: 'Browsing', title: 'Consistent, fast UI', text: 'Fix UI inconsistencies so browsing feels fast and predictable across screen sizes and devices.' },
          { tag: 'Conversion', title: 'Robust cart & checkout', text: 'Make wishlist, cart and checkout dependable, the make-or-break moment in mobile shopping.' },
          { tag: 'Trust', title: 'Fewer silent failures', text: 'Reduce errors and missing feedback that cause drop-offs, lifting overall conversion.' },
        ],
      },
      {
        heading: 'Approach',
        body: 'Rather than working from a fixed script, I used a user-centred approach that treated the app the way a real, slightly impatient shopper would.',
        steps: [
          { title: 'Exploratory sessions', text: 'Time-boxed sessions simulating realistic shopping journeys, with notes captured on every point of friction, delay or confusion.' },
          { title: 'Scenario testing', text: 'Task-based scenarios such as "find ethnic wear under a budget" or "apply a coupon at checkout", judged on whether a shopper could finish the task.' },
          { title: 'Edge cases', text: 'Deliberately stressing the app: empty and misspelled searches, rapid scrolling, low-stock items, repeated taps and interrupted flows.' },
          { title: 'Competitive benchmarking', text: 'Running the same tasks on Myntra and Ajio, both known for strong search and filter UX, to set a realistic bar for the TO-BE experience.' },
          { title: 'Synthesis', text: 'Grouping defects by journey stage, mapping each to a root cause and a business metric, then prioritising by conversion impact.' },
        ],
      },
      {
        heading: 'Test scenarios',
        body: 'A sample of the scenarios run across the journey, and what each one surfaced.',
        table: {
          headers: ['Scenario', 'What I checked', 'What happened'],
          rows: [
            ['Find ethnic wear under a budget', 'Keyword search, price filter, result relevance', 'Results were often irrelevant or empty for common queries'],
            ['Misspelled / vague search', 'Auto-suggest, fuzzy matching, empty state', 'No helpful suggestions; dead-end empty results'],
            ['Browse a long listing quickly', 'Rapid scrolling, image loading, tap response', 'Layout shifts and delayed or unregistered taps'],
            ['Save an item for later', 'Wishlist save, confirmation, persistence', 'Saves sometimes failed silently with no confirmation'],
            ['Personalise the profile', 'Photo upload and removal', 'Upload failed or showed an unclear error'],
            ['Apply a coupon at checkout', 'Cart recalculation, offer validation', 'Totals lagged after changes; some valid coupons failed'],
          ],
        },
      },
      {
        heading: 'AS-IS vs TO-BE',
        compare: {
          before: {
            title: 'AS-IS: the current journey',
            items: [
              'Search & discovery: most keyword searches in testing returned poor or empty results',
              'Browsing & UI: layout shifted across screen sizes with inconsistent spacing',
              'Interaction: several elements failed to respond or lagged, with loading states appearing too often',
              'Wishlist: saves sometimes failed silently with no success confirmation',
              'Profile: photo upload didn’t work, or failed with an unclear error',
              'Checkout: cart totals didn’t update immediately and some coupons failed to apply',
            ],
          },
          after: {
            title: 'TO-BE: the target experience',
            items: [
              'Smarter keyword mapping and auto-suggestions, with results returned within ~2 seconds',
              'A consistent, responsive design system shared across Android and iOS',
              'Instant feedback on every tap: a confirmation or animation within ~200ms',
              'Wishlist and cart state that reliably persists and updates in real time',
              'Profile actions with clear validation, progress and retry options',
              'Checkout and offers that apply correctly, every time',
            ],
          },
        },
      },
      {
        heading: 'Gap analysis',
        table: {
          headers: ['Area', 'Current state', 'Root cause', 'Proposed fix'],
          rows: [
            ['Search', 'Irrelevant / empty results', 'Weak relevance algorithm', 'Improve keyword matching, synonyms & indexing'],
            ['UI consistency', 'Misaligned layouts across screens', 'No responsive design system', 'Adopt a unified design system with shared components'],
            ['Interaction', 'Tap delays, unresponsive elements', 'Performance & feedback gaps', 'Optimise performance, add loading states and UI hints'],
            ['Wishlist', 'Save fails intermittently', 'Unstable API / state management', 'Debug save API, confirm success state'],
            ['Profile', 'Photo upload/remove broken', 'Missing validation or flow', 'Fix upload flow, allow retry/cancel'],
            ['Checkout / offers', 'Cart not updating, coupon failures', 'Checkout logic gaps', 'Recalculate cart instantly, fix coupon logic'],
          ],
        },
      },
      {
        heading: 'Key findings',
        body: 'Each finding was rated by how close it sits to the purchase decision and how many shoppers it is likely to affect.',
        findings: [
          { severity: 'Critical', area: 'Checkout', title: 'Cart & checkout friction', text: 'Cart totals lagged after quantity changes and some valid discounts failed to apply.', impact: 'Hits the final, most valuable conversion step.' },
          { severity: 'High', area: 'Search', title: 'Search experience breakdown', text: 'A majority of keyword searches failed or returned irrelevant items.', impact: 'Shoppers who can’t find products can’t buy them.' },
          { severity: 'High', area: 'Interaction', title: 'Delayed & unregistered taps', text: 'A significant share of taps were delayed or ignored, especially while scrolling.', impact: 'Makes the app feel broken and widens the mobile conversion gap.' },
          { severity: 'Medium', area: 'Wishlist', title: 'Silent wishlist failures', text: 'Save actions sometimes errored with no visual confirmation either way.', impact: 'Undermines repeat visits and saved-for-later purchases.' },
          { severity: 'Medium', area: 'UI', title: 'Layout & typography drift', text: 'Inconsistent layouts and fonts across screen sizes.', impact: 'Reduces perceived polish and brand credibility.' },
          { severity: 'Low', area: 'Profile', title: 'Broken photo upload', text: 'Profile photo upload failed or showed an unclear error.', impact: 'Weakens personalisation and trust in the account area.' },
        ],
      },
      {
        heading: 'Recommendations',
        cards: [
          { tag: 'Now', title: 'Fix cart & coupon logic', text: 'Recalculate totals instantly on every change and correct coupon validation, verified with targeted regression tests.' },
          { tag: 'Now', title: 'Upgrade search relevance', text: 'Better keyword mapping, synonyms and auto-suggest, targeting sub-2-second responses and no dead-end empty states.' },
          { tag: 'Next', title: 'Instant tap feedback', text: 'Pre-load images, lazy-load listings and give immediate visual feedback on every tap.' },
          { tag: 'Next', title: 'Reliable wishlist sync', text: 'Stabilise the save API and always confirm success or failure, with A/B testing on any new behaviour.' },
          { tag: 'Later', title: 'Shared design system', text: 'Standardise components and test across multiple real devices and OS versions.' },
          { tag: 'Ongoing', title: 'Stronger QA coverage', text: 'Pair exploratory testing with scripted regression suites across varied devices and OS versions.' },
        ],
      },
      {
        heading: 'Success metrics',
        body: 'Each recommendation came with a measurable target so the fixes could be validated by re-testing, before and after.',
        metrics: [
          { label: 'Search response time', target: '< 2 seconds' },
          { label: 'Search success rate', target: 'Relevant results for common queries' },
          { label: 'Tap feedback', target: '< 200 ms' },
          { label: 'Wishlist save success', target: 'Confirmed on every save' },
          { label: 'Coupon application', target: 'Valid offers apply every time' },
          { label: 'Checkout conversion', target: 'Tracked pre- and post-fix' },
        ],
      },
      {
        heading: 'Outcome & learnings',
        highlight: true,
        body: [
          'Testing like a real shopper, not a developer running through a checklist, surfaced issues that scripted tests missed entirely. The exercise reinforced that small bugs compound in retail: a missing total, a half-second delay or a silent failure can undo the impact of significant marketing spend.',
          'Every issue found was tied back to a business metric (conversion, drop-off, retention), and working closely with design and engineering to map the AS-IS/TO-BE flows turned vague complaints into concrete, prioritised requirements.',
        ],
      },
    ],
  },

  easemytrip: {
    slug: 'easemytrip',
    icon: 'plane',
    art: 'easemytrip',
    title: 'EaseMyTrip',
    category: 'Business Analyst · Defect Analysis',
    summary:
      'A business-analyst case study on the flight and hotel booking flow, focused on how booking failures and pricing mismatches translate directly into lost revenue and lost trust.',
    meta: [
      { label: 'Role', value: 'Business Analyst' },
      { label: 'Platform', value: 'Mobile & desktop web' },
      { label: 'Modules', value: 'Flights, Hotels, Payments, Account' },
      { label: 'Tools', value: 'Manual test logs, Excel defect tracking' },
    ],
    context:
      'EaseMyTrip is a major Indian travel booking platform covering flights, hotels and packages. In a category where booking abandonment is already high, even minor issues in the booking flow, such as delays, mismatched pricing or poor real-time sync, compound quickly into lost revenue.',
    role: 'Ran exploratory testing across mobile and desktop, then translated findings into structured business documentation (BRD, FRD and user stories) for product, engineering and QA stakeholders.',
    highlights: [
      { value: '4', label: 'Modules covered end to end' },
      { value: '2', label: 'Platforms: mobile & desktop' },
      { value: '4', label: 'Stakeholder groups aligned' },
      { value: '3', label: 'Business documents delivered' },
    ],
    sections: [
      {
        heading: 'Business problem',
        body: [
          'Booking failures, pricing inconsistencies and poor real-time sync were the key risks identified in the flight and hotel booking flow. In travel, a shopper who sees one price on the results page and another at payment rarely gives the platform a second chance.',
          'The impact wasn’t limited to one team. Product, engineering, QA and customer support were all affected by the same underlying reliability gaps, from lost bookings to a heavier support load.',
        ],
      },
      {
        heading: 'Stakeholders',
        cards: [
          { tag: 'Product', title: 'Booking success rate', text: 'Needed a clear picture of where and why bookings were abandoned or failed.' },
          { tag: 'Engineering', title: 'Root causes & priorities', text: 'Needed reproducible defects tied to specific APIs and steps, ranked by impact.' },
          { tag: 'QA', title: 'Coverage gaps', text: 'Needed edge cases and validation rules folded into future regression suites.' },
          { tag: 'Support', title: 'Fewer escalations', text: 'Absorbed the cost of failed bookings and price disputes through tickets and calls.' },
        ],
      },
      {
        heading: 'Scope & requirement gathering',
        body: 'Exploratory testing was run across both mobile and desktop, covering functional, usability and edge-case scenarios in four modules.',
        cards: [
          { title: 'Flight booking', text: 'Search, fare selection, traveller details and seat/add-on steps.' },
          { title: 'Hotel reservation', text: 'Search, room selection, availability and pricing consistency.' },
          { title: 'Payment', text: 'Payment methods, failures, retries and booking confirmation.' },
          { title: 'Account', text: 'Sign-in, saved travellers and booking history.' },
        ],
      },
      {
        heading: 'Approach',
        steps: [
          { title: 'Map the booking journey', text: 'Documented the AS-IS path, Search → Select → Payment → Booking, on both mobile and desktop.' },
          { title: 'Explore & stress edge cases', text: 'Changed dates and passengers mid-flow, went back and forward between steps, and interrupted payments to see how state held up.' },
          { title: 'Log & classify defects', text: 'Recorded each issue in manual test logs and an Excel defect tracker with steps, environment and business impact.' },
          { title: 'Analyse gaps', text: 'Grouped defects into system-level causes (API sync, pricing validation, retry handling) instead of isolated tickets.' },
          { title: 'Document requirements', text: 'Turned the analysis into a BRD, an FRD and user stories that product and engineering could act on.' },
        ],
      },
      {
        heading: 'AS-IS → TO-BE',
        compare: {
          before: {
            title: 'AS-IS',
            items: [
              'Search → Select → Payment → Booking, with recurring delays along the way',
              'Prices that didn’t always match between selection and payment',
              'Availability and pricing not reliably synced in real time',
              'Failed steps that left users without a clear way to retry',
            ],
          },
          after: {
            title: 'TO-BE',
            items: [
              'Real-time pricing accuracy from search to confirmation',
              'Instant booking confirmation once payment succeeds',
              'Validated price and availability before the user pays',
              'Graceful retry for failed steps without losing entered details',
            ],
          },
        },
      },
      {
        heading: 'Key findings',
        findings: [
          { severity: 'Critical', area: 'Pricing', title: 'Price mismatches in the flow', text: 'Fares and room prices didn’t always match between selection and payment.', impact: 'Directly erodes trust and causes abandonment at the last step.' },
          { severity: 'High', area: 'Sync', title: 'Weak real-time sync', text: 'Availability and pricing weren’t consistently refreshed against live inventory.', impact: 'Users select options that may no longer be valid.' },
          { severity: 'High', area: 'Payments', title: 'No clear retry path', text: 'When a step failed, there was no reliable mechanism to retry without starting over.', impact: 'Turns a recoverable error into a lost booking.' },
          { severity: 'Medium', area: 'Performance', title: 'Recurring delays', text: 'Noticeable waits between search, selection and payment steps.', impact: 'Adds friction in a category with already high abandonment.' },
        ],
      },
      {
        heading: 'Documentation delivered',
        cards: [
          { tag: 'BRD', title: 'Business requirements', text: 'Focused on improving booking success rate, with the business case for each fix.' },
          { tag: 'FRD', title: 'Functional requirements', text: 'Specified real-time price and availability validation and retry behaviour.' },
          { tag: 'Stories', title: 'User stories', text: 'Described a smooth, trustworthy booking experience in terms engineering could estimate.' },
        ],
      },
      {
        heading: 'Sample user stories',
        stories: [
          {
            as: 'traveller booking a flight',
            want: 'the fare I selected to be the fare I pay',
            so: 'I can trust the price shown and book without second-guessing',
            criteria: [
              'Price is re-validated against live inventory before payment',
              'Any change is shown clearly, with the option to accept or go back',
            ],
          },
          {
            as: 'traveller whose payment failed',
            want: 'to retry without re-entering my details',
            so: 'a temporary error doesn’t cost me the booking',
            criteria: [
              'Traveller and selection details are preserved after a failure',
              'The user sees a clear status and a single retry action',
            ],
          },
        ],
      },
      {
        heading: 'Method & tools',
        body: 'Exploratory testing and edge-case validation, grounded in business-focused analysis rather than pure functional QA. Findings were tracked and reported using manual testing logs and Excel-based defect tracking.',
        tags: ['Exploratory testing', 'Edge-case validation', 'Gap analysis', 'BRD / FRD', 'User stories', 'Excel defect tracking'],
      },
      {
        heading: 'Challenges & learnings',
        highlight: true,
        body: [
          'Working without backend access made some issues harder to root-cause, and API dependencies limited how far certain fixes could be validated independently.',
          'The core takeaway: in travel booking, bugs are never just bugs. A failed booking is lost revenue and lost trust, which is why fixes need to be prioritised with system-level thinking rather than treated as isolated tickets.',
        ],
      },
    ],
  },
  'sop-assistant': {
    slug: 'sop-assistant',
    kind: 'playground',
    art: 'sop',
    title: 'SOP Assistant',
    category: 'Internal tool · Search & AI',
    summary:
      'A self-contained assistant that sits on top of the content QC tool and answers SOP questions in plain language, with the right ticket routing, tables and reference images, without leaving the page.',
    demoUrl: '/playground/sop-assistant.html',
    meta: [
      { label: 'Type', value: 'Side project · internal tool' },
      { label: 'Runs as', value: 'Browser userscript' },
      { label: 'Search', value: 'Client-side, no backend' },
      { label: 'Summaries', value: 'LLM via serverless proxy' },
    ],
    context:
      'QC analysts follow a long SOP, more than 70 sections covering offers, metadata, artwork, audio, video and subtitles. Finding the right rule meant leaving the title being reviewed, opening the document and scrolling for the right section and ticket routing.',
    role: 'Designed and built it end to end: the in-page panel, the search and ranking, answer formatting, and a small serverless proxy for AI summaries.',
    highlights: [
      { value: '71', label: 'SOP sections indexed in the original' },
      { value: '0', label: 'Servers needed for search' },
      { value: '1', label: 'File to install' },
      { value: '<1s', label: 'Typeahead suggestions while typing' },
    ],
    sections: [
      {
        heading: 'What it does',
        cards: [
          { tag: 'Ask', title: 'Plain-language search', text: 'Type a question like “subtitle out of sync” and get typeahead suggestions from SOP headings as you type.' },
          { tag: 'Answer', title: 'Summarised answer', text: 'A short summary, key information and the important rules and exceptions, pulled from the matching SOP sections.' },
          { tag: 'Act', title: 'Ticket routing', text: 'The correct ticket category, type and item for the issue, plus any tables and reference images.' },
        ],
      },
      {
        heading: 'How search works',
        steps: [
          { title: 'Index', text: 'SOP sections are split into chunks and indexed by title, headings, keywords, rules, notes and tables when the panel loads.' },
          { title: 'Title-first match', text: 'Queries are normalised (abbreviations, synonyms, stemming) and matched against section titles first.' },
          { title: 'Hybrid ranking', text: 'Chunks are scored with BM25 and cosine similarity, plus fuzzy matching for typos and boosts for headings and keywords.' },
          { title: 'Confidence check', text: 'If the match is weak, it shows the closest topics instead of guessing.' },
        ],
      },
      {
        heading: 'About this demo',
        highlight: true,
        body: [
          'The demo runs the same assistant code with dummy SOP content written for a fictional streaming catalog. Every team, tool and rule in it is made up.',
          'In the original, summaries come from an LLM behind a token-protected proxy. Here they are generated locally from the matching sections, so nothing leaves your browser.',
        ],
      },
    ],
  },
};

export default caseStudies;
