import AnimSection from "./animSection";

export default function About() {
  return (
    <>
      <style>{`
        .about {
          padding: 110px 0;
          position: relative;
          overflow: hidden;
        }

        /* Green leaf shape far left */
        .about__bg-leaf {
          position: absolute;
          top: -60px; left: -120px;
          font-size: 22rem;
          opacity: 0.04;
          transform: rotate(-20deg);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative; z-index: 1;
        }

        /* LEFT — text */
        .about__eyebrow {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--jm-green-lite);
          margin-bottom: 14px;
        }
        .about__title {
          font-family: 'Bebas Neue', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }
        .about__body {
          color: var(--jm-cream-75);
          font-size: 1rem;
          line-height: 1.85;
          margin-bottom: 20px;
          margin-top: 28px;
        }
        .about__stat-row {
          display: flex;
          gap: 32px;
          margin-top: 36px;
        }
        .about__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .about__stat-num {
          font-family: 'Bebas Neue', serif;
          font-size: 3rem;
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .about__stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--jm-cream-50);
        }

        /* RIGHT — quote card */
        .about__card {
          position: relative;
          background: linear-gradient(145deg, rgba(26,122,46,0.15), rgba(255,209,0,0.06));
          border: 1px solid rgba(26,122,46,0.4);
          border-radius: 8px;
          padding: 52px 44px;
          overflow: hidden;
        }
        .about__card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--jm-red), var(--jm-gold), var(--jm-green));
        }
        .about__card-flag {
          font-size: 3.5rem;
          margin-bottom: 24px;
          display: block;
        }
        .about__quote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.45rem;
          line-height: 1.6;
          color: var(--jm-cream);
          margin-bottom: 28px;
          position: relative;
        }
        .about__quote::before {
          content: '"';
          font-size: 6rem;
          color: var(--jm-gold);
          opacity: 0.2;
          position: absolute;
          top: -30px; left: -10px;
          font-family: Georgia, serif;
          line-height: 1;
        }
        .about__quote-author {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--jm-green-lite);
        }
        .about__card-deco {
          position: absolute;
          bottom: -20px; right: -20px;
          font-size: 8rem;
          opacity: 0.08;
          transform: rotate(15deg);
        }

        @media (max-width: 768px) {
          .about__grid { grid-template-columns: 1fr; gap: 48px; }
          .about__title { font-size: 3.2rem; }
          .about__stat-row { gap: 24px; }
        }
      `}</style>

      <section id="about" className="about">
        <span className="about__bg-leaf">🌿</span>
        <div className="section-wrap">
          <div className="about__grid">

            <AnimSection direction="left">
              <p className="about__eyebrow">🇯🇲 Our Story</p>
              <h2 className="about__title">
                <span className="highlight-gold">Born</span> from<br />
                <span className="highlight-green">Passion,</span><br />
                Baked with <span className="highlight-red">Pride.</span>
              </h2>
              <div className="divider-rasta"><span /><span /><span /></div>
              <p className="about__body">
                Jamaican Patty Bakehouse isn't just a restaurant — it's a labour of love. Built
                from the ground up by a proud, hard-working man with deep roots in Jamaican
                culture, every patty we bake carries the soul of the islands.
              </p>
              <p className="about__body" style={{ marginTop: 0 }}>
                Right in the heart of <strong style={{ color: "var(--jm-cream)" }}>Glebe, Sydney</strong>,
                we've carved out a warm corner of Jamaica where the community gathers for quick,
                satisfying, ridiculously delicious food — without ever compromising on
                authenticity.
              </p>

              <div className="about__stat-row">
                <div className="about__stat">
                  <span className="about__stat-num" style={{ color: "var(--jm-gold)" }}>100%</span>
                  <span className="about__stat-label">Authentic Recipes</span>
                </div>
                <div className="about__stat">
                  <span className="about__stat-num" style={{ color: "var(--jm-green-lite)" }}>Fresh</span>
                  <span className="about__stat-label">Baked Every Day</span>
                </div>
                <div className="about__stat">
                  <span className="about__stat-num" style={{ color: "var(--jm-red-lite)" }}>$1</span>
                  <span className="about__stat-label">Starting Price</span>
                </div>
              </div>
            </AnimSection>

            <AnimSection direction="right" delay={120}>
              <div className="about__card">
                <span className="about__card-flag">🇯🇲</span>
                <blockquote className="about__quote">
                  We don't just make food — we share a piece of home with every single bite.
                </blockquote>
                <p className="about__quote-author">— The Founder, Jamaican Patty Bakehouse</p>
                <span className="about__card-deco">🫓</span>
              </div>
            </AnimSection>

          </div>
        </div>
      </section>
    </>
  );
}