"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import roadImage from "./assets/transport-hero.png";
import vanImage from "./assets/transport-van-cutout.png";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Globe2,
  Mail,
  MapPinned,
  PackageCheck,
  Phone,
  Route,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Transport express",
    text: "Prise en charge rapide de vos envois urgents, sensibles ou soumis à un délai précis.",
  },
  {
    icon: Route,
    title: "Course dédiée",
    text: "Acheminement direct organisé exclusivement autour de votre marchandise et de votre échéance.",
  },
  {
    icon: Users,
    title: "Sous-traitance transport",
    text: "Accompagnement ponctuel ou régulier pour assurer la continuité de vos opérations de livraison.",
  },
  {
    icon: Globe2,
    title: "France & Europe",
    text: "Organisation de missions régionales, nationales et européennes selon votre destination.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.add("motion-ready");

    const handleScroll = () => setScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, []);

  return (
    <main>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="topbar">
          <div className="section-shell topbar-inner">
            <div className="topbar-links">
              <a href="mailto:ludhimtransport@hotmail.com"><Mail size={15} aria-hidden="true" /> ludhimtransport@hotmail.com</a>
              <a href="tel:+33616294059"><Phone size={15} aria-hidden="true" /> +33 6 16 29 40 59</a>
              <span><MapPinned size={15} aria-hidden="true" /> Grand Est · France · Europe</span>
            </div>
            <span className="availability"><i aria-hidden="true" /> Disponible 24h/24 · 7j/7</span>
          </div>
        </div>

        <div className="nav-shell">
          <div className="section-shell nav-inner">
            <a className="brand" href="#accueil" aria-label="Ludhim — retour en haut">
              <span className="brand-box">LT</span>
              <span className="brand-divider" aria-hidden="true" />
              <span className="brand-copy"><strong>LUDHIM</strong><small>Transport &amp; Logistiques</small></span>
            </a>
            <nav aria-label="Navigation principale">
              <a href="#accueil">Accueil</a>
              <a href="#services">Services</a>
              <a href="#interventions">Interventions</a>
              <a href="#engagements">Engagements</a>
              <a href="#contact">Contact</a>
            </nav>
            <a className="nav-cta" href="#contact">Devis gratuit <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-grid section-shell">
          <div className="hero-copy">
            <p className="hero-pill hero-enter delay-1"><Truck size={17} aria-hidden="true" /> Votre partenaire transport</p>
            <h1 className="hero-enter delay-2">Transport express<br /><span>en France &amp; Europe</span></h1>
            <p className="hero-text hero-enter delay-3">
              Courses urgentes, livraisons dédiées et sous-traitance pour les professionnels.
              Une organisation simple, réactive et suivie jusqu’à la livraison.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#contact">Demander un devis <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="button button-secondary" href="#services">Nos services</a>
            </div>
            <div className="hero-proof hero-enter delay-5">
              <span><CheckCircle2 aria-hidden="true" /> Réponse rapide</span>
              <span><CheckCircle2 aria-hidden="true" /> Organisation dédiée</span>
              <span><CheckCircle2 aria-hidden="true" /> Livraison confirmée</span>
            </div>
          </div>

          <div className="hero-visual hero-enter delay-3" aria-hidden="true">
            <div className="visual-circle" />
            <div className="dot-pattern" />
            <div className="route-stroke" />
            <img src={vanImage} alt="" />
            <div className="floating-card">
              <Clock3 size={25} />
              <div><strong>24h/24 · 7j/7</strong><span>À votre écoute</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Nos principales prestations">
        <div className="section-shell">
          <span>Transport express</span><i />
          <span>Course dédiée</span><i />
          <span>Sous-traitance</span><i />
          <span>France &amp; Europe</span>
        </div>
      </section>

      <section className="about section-shell" data-reveal aria-labelledby="about-title">
        <div className="about-visual">
          <img src={roadImage} alt="Transport express sur un axe européen" />
          <div className="about-accent" aria-hidden="true" />
          <div className="about-label"><BadgeCheck size={22} aria-hidden="true" /><span><strong>Service professionnel</strong>Chaque mission est suivie</span></div>
        </div>
        <div className="about-copy">
          <p className="section-kicker">À propos de nous</p>
          <h2 id="about-title">Plus qu’un transport,<br />un partenaire fiable.</h2>
          <p>
            Depuis le Grand Est, Ludhim Transport &amp; Logistiques accompagne les entreprises dans
            l’organisation de leurs livraisons urgentes, ponctuelles ou régulières en France et en Europe.
          </p>
          <ul>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Fiabilité</strong>Une organisation précise et des informations claires.</span></li>
            <li><Clock3 aria-hidden="true" /><span><strong>Réactivité</strong>Une réponse rapide lorsque chaque minute compte.</span></li>
            <li><PackageCheck aria-hidden="true" /><span><strong>Traçabilité</strong>Un suivi jusqu’à la confirmation de livraison.</span></li>
          </ul>
        </div>
      </section>

      <section className="services" id="services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">Nos services</p>
              <h2 id="services-title">Des solutions pensées<br />pour vos impératifs.</h2>
            </div>
            <p>Chaque mission est organisée selon son urgence, sa destination et les contraintes de livraison.</p>
          </div>
          <div className="service-grid" data-reveal>
            {services.map(({ icon: Icon, title, text }, index) => (
              <article className="service-card" key={title} style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
                <div className="service-icon"><Icon size={28} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact" aria-label={`Demander un devis pour ${title}`}>Nous contacter <ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-title">
        <div className="section-heading centered" data-reveal>
          <div>
            <p className="section-kicker">Comment ça marche ?</p>
            <h2 id="process-title">Votre transport en 3 étapes.</h2>
          </div>
        </div>
        <div className="process-grid" data-reveal>
          <article><span>01</span><div className="process-icon"><Mail aria-hidden="true" /></div><h3>Votre demande</h3><p>Indiquez-nous le départ, la destination, le délai et les particularités de l’envoi.</p></article>
          <article><span>02</span><div className="process-icon"><Route aria-hidden="true" /></div><h3>Notre proposition</h3><p>Nous confirmons rapidement l’organisation, le tarif et les conditions de prise en charge.</p></article>
          <article><span>03</span><div className="process-icon"><PackageCheck aria-hidden="true" /></div><h3>La livraison</h3><p>La mission est suivie jusqu’à sa réalisation et à la confirmation de bonne livraison.</p></article>
        </div>
      </section>

      <section className="coverage" id="interventions" aria-labelledby="coverage-title">
        <div className="coverage-grid section-shell">
          <div className="coverage-copy" data-reveal>
            <p className="section-kicker light">Zone d’intervention</p>
            <h2 id="coverage-title">Du Grand Est<br />vers toute l’Europe.</h2>
            <p>
              Nous organisons vos transports au départ du Grand Est vers la France et l’ensemble
              des destinations européennes.
            </p>
            <div className="coverage-tags">
              <span>Grand Est</span><span>France</span><span>Europe du Nord</span>
              <span>Europe centrale</span><span>Europe du Sud</span><span>Europe de l’Est</span>
            </div>
          </div>

          <div className="route-map" data-reveal aria-label="Carte des interventions depuis le Grand Est vers toute l’Europe">
            <Globe2 className="map-watermark" aria-hidden="true" />
            <div className="map-panel-header">
              <span><i aria-hidden="true" /> Réseau européen</span>
              <small>Départs Grand Est</small>
            </div>
            <svg viewBox="0 0 700 460" preserveAspectRatio="none" role="img" aria-label="Liaisons depuis le Grand Est vers la France et l’Europe">
              <defs>
                <linearGradient id="routeGradient" x1="0" x2="1">
                  <stop offset="0" stopColor="#f59e0b" />
                  <stop offset="0.35" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#7dd3fc" />
                </linearGradient>
                <marker id="routeArrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#7dd3fc" />
                </marker>
              </defs>
              <ellipse className="map-zone" cx="357" cy="248" rx="278" ry="164" />
              <ellipse className="map-zone map-zone-inner" cx="357" cy="248" rx="193" ry="113" />
              <path id="route-france" className="map-route" d="M340 244 C275 252 210 260 120 285" />
              <path id="route-north" className="map-route" d="M340 244 C315 185 315 135 335 78" />
              <path id="route-central" className="map-route" d="M340 244 C420 208 485 182 565 155" />
              <path id="route-east" className="map-route" d="M340 244 C435 253 515 272 610 302" />
              <path id="route-south" className="map-route" d="M340 244 C355 305 375 352 410 397" />
              <circle className="map-packet" r="4"><animateMotion dur="3.8s" repeatCount="indefinite"><mpath href="#route-france" /></animateMotion></circle>
              <circle className="map-packet" r="4"><animateMotion begin=".5s" dur="3.5s" repeatCount="indefinite"><mpath href="#route-north" /></animateMotion></circle>
              <circle className="map-packet" r="4"><animateMotion begin="1s" dur="4.2s" repeatCount="indefinite"><mpath href="#route-central" /></animateMotion></circle>
              <circle className="map-packet" r="4"><animateMotion begin="1.5s" dur="4.5s" repeatCount="indefinite"><mpath href="#route-east" /></animateMotion></circle>
              <circle className="map-packet" r="4"><animateMotion begin="2s" dur="4s" repeatCount="indefinite"><mpath href="#route-south" /></animateMotion></circle>
              <circle className="map-halo" cx="340" cy="244" r="30" />
              <circle className="map-origin" cx="340" cy="244" r="10" />
              <circle className="map-destination d-france" cx="120" cy="285" r="7" />
              <circle className="map-destination d-north" cx="335" cy="78" r="7" />
              <circle className="map-destination d-central" cx="565" cy="155" r="7" />
              <circle className="map-destination d-east" cx="610" cy="302" r="7" />
              <circle className="map-destination d-south" cx="410" cy="397" r="7" />
            </svg>
            <span className="map-label origin-label">Grand Est<small>Point de départ</small></span>
            <span className="map-label france-label">France entière</span>
            <span className="map-label north-label">Benelux &amp; Europe du Nord</span>
            <span className="map-label central-label">Allemagne &amp; Europe centrale</span>
            <span className="map-label east-label">Europe de l’Est</span>
            <span className="map-label south-label">Europe du Sud</span>
            <div className="map-legend"><span><i aria-hidden="true" /> Départ</span><span><i aria-hidden="true" /> Destination</span></div>
          </div>
        </div>
      </section>

      <section className="commitments section-shell" id="engagements" aria-labelledby="commitments-title">
        <div className="section-heading centered" data-reveal>
          <div>
            <p className="section-kicker">Nos engagements</p>
            <h2 id="commitments-title">La confiance à chaque étape.</h2>
          </div>
        </div>
        <div className="commitment-grid" data-reveal>
          <article><Clock3 aria-hidden="true" /><h3>Réactivité</h3><p>Une réponse rapide pour les besoins urgents comme pour les missions planifiées.</p></article>
          <article><ShieldCheck aria-hidden="true" /><h3>Fiabilité</h3><p>Des engagements clairs et une organisation adaptée aux contraintes annoncées.</p></article>
          <article><PackageCheck aria-hidden="true" /><h3>Suivi</h3><p>Des informations utiles pendant la mission et une confirmation à la livraison.</p></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-inner" data-reveal>
          <p className="section-kicker light">Un transport à organiser ?</p>
          <h2 id="contact-title">Parlons de votre prochaine mission.</h2>
          <p>Décrivez-nous votre besoin : nous vous répondrons rapidement avec une solution adaptée.</p>
          <div className="contact-options">
            <a href="tel:+33616294059"><span className="contact-icon"><Phone aria-hidden="true" /></span><span><small>Téléphone</small>+33 6 16 29 40 59</span></a>
            <a href="mailto:ludhimtransport@hotmail.com?subject=Demande%20de%20devis"><span className="contact-icon"><Mail aria-hidden="true" /></span><span><small>E-mail</small>ludhimtransport@hotmail.com</span></a>
          </div>
          <a className="button contact-button" href="mailto:ludhimtransport@hotmail.com?subject=Demande%20de%20devis">Demander un devis gratuit <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <div className="brand footer-brand">
            <span className="brand-box">LT</span><span className="brand-divider" aria-hidden="true" />
            <span className="brand-copy"><strong>LUDHIM</strong><small>Transport &amp; Logistiques</small></span>
          </div>
          <p>Grand Est · France · Europe</p>
          <p>SIREN 991 699 646</p>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>
    </main>
  );
}
