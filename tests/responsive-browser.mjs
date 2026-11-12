import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.LUDHIM_URL || "http://127.0.0.1:4173/";
const widths=[360,375,390,430,768,1024,1440];
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox"]});
let failures=[];
try{
 for(const width of widths){
  const height=width<=430?844:width<=768?1024:900;
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,isMobile:width<=430,hasTouch:width<=430});
  const errors=[];
  page.on("pageerror",error=>errors.push(String(error.message)));
  try{
   const response=await page.goto(base,{waitUntil:"domcontentloaded",timeout:25000});
   assert.equal(response.status(),200,"Homepage response");
   await page.locator(".studio-van").waitFor({state:"visible"});
   await page.locator(".reel-showcase").waitFor({state:"attached"});
   await page.waitForTimeout(500);
   const result=await page.evaluate(()=>{
    const measure=(selector)=>{
     const element=document.querySelector(selector);
     if(!element)return null;
     const rect=element.getBoundingClientRect();
     return {x:Math.round(rect.x),right:Math.round(rect.right),top:Math.round(rect.top),
      bottom:Math.round(rect.bottom),width:Math.round(rect.width),height:Math.round(rect.height),
      scroll:Math.round(element.scrollWidth),client:Math.round(element.clientWidth)};
    };
    const w=innerWidth;
    return {vw:w,documentWidth:document.documentElement.scrollWidth,
     bodyWidth:document.body.scrollWidth,
     hero:measure(".studio-hero"),stage:measure(".studio-stage"),
     headline:measure(".studio-hero h1"),headlineEm:measure(".studio-hero h1 em"),
     copy:measure(".studio-hero-copy"),product:measure(".studio-product"),
     cta:measure(".studio-btn-main"),ticker:measure(".studio-ticker"),
     lineup:measure(".reel-showcase"),lineupTitle:measure(".reel-showcase h2"),
     interlude:measure(".reel-interlude h2"),menu:measure(".menu-button"),
     vanLoaded:document.querySelector(".studio-van").naturalWidth>10,
     lineups:document.querySelectorAll("[data-reel-choice]").length};
   });
   console.log("LAYOUT "+JSON.stringify({width,result}));
   assert.ok(result.vanLoaded,"Image didn't load at "+width);
   assert.equal(result.lineups,3,"Missing product tabs");
   assert.ok(result.documentWidth<=width+2,"Document horizontal overflow at "+width+": "+result.documentWidth);
   assert.ok(result.headline?.scroll<=result.headline?.client+2,"Hero headline clipped at "+width);
   assert.ok(result.headlineEm?.scroll<=result.headlineEm?.client+2,"Hero highlight clipped at "+width);
   assert.ok(result.headline?.right<=width+3,"Headline outside viewport at "+width);
   assert.ok(result.cta?.right<=width+3,"CTA outside viewport at "+width);
   assert.ok(result.cta?.x>=-3,"CTA outside viewport left at "+width);
   if(width<=640){
    assert.ok(result.product.top>=result.copy.bottom-10,"Van overlaps hero text on mobile "+width);
    assert.ok(result.product.right<=width+3,"Product container outside viewport at "+width);
   }
   await page.locator('[data-reel-choice="dedie"]').click();
   await page.waitForTimeout(75);
   assert.equal(await page.locator('[data-reel-choice="dedie"]').getAttribute("aria-pressed"),"true");
   assert.match(await page.locator("[data-reel-title]").innerText(),/VOTRE TRAJET/);
   await page.locator('[data-reel-choice="suivi"]').click();
   assert.match(await page.locator("[data-reel-title]").innerText(),/PREUVE/);
   if(width<=920){
    const toggle=page.locator("[data-menu-button]");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-expanded"),"true");
    await page.locator('[data-mobile-nav] a[href="#devis"]').click();
    assert.equal(await toggle.getAttribute("aria-expanded"),"false");
   }
   assert.equal(errors.length,0,"JavaScript runtime errors: "+errors.join("; "));
   // One tiny screenshot per class to inspect real phone and desktop design.
   if([390,768,1440].includes(width)){
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.waitForTimeout(100);
    const buf=await page.screenshot({type:"jpeg",quality:55,fullPage:false});
    console.log("SCREENSHOT_"+width+"="+buf.toString("base64"));
    if(width===390||width===1440){
     for(const [section,label] of [[".reel-showcase","LINEUP"],[".reel-interlude","INTERLUDE"],[".footer","FOOTER"]]){
      await page.evaluate(sel=>{
       const el=document.querySelector(sel);
       if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-66,behavior:"instant"});
      },section);
      await page.waitForTimeout(220);
      const detail=await page.screenshot({type:"jpeg",quality:56,fullPage:false});
      console.log("SCREENSHOT_"+label+"_"+width+"="+detail.toString("base64"));
     }
    }
   }
  }catch(error){failures.push(width+": "+error.message);console.error("FAILED "+width+" "+error.stack);}
  finally{await page.close();}
 }
}finally{await browser.close();}
if(failures.length){
 console.error("RESPONSIVE_FAIL "+JSON.stringify(failures));
 process.exitCode=1;
}else{console.log("RESPONSIVE_OK: all "+widths.length+" viewport and interaction checks passed");}
