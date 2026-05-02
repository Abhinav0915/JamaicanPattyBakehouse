import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  tag?: string;
  spicy?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MENU: MenuItem[] = [
  {
    id: "beef",
    name: "Classic Beef Patty",
    desc: "Seasoned ground beef, scotch bonnet hints, inside a golden turmeric crust. The original.",
    price: 5.5,
    emoji: "🫓",
    tag: "Best Seller",
  },
  {
    id: "chicken",
    name: "Jerk Chicken Patty",
    desc: "Smoky jerk-marinated chicken with allspice & thyme, baked to a perfect golden crisp.",
    price: 5.5,
    emoji: "🍗",
  },
  {
    id: "veg",
    name: "Ital Veggie Patty",
    desc: "Callaloo, sweet potato & plantain — a Rastafari-inspired, fully plant-based delight.",
    price: 4.5,
    emoji: "🌿",
    tag: "Vegan",
  },
  {
    id: "cheese",
    name: "Cheesy Beef Patty",
    desc: "All the soul of the classic, melted together with creamy cheddar for extra richness.",
    price: 6.0,
    emoji: "🧀",
  },
  {
    id: "spicy",
    name: "Scotch Bonnet Special",
    desc: "Not for the faint-hearted. Pure scotch bonnet fire meets our slow-braised beef filling.",
    price: 6.5,
    emoji: "🌶️",
    tag: "Hot!",
    spicy: true,
  },
  {
    id: "oxtail",
    name: "Oxtail Patty",
    desc: "Slow-braised oxtail, butter beans & herbs — a Sunday dinner, wrapped in pastry.",
    price: 7.5,
    emoji: "🍖",
    tag: "Premium",
  },
  {
    id: "coco",
    name: "Coconut Sweet Patty",
    desc: "A sweet Jamaican treat — coconut, brown sugar & nutmeg in a buttery pastry shell.",
    price: 4.5,
    emoji: "🥥",
    tag: "Dessert",
  },
  {
    id: "drink",
    name: "Jamaican Ginger Beer",
    desc: "Ice-cold, fiery homemade ginger beer. The perfect island companion.",
    price: 3.5,
    emoji: "🥤",
  },
];

const HOURS = [
  { day: "Mon", label: "Monday", time: null },
  { day: "Tue", label: "Tuesday", time: null },
  { day: "Wed", label: "Wednesday", time: "11am – 7pm" },
  { day: "Thu", label: "Thursday", time: "11am – 7pm" },
  { day: "Fri", label: "Friday", time: "11am – 7pm" },
  { day: "Sat", label: "Saturday", time: "10am – 6pm" },
  { day: "Sun", label: "Sunday", time: "10am – 3pm" },
];

const todayName = new Date().toLocaleDateString("en-AU", { weekday: "short" });

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.85s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function App() {
  const scrollY = useScrollY();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#0e0800",
        color: "#f5ead4",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        /* FIX ADDED HERE: Reset html and body margins and set global background */
        html, body {
          margin: 0;
          padding: 0;
          background: #0e0800;
          width: 100%;
          height: 100%;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0e0800; }
        ::-webkit-scrollbar-thumb { background: rgba(255,196,0,0.3); border-radius: 3px; }

        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes drift { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-18px) rotate(3deg); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        .nav-link { color: rgba(255,255,255,0.7); text-decoration:none; font-family:'Outfit',sans-serif; font-size:0.85rem; font-weight:500; letter-spacing:0.06em; transition: color 0.2s; }
        .nav-link:hover { color: #ffc400; }

        .menu-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,196,0,0.12);
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.35s cubic-bezier(.22,1,.36,1);
          cursor: default;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .menu-card::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 20% 80%, rgba(255,196,0,0.06) 0%, transparent 60%); opacity:0; transition: opacity 0.35s; }
        .menu-card:hover { border-color: rgba(255,196,0,0.5); transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,196,0,0.2); }
        .menu-card:hover::before { opacity:1; }

        .menu-card-desc { flex: 1; }

        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,196,0,0.1); border: 1px solid rgba(255,196,0,0.3); border-radius: 50px; padding: 8px 18px; font-family:'Outfit',sans-serif; font-size:0.8rem; font-weight:600; color:#ffc400; letter-spacing:0.06em; text-align: center; line-height: 1.2; }

        .shimmer-text { background: linear-gradient(90deg, #ffc400, #fff8dc, #ffc400, #ff8c00); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }

        .tag-pill { display:inline-block; font-family:'Outfit',sans-serif; font-size:0.65rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; padding: 3px 10px; border-radius:50px; }
        .tag-bestseller { background: rgba(255,196,0,0.2); color:#ffc400; border:1px solid rgba(255,196,0,0.4); }
        .tag-vegan { background: rgba(0,180,80,0.15); color:#22c55e; border:1px solid rgba(34,197,94,0.3); }
        .tag-hot { background: rgba(255,60,0,0.15); color:#ff6030; border:1px solid rgba(255,60,0,0.3); }
        .tag-premium { background: rgba(200,160,255,0.12); color:#c084fc; border:1px solid rgba(192,132,252,0.3); }
        .tag-dessert { background: rgba(255,140,200,0.12); color:#f472b6; border:1px solid rgba(244,114,182,0.3); }
        .tag-placeholder { display:inline-block; height: 22px; }

        .hours-row { display:flex; justify-content:space-between; align-items:center; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.2s; }
        .hours-row:last-child { border-bottom:none; }
        .hours-today { background: rgba(255,196,0,0.07); border-radius:8px; padding: 13px 14px !important; border-bottom: none !important; margin: 2px 0; }

        .cta-primary { display:inline-flex; align-items:center; justify-content: center; gap:10px; background: linear-gradient(135deg, #ffc400 0%, #ff9500 100%); color:#1a0f00; font-family:'Outfit',sans-serif; font-weight:800; font-size:1rem; letter-spacing:0.03em; padding:16px 36px; border-radius:60px; border:none; cursor:pointer; text-decoration:none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(255,196,0,0.3); }
        .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(255,196,0,0.45); }
        
        .cta-secondary { display:inline-flex; align-items:center; justify-content: center; gap:10px; background: transparent; color:#f5ead4; font-family:'Outfit',sans-serif; font-weight:600; font-size:0.95rem; letter-spacing:0.04em; padding:15px 32px; border-radius:60px; border:1.5px solid rgba(255,255,255,0.2); cursor:pointer; text-decoration:none; transition: border-color 0.2s, color 0.2s; }
        .cta-secondary:hover { border-color: rgba(255,196,0,0.6); color: #ffc400; }

        .section-label { font-family:'Outfit',sans-serif; font-size:0.72rem; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; color:#ffc400; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
        .section-label::before { content:''; width:24px; height:2px; background:#ffc400; border-radius:1px; }

        .contact-pill { display:flex; align-items:center; gap:14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:18px 22px; transition: border-color 0.2s; }
        .contact-pill:hover { border-color: rgba(255,196,0,0.3); }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: stretch;
        }

        /* ── RESPONSIVE QUERIES ── */
        @media (max-width: 1100px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(2.5rem, 11vw, 5.5rem) !important; }
          .grid-auto { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hide-mobile { display: none !important; }
          .menu-grid { grid-template-columns: repeat(2, 1fr); }
          .nav-cta { padding: 8px 16px !important; font-size: 0.75rem !important; }
        }

        @media (max-width: 500px) {
          .menu-grid { grid-template-columns: 1fr; }
          .hero-badge { font-size: 0.75rem; padding: 6px 14px; }
          .cta-primary, .cta-secondary { width: 100%; }
          .nav-cta { width: auto; } /* Keep nav CTA small */
        }
      `}</style>

      {/* ── JAMAICAN FLAG STRIPE ───────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          height: 5,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 101,
        }}
      >
        <div style={{ flex: 1, background: "#007B40" }} />
        <div style={{ flex: 1, background: "#FED100" }} />
        <div style={{ flex: 1, background: "#000000" }} />
        <div style={{ flex: 1, background: "#FED100" }} />
        <div style={{ flex: 1, background: "#007B40" }} />
      </div>

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 5,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(20px, 5vw, 40px)",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrollY > 40 ? "rgba(10,6,0,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
          borderBottom:
            scrollY > 40
              ? "1px solid rgba(255,196,0,0.1)"
              : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg,#ffc400,#ff8c00)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            🫓
          </div>
          <span
            style={{
              fontFamily: "'Fraunces',Georgia,serif",
              fontWeight: 900,
              fontSize: "1.1rem",
              color: "#ffc400",
              letterSpacing: "-0.02em",
            }}
          >
            JPB
          </span>
        </div>

        <div style={{ display: "flex", gap: 32 }} className="hide-mobile">
          {["About", "Menu", "Hours", "Contact"].map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {l}
            </button>
          ))}
        </div>

        <a
          href="tel:0401763302"
          className="cta-primary nav-cta"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            fontSize: "0.82rem",
          }}
        >
          📞 Call to Order
        </a>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        id="about"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(100px, 15vh, 120px) clamp(20px, 5vw, 40px) clamp(60px, 10vh, 80px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 60% 40%, rgba(180,120,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "3%",
            width: "clamp(300px, 50vw, 500px)",
            height: "clamp(300px, 50vw, 500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,123,64,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "8%",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            opacity: 0.12,
            animation: "drift 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          🫓
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            right: "15%",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            opacity: 0.1,
            animation: "drift 5s ease-in-out infinite 2s",
            pointerEvents: "none",
          }}
        >
          🌿
        </div>
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "4%",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            opacity: 0.08,
            animation: "drift 6s ease-in-out infinite 1s",
            pointerEvents: "none",
          }}
        >
          🌶️
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.025,
            backgroundImage: `repeating-linear-gradient(45deg, #ffc400 0, #ffc400 1px, transparent 0, transparent 50%)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div
          style={{
            maxWidth: 900,
            position: "relative",
            animation: "fadeUp 1s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <div className="hero-badge">
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulse 2s ease infinite",
                  flexShrink: 0,
                }}
              />
              Proudly Jamaican · Freshly Baked Daily · Glebe, Sydney
            </div>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Fraunces',Georgia,serif",
              fontSize: "clamp(3.2rem,8vw,6.5rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              marginBottom: 32,
            }}
          >
            <span className="shimmer-text">Real Jamaican</span>
            <br />
            <span style={{ color: "#f5ead4" }}>Patties. Baked</span>
            <br />
            <em
              style={{ color: "rgba(245,234,212,0.55)", fontStyle: "italic" }}
            >
              with Heart.
            </em>
          </h1>

          <p
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "1.1rem",
              color: "rgba(245,234,212,0.65)",
              maxWidth: 520,
              lineHeight: 1.8,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            From the golden turmeric crust to the slow-seasoned fillings — every
            patty at Jamaican Patty Bakehouse carries the soul of the island.
            Come taste the difference at 109 Glebe Point Rd.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <button className="cta-primary" onClick={() => scrollTo("menu")}>
              See Catalog →
            </button>
            <button className="cta-secondary" onClick={() => scrollTo("hours")}>
              View Hours →
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(16px, 4vw, 32px)",
              marginTop: "clamp(40px, 8vh, 64px)",
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              { val: "$1–20", label: "Per person" },
              { val: "100%", label: "Authentic Jamaican" },
              { val: "Fresh", label: "Baked Daily" },
              { val: "5★", label: "Community Favourite" },
            ].map(({ val, label }) => (
              <div key={label} style={{ fontFamily: "'Outfit',sans-serif" }}>
                <div
                  style={{
                    fontFamily: "'Fraunces',Georgia,serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "#ffc400",
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL BRAND STRIP ─────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(90deg, #007B40, #1a9e5c, #007B40)",
          padding: "1px 0",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #0e0800 0%, #1a0f00 100%)",
            padding: "clamp(24px, 4vw, 36px) clamp(20px, 5vw, 40px)",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[
            "🇯🇲 Authentic Since Day One",
            "🏠 Man-Owned & Operated",
            "🔥 Baked Fresh Every Morning",
            "📍 Glebe, Sydney NSW",
          ].map((t) => (
            <div
              key={t}
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "rgba(255,220,100,0.8)",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t}
              <span
                style={{ color: "rgba(255,196,0,0.2)", marginLeft: 8 }}
                className="hide-mobile"
              >
                |
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ──────────────────────────────────────────────────── */}
      <section
        style={{ 
          padding: "clamp(60px, 10vw, 110px) clamp(20px, 5vw, 40px)", 
          maxWidth: 1200, 
          margin: "0 auto" 
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 8vw, 80px)",
            alignItems: "center",
          }}
          className="grid-auto"
        >
          <Reveal>
            <div className="section-label">Our Story</div>
            <h2
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: "-0.02em",
              }}
            >
              Born in Jamaica.
              <br />
              <span style={{ color: "#ffc400" }}>Baked in Glebe.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                color: "rgba(245,234,212,0.65)",
                lineHeight: 1.85,
                fontSize: "1rem",
                marginBottom: 20,
                fontWeight: 300,
              }}
            >
              Jamaican Patty Bakehouse is more than a fast food spot — it's a
              dream made real. Founded and run by a proud Jamaican man with deep
              roots in the island's culinary tradition, every single patty is
              made by hand using recipes passed down through generations.
            </p>
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                color: "rgba(245,234,212,0.55)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                fontWeight: 300,
              }}
            >
              Right in the heart of Glebe, we've built more than a business —
              we've built a community. Affordable, honest, and bursting with
              island flavour, JPB is your second home on Glebe Point Rd.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,196,0,0.1), rgba(255,140,0,0.05))",
                  border: "1px solid rgba(255,196,0,0.25)",
                  borderRadius: 24,
                  padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    fontSize: "8rem",
                    opacity: 0.06,
                    lineHeight: 1,
                  }}
                >
                  🇯🇲
                </div>
                <div
                  style={{
                    fontFamily: "'Fraunces',Georgia,serif",
                    fontSize: "3.5rem",
                    color: "#ffc400",
                    lineHeight: 1,
                    marginBottom: 16,
                    opacity: 0.6,
                  }}
                >
                  "
                </div>
                <blockquote
                  style={{
                    fontFamily: "'Fraunces',Georgia,serif",
                    fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
                    fontStyle: "italic",
                    color: "#f5ead4",
                    lineHeight: 1.55,
                    marginBottom: 24,
                  }}
                >
                  Every patty I make carries a piece of home. That's not a
                  slogan — that's a promise.
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#ffc400,#ff8c00)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                    }}
                  >
                    🫓
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontWeight: 700,
                        color: "#ffc400",
                        fontSize: "0.9rem",
                      }}
                    >
                      The Founder
                    </div>
                    <div
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.78rem",
                      }}
                    >
                      Jamaican Patty Bakehouse
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(0,123,64,0.15)",
                  border: "1px solid rgba(0,123,64,0.3)",
                  zIndex: -1,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MENU ───────────────────────────────────────────────────────────── */}
      <section
        id="menu"
        style={{
          padding: "clamp(60px, 10vw, 80px) clamp(20px, 5vw, 40px) clamp(80px, 12vw, 110px)",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div
                className="section-label"
                style={{ justifyContent: "center" }}
              >
                Fresh From The Oven
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                }}
              >
                The <span style={{ color: "#ffc400" }}>Full Menu</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  color: "rgba(245,234,212,0.5)",
                  fontSize: "0.95rem",
                  maxWidth: 440,
                  margin: "0 auto",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                Call us to place your order. All priced between $1–$20.
              </p>
            </div>
          </Reveal>

          <div className="menu-grid">
            {MENU.map((item, i) => (
              <Reveal key={item.id} delay={i * 55}>
                <div className="menu-card">
                  {/* Tag row */}
                  <div style={{ marginBottom: 14, minHeight: 22 }}>
                    {item.tag ? (
                      <span
                        className={`tag-pill ${
                          item.tag === "Best Seller"
                            ? "tag-bestseller"
                            : item.tag === "Vegan"
                              ? "tag-vegan"
                              : item.tag === "Hot!"
                                ? "tag-hot"
                                : item.tag === "Premium"
                                  ? "tag-premium"
                                  : "tag-dessert"
                        }`}
                      >
                        {item.tag}
                      </span>
                    ) : (
                      <span className="tag-placeholder" />
                    )}
                  </div>

                  {/* Emoji */}
                  <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>
                    {item.emoji}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "'Fraunces',Georgia,serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#f5ead4",
                      marginBottom: 10,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="menu-card-desc"
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.84rem",
                      color: "rgba(245,234,212,0.55)",
                      lineHeight: 1.7,
                      marginBottom: 22,
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Price — pinned to bottom */}
                  <div style={{ marginTop: "auto" }}>
                    <span
                      style={{
                        fontFamily: "'Fraunces',Georgia,serif",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: "#ffc400",
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS ──────────────────────────────────────────────────────────── */}
      <section id="hours" style={{ padding: "clamp(60px, 10vw, 110px) clamp(20px, 5vw, 40px)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 8vw, 80px)",
            alignItems: "start",
          }}
          className="grid-auto"
        >
          <Reveal>
            <div className="section-label">When We're Open</div>
            <h2
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginBottom: 36,
              }}
            >
              Opening <span style={{ color: "#ffc400" }}>Hours</span>
            </h2>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "8px 24px",
              }}
            >
              {HOURS.map(({ day, label, time }) => {
                const isToday = day === todayName;
                return (
                  <div
                    key={day}
                    className={`hours-row ${isToday ? "hours-today" : ""}`}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      {isToday && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#22c55e",
                            flexShrink: 0,
                            boxShadow: "0 0 8px #22c55e",
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontFamily: "'Outfit',sans-serif",
                          fontWeight: isToday ? 700 : 400,
                          color: isToday
                            ? "#fff"
                            : time
                              ? "rgba(245,234,212,0.75)"
                              : "rgba(255,255,255,0.25)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {label}{" "}
                        {isToday && (
                          <span
                            style={{
                              fontSize: "0.72rem",
                              color: "#22c55e",
                              fontWeight: 700,
                              marginLeft: 6,
                            }}
                          >
                            TODAY
                          </span>
                        )}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontWeight: isToday ? 700 : 400,
                        color: isToday
                          ? "#ffc400"
                          : time
                            ? "rgba(245,234,212,0.7)"
                            : "rgba(255,255,255,0.2)",
                        fontSize: "0.88rem",
                      }}
                    >
                      {time ?? "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="section-label">Find & Contact Us</div>
            <h2
              style={{
                fontFamily: "'Fraunces',Georgia,serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                marginBottom: 36,
              }}
            >
              Come <span style={{ color: "#ffc400" }}>Visit Us</span>
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginBottom: 36,
              }}
            >
              <div className="contact-pill">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,196,0,0.1)",
                    border: "1px solid rgba(255,196,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  📍
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    Address
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.95rem",
                      color: "#f5ead4",
                      fontWeight: 500,
                    }}
                  >
                    109 Glebe Point Rd, Glebe NSW 2037
                  </div>
                </div>
              </div>

              <div className="contact-pill">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,196,0,0.1)",
                    border: "1px solid rgba(255,196,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    Phone
                  </div>
                  <a
                    href="tel:0401763302"
                    style={{
                      fontFamily: "'Fraunces',Georgia,serif",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#ffc400",
                      textDecoration: "none",
                    }}
                  >
                    0401 763 302
                  </a>
                </div>
              </div>

              <div className="contact-pill">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(255,196,0,0.1)",
                    border: "1px solid rgba(255,196,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0,
                  }}
                >
                  💰
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    Price Range
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.95rem",
                      color: "#f5ead4",
                      fontWeight: 500,
                    }}
                  >
                    $1 – $20 per person · Always affordable
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="tel:0401763302"
                className="cta-primary"
                style={{ textDecoration: "none" }}
              >
                📞 Call to Order
              </a>
              <a
                href="https://maps.google.com/?q=109+Glebe+Point+Rd+Glebe+NSW"
                target="_blank"
                rel="noreferrer"
                className="cta-secondary"
                style={{ textDecoration: "none" }}
              >
                🗺 Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "0 clamp(20px, 5vw, 40px) clamp(60px, 10vw, 110px)" }}>
        <Reveal>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              background:
                "linear-gradient(135deg, rgba(255,196,0,0.09) 0%, rgba(0,123,64,0.06) 100%)",
              border: "1px solid rgba(255,196,0,0.2)",
              borderRadius: 28,
              padding: "clamp(40px, 8vw, 72px) clamp(20px, 5vw, 60px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,196,0,0.08) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,123,64,0.08) 0%, transparent 70%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>🫓</div>
              <h2
                style={{
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontSize: "clamp(2rem,4.5vw,3.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  marginBottom: 18,
                }}
              >
                Your Next Favourite Meal
                <br />
                <span style={{ color: "#ffc400" }}>is One Call Away.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  color: "rgba(245,234,212,0.55)",
                  fontSize: "1rem",
                  maxWidth: 480,
                  margin: "0 auto 36px",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                Don't settle for ordinary. Come experience the warmth, the
                spice, and the genuine taste of Jamaica right here in Glebe.
                Freshly baked, honestly priced, made with heart.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:0401763302"
                  className="cta-secondary"
                  style={{ textDecoration: "none" }}
                >
                  📞 0401 763 302
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#060400",
          borderTop: "1px solid rgba(255,196,0,0.1)",
          padding: "clamp(32px, 6vw, 44px) clamp(20px, 5vw, 40px) 32px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              height: 3,
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 36,
              maxWidth: 180,
            }}
          >
            <div style={{ flex: 1, background: "#007B40" }} />
            <div style={{ flex: 1, background: "#FED100" }} />
            <div style={{ flex: 1, background: "#000000" }} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 36,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces',Georgia,serif",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: "#ffc400",
                  marginBottom: 8,
                }}
              >
                Jamaican Patty Bakehouse
              </div>
              <p
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.82rem",
                  maxWidth: 280,
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Authentic Jamaican patties, baked fresh daily.
                <br />
                109 Glebe Point Rd, Glebe NSW 2037
              </p>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(255,196,0,0.5)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Hours
                </div>
                {[
                  "Wed–Fri: 11am–7pm",
                  "Saturday: 10am–6pm",
                  "Sunday: 10am–3pm",
                  "Mon–Tue: Closed",
                ].map((t) => (
                  <div
                    key={t}
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 6,
                      fontWeight: 300,
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(255,196,0,0.5)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Contact
                </div>
                <a
                  href="tel:0401763302"
                  style={{
                    display: "block",
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.9rem",
                    color: "#ffc400",
                    textDecoration: "none",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  0401 763 302
                </a>
                <div
                  style={{
                    fontFamily: "'Outfit',sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 300,
                  }}
                >
                  Glebe, Sydney NSW
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                color: "rgba(255,255,255,0.2)",
                fontSize: "0.78rem",
                fontWeight: 300,
              }}
            >
              © {new Date().getFullYear()} Jamaican Patty Bakehouse. All rights
              reserved.
            </p>
            <p
              style={{
                fontFamily: "'Outfit',sans-serif",
                color: "rgba(255,255,255,0.15)",
                fontSize: "0.75rem",
                fontWeight: 300,
              }}
            >
              🇯🇲 Proudly Jamaican · Locally Owned · Made with Love
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}