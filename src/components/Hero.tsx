// export default function Hero() {
//   return (
//     <>
//       <style>{`
//         .hero {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           overflow: hidden;
//           padding: 120px 24px 80px;
//         }

//         /* Multi-layer Jamaican background */
//         .hero__bg {
//           position: absolute; inset: 0;
//           background:
//             radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(26,122,46,0.35)  0%, transparent 60%),
//             radial-gradient(ellipse 60% 50% at 10% 80%,  rgba(192,57,43,0.25)  0%, transparent 60%),
//             radial-gradient(ellipse 60% 50% at 90% 80%,  rgba(255,209,0,0.15)  0%, transparent 60%),
//             linear-gradient(170deg, #0a1a00 0%, #0a0a00 45%, #1a0000 100%);
//           z-index: 0;
//         }

//         /* Animated diagonal rasta stripes in the BG */
//         .hero__stripes {
//           position: absolute; inset: 0; z-index: 0; overflow: hidden; opacity: 0.06;
//         }
//         .hero__stripes::before {
//           content: '';
//           position: absolute;
//           top: -100%; left: -50%;
//           width: 200%; height: 300%;
//           background: repeating-linear-gradient(
//             55deg,
//             transparent         0px,
//             transparent         60px,
//             var(--jm-green)     60px,
//             var(--jm-green)     65px,
//             transparent         65px,
//             transparent         125px,
//             var(--jm-gold)      125px,
//             var(--jm-gold)      130px,
//             transparent         130px,
//             transparent         190px,
//             var(--jm-red)       190px,
//             var(--jm-red)       195px
//           );
//         }

//         /* Leaf/tropical shapes */
//         .hero__deco {
//           position: absolute; pointer-events: none; font-size: 5rem; z-index: 1;
//           filter: drop-shadow(0 4px 16px rgba(0,0,0,0.6));
//           user-select: none;
//         }
//         .hero__deco--1 { top: 12%; left: 5%;  font-size: 6rem; opacity: 0.55; }
//         .hero__deco--2 { top: 18%; right: 6%; font-size: 4rem; opacity: 0.45; }
//         .hero__deco--3 { bottom: 20%; left: 8%;  font-size: 3.5rem; opacity: 0.4; }
//         .hero__deco--4 { bottom: 15%; right: 7%; font-size: 5rem; opacity: 0.5; }
//         .hero__deco--5 { top: 45%; left: 1%;  font-size: 2.5rem; opacity: 0.3; }
//         .hero__deco--6 { top: 35%; right: 1%; font-size: 2.5rem; opacity: 0.3; }

//         /* Glow orb behind title */
//         .hero__orb {
//           position: absolute; z-index: 0;
//           width: 700px; height: 700px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,209,0,0.08) 0%, transparent 65%);
//           top: 50%; left: 50%;
//           transform: translate(-50%, -50%);
//           animation: pulse 5s ease-in-out infinite;
//         }

//         .hero__content {
//           position: relative; z-index: 2;
//           max-width: 900px;
//         }

//         .hero__flag {
//           display: flex; align-items: center; justify-content: center;
//           gap: 10px; margin-bottom: 24px;
//           opacity: 0;
//           animation: fadeDown 0.8s var(--ease-out-expo) 0.2s forwards;
//         }
//         .hero__flag-emoji { font-size: 1.6rem; }
//         .hero__flag-text {
//           font-family: var(--font-body);
//           font-size: 0.78rem;
//           font-weight: 800;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: var(--jm-gold);
//         }
//         .hero__flag-dot {
//           width: 4px; height: 4px;
//           border-radius: 50%;
//           background: var(--jm-green-lite);
//         }

//         .hero__title {
//           font-family: 'Bebas Neue', serif;
//           font-size: clamp(4rem, 12vw, 9rem);
//           line-height: 0.92;
//           letter-spacing: 0.04em;
//           margin-bottom: 10px;
//           opacity: 0;
//           animation: fadeUp 1s var(--ease-out-expo) 0.35s forwards;
//         }
//         .hero__title-line1 { color: var(--jm-cream); display: block; }
//         .hero__title-line2 {
//           display: block;
//           background: linear-gradient(90deg, var(--jm-red-lite), var(--jm-gold), var(--jm-green-lite));
//           background-size: 200% 100%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: fadeUp 1s var(--ease-out-expo) 0.35s forwards, rastaSweep 4s ease-in-out 1.5s infinite;
//         }
//         .hero__title-line3 { color: var(--jm-cream); display: block; }

//         .hero__sub-wrap {
//           margin: 28px auto 0;
//           max-width: 600px;
//           opacity: 0;
//           animation: fadeUp 0.9s var(--ease-out-expo) 0.6s forwards;
//         }
//         .hero__sub {
//           font-size: 1.1rem;
//           line-height: 1.8;
//           color: var(--jm-cream-75);
//           font-weight: 400;
//         }

//         /* Price pill */
//         .hero__price {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(255,209,0,0.12);
//           border: 1px solid rgba(255,209,0,0.4);
//           border-radius: 100px;
//           padding: 6px 18px;
//           font-size: 0.82rem;
//           font-weight: 800;
//           letter-spacing: 0.1em;
//           color: var(--jm-gold);
//           margin-top: 18px;
//         }

//         .hero__btns {
//           display: flex;
//           gap: 14px;
//           justify-content: center;
//           flex-wrap: wrap;
//           margin-top: 38px;
//           opacity: 0;
//           animation: fadeUp 0.9s var(--ease-out-expo) 0.8s forwards;
//         }

//         /* Scroll indicator */
//         .hero__scroll {
//           position: absolute;
//           bottom: 32px; left: 50%;
//           transform: translateX(-50%);
//           z-index: 2;
//           display: flex; flex-direction: column; align-items: center; gap: 6px;
//           opacity: 0;
//           animation: fadeIn 1s ease 1.4s forwards;
//         }
//         .hero__scroll-text {
//           font-family: var(--font-body);
//           font-size: 0.65rem;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: var(--jm-cream-50);
//         }
//         .hero__scroll-arrow {
//           font-size: 1.1rem;
//           animation: scrollBounce 1.6s ease-in-out infinite;
//         }

//         /* Rasta bottom border */
//         .hero__bottom-bar {
//           position: absolute; bottom: 0; left: 0; right: 0;
//           height: 5px;
//           background: linear-gradient(90deg,
//             var(--jm-red) 0% 33.3%,
//             var(--jm-gold) 33.3% 66.6%,
//             var(--jm-green) 66.6% 100%
//           );
//         }

//         @media (max-width: 768px) {
//           .hero__deco--2, .hero__deco--4, .hero__deco--5, .hero__deco--6 { display: none; }
//           .hero__deco--1 { font-size: 3.5rem; opacity: 0.4; }
//           .hero__deco--3 { font-size: 2.5rem; opacity: 0.35; }
//         }
//       `}</style>

//       <section id="hero" className="hero">
//         <div className="hero__bg" />
//         <div className="hero__stripes" />
//         <div className="hero__orb" />

//         {/* Floating decorations */}
//         <span className="hero__deco hero__deco--1 float-a">🫓</span>
//         <span className="hero__deco hero__deco--2 float-b">🌿</span>
//         <span className="hero__deco hero__deco--3 float-c">🌶️</span>
//         <span className="hero__deco hero__deco--4 float-a">🫓</span>
//         <span className="hero__deco hero__deco--5 float-b">🍃</span>
//         <span className="hero__deco hero__deco--6 float-c">⭐</span>

//         <div className="hero__content">
//           {/* Flag line */}
//           <div className="hero__flag">
//             <span className="hero__flag-emoji">🇯🇲</span>
//             <span className="hero__flag-text">Authentic Jamaican</span>
//             <span className="hero__flag-dot" />
//             <span className="hero__flag-text">Glebe, Sydney</span>
//             <span className="hero__flag-emoji">🇯🇲</span>
//           </div>

//           {/* Main title */}
//           <h1 className="hero__title">
//             <span className="hero__title-line1">Jamaican</span>
//             <span className="hero__title-line2">Patty</span>
//             <span className="hero__title-line3">Bakehouse</span>
//           </h1>

//           <div className="hero__sub-wrap">
//             <p className="hero__sub">
//               Freshly baked, golden-crusted patties bursting with bold Jamaican spices.
//               Homemade every morning. Served with island pride, right here in Glebe.
//             </p>
//             <div className="hero__price">
//               💛 Only $1 – $20 per person · Affordable Always
//             </div>
//           </div>

//           <div className="hero__btns">
//             <a href="#menu" className="btn btn--gold">🫓 See Our Menu</a>
//             <a href="#hours" className="btn btn--green">🕐 Opening Hours</a>
//             <a href="tel:0401763302" className="btn btn--outline">📞 Call Us</a>
//           </div>
//         </div>

//         <div className="hero__scroll">
//           <span className="hero__scroll-text">Scroll</span>
//           <span className="hero__scroll-arrow">↓</span>
//         </div>

//         <div className="hero__bottom-bar" />
//       </section>
//     </>
//   );
// }