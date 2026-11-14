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
 *   bars      { caption, items: [{ label, value }] }   horizontal bar chart
 *   scope     { in: [], out: [] }             in-scope / out-of-scope columns
 *   journey   [{ stage, asIs, toBe }]         AS-IS → TO-BE journey map
 *   note      { title, text }                 callout box
 *   refs      [{ label, url }]                numbered references
 *   highlight true                             renders the section as a callout
 *
 * Study-level `disclaimer` renders a methodology note under the hero.
 */

const caseStudies = {
  pantaloons: {
    slug: 'pantaloons',
    icon: 'bag',
    art: 'pantaloons',
    title: 'Pantaloons App',
    category: 'Business Analysis · Fashion E-commerce',
    summary:
      'Diagnosing conversion and trust gaps in the mobile shopping journey: an independent UX and conversion analysis using public app store data, verified user feedback and e-commerce industry benchmarks.',
    meta: [
      { label: 'Prepared', value: 'Aug 2026' },
      { label: 'Role', value: 'Business Analyst' },
      { label: 'Domain', value: 'Fashion E-commerce' },
      { label: 'Scope', value: 'Android & iOS app' },
    ],
    disclaimer:
      'Independent, self-directed portfolio case study. Not commissioned by Aditya Birla Fashion and Retail Limited (ABFRL) or Pantaloons, and no proprietary or internal data was used. Every figure comes from public sources (Play Store, App Store, Trustpilot, ABFRL investor disclosures and industry research); modelled estimates are labelled as such.',
    context:
      'Pantaloons is a value fashion retailer owned by ABFRL, with an app of 10M+ downloads and a 4.6★ Play Store rating on 63,000 reviews. The segment is growing (+18.5% YoY in Q4 FY26) and ABFRL’s e-commerce channel grew 30%+ YoY. The headline rating looks healthy, but recent reviews describe the same handful of checkout and post-purchase failures again and again.',
    role: 'Written from the perspective of a Senior Business Analyst scoping an improvement initiative before formal engagement: building a credible, evidence-backed business case from public information, competitor benchmarks and customer feedback, ahead of access to internal analytics or support data.',
    highlights: [
      { value: '10M+', label: 'App downloads (Play Store, Jul 2026)' },
      { value: '4.6★', label: 'Play Store rating on 63K reviews' },
      { value: '+18.5%', label: 'Pantaloons revenue YoY, Q4 FY26' },
      { value: '~80%', label: 'Mobile cart abandonment benchmark' },
    ],
    sections: [
      {
        heading: 'Executive summary',
        body: [
          'Recent reviews (June and July 2026) repeatedly describe the same problems: payment attempts that fail and have to be retried, cart items and saved card details disappearing overnight, addresses silently reverting to an old value and breaking delivery, and return requests rejected or reopened several times before resolving.',
          'These are not vague complaints about “the interface”. They are specific, repeatable checkout and post-purchase failures, in exactly the part of the funnel where e-commerce benchmarks say most revenue is already lost: mobile cart abandonment runs around 80% against roughly 66% on desktop, and mobile fashion conversion trails desktop by close to two percentage points.',
          'This case study applies a structured BA process (AS-IS mapping, gap analysis and a transparent opportunity model) to that evidence. It doesn’t claim internal analytics or a formal usability test; it shows how a BA structures and defends an improvement case using only what is publicly verifiable.',
        ],
        note: {
          title: 'Bottom line',
          text: 'None of this shows up in the star rating, because a 4.6 average is an aggregate across 63,000 reviews going back years. The specific, recent and repeatable nature of these complaints is the real signal, and it points at checkout and post-purchase reliability, not app polish, as the highest-leverage place to invest.',
        },
      },
      {
        heading: 'Key findings at a glance',
        findings: [
          { area: 'Payment reliability', title: 'Failed payments wipe the cart', text: 'Multiple June–July 2026 reviews describe repeated failed payment attempts and disappearing cart and saved-card data.', impact: 'Checkout is the final, highest-value step; failures here are pure lost revenue, not just friction.' },
          { area: 'Address & delivery', title: 'Addresses change on their own', text: 'A July 2026 review documents a saved address silently changing and causing repeated missed deliveries.', impact: 'Undermines trust in the app’s basic data integrity, a precondition for repeat purchase.' },
          { area: 'Returns & refunds', title: 'Returns rejected, refunds as credit', text: 'Trustpilot and App Store reviews describe returns rejected on quality-check grounds, refunds issued as store credit, and repeated re-submission.', impact: 'A broken return path raises the perceived risk of every future purchase.' },
          { area: 'Promotional integrity', title: 'Advertised discount doesn’t apply', text: 'A July 2026 review reports the advertised 10% first-order discount not applying at checkout, with no support response for days.', impact: 'Directly damages the discount mechanic the App Store listing itself promotes.' },
        ],
      },
      {
        heading: 'Business context',
        body: 'Pantaloons sits within ABFRL alongside Ethnic wear, Luxury retail and TMRW, ABFRL’s digital-first brand portfolio. FY26 results show Pantaloons as a genuine growth driver within the group.',
        table: {
          headers: ['Metric', 'Value', 'Period'],
          rows: [
            ['Pantaloons segment revenue', 'Rs 4,560.49 crore', 'Full year FY26'],
            ['Pantaloons revenue growth', '+18.5% YoY', 'Q4 FY26'],
            ['ABFRL consolidated revenue', 'Rs 8,176.92 crore (+11% YoY)', 'Full year FY26'],
            ['ABFRL e-commerce channel growth', '30%+ YoY', 'Full year FY26'],
            ['Pantaloons app downloads', '10M+', 'Jul 2026, Play Store'],
            ['Pantaloons app rating', '4.6 / 5 (63K reviews)', 'Aug 2026, Play Store'],
          ],
        },
        note: {
          title: 'Verifying before presenting',
          text: 'An earlier draft cited “over 45% of sales from digital channels”. Current public reporting doesn’t support that: a Q2 FY26 disclosure put e-commerce at “more than 15% of the business”. A BA’s first responsibility before presenting a number is verifying it against a primary source, so this study uses the verified figure.',
        },
      },
      {
        heading: 'Competitive landscape',
        body: 'Pantaloons competes most directly with Myntra and Ajio. All three ratings were pulled from live Play Store listings on the same day.',
        table: {
          headers: ['App', 'Rating', 'Reviews', 'Downloads', 'Recent update notes'],
          rows: [
            ['Pantaloons', '4.6', '63K', '10M+', '“Improved customer experience, performance enhancements” (Jul 2026)'],
            ['Myntra', '4.6', '5.65M', '100M+', 'New features: M-Now 30-minute delivery, creator affiliate program (Jul 2026)'],
            ['Ajio', '4.4', '6.07M', '100M+', '“Fixed issues with refunds, homepage navigation… reduced crashes” (2026)'],
          ],
        },
        list: [
          'Pantaloons’ rating isn’t behind its peers: the gap this study addresses isn’t visible in the headline number.',
          'Ajio’s own release notes admit fixing refunds and crashes, so reliability is a category-wide battleground. The framing for stakeholders is “closing specific, evidenced gaps is a competitive lever”, not “our app is uniquely broken”.',
        ],
      },
      {
        heading: 'What the reviews actually say',
        body: 'Recent reviews were sampled across Google Play, the Apple App Store and Trustpilot. Six recurring themes emerged. This is a qualitative read of a sample, not a statistical audit of all 63,000 reviews.',
        bars: {
          caption: 'Recurring themes in recent Pantaloons app reviews (relative frequency in the sample, not a full census)',
          items: [
            { label: 'Returns / refund friction', value: 6 },
            { label: 'Payment / checkout failures', value: 5 },
            { label: 'Order tracking & delivery issues', value: 5 },
            { label: 'App performance (slow, stuck, crashes)', value: 4 },
            { label: 'Customer service responsiveness', value: 4 },
            { label: 'Account / login issues', value: 3 },
          ],
        },
        cards: [
          { tag: 'Payment', title: 'Cart and card wiped', text: 'A reviewer tried paying seven or eight times without success, then found the next morning that the cart and saved card details had been wiped.' },
          { tag: 'Address', title: 'Address changed itself', text: 'A correctly entered delivery address changed on its own, so the delivery agent couldn’t find the customer and the order was delayed.' },
          { tag: 'Returns', title: 'Rejected three times', text: 'A return request failed twice and was rejected a third time on a quality-check basis, with repeated unresolved calls.' },
          { tag: 'Promotions', title: 'Discount not applied', text: 'The first-order discount shown before signup didn’t apply at checkout, and support didn’t respond for several days.' },
          { tag: 'Refunds', title: 'Store credit by default', text: 'Trustpilot reviewers describe refunds issued as store credit rather than to the original payment method.' },
          { tag: 'Reliability', title: '“Slow and buggy”', text: 'A third-party analytics summary independently describes the app as slow and buggy, including during checkout.' },
        ],
      },
      {
        heading: 'Why this matters',
        body: 'These failure modes map directly onto checkout completion and mobile reliability, the parts of the funnel e-commerce research consistently identifies as the highest-leakage. A benchmark says mobile underperforms desktop by design; the review evidence suggests Pantaloons has additional, fixable execution-level problems layered on top of that baseline gap.',
        note: {
          title: 'Urgent, not cosmetic',
          text: 'Roughly 77% of Indian e-commerce shopping happens on mobile. A business this mobile-weighted can’t treat mobile reliability as a polish item; it sits on the path of most of its transaction volume.',
        },
      },
      {
        heading: 'Objectives',
        steps: [
          { title: 'Eliminate silent payment and cart data loss', text: 'No user should lose cart contents or saved payment methods without an explicit, visible action of their own.' },
          { title: 'Guarantee address and order data integrity', text: 'A saved address never changes without the user’s direct edit; delivery data in-app matches what is dispatched.' },
          { title: 'Reduce return and refund friction', text: 'Fewer attempts to reach a resolution, and refunds to the original payment method by default unless the customer opts into store credit.' },
          { title: 'Restore trust in promotions', text: 'Any discount shown must apply correctly at checkout, with a clear in-app explanation when it doesn’t.' },
          { title: 'Close the gap with category benchmarks', text: 'Track checkout completion and return resolution time against Myntra and Ajio, not only Pantaloons’ own history.' },
        ],
      },
      {
        heading: 'Scope & methodology',
        scope: {
          in: [
            'Mobile app: search, browse, cart, checkout, account, returns',
            'Public review and app store data (Play Store, App Store, Trustpilot)',
            'Publicly reported financial and business performance',
            'Competitive benchmarking against Myntra and Ajio',
          ],
          out: [
            'Physical store experience and in-store staff conduct',
            'Internal ABFRL systems, analytics or proprietary data',
            'Confidential forecasts or unpublished figures',
            'Full audit of every competitor in the category',
          ],
        },
        list: [
          'Public data collection from Play Store, App Store and Trustpilot for Pantaloons, Myntra and Ajio',
          'Financial verification against ABFRL disclosures, cross-checked across at least two independent sources per figure',
          'Industry benchmarking using Baymard Institute cart abandonment research and 2026 conversion benchmarks',
          'Thematic review analysis by hand, prioritising specific, repeatable failures over generic sentiment',
          'Structured BA artefacts: AS-IS/TO-BE journey maps, gap analysis and a transparent opportunity model',
        ],
        note: {
          title: 'A note on evidence quality',
          text: 'Public reviews skew toward strong, usually negative reactions. A production engagement would triangulate with session analytics, support tickets and user interviews. The conclusions here are treated as a strong enough signal to justify investigation and prioritised fixes, not a statistically validated root cause.',
        },
      },
      {
        heading: 'AS-IS → TO-BE journey',
        body: 'Each reported friction point is mapped to a journey stage, with a target state that answers it directly. Every AS-IS issue comes from a cited review.',
        journey: [
          { stage: 'Search / Discovery', asIs: 'Relevance and speed concerns in reviews', toBe: 'Faster, more relevant results; auto-suggestions' },
          { stage: 'Product Browse', asIs: 'Layout and consistency feedback across screen sizes', toBe: 'Consistent design system across Android and iOS' },
          { stage: 'Add to Cart / Wishlist', asIs: 'Save actions reported as unreliable', toBe: 'Instant save confirmation, reliable sync' },
          { stage: 'Login / Account', asIs: 'Login friction after number or email changes', toBe: 'Flexible identity verification for changed details' },
          { stage: 'Checkout & Payment', asIs: 'Payment failures reported, retried many times', toBe: 'Idempotent payment retries; clear failure messaging' },
          { stage: 'Post-Purchase (Returns)', asIs: 'Return requests rejected or reopened repeatedly', toBe: 'Transparent return tracking, fewer manual re-tries' },
        ],
        note: {
          title: 'Reading the map',
          text: 'Search and browse show comparatively little specific negative evidence; the sharp, repeatable complaints cluster from Add to Cart onward. The “tried seven or eight times, then everything vanished” pattern is a classic symptom of a non-idempotent checkout, where a retry corrupts session state. Naming it precisely, instead of “checkout is buggy”, is the translation a BA owes engineering.',
        },
      },
      {
        heading: 'Gap analysis',
        table: {
          headers: ['Area', 'Current state', 'Desired state', 'Gap', 'Recommended action'],
          rows: [
            ['Payment / checkout', 'Repeated failures; cart and saved card lost after failed attempts', 'Payments safely retryable; cart persists regardless of outcome', 'No retry safeguard or session persistence on failure', 'Audit gateway integration for idempotency; separate cart persistence from payment session'],
            ['Address / delivery', 'Saved address changes without user action', 'Address changes only through explicit edit, with a change log', 'No audit trail or edit confirmation', 'Add confirmation step and change history; investigate root cause'],
            ['Returns / refunds', 'Returns rejected or reopened; refunds default to store credit', 'Trackable return status; refund to original method by default', 'Opaque rejections; no status tracking', 'Add return-status tracker; make store credit opt-in'],
            ['Promotions', 'First-order discount not applying; unresolved by support', 'Displayed offers always apply, or the app explains why not', 'No error messaging when a coupon silently fails', 'Validate and message at the coupon-entry step'],
            ['Support', 'Multi-day gaps on payment and coupon issues', 'Acknowledged within a defined SLA', 'No response-time commitment surfaced', 'Publish an SLA; route app-tagged tickets separately'],
          ],
        },
      },
      {
        heading: 'Opportunity sizing',
        note: {
          position: 'top',
          title: 'Model, not a magic number',
          text: 'An earlier draft stated a revenue impact without showing how it was derived. This section shows the model instead, with placeholder inputs where real data isn’t public, so any stakeholder can challenge a single row instead of an opaque total.',
        },
        table: {
          headers: ['Step', 'Illustrative input', 'Basis'],
          rows: [
            ['1. Monthly checkout sessions', '100,000', 'Hypothetical; real figure would come from internal analytics'],
            ['2. Current mobile cart abandonment', '~80%', 'Industry benchmark'],
            ['3. Modelled recovery from fixes', '5 percentage points (to ~75%)', 'Deliberately conservative, stated assumption'],
            ['4. Additional completed orders / month', '5,000', '100,000 × 5 pp'],
            ['5. Illustrative AOV', 'Rs 1,500', 'Round placeholder; real AOV not public'],
            ['Illustrative monthly revenue', 'Rs 75 lakh', '5,000 × Rs 1,500 (illustrative only)'],
          ],
        },
        after: 'This demonstrates method, not Pantaloons’ actual opportunity. Every input should be replaced with a real, sourced figure before it’s presented as a business case.',
      },
      {
        heading: 'Recommendations (MoSCoW)',
        cards: [
          { tag: 'Must have', title: 'Fix payment retry handling', text: 'Failed attempts never clear the cart or saved payment data. Tied to the most severe, most repeated complaint.' },
          { tag: 'Must have', title: 'Audit trail for address changes', text: 'Explicit confirmation and change history. A silent data-integrity failure undermines trust in every other fix.' },
          { tag: 'Should have', title: 'Original-method refunds + return tracking', text: 'High complaint frequency and directly actionable without a platform change.' },
          { tag: 'Should have', title: 'Clear coupon validation', text: 'Message clearly when a coupon fails to apply. Cheap to build relative to its trust impact.' },
          { tag: 'Could have', title: 'Published support SLA', text: 'Valuable, but depends on the support operating model, not only the app.' },
          { tag: 'Won’t have', title: 'Full redesign or re-platform', text: 'Evidence points to specific, fixable defects; a redesign would be disproportionate to the diagnosed problem.' },
        ],
      },
      {
        heading: 'Success metrics',
        metrics: [
          { label: 'Repeat payment attempts', target: 'Fewer per completed order' },
          { label: 'Return submission attempts', target: 'Fewer per resolved return' },
          { label: 'Refunds to original method', target: 'Higher share vs store credit' },
          { label: 'Negative review mentions', target: 'Fewer “payment”, “address”, “return”' },
        ],
      },
      {
        heading: 'Sample user stories',
        stories: [
          {
            as: 'shopper whose payment attempt fails',
            want: 'my cart contents and saved payment method to remain intact',
            so: 'I don’t have to rebuild my order from scratch to try again',
            criteria: [
              'Given a payment attempt fails for any reason, when I return to the cart, then all items and my saved payment method are still present',
              'Given a payment attempt fails, when I retry with the same method, then it is treated as a new attempt without duplicate-charge risk',
            ],
          },
          {
            as: 'shopper',
            want: 'to be notified immediately if my saved delivery address changes',
            so: 'I can correct it before an order ships to the wrong place',
            criteria: [
              'Given a saved address is modified by any process, when the change is saved, then I get an in-app and email notification showing exactly what changed',
              'Given I open account settings, when I view address history, then I see prior changes with timestamps',
            ],
          },
        ],
      },
      {
        heading: 'Honest limitations',
        list: [
          'Review mining is a real but biased source: it skews toward strong negative reactions and can’t be weighted for representativeness.',
          'No internal Pantaloons data, analytics or system access was used; all figures come from public disclosures and third-party research.',
          'The opportunity sizing is a demonstration of method, not a validated forecast.',
          'Not commissioned by ABFRL or Pantaloons; it doesn’t represent their internal view.',
        ],
      },
      {
        heading: 'Outcome & learnings',
        highlight: true,
        body: [
          'This exercise practises a realistic BA skill: building a credible, evidence-backed improvement case before internal access, the position a BA is often in during the first weeks of an engagement or when pitching discovery to a sceptical stakeholder. The output is an AS-IS to TO-BE analysis, a gap table and a transparent opportunity model, all traceable to checkable sources.',
          'With real access, the next step would be replacing every illustrative figure with real checkout volume, abandonment segmented by failure reason and actual AOV, and validating the journey map against session recordings and funnel analytics.',
        ],
      },
      {
        heading: 'References',
        refs: [
          { label: 'Google Play: Pantaloons app listing and user reviews', url: 'https://play.google.com/store/apps/details?id=com.pantaloons' },
          { label: 'Storyboard18: ABFRL Q4 FY26 results', url: 'https://www.storyboard18.com' },
          { label: 'Trustpilot: Pantaloons reviews', url: 'https://www.trustpilot.com/review/pantaloons.com' },
          { label: 'Finsi: E-commerce Benchmarks 2026 (Baymard Institute data)', url: 'https://finsi.ai/ecommerce-benchmarks' },
          { label: 'SQ Magazine: E-commerce Conversion Rate Statistics 2026', url: 'https://sqmagazine.co.uk/e-commerce-conversion-rate-statistics' },
          { label: 'Apple App Store: Pantaloons app reviews', url: 'https://apps.apple.com' },
          { label: 'ScanX: ABFRL Q2 FY26 coverage', url: 'https://scanx.trade' },
          { label: 'Google Play: Myntra app listing', url: 'https://play.google.com/store/apps/details?id=com.myntra.android' },
          { label: 'Google Play: AJIO app listing', url: 'https://play.google.com/store/apps/details?id=com.ril.ajio' },
          { label: 'Chrome-Stats: Pantaloons app summary', url: 'https://chrome-stats.com/d/com.pantaloons' },
          { label: 'Mordor Intelligence: India E-Commerce Market report', url: 'https://www.mordorintelligence.com/industry-reports/india-ecommerce-market' },
        ],
      },
    ],
  },

  easemytrip: {
    slug: 'easemytrip',
    icon: 'plane',
    art: 'easemytrip',
    title: 'EaseMyTrip',
    category: 'Business Analysis · Online Travel',
    summary:
      'Diagnosing price trust and booking reliability gaps: an independent booking-funnel analysis using public app store data, verified user feedback and travel industry benchmarks.',
    meta: [
      { label: 'Prepared', value: 'Aug 2026' },
      { label: 'Role', value: 'Business Analyst' },
      { label: 'Domain', value: 'Online Travel (OTA)' },
      { label: 'Scope', value: 'Android & iOS app' },
    ],
    disclaimer:
      'Independent, self-directed portfolio case study. Not commissioned by Easy Trip Planners Limited (EaseMyTrip), and no proprietary or internal data was used. Every figure comes from public sources (Play Store, App Store, Trustpilot, PissedConsumer, stock exchange disclosures and travel industry research); modelled estimates are labelled as such.',
    context:
      'EaseMyTrip is one of India’s largest listed online travel agencies, with an app of 10M+ downloads and a 4.2★ rating on about 114,000 reviews. It reported Rs 8,376 crore Gross Booking Revenue in FY26 with three consecutive quarters of revenue growth, yet swung to a full-year net loss of about Rs 47.6 crore, partly due to a Rs 50 crore+ provision tied to an airline operator.',
    role: 'Written from the perspective of a Senior Business Analyst scoping an improvement initiative before formal engagement, working from public information, competitor benchmarks and customer feedback to build a credible business case ahead of internal system access.',
    highlights: [
      { value: '10M+', label: 'App downloads (Play Store)' },
      { value: '4.2★', label: 'Play Store rating on 114K reviews' },
      { value: '₹8,376 cr', label: 'Gross Booking Revenue, FY26' },
      { value: '81–89%', label: 'OTA booking abandonment benchmark' },
    ],
    sections: [
      {
        heading: 'Executive summary',
        body: [
          'A specific, recurring pattern in the app’s reviews describes the price shown at the start of a booking not matching the price charged at the end, sometimes by a large margin. That goes directly at the thing an OTA sells: a trustworthy price.',
          'A closely related finding is a contradiction between marketing and support. The app listing advertises “NO CONVENIENCE FEE*” on flights, while an official reply to a user review says convenience fees apply on both app and browser bookings, offering a promo code to waive it. Whatever the logic behind the asterisk, it is exactly the gap between promise and delivery a BA should surface before it becomes a trust problem at scale.',
        ],
        note: {
          title: 'Bottom line',
          text: 'The same complaint, a quoted fare rising before final payment, appears independently in recent MakeMyTrip reviews. That makes this a category-wide weak point in Indian OTA booking flows, and closing it credibly a genuine differentiation opportunity, not just a defect to quietly patch.',
        },
      },
      {
        heading: 'Key findings at a glance',
        findings: [
          { area: 'Price integrity', title: 'Fares rise between quote and payment', text: 'Multiple 2026 reviews describe the quoted fare increasing before final payment, in one case by GBP 770.', impact: 'Price trust is the core product for a price-comparison OTA; a broken promise here is not cosmetic.' },
          { area: 'Marketing vs checkout', title: '“No convenience fee” isn’t default', text: 'The listing advertises no convenience fee; official support confirms the fee is charged unless a promo code is applied.', impact: 'Damages the headline value proposition shown to every new user.' },
          { area: 'Booking confirmation', title: 'Confirmed, then reversed', text: 'A June 2026 review describes a confirmed transaction followed by a call saying it failed, requiring a costlier rebooking.', impact: 'Undermines the most basic transactional promise an OTA makes.' },
          { area: 'Payment & servers', title: 'Errors and wildly wrong fares', text: 'Reviews describe payment errors and fares “displayed ten times higher”, attributed to server issues.', impact: 'Technical failures at checkout are pure lost bookings, not just friction.' },
        ],
      },
      {
        heading: 'Business context',
        body: 'EaseMyTrip (Easy Trip Planners Limited, NSE: EASEMYTRIP) was founded in 2008 and offers flights, hotels, holiday packages, buses, trains and cabs.',
        table: {
          headers: ['Metric', 'Value', 'Period'],
          rows: [
            ['Gross Booking Revenue', 'Rs 8,376 crore', 'Full year FY26'],
            ['Revenue from operations', 'Rs 151.91 crore (+8.9% YoY)', 'Q4 FY26'],
            ['EBITDA growth', '+76.3% YoY (9.6% margin)', 'Q2 FY26'],
            ['Full-year consolidated result', 'Net loss of ~Rs 47.6 crore', 'FY26, vs a profit in FY25'],
            ['Stock performance', 'Down ~34%', 'Trailing 12 months to 29 May 2026'],
            ['App downloads / rating', '10M+ · 4.2 / 5 (114K reviews)', 'Aug 2026, Play Store'],
          ],
        },
        note: {
          title: 'Why the loss matters',
          text: 'A company growing revenue while swinging to a loss is under real pressure to protect margin and avoid further one-off costs. Booking failures, price disputes and refund delays are exactly the operational issues that can turn into further provisions, which gives these findings direct financial relevance.',
        },
      },
      {
        heading: 'Competitive landscape',
        table: {
          headers: ['App', 'Rating', 'Reviews', 'Downloads', 'Convenience fee'],
          rows: [
            ['EaseMyTrip', '4.2', '114K', '10M+', '“No convenience fee*” advertised; support confirms it applies unless a promo code is used'],
            ['MakeMyTrip', '4.5', '2.22M', '100M+', 'Rs 249–499 per passenger (third-party comparison)'],
          ],
        },
        list: [
          'EaseMyTrip trails MakeMyTrip by three tenths of a star: a real but not dramatic gap.',
          'MakeMyTrip’s own reviews describe the identical “fares mysteriously increase during booking” pattern. Corroboration across two competing platforms is a stronger signal than either alone.',
        ],
      },
      {
        heading: 'What the reviews actually say',
        body: 'Recent reviews were sampled across Google Play, the Apple App Store, Trustpilot and PissedConsumer. PissedConsumer skews toward the most dissatisfied users by design, so it was used to corroborate patterns, not set headline sentiment.',
        bars: {
          caption: 'Recurring themes in recent EaseMyTrip app reviews (relative frequency in the sample, not a full census)',
          items: [
            { label: 'Price changes during booking', value: 6 },
            { label: 'Refund delays & processing', value: 6 },
            { label: 'Payment failures / server errors', value: 5 },
            { label: 'Customer support responsiveness', value: 5 },
            { label: 'Booking confirmed then reversed', value: 4 },
            { label: 'Fee transparency (convenience fee)', value: 3 },
          ],
        },
        cards: [
          { tag: 'Price', title: 'GBP 770 increase', text: 'The day after booking, a reviewer was told the price was rising by about GBP 770, or the booking would be cancelled.' },
          { tag: 'Confirmation', title: 'Confirmed, then failed', text: 'A confirmed transaction was followed by a call saying it hadn’t gone through and had to be rebooked at a higher fare.' },
          { tag: 'Servers', title: 'Fare shown 10× too high', text: 'Repeated payment errors and a fare briefly shown at about ten times its value, plus long hold times and dropped calls.' },
          { tag: 'Pending', title: 'Stuck with no PNR', text: 'A booking stayed “pending” with no PNR and no visible cancellation option, despite terms promising self-service.' },
          { tag: 'Refunds', title: 'Slow refunds', text: 'Reviewers on PissedConsumer and Trustpilot describe delayed refunds and difficulty reaching support.' },
          { tag: 'Reliability', title: 'Value vs reliability', text: 'A third-party summary characterises the pattern as good value and usability versus support and reliability problems.' },
        ],
      },
      {
        heading: 'Why this matters',
        body: 'OTA booking abandonment is estimated at roughly 81–89%, against a general e-commerce benchmark closer to 70%. Against that backdrop, “the price moved between quote and payment” is close to the worst friction possible: a generic checkout bug erodes convenience, but a price-integrity problem erodes the premise of the product.',
        note: {
          title: 'An important nuance',
          text: 'Official responses attribute fare movement to real-time sync with airline inventory, and airline fares genuinely are dynamic. The problem isn’t that dynamic pricing exists; it’s that the experience doesn’t communicate it in the moment, so users read legitimate behaviour as deception. The right fix is better communication and price-lock mechanics, not necessarily a pricing-engine rebuild.',
        },
      },
      {
        heading: 'Objectives',
        steps: [
          { title: 'Make fare volatility visible and expected', text: 'A user should never learn a price has changed only after committing to pay.' },
          { title: 'Align the advertised fee model with checkout', text: '“No convenience fee” is either true at checkout by default, or the claim states the conditional offer plainly.' },
          { title: 'Eliminate confirmed-then-reversed bookings', text: 'A booking shown as confirmed is never silently invalidated; failures surface immediately.' },
          { title: 'Reduce refund and resolution time', text: 'Shorten the gap between a refund being owed and received, with visible status throughout.' },
          { title: 'Benchmark against category peers', text: 'Track price-integrity complaints and abandonment against MakeMyTrip, not only internal history.' },
        ],
      },
      {
        heading: 'Scope & methodology',
        scope: {
          in: [
            'Mobile booking journey: search, fare selection, traveller details, payment, post-booking',
            'Public reviews (Play Store, App Store, Trustpilot, PissedConsumer)',
            'Publicly reported financial and business performance',
            'Competitive benchmarking against MakeMyTrip',
          ],
          out: [
            'Website / desktop booking journey specifically',
            'Internal systems, pricing engine or proprietary data',
            'Confidential forecasts or unpublished figures',
            'Full audit of every OTA (Yatra, Ixigo, Cleartrip, Goibibo)',
          ],
        },
        list: [
          'Public data collection from four review channels, plus Play Store data for MakeMyTrip',
          'Financial verification against stock exchange disclosures and press coverage, cross-checked per figure',
          'Benchmarks that separate general e-commerce (Baymard) from travel-specific research (RateGain, Navan)',
          'Thematic review analysis by hand, prioritising specificity over sentiment',
          'AS-IS/TO-BE journey maps, gap analysis and a transparent opportunity model',
        ],
        note: {
          title: 'A note on evidence quality',
          text: 'PissedConsumer averages 1.8★ while Trustpilot averages 4★ for the same company, which shows how much the channel shifts the picture. Play Store evidence is weighted most heavily; the others corroborate specific, repeated patterns.',
        },
      },
      {
        heading: 'AS-IS → TO-BE journey',
        body: 'Friction concentrates at Review & Confirm Price, Payment and Post-Booking, the stages where money and trust are most directly at stake.',
        journey: [
          { stage: 'Search & Compare', asIs: 'Real-time fare sync creates visible price movement', toBe: 'Fare-hold window shown explicitly to set expectations' },
          { stage: 'Select Fare / Room', asIs: 'Discounts shown early may not survive to checkout', toBe: 'Discount validity clearly scoped and guaranteed' },
          { stage: 'Enter Traveller Details', asIs: 'No reported issues at this step', toBe: 'No change needed; keep as a control point' },
          { stage: 'Review & Confirm Price', asIs: 'Price increases between quote and final charge', toBe: 'Price-lock confirmation before the final payment step' },
          { stage: 'Payment', asIs: 'Server errors and failed charges reported', toBe: 'Idempotent retry handling; clear error messaging' },
          { stage: 'Post-Booking', asIs: 'Refund delays; bookings reversed after confirmation', toBe: 'Transparent refund tracker; no silent reversal' },
        ],
        note: {
          title: 'On the price-lock recommendation',
          text: 'A short, explicit fare-hold window (“this price is guaranteed for the next 10 minutes”) is a well-established travel pattern. It doesn’t override the airline’s real-time pricing; it requires the platform to honour a quote for a defined window or clearly say, before payment, that the price isn’t locked. That is a concrete, scoped requirement a product team can act on.',
        },
      },
      {
        heading: 'Gap analysis',
        table: {
          headers: ['Area', 'Current state', 'Desired state', 'Gap', 'Recommended action'],
          rows: [
            ['Price integrity', 'Quoted fare can rise between search and payment, sometimes substantially', 'Price locked for a stated window, or a clear warning before payment', 'No price-hold mechanic or pre-payment warning', 'Fare-hold window with a visible countdown, or in-flow disclosure of volatility'],
            ['Fee transparency', '“No convenience fee” advertised; fee applies by default per support', 'Advertised terms match checkout without a promo code', 'Marketing claim and checkout behaviour misaligned', 'Apply the waiver by default, or revise the claim to state the conditions'],
            ['Booking confirmation', 'Bookings confirmed, then reversed, needing costlier rebooking', '“Confirmed” only shown when the booking is final', 'Confirmation shown before end-to-end validation', 'Show “Processing” until supplier validation completes'],
            ['Refunds & resolution', 'Refund delays and hard-to-reach support across channels', 'Visible refund status and a defined SLA', 'No status tracker; unpredictable resolution time', 'In-app refund tracker with a published resolution SLA'],
          ],
        },
      },
      {
        heading: 'Opportunity sizing',
        note: {
          position: 'top',
          title: 'Model, not a magic number',
          text: 'Every input is either a cited benchmark or a labelled hypothetical, so any figure can be challenged and replaced with real EaseMyTrip data.',
        },
        table: {
          headers: ['Step', 'Illustrative input', 'Basis'],
          rows: [
            ['1. Monthly booking attempts', '200,000', 'Hypothetical; real figure would come from internal analytics'],
            ['2. Current OTA abandonment', '~85%', 'Midpoint of the 81–89% benchmark'],
            ['3. Modelled recovery from fixes', '3 percentage points (to ~82%)', 'Conservative; targets price-integrity and reversal findings'],
            ['4. Additional bookings / month', '6,000', '200,000 × 3 pp'],
            ['5. Illustrative booking value', 'Rs 6,000', 'Hypothetical, domestic-flight weighted'],
            ['Illustrative booking value recovered', 'Rs 3.6 crore / month', '6,000 × Rs 6,000 (illustrative only)'],
          ],
        },
        after: 'This demonstrates method, not EaseMyTrip’s actual opportunity. Its revenue is commission and margin on Gross Booking Revenue, so converting recovered bookings into company revenue would also need the actual take rate.',
      },
      {
        heading: 'Recommendations (MoSCoW)',
        cards: [
          { tag: 'Must have', title: 'Fare-hold window or disclosure', text: 'Directly addresses the single most damaging, most repeated complaint.' },
          { tag: 'Must have', title: '“Confirmed” means confirmed', text: 'Never show confirmed until validated with the supplier. A reversal is the most severe trust failure for an OTA.' },
          { tag: 'Should have', title: 'Align the fee claim', text: 'A visible, checkable gap between marketing and reality that is cheap to fix either way.' },
          { tag: 'Should have', title: 'Refund tracker + SLA', text: 'High complaint frequency across three independent review channels.' },
          { tag: 'Could have', title: 'Explain dynamic pricing in-flow', text: 'Cheap, low-risk, and reduces the “deceptive” framing of partly legitimate behaviour.' },
          { tag: 'Won’t have', title: 'Pricing engine rebuild', text: 'Evidence points to a communication and confirmation gap, not proof the engine itself is broken.' },
        ],
      },
      {
        heading: 'Success metrics',
        metrics: [
          { label: 'Quote-to-payment price changes', target: 'Lower rate per session' },
          { label: 'Confirmed-then-reversed bookings', target: 'Lower share of bookings' },
          { label: 'Price-hold acceptance', target: 'More accept vs abandon' },
          { label: 'Negative review mentions', target: 'Fewer “price”, “confirmed”, “fee”' },
        ],
      },
      {
        heading: 'Sample user stories',
        stories: [
          {
            as: 'traveller searching for a flight',
            want: 'the quoted price to be held for a stated window',
            so: 'I can complete payment without the fare changing on me',
            criteria: [
              'Given I select a fare, when I proceed to payment, then the price is held for a clearly displayed countdown (for example 10 minutes)',
              'Given the hold expires before payment, when I try to pay, then I see the current price and reconfirm instead of being charged a different amount silently',
            ],
          },
          {
            as: 'traveller who has just booked',
            want: '“confirmed” to always mean the booking is final',
            so: 'I don’t later discover it was reversed and rebooking costs more',
            criteria: [
              'Given the booking isn’t yet validated with the supplier, when payment completes, then the app shows “Processing”, not “Confirmed”',
              'Given supplier validation fails after payment, when it happens, then I’m notified immediately with a clear next step',
            ],
          },
        ],
      },
      {
        heading: 'Honest limitations',
        list: [
          'Review mining is biased, and PissedConsumer selects heavily for dissatisfied users, so it was used as corroboration only.',
          'No internal Easy Trip Planners data, pricing logs or system access was used.',
          'The opportunity sizing demonstrates method and doesn’t account for the actual take rate.',
          'Not commissioned by Easy Trip Planners Limited; it doesn’t represent the company’s view.',
        ],
      },
      {
        heading: 'Outcome & learnings',
        highlight: true,
        body: [
          'Like its companion Pantaloons study, this builds a credible improvement case from public information alone. The specific value is the category-level corroboration: finding the same price-integrity complaint in a direct competitor’s reviews turns one company’s complaint into a documented, industry-wide opportunity.',
          'With real access, the first step would be instrumenting the exact moment a quoted price changes in a session, separating genuine airline fare movement from platform latency or caching, since the fix for each is completely different.',
        ],
      },
      {
        heading: 'References',
        refs: [
          { label: 'Google Play: EaseMyTrip listing and user reviews', url: 'https://play.google.com/store/apps/details?id=com.easemytrip.android' },
          { label: 'Sahi: EaseMyTrip Q4 FY26 results', url: 'https://www.sahi.com/blogs/easemytrip-q4-fy26-results' },
          { label: 'ScanX: EaseMyTrip FY26 results coverage', url: 'https://scanx.trade' },
          { label: 'Google Play: MakeMyTrip listing and reviews', url: 'https://play.google.com/store/apps/details?id=com.makemytrip' },
          { label: 'Wikipedia: EaseMyTrip', url: 'https://en.wikipedia.org/wiki/EaseMyTrip' },
          { label: 'HappyFares: OTA convenience fee comparison (directional)', url: 'https://happyfares.in/best-flight-booking-app-india' },
          { label: 'Apple App Store: EaseMyTrip reviews', url: 'https://apps.apple.com' },
          { label: 'PissedConsumer: EaseMyTrip reviews', url: 'https://easemytrip.pissedconsumer.com/review.html' },
          { label: 'Trustpilot: EaseMyTrip reviews', url: 'https://www.trustpilot.com/review/easemytrip.com' },
          { label: 'Perk: Online travel booking statistics', url: 'https://www.perk.com/blog/online-travel-booking-statistics' },
          { label: 'Navan: Online travel booking statistics', url: 'https://navan.com/blog/online-travel-booking-statistics' },
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
    demoUrl: `${import.meta.env.BASE_URL}playground/sop-assistant.html`,
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
