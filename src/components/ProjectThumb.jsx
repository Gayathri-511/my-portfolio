const ICONS = {
  bag: (
    <path d="M6 9V7a6 6 0 0 1 12 0v2h3l-1.2 11.2A2 2 0 0 1 17.8 22H6.2a2 2 0 0 1-2-1.8L3 9h3Zm2 0h8V7a4 4 0 0 0-8 0v2Z" />
  ),
  plane: (
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.8V22l4-1 4 1v-1.2L13 19v-5.5L21 16Z" />
  ),
  cart: (
    <path d="M3 4h2l.4 2M6 6h14l-1.6 8.4a2 2 0 0 1-2 1.6H8.6a2 2 0 0 1-2-1.6L5 6ZM9 20a1.2 1.2 0 1 1 0-2.4A1.2 1.2 0 0 1 9 20Zm8 0a1.2 1.2 0 1 1 0-2.4a1.2 1.2 0 0 1 0 2.4Z" />
  ),
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Zm-1.2 13.4L7 11.6l1.4-1.4 2.4 2.4 5-5L17.2 9l-6.4 6.4Z" />
  ),
};

function JourneyChips({ steps }) {
  return (
    <div className="art-chips">
      {steps.map((step, i) => (
        <span className="art-chip" key={step}>
          <span className="art-chip-num">{i + 1}</span>
          {step}
        </span>
      ))}
    </div>
  );
}

function PantaloonsArt() {
  return (
    <div className="art art-pantaloons" aria-hidden="true">
      <span className="art-ring art-ring-1" />
      <span className="art-ring art-ring-2" />
      <span className="art-wordmark-pantaloons">pantaloons</span>
      <JourneyChips steps={['Search', 'Wishlist', 'Cart', 'Checkout']} />
    </div>
  );
}

function EaseMyTripArt() {
  return (
    <div className="art art-emt" aria-hidden="true">
      <svg className="art-emt-trail" viewBox="0 0 400 120" preserveAspectRatio="none">
        <path d="M0 110 C 120 100, 220 90, 300 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" />
      </svg>
      <div className="art-emt-logo">
        <svg className="art-emt-plane" viewBox="0 0 200 110">
          <path d="M8 6 L196 22 L120 104 Z" fill="#1fb3e6" />
          <path d="M120 104 L196 22 L90 62 Z" fill="#0c8fc7" />
          <path d="M90 62 L120 104 L104 70 Z" fill="#0a6fa3" />
        </svg>
        <span className="art-wordmark-emt">
          EaseMyTrip<span className="art-emt-com">.com</span>
        </span>
      </div>
      <JourneyChips steps={['Search', 'Select', 'Pay', 'Book']} />
    </div>
  );
}

function SopArt() {
  return (
    <div className="art art-sop" aria-hidden="true">
      <div className="art-sop-panel">
        <div className="art-sop-head">
          <span className="art-sop-logo">SOP</span>
          SOP Assistant
        </div>
        <div className="art-sop-q">subtitle out of sync</div>
        <div className="art-sop-a">
          <span className="art-sop-label">Summary</span>
          <span className="art-sop-line" style={{ width: '92%' }} />
          <span className="art-sop-line" style={{ width: '74%' }} />
          <span className="art-sop-cti">CTI · Subtitles · Timing</span>
        </div>
        <div className="art-sop-input">
          Ask a question…
          <span className="art-sop-send">➤</span>
        </div>
      </div>
    </div>
  );
}

const ART = {
  pantaloons: PantaloonsArt,
  easemytrip: EaseMyTripArt,
  sop: SopArt,
};

function ProjectThumb({ icon = 'bag', art, className = '' }) {
  const Art = art && ART[art];
  if (Art) {
    return (
      <div className={`project-thumb project-thumb-art ${className}`}>
        <Art />
      </div>
    );
  }

  return (
    <div className={`project-thumb ${className}`}>
      <span className="thumb-icon-badge">
        <svg className="thumb-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {ICONS[icon]}
        </svg>
      </span>
    </div>
  );
}

export default ProjectThumb;
