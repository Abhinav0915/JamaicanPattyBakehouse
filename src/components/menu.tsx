import AnimSection from "./animSection";

interface MenuItem {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  accent: string;
  tag: string;
}

const ITEMS: MenuItem[] = [
  {
    emoji: "🫓",
    name: "Beef Patty",
    desc: "The classic. Seasoned ground beef in a flaky, golden turmeric crust. Rich, bold, and unmistakably Jamaican.",
    price: "From $5",
    accent: "var(--jm-gold)",
    tag: "🏆 Best Seller",
  },
  {
    emoji: "🌿",
    name: "Vegetable Patty",
    desc: "A hearty mix of seasoned island veggies in our legendary pastry shell. Wholesome, satisfying, and full of soul.",
    price: "From $4",
    accent: "var(--jm-green-lite)",
    tag: "🌱 Vegetarian",
  },
  {
    emoji: "🍗",
    name: "Chicken Patty",
    desc: "Tender, spiced Jamaican chicken baked golden every morning. Light heat, deep flavour.",
    price: "From $5",
    accent: "var(--jm-gold-warm)",
    tag: "🔥 Fan Favourite",
  },
  {
    emoji: "🧀",
    name: "Cheese Patty",
    desc: "Melted cheese meets our signature crust. Simple, crowd-pleasing perfection in every bite.",
    price: "From $5",
    accent: "var(--jm-gold)",
    tag: "😍 Kids Love It",
  },
  {
    emoji: "🌶️",
    name: "Spicy Special",
    desc: "For the bold — Scotch bonnet heat and deep Jamaican seasonings. It lingers, in the best way.",
    price: "From $6",
    accent: "var(--jm-red-lite)",
    tag: "🌶️ Hot & Spicy",
  },
  {
    emoji: "🥤",
    name: "Drinks & Sides",
    desc: "Refreshing cold drinks and Jamaican-inspired sides to complete your meal. Ask us what's fresh today.",
    price: "From $1",
    accent: "var(--jm-green-lite)",
    tag: "💧 Refreshing",
  },
];

function MenuCard({ item, delay }: { item: MenuItem; delay: number }) {
  return (
    <AnimSection delay={delay} style={{ height: "100%" }}>
      <div className="menu-card" style={{ "--accent": item.accent } as React.CSSProperties}>
        <div className="menu-card__top">
          <span className="menu-card__emoji">{item.emoji}</span>
          <span className="menu-card__tag">{item.tag}</span>
        </div>
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__desc">{item.desc}</p>
        <div className="menu-card__footer">
          <span className="menu-card__price">{item.price}</span>
          <span className="menu-card__arrow">→</span>
        </div>
      </div>
    </AnimSection>
  );
}

export default function Menu() {
  return (
    <>
      <style>{`
        .menu {
          padding: 110px 0;
          position: relative;
          background: linear-gradient(180deg, var(--jm-black) 0%, #060e00 60%, var(--jm-black) 100%);
        }

        /* Rasta accent left border */
        .menu::before {
          content: '';
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 5px;
          background: linear-gradient(180deg, var(--jm-red), var(--jm-gold), var(--jm-green));
          border-radius: 0 4px 4px 0;
        }

        .menu__header {
          text-align: center;
          margin-bottom: 72px;
        }
        .menu__eyebrow {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--jm-green-lite);
          margin-bottom: 14px;
        }
        .menu__title {
          font-family: 'Bebas Neue', serif;
          font-size: clamp(2.8rem, 7vw, 6rem);
          line-height: 0.9;
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .menu__sub {
          color: var(--jm-cream-50);
          max-width: 480px;
          margin: 0 auto;
          font-size: 0.95rem;
          line-height: 1.75;
        }

        .menu__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        /* Card */
        .menu-card {
          background: rgba(255,251,239,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 30px 26px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.35s var(--ease-out-expo),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .menu-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .menu-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: var(--accent);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px color-mix(in srgb, var(--accent) 20%, transparent);
        }
        .menu-card:hover::before { opacity: 1; }

        .menu-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .menu-card__emoji { font-size: 2.8rem; line-height: 1; }
        .menu-card__tag {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 4px 10px;
          color: var(--jm-cream-75);
          white-space: nowrap;
        }
        .menu-card__name {
          font-family: 'Bebas Neue', serif;
          font-size: 1.7rem;
          letter-spacing: 0.04em;
          color: var(--jm-cream);
          margin-bottom: 10px;
        }
        .menu-card__desc {
          font-size: 0.87rem;
          color: var(--jm-cream-50);
          line-height: 1.75;
          flex: 1;
          margin-bottom: 20px;
        }
        .menu-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .menu-card__price {
          font-family: 'Bebas Neue', serif;
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          color: var(--accent);
        }
        .menu-card__arrow {
          color: var(--accent);
          font-size: 1.1rem;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .menu-card:hover .menu-card__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 900px) {
          .menu__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .menu__grid { grid-template-columns: 1fr; }
          .menu::before { display: none; }
        }
      `}</style>

      <section id="menu" className="menu">
        <div className="section-wrap">
          <AnimSection>
            <div className="menu__header">
              <p className="menu__eyebrow">🫓 Fresh Daily · Made with Love</p>
              <h2 className="menu__title">
                <span className="highlight-gold">What</span> We{" "}
                <span className="highlight-green">Bake</span>
              </h2>
              <p className="menu__sub">
                Every patty made fresh. Every flavour crafted with island pride.
                All under $20 — because great food is for everyone.
              </p>
            </div>
          </AnimSection>

          <div className="menu__grid">
            {ITEMS.map((item, i) => (
              <MenuCard key={item.name} item={item} delay={i * 70} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}