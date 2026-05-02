// import { useState, useEffect } from "react";

// const LINKS = ["About", "Menu", "Hours", "Contact"];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
//         .nav {
//           position: fixed; top: 0; left: 0; right: 0; z-index: 200;
//           transition: background 0.4s ease, box-shadow 0.4s ease;
//         }
//         .nav--scrolled {
//           background: rgba(10,10,0,0.96);
//           backdrop-filter: blur(18px);
//           box-shadow: 0 2px 30px rgba(0,0,0,0.5);
//         }
//         .nav--top { background: transparent; }

//         .nav__rasta {
//           height: 4px;
//           background: linear-gradient(90deg,
//             var(--jm-red) 0% 33.3%,
//             var(--jm-gold) 33.3% 66.6%,
//             var(--jm-green) 66.6% 100%
//           );
//         }

//         .nav__inner {
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 16px 40px;
//           max-width: 1200px; margin: 0 auto;
//         }

//         .nav__logo {
//           display: flex; flex-direction: column; gap: 0;
//           text-decoration: none;
//         }
//         .nav__logo-main {
//           font-family: 'Bebas Neue', serif;
//           font-size: 1.55rem;
//           letter-spacing: 0.08em;
//           color: var(--jm-gold);
//           line-height: 1;
//         }
//         .nav__logo-sub {
//           font-family: var(--font-body);
//           font-size: 0.58rem;
//           font-weight: 700;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: var(--jm-green-lite);
//           margin-top: 1px;
//         }

//         .nav__links {
//           display: flex; gap: 36px; list-style: none; align-items: center;
//         }
//         .nav__link {
//           font-family: var(--font-body);
//           font-weight: 700;
//           font-size: 0.78rem;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           text-decoration: none;
//           color: var(--jm-cream-75);
//           position: relative;
//           transition: color 0.25s;
//         }
//         .nav__link::after {
//           content: '';
//           position: absolute; bottom: -4px; left: 0;
//           width: 0; height: 2px;
//           background: var(--jm-gold);
//           transition: width 0.3s var(--ease-out-expo);
//         }
//         .nav__link:hover { color: var(--jm-gold); }
//         .nav__link:hover::after { width: 100%; }

//         .nav__cta {
//           font-size: 0.75rem;
//           padding: 11px 24px;
//         }

//         .nav__burger {
//           display: none;
//           flex-direction: column; gap: 5px;
//           background: none; border: none; cursor: pointer; padding: 6px;
//         }
//         .nav__burger-line {
//           display: block; width: 24px; height: 2px;
//           background: var(--jm-gold);
//           border-radius: 2px;
//           transition: transform 0.3s ease, opacity 0.3s ease;
//         }
//         .nav__burger--open .nav__burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
//         .nav__burger--open .nav__burger-line:nth-child(2) { opacity: 0; }
//         .nav__burger--open .nav__burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

//         .nav__mobile {
//           position: fixed; top: 0; left: 0; right: 0; bottom: 0;
//           background: rgba(10,10,0,0.98);
//           backdrop-filter: blur(20px);
//           z-index: 190;
//           display: flex; flex-direction: column; align-items: center; justify-content: center;
//           gap: 32px;
//           animation: fadeIn 0.3s ease;
//         }
//         .nav__mobile-link {
//           font-family: 'Bebas Neue', serif;
//           font-size: 3rem;
//           letter-spacing: 0.08em;
//           color: var(--jm-cream);
//           text-decoration: none;
//           transition: color 0.2s;
//         }
//         .nav__mobile-link:hover { color: var(--jm-gold); }

//         @media (max-width: 768px) {
//           .nav__inner { padding: 14px 22px; }
//           .nav__links { display: none; }
//           .nav__cta   { display: none; }
//           .nav__burger { display: flex; }
//         }
//       `}</style>

//       <nav className={`nav ${scrolled ? "nav--scrolled" : "nav--top"}`}>
//         <div className="nav__rasta" />
//         <div className="nav__inner">
//           <a href="#hero" className="nav__logo">
//             <span className="nav__logo-main">JPB</span>
//             <span className="nav__logo-sub">Jamaican Patty Bakehouse</span>
//           </a>

//           <ul className="nav__links">
//             {LINKS.map((l) => (
//               <li key={l}>
//                 <a href={`#${l.toLowerCase()}`} className="nav__link">{l}</a>
//               </li>
//             ))}
//           </ul>

//           <a href="tel:0401763302" className="btn btn--gold nav__cta hide-mobile">
//             📞 Call Now
//           </a>

//           <button
//             className={`nav__burger ${open ? "nav__burger--open" : ""}`}
//             onClick={() => setOpen((o) => !o)}
//             aria-label="Toggle menu"
//           >
//             <span className="nav__burger-line" />
//             <span className="nav__burger-line" />
//             <span className="nav__burger-line" />
//           </button>
//         </div>
//       </nav>

//       {open && (
//         <div className="nav__mobile">
//           {LINKS.map((l) => (
//             <a
//               key={l}
//               href={`#${l.toLowerCase()}`}
//               className="nav__mobile-link"
//               onClick={() => setOpen(false)}
//             >
//               {l}
//             </a>
//           ))}
//           <a href="tel:0401763302" className="btn btn--gold" onClick={() => setOpen(false)}>
//             📞 0401 763 302
//           </a>
//         </div>
//       )}
//     </>
//   );
// }