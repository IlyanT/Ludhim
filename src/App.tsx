"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import roadImage from "./assets/transport-hero.png";
import vanImage from "./assets/transport-van-cutout.png";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock3,
  FileSignature,
  Globe2,
  Mail,
  MapPin,
  MapPinned,
  Navigation,
  PackageCheck,
  Phone,
  Route,
  ShieldCheck,
  Smartphone,
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
    text: "Un véhicule et un trajet organisés exclusivement autour de votre marchandise et de votre échéance.",
  },
  {
    icon: Users,
    title: "Sous-traitance transport",
    text: "Un renfort fiable, ponctuel ou régulier, pour absorber vos flux et assurer la continuité de vos livraisons.",
  },
  {
    icon: Globe2,
    title: "France & Europe",
    text: "Missions régionales, nationales et européennes avec une organisation centralisée depuis le Grand Est.",
  },
];

const digitalFeatures = [
  {
    icon: Activity,
    title: "Suivi en temps réel",
    text: "L’avancement de la mission est suivi à chaque étape : prise en charge, chargement, départ, livraison et clôture.",
  },
  {
    icon: FileSignature,
    title: "e-CMR signé",
    text: "CMR numérique avec signatures expéditeur et destinataire, nom du signataire et horodatage.",
  },
  {
    icon: Camera,
    title: "Preuves terrain",
    text: "Photos de chargement et de déchargement rattachées directement à la mission pour une traçabilité claire.",
  },
  {
    icon: Smartphone,
    title: "Preuve de livraison",
    text: "Documents et validation de livraison centralisés pour retrouver rapidement la preuve d’exécution.",
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
              <a href="mailto:contact@ludhim.fr"><Mail size={15} aria-hidden="true" /> contact@ludhim.fr</a>
              <a href="tel:+33616294059"><Phone size={15} aria-hidden="true" /> +33 6 16 29 40 59</a>
              <span><MapPinned size={15} aria-hidden="true" /> Grand Est · France · Europe</span>
            </div>
            <span className="availability"><i aria-hidden="true" /> Disponible 24h/24 · 7j/7</span>
          </div>
        </div>

        <div className="nav-shell">
          <div className="section-shell nav-inner">
            <a className="brand brand-image-link" href="#accueil" aria-label="Ludhim — retour en haut">
              <img className="site-brand-logo" src="/logo-ludhim.svg" alt="Ludhim Transport et Logistique" />
            </a>
            <nav aria-label="Navigation principale">
              <a href="#accueil">Accueil</a>
              <a href="#services">Services</a>
              <a href="#suivi">Suivi &amp; e-CMR</a>
              <a href="#interventions">Interventions</a>
              <a href="#contact">Contact</a>
            </nav>
            <a className="nav-cta" href="#contact">Demander un devis <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-grid section-shell">
          <div className="hero-copy">
            <p className="hero-pill hero-enter delay-1"><Truck size={17} aria-hidden="true" /> Transport express piloté de bout en bout</p>
            <h1 className="hero-enter delay-2">Vos transports.<br /><span>Suivis jusqu’à la preuve de livraison.</span></h1>
            <p className="hero-text hero-enter delay-3">
              Courses urgentes, livraisons dédiées et sous-traitance en France et en Europe.
              Ludhim associe réactivité terrain, suivi de mission en temps réel et e-CMR numérique signé.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href="#contact">Demander un devis <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="button button-secondary" href="#suivi">Découvrir le suivi digital</a>
            </div>
            <div className="hero-proof hero-enter delay-5">
              <span><CheckCircle2 aria-hidden="true" /> Suivi de mission</span>
              <span><CheckCircle2 aria-hidden="true" /> e-CMR signé</span>
              <span><CheckCircle2 aria-hidden="true" /> Preuves de livraison</span>
            </div>
          </div>

          <div className="hero-visual hero-enter delay-3" aria-hidden="true">
            <div className="visual-circle" />
            <div className="dot-pattern" />
            <div className="route-stroke" />
            <img src={vanImage} alt="" />
            <div className="floating-card live-floating-card">
              <span className="live-dot" />
              <div><strong>Mission en cours</strong><span>Suivi actif · prochaine étape : livraison</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Nos principales prestations">
        <div className="section-shell">
          <span>Transport express</span><i />
          <span>Suivi en temps réel</span><i />
          <span>e-CMR numérique</span><i />
          <span>France &amp; Europe</span>
        </div>
      </section>

      <section className="about section-shell" data-reveal aria-labelledby="about-title">
        <div className="about-visual">
          <img src={roadImage} alt="Transport express sur un axe européen" />
          <div className="about-accent" aria-hidden="true" />
          <div className="about-label"><BadgeCheck size={22} aria-hidden="true" /><span><strong>Transport + traçabilité</strong>Une mission suivie jusqu’à sa clôture</span></div>
        </div>
        <div className="about-copy">
          <p className="section-kicker">Ludhim Transport</p>
          <h2 id="about-title">Du terrain au digital,<br />une seule chaîne de suivi.</h2>
          <p>
            Depuis le Grand Est, Ludhim Transport &amp; Logistique accompagne les professionnels
            pour leurs transports urgents, ponctuels ou réguliers en France et en Europe.
            Notre organisation digitale permet de conserver les informations utiles de la mission jusqu’à la preuve de livraison.
          </p>
          <ul>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Fiabilité</strong>Une organisation précise et des informations centralisées.</span></li>
            <li><Clock3 aria-hidden="true" /><span><strong>Réactivité</strong>Une prise en charge rapide lorsque chaque minute compte.</span></li>
            <li><PackageCheck aria-hidden="true" /><span><strong>Traçabilité</strong>Statuts, signatures et preuves rattachés à chaque course.</span></li>
          </ul>
        </div>
      </section>

      <section className="services" id="services" aria-labelledby="services-title">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">Nos services</p>
              <h2 id="services-title">Une solution transport<br />adaptée à vos contraintes.</h2>
            </div>
            <p>Urgence, destination, horaires, multi-chargements ou besoin récurrent : chaque mission est organisée selon votre exploitation.</p>
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

      <section className="digital-tracking" id="suivi" aria-labelledby="digital-title">
        <div className="section-shell digital-grid">
          <div className="digital-copy" data-reveal>
            <p className="section-kicker">Suivi digital Ludhim</p>
            <h2 id="digital-title">Votre transport reste visible<br />à chaque étape.</h2>
            <p className="digital-intro">
              Le transport ne s’arrête plus à un simple « chargé / livré ». Chaque mission est structurée,
              suivie et documentée pour réduire les échanges inutiles et accélérer la confirmation de livraison.
            </p>

            <div className="digital-feature-grid">
              {digitalFeatures.map(({icon:Icon,title,text})=>(
                <article className="digital-feature" key={title}>
                  <span className="digital-feature-icon"><Icon aria-hidden="true" /></span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>

          <div className="tracking-demo" data-reveal aria-label="Exemple d’un suivi de mission Ludhim">
            <div className="tracking-browser">
              <div className="tracking-browser-bar">
                <div className="browser-dots" aria-hidden="true"><i/><i/><i/></div>
                <span>LUDHIM · SUIVI MISSION</span>
                <small>EN DIRECT</small>
              </div>

              <div className="tracking-screen">
                <div className="tracking-head">
                  <div>
                    <small>MISSION LUD-2841</small>
                    <strong>Metz → Sochaux</strong>
                  </div>
                  <span className="status-live"><i/> En livraison</span>
                </div>

                <div className="tracking-route">
                  <div className="tracking-location"><MapPin/><div><small>CHARGEMENT</small><strong>Metz</strong><span>12:42 · confirmé</span></div></div>
                  <div className="tracking-road">
                    <span className="tracking-road-fill"/>
                    <span className="vehicle-dot"><Truck/></span>
                  </div>
                  <div className="tracking-location destination"><Navigation/><div><small>LIVRAISON</small><strong>Sochaux</strong><span>Prévue 15:30</span></div></div>
                </div>

                <div className="tracking-events">
                  <div className="tracking-event done"><CheckCircle2/><div><strong>Prise en charge</strong><span>12:27</span></div></div>
                  <div className="tracking-event done"><CheckCircle2/><div><strong>Chargement validé</strong><span>12:42</span></div></div>
                  <div className="tracking-event current"><Activity/><div><strong>Mission en cours</strong><span>Mise à jour en temps réel</span></div></div>
                  <div className="tracking-event"><PackageCheck/><div><strong>Livraison</strong><span>À venir</span></div></div>
                </div>

                <div className="ecmr-preview">
                  <div className="ecmr-icon"><FileSignature/></div>
                  <div className="ecmr-copy">
                    <small>DOCUMENT NUMÉRIQUE</small>
                    <strong>e-CMR</strong>
                    <span>Expéditeur signé · Destinataire à signer</span>
                  </div>
                  <span className="ecmr-badge">Horodaté</span>
                </div>

                <div className="proof-row">
                  <span><Camera/> Photos mission</span>
                  <span><ShieldCheck/> Preuves centralisées</span>
                </div>
              </div>
            </div>
            <div className="tracking-caption">
              <span><i/> Suivi opérationnel</span>
              <p>Un aperçu illustratif du parcours digital d’une mission Ludhim.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-title">
        <div className="section-heading centered" data-reveal>
          <div>
            <p className="section-kicker">Une mission Ludhim</p>
            <h2 id="process-title">Du devis à l’e-CMR signé.</h2>
          </div>
        </div>
        <div className="process-grid process-grid-four" data-reveal>
          <article><span>01</span><div className="process-icon"><Mail aria-hidden="true" /></div><h3>Votre demande</h3><p>Départ, destination, horaires, marchandise et contraintes de livraison.</p></article>
          <article><span>02</span><div className="process-icon"><Truck aria-hidden="true" /></div><h3>Prise en charge</h3><p>Le chauffeur démarre la mission, valide le chargement et les éléments nécessaires.</p></article>
          <article><span>03</span><div className="process-icon"><Activity aria-hidden="true" /></div><h3>Suivi en temps réel</h3><p>L’avancement est tracé pendant toute l’exécution de la course.</p></article>
          <article><span>04</span><div className="process-icon"><FileSignature aria-hidden="true" /></div><h3>Livraison &amp; e-CMR</h3><p>Signature, horodatage et preuve de livraison clôturent la mission.</p></article>
        </div>
      </section>

      <section className="coverage" id="interventions" aria-labelledby="coverage-title">
        <div className="coverage-grid section-shell">
          <div className="coverage-copy" data-reveal>
            <p className="section-kicker light">Zone d’intervention</p>
            <h2 id="coverage-title">Du Grand Est<br />vers toute l’Europe.</h2>
            <p>
              Nous organisons vos transports au départ du Grand Est vers la France et les destinations européennes,
              avec le même niveau de suivi du départ jusqu’à la livraison.
            </p>
            <div className="coverage-tags">
              <span>Grand Est</span><span>France</span><span>Benelux</span>
              <span>Allemagne</span><span>Europe du Sud</span><span>Europe de l’Est</span>
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
                  <stop offset="0" stopColor="#4d9438" />
                  <stop offset="0.4" stopColor="#79b55e" />
                  <stop offset="1" stopColor="#c8e6bd" />
                </linearGradient>
                <marker id="routeArrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
                  <path d="M0,0 L8,4 L0,8 Z" fill="#9fd38a" />
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
          <article><FileSignature aria-hidden="true" /><h3>Traçabilité digitale</h3><p>Statuts de mission, preuves terrain et e-CMR rassemblés autour d’un même transport.</p></article>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-inner" data-reveal>
          <p className="section-kicker light">Un transport à organiser ?</p>
          <h2 id="contact-title">Confiez-nous votre prochaine mission.</h2>
          <p>Décrivez-nous votre besoin : nous vous répondons rapidement avec une solution adaptée et un suivi clair de l’enlèvement à la livraison.</p>
          <div className="contact-options">
            <a href="tel:+33616294059"><span className="contact-icon"><Phone aria-hidden="true" /></span><span><small>Téléphone</small>+33 6 16 29 40 59</span></a>
            <a href="mailto:contact@ludhim.fr?subject=Demande%20de%20devis"><span className="contact-icon"><Mail aria-hidden="true" /></span><span><small>E-mail</small>contact@ludhim.fr</span></a>
          </div>
          <a className="button contact-button" href="mailto:contact@ludhim.fr?subject=Demande%20de%20devis">Demander un devis gratuit <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-inner">
          <a className="footer-logo-link" href="#accueil" aria-label="Ludhim — retour en haut">
            <img className="footer-logo" src="/logo-ludhim.svg" alt="Ludhim Transport et Logistique" />
          </a>
          <p>Grand Est · France · Europe</p>
          <p>SIREN 991 699 646</p>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>
    </main>
  );
}
