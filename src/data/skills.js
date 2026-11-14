// Skills from the Business Analyst resume, each linked to the case study
// sections that show it in practice ("proof of skill").
// `to` values are routes plus a section id (slugified section heading);
// labels read "Study · Section". `icon` picks the card illustration.

const skills = [
  {
    name: 'Requirement Gathering & Analysis',
    icon: 'target',
    area: 'Analysis',
    description: 'Turning a vague business problem into specific, testable objectives with clear scope.',
    proofs: [
      { label: 'Pantaloons · Objectives', to: '/work/pantaloons#objectives' },
      { label: 'EaseMyTrip · Objectives', to: '/work/easemytrip#objectives' },
    ],
  },
  {
    name: 'Business Process Mapping',
    icon: 'flow',
    area: 'Analysis',
    description: 'Mapping AS-IS user journeys stage by stage, then defining a TO-BE target that answers each friction point.',
    proofs: [
      { label: 'Pantaloons · AS-IS → TO-BE journey', to: '/work/pantaloons#as-is-to-be-journey' },
      { label: 'EaseMyTrip · AS-IS → TO-BE journey', to: '/work/easemytrip#as-is-to-be-journey' },
    ],
  },
  {
    name: 'Gap Analysis & Problem Solving',
    icon: 'gap',
    area: 'Analysis',
    description: 'Comparing current and desired states, naming the exact gap and a recommended action for each area.',
    proofs: [
      { label: 'Pantaloons · Gap analysis', to: '/work/pantaloons#gap-analysis' },
      { label: 'EaseMyTrip · Gap analysis', to: '/work/easemytrip#gap-analysis' },
    ],
  },
  {
    name: 'BRD / FRD Documentation',
    icon: 'doc',
    area: 'Documentation',
    description: 'Writing backlog-ready user stories with Given/When/Then acceptance criteria engineering can estimate.',
    proofs: [
      { label: 'EaseMyTrip · Sample user stories', to: '/work/easemytrip#sample-user-stories' },
      { label: 'Pantaloons · Sample user stories', to: '/work/pantaloons#sample-user-stories' },
    ],
  },
  {
    name: 'Data Analysis (Excel / SQL)',
    icon: 'data',
    area: 'Data',
    description: 'Verifying every figure against a primary source and sizing opportunities with a transparent, challengeable model.',
    proofs: [
      { label: 'Pantaloons · Business context', to: '/work/pantaloons#business-context' },
      { label: 'EaseMyTrip · Opportunity sizing', to: '/work/easemytrip#opportunity-sizing' },
    ],
  },
  {
    name: 'Data Visualization',
    icon: 'chart',
    area: 'Data',
    description: 'Turning raw review data into clear charts that show where problems cluster, as I do with Power BI dashboards at work.',
    proofs: [
      { label: 'Pantaloons · What the reviews say', to: '/work/pantaloons#what-the-reviews-actually-say' },
      { label: 'EaseMyTrip · What the reviews say', to: '/work/easemytrip#what-the-reviews-actually-say' },
    ],
  },
  {
    name: 'Stakeholder Management',
    icon: 'people',
    area: 'Delivery',
    description: 'Framing findings in terms stakeholders act on: competitive context, financial pressure and risk.',
    proofs: [
      { label: 'Pantaloons · Competitive landscape', to: '/work/pantaloons#competitive-landscape' },
      { label: 'EaseMyTrip · Business context', to: '/work/easemytrip#business-context' },
    ],
  },
  {
    name: 'Agile Prioritisation (MoSCoW)',
    icon: 'priority',
    area: 'Delivery',
    description: 'Prioritising recommendations into Must, Should, Could and Won’t, with a rationale for every call.',
    proofs: [
      { label: 'Pantaloons · Recommendations', to: '/work/pantaloons#recommendations-moscow' },
      { label: 'EaseMyTrip · Recommendations', to: '/work/easemytrip#recommendations-moscow' },
    ],
  },
  {
    name: 'UAT Support & Test Case Review',
    icon: 'check',
    area: 'Delivery',
    description: 'Defining acceptance criteria and success metrics that make a fix verifiable before and after release.',
    proofs: [
      { label: 'Pantaloons · Success metrics', to: '/work/pantaloons#success-metrics' },
      { label: 'EaseMyTrip · Success metrics', to: '/work/easemytrip#success-metrics' },
    ],
  },
  {
    name: 'Cross-functional Communication',
    icon: 'chat',
    area: 'Delivery',
    description: 'Translating what users describe into terms engineering can act on, like a non-idempotent checkout.',
    proofs: [
      { label: 'Pantaloons · AS-IS → TO-BE journey', to: '/work/pantaloons#as-is-to-be-journey' },
      { label: 'EaseMyTrip · Why this matters', to: '/work/easemytrip#why-this-matters' },
    ],
  },
  {
    name: 'Workflow Optimization',
    icon: 'bolt',
    area: 'Delivery',
    description: 'Building a tool that puts the SOP answer, ticket routing and references inside the page analysts already use.',
    proofs: [
      { label: 'SOP Assistant · What it does', to: '/playground/sop-assistant#what-it-does' },
      { label: 'SOP Assistant · How search works', to: '/playground/sop-assistant#how-search-works' },
    ],
  },
  {
    name: 'Tools',
    icon: 'tools',
    area: 'Tools',
    description: 'The everyday stack I use for tracking, analysis, dashboards and process diagrams.',
    tools: [
      { name: 'JIRA', use: 'Defects & tickets' },
      { name: 'SQL', use: 'Data validation' },
      { name: 'Power BI', use: 'Dashboards' },
      { name: 'Excel / Sheets', use: 'Analysis & automation' },
      { name: 'Draw.io', use: 'Process maps' },
    ],
  },
];

export const TOOLS = ['JIRA', 'Draw.io', 'Power BI', 'SQL', 'Excel / Google Sheets'];

export default skills;
