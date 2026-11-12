import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {execFileSync} from "node:child_process";

const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const css=readFileSync(new URL("../public/cinematic-2026.css",import.meta.url),"utf8");
const js=readFileSync(new URL("../public/cinematic-2026.js",import.meta.url),"utf8");
const original=readFileSync(new URL("../public/script.js",import.meta.url),"utf8");

test("cinematic site has a real landing hero, accessible primary CTA and mobile navigation",()=>{
 assert.match(html,/class="hero cinematic-hero"/);
 assert.match(html,/id="hero-title"/);
 assert.match(html,/TOUJOURS/);
 assert.match(html,/EN MOUVEMENT/);
 assert.match(html,/href="#devis">ORGANISER UN TRANSPORT/);
 assert.match(html,/href="tel:\+33616294059"/);
 assert.match(html,/data-menu-button/);
 assert.match(html,/data-mobile-nav/);
});

test("interactive 3-mode lineup remains accessible and grounded in actual services",()=>{
 for(const service of ["express","dedie","suivi"]){
  assert.match(html,new RegExp('data-reel-choice="'+service+'"'));
  assert.match(js,new RegExp('\\b'+service+': \\{'));
 }
 assert.match(html,/aria-pressed="true"/);
 assert.match(js,/setAttribute\("aria-pressed",\s*String\(selected\)\)/);
 assert.match(js,/cta\.dataset\.serviceChoice/);
 assert.match(original,/\[data-service-choice\]/);
});

test("important content and working interactive transport tools survive the redesign",()=>{
 for(const id of ["accueil","expertise","services","suivi","flotte","couverture","methode","faq","devis"]){
  assert.match(html,new RegExp('id="'+id+'"'));
 }
 assert.match(html,/data-volume-config/);
 assert.match(html,/data-route-studio/);
 assert.match(html,/data-quote-form/);
 assert.match(html,/assets\/vendor\/leaflet\/leaflet.js/);
 assert.match(html,/app\.ludhim\.fr|e-CMR|e-CMR numérique/);
});

test("all internal section anchors and new local assets resolve",()=>{
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
 for(const match of html.matchAll(/<a\s+[^>]*href="#([^"]+)"/g)){
  assert.ok(ids.has(match[1]),"Broken navigation anchor #"+match[1]);
 }
 for(const path of ["public/cinematic-2026.css","public/cinematic-2026.js","public/assets/hero-night.webp",
  "public/assets/van-cutout.webp","public/assets/vendor/leaflet/leaflet.js","public/logo-ludhim.svg","public/CNAME"]){
  assert.ok(existsSync(new URL("../"+path,import.meta.url)),"Missing published asset: "+path);
 }
 assert.match(html,/href="\.\/cinematic-2026.css"/);
 assert.match(html,/src="\.\/cinematic-2026.js"/);
});

test("new motion keeps reduced-motion users and non-JS visitors supported",()=>{
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/\.motion-enabled \[data-cinematic-enter\]/);
 assert.match(css,/\[data-cinematic-enter\]\{opacity:1;transform:none\}/);
 assert.match(js,/prefers-reduced-motion: reduce/);
 assert.match(js,/window\.requestAnimationFrame/);
 assert.match(js,/passive: true/);
 assert.match(css,/@media \(max-width:640px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
});

test("the new interaction script is syntactically valid JavaScript",()=>{
 execFileSync(process.execPath,["--check",new URL("../public/cinematic-2026.js",import.meta.url).pathname]);
});
