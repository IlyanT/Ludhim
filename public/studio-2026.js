/* LUDHIM STUDIO 2026 — simple, accessible service switching.
 * No heavy animation engine; mobile performance is prioritised.
 */
(() => {
 const services = {
  express: {
   title:"QUAND CHAQUE MINUTE COMPTE.",
   text:"Un transport urgent, une prise en charge réactive et un acheminement organisé directement vers votre destination.",
   label:"DEMANDER UN EXPRESS",
   service:"Transport express",
   backdrop:"EXPRESS"
  },
  dedie: {
   title:"VOTRE TRAJET. VOTRE PRIORITÉ.",
   text:"Un véhicule affecté à votre marchandise, sans groupage, avec une prise en charge adaptée à vos contraintes.",
   label:"ORGANISER UNE COURSE DÉDIÉE",
   service:"Course dédiée",
   backdrop:"DÉDIÉ"
  },
  suivi: {
   title:"LA PREUVE À CHAQUE ÉTAPE.",
   text:"Avancement de la mission, signatures horodatées et e-CMR : le transport reste documenté jusqu’à la livraison.",
   label:"PARLER DE VOTRE BESOIN",
   service:"Autre besoin",
   backdrop:"e-CMR"
  }
 };
 const root=document.querySelector("[data-reel-showcase]");
 if(!root)return;
 const buttons=[...root.querySelectorAll("[data-reel-choice]")];
 const title=root.querySelector("[data-reel-title]");
 const description=root.querySelector("[data-reel-description]");
 const link=root.querySelector("[data-reel-link]");
 const visual=root.querySelector("[data-reel-visual]");
 const backdrop=root.querySelector(".reel-showcase-giant");
 function select(name){
  const selected=services[name];
  if(!selected)return;
  if(title)title.textContent=selected.title;
  if(description)description.textContent=selected.text;
  if(backdrop)backdrop.textContent=selected.backdrop;
  if(visual)visual.dataset.mode=name;
  if(link){
   link.dataset.serviceChoice=selected.service;
   // No HTML injection: only user-independent product content.
   link.replaceChildren(document.createTextNode(selected.label+" "));
   const arrow=document.createElement("span");
   arrow.setAttribute("aria-hidden","true");
   arrow.textContent="↗";
   link.append(arrow);
  }
  buttons.forEach(button=>{
   const active=button.dataset.reelChoice===name;
   button.classList.toggle("is-active",active);
   button.setAttribute("aria-pressed",String(active));
  });
 }
 buttons.forEach(button=>button.addEventListener("click",()=>select(button.dataset.reelChoice)));
 select("express");

 // Respect the operating system's motion settings and avoid scroll-linked
 // transforms on touch screens (no layout jumps or jank when scrolling).
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const narrow=window.matchMedia("(max-width: 920px)").matches;
 if(reduceMotion||narrow||!("IntersectionObserver" in window))return;
 const revealElements=[...document.querySelectorAll(".studio-hero-copy,.studio-product,.reel-showcase-copy,.reel-showcase-visual")];
 if(!revealElements.length)return;
 revealElements.forEach(element=>element.setAttribute("data-studio-reveal",""));
 // Do not hide anything until the observer has been attached.
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add("studio-shown");
   observer.unobserve(entry.target);
  });
 },{threshold:.07,rootMargin:"0px 0px -5% 0px"});
 revealElements.forEach(element=>observer.observe(element));
 document.body.classList.add("studio-motion");
 // The hero is visible on initial paint: never animate it from invisible.
 revealElements.slice(0,2).forEach(element=>element.classList.add("studio-shown"));
})();
