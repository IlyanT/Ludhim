import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {execFileSync} from "node:child_process";

const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
const css=readFileSync(new URL("../public/studio-2026.css",import.meta.url),"utf8");
const js=readFileSync(new URL("../public/studio-2026.js",import.meta.url),"utf8");
const original=readFileSync(new URL("../public/script.js",import.meta.url),"utf8");

test("studio hero has real navigation, customer CTAs, truck asset and mobile-friendly structure",()=>{
 assert.match(html,/class="hero studio-hero"/);
 assert.match(html,/id="hero-title"/);
 assert.match(html,/LA ROUTE/);
 assert.match(html,/SANS LIMITE/);
 assert.match(html,/href="#devis">DEMANDER UN TRANSPORT/);
 assert.match(html,/href="tel:\+33616294059"/);
 assert.match(html,/class="studio-hero-grid"/);
 assert.match(html,/class="studio-product"/);
 assert.match(html,/data-menu-button/);
 assert.match(html,/data-mobile-nav/);
});

test("three-service lineup updates visual and quote choice accessibly",()=>{
 for(const service of ["express","dedie","suivi"]){
  assert.match(html,new RegExp('data-reel-choice="'+service+'"'));
  assert.match(js,new RegExp('\\b'+service+': \\{'));
 }
 assert.match(html,/aria-pressed="true"/);
 assert.match(js,/setAttribute\("aria-pressed",String\(active\)\)/);
 assert.match(js,/link\.dataset\.serviceChoice/);
 assert.match(original,/\[data-service-choice\]/);
});

test("site retains every business section and all working tools",()=>{
 for(const id of ["accueil","expertise","services","suivi","flotte","couverture","methode","faq","devis"]){
  assert.match(html,new RegExp('id="'+id+'"'));
 }
 assert.match(html,/data-volume-config/);
 assert.match(html,/data-route-studio/);
 assert.match(html,/data-quote-form/);
 assert.match(html,/assets\/vendor\/leaflet\/leaflet.js/);
 assert.match(html,/e-CMR/);
});

test("site links and deployed assets resolve",()=>{
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const match of html.matchAll(/<a\s+[^>]*href="#([^"]+)"/g)){
  assert.ok(ids.has(match[1]),"Broken navigation: #"+match[1]);
 }
 for(const p of ["public/studio-2026.css","public/studio-2026.js","public/assets/van-cutout.webp",
 "public/assets/hero-night.webp","public/assets/vendor/leaflet/leaflet.js","public/logo-ludhim.svg","public/CNAME"]){
  assert.ok(existsSync(new URL("../"+p,import.meta.url)),"Missing: "+p);
 }
 assert.match(html,/href="\.\/studio-2026.css"/);
 assert.match(html,/src="\.\/studio-2026.js"/);
 assert.doesNotMatch(html,/cinematic-2026\.(css|js)/);
});

test("breakpoints include mobile, small mobile, tablet and reduce-motion",()=>{
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.match(css,/@media\(max-width:920px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/\.studio-hero-grid\{display:flex;flex-direction:column/);
 assert.match(css,/\.studio-product\{width:100%;min-height/);
 assert.match(css,/\.reel-showcase-modes\{display:grid;grid-template-columns:repeat\(3/);
 assert.match(js,/prefers-reduced-motion: reduce/);
 assert.match(js,/max-width: 920px/);
 assert.doesNotMatch(js,/addEventListener\("scroll"/);
});

test("the new UI script parses and does not depend on external CDN",()=>{
 execFileSync(process.execPath,["--check",new URL("../public/studio-2026.js",import.meta.url).pathname]);
 assert.doesNotMatch(js,/https?:\/\//);
});
