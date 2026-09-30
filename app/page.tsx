"use client";
import PirpirStory from "./pirpir-story";

import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import ProjectExperience from "./project-experience";
import ToolDepth from "./tool-depth";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import {archiveRows,type ArchiveKey} from "./archive-data";
import { assetPath } from "./asset-path";

const ArchiveExperience=lazy(()=>import("./archive-experience"));
const HeroOrbit=lazy(()=>import("./hero-orbit"));

const projects = [
  {id:"01",name:"Pırpır",second:"Sakinleşiyor",type:"Interactive story / Browser game",description:"A children’s book becomes a playful, interactive encounter. Story, art direction and development meet in the browser.",url:"https://pirpirsakinlesiyor.com",domain:"pirpirsakinlesiyor.com",color:"#AED6CF",className:"play-project",action:"Play the game",role:"Art direction · Development",statement:"A little story.\nA world to play."},
  {id:"02",name:"Hayatı",second:"Anlamak",type:"Editorial platform / Web experience",description:"A digital space for reading and discovery. An editorial approach to navigating complex subjects with clarity and curiosity.",url:"https://hayatianlamak.com",domain:"hayatianlamak.com",color:"#91ADC8",className:"read-project",action:"Explore the website",role:"UI/UX · Development",statement:"Space to read.\nRoom to think."},
];

type Lang="en"|"tr";

const copy={
 en:{skip:"Skip to work",digital:"Digital",graphic:"Graphic",contact:"Contact",available:"Istanbul · Available",practice:"Selected creative practice",explore:"Explore work",section:"01 — Creative Development",sectionMeta:"Web / Interaction / Play",featured:"New & Featured",headline:<>From books to<br/><em>learning through play.</em></>,gameType:"Interactive story / Mobile game",gameDescription:"Inspired by Pırpır Sakinleşiyor, written and illustrated by Çağrı Odabaşı, this mobile experience invites children to recognise emotions and discover ways to calm down through play.",webType:"Editorial platform / Web experience",webDescription:"A scientific self-help series shaped by some of Türkiye’s pioneering voices in cognitive behavioral therapy, translated into a clear and accessible digital reading experience.",rightsType:"Publishing platform · Demo",rightsDescription:"A pre-release interactive platform designed for rights discovery and book exploration.",archiveTitle:<>Not a gallery.<br/><em>A place to explore.</em></>,archiveMeta:"categories · Selected work",archiveNote:"Read, turn, browse and move through the work. Each collection opens in the format that fits it best.",start:"03 — Start a conversation",everywhere:"Istanbul / Everywhere",mind:"Have something in mind?",make:<>LET’S MAKE<br/><em>IT HAPPEN.</em></>,selected:"Selected work"},
 tr:{skip:"Çalışmalara geç",digital:"Dijital",graphic:"Grafik",contact:"İletişim",available:"İstanbul · Müsait",practice:"Seçili yaratıcı çalışmalar",explore:"Çalışmaları keşfet",section:"01 — Yaratıcı Geliştirme",sectionMeta:"Web / Etkileşim / Oyun",featured:"Yeni & Öne Çıkan",headline:<>Kitaplardan<br/><em>oyunla öğrenmeye.</em></>,gameType:"İnteraktif hikâye / Mobil oyun",gameDescription:"Çağrı Odabaşı’nın yazıp resimlediği Pırpır Sakinleşiyor kitabından esinlenen bu mobil deneyim, çocukları duygularını tanımaya ve sakinleşme yollarını oyunla keşfetmeye davet ediyor.",webType:"Editoryal platform / Web deneyimi",webDescription:"Bilişsel davranışçı terapi alanının Türkiye’deki öncü isimlerinin hazırladığı bilimsel kendi kendine yardım serisini anlaşılır ve erişilebilir bir dijital okuma deneyimine dönüştüren platform.",rightsType:"Yayıncılık platformu · Demo",rightsDescription:"Yayın hakları ve kitap keşfi için tasarlanan, yayın öncesi etkileşimli platform demosu.",archiveTitle:<>Bir galeri değil.<br/><em>Keşif alanı.</em></>,archiveMeta:"kategori · Seçili çalışmalar",archiveNote:"Çalışmaları oku, çevir, kaydır ve yakından incele. Her koleksiyon kendisine en uygun sunum biçimiyle açılır.",start:"03 — İletişime geç",everywhere:"İstanbul / Her yer",mind:"Aklında bir proje mi var?",make:<>BİRLİKTE<br/><em>ÜRETELİM.</em></>,selected:"Seçili çalışmalar"}
} as const;

function FlagIcon({language}:{language:Lang}){
 if(language==="tr")return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#e30a17"/><circle cx="13" cy="16" r="8" fill="white"/><circle cx="15.5" cy="16" r="6.4" fill="#e30a17"/><path fill="white" d="m20.5 12.8 1 2.2 2.4.2-1.8 1.6.6 2.4-2.2-1.3-2.1 1.3.5-2.4-1.8-1.6 2.5-.2z"/></svg>;
 return <svg viewBox="0 0 32 32" aria-hidden="true"><defs><clipPath id="flag-circle"><circle cx="16" cy="16" r="16"/></clipPath></defs><g clipPath="url(#flag-circle)"><path fill="#22438b" d="M0 0h32v32H0z"/><path stroke="white" strokeWidth="7" d="M-2-2 34 34M34-2-2 34"/><path stroke="#cf1b2b" strokeWidth="3" d="M-2-2 34 34M34-2-2 34"/><path stroke="white" strokeWidth="10" d="M16 0v32M0 16h32"/><path stroke="#cf1b2b" strokeWidth="5.5" d="M16 0v32M0 16h32"/></g></svg>;
}

function BehanceIcon(){return <svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="3" fill="#1769ff"/><path fill="#fff" d="M10.1 8.4h6.1c3.35 0 5.4 1.5 5.4 4.24 0 1.75-.88 2.96-2.25 3.46 1.84.52 2.92 1.9 2.92 3.94 0 3.08-2.38 4.96-6.1 4.96h-6.07V8.4Zm5.32 6.4c1.4 0 2.15-.52 2.15-1.67 0-1.12-.8-1.6-2.36-1.6h-1.38v3.27h1.6Zm.27 7.04c1.78 0 2.67-.61 2.67-1.94 0-1.29-.93-1.85-2.74-1.85h-1.8v3.79h1.87ZM22.1 9.45h5.3v1.27h-5.3z"/></svg>}
function LinkedInIcon(){return <svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="3" fill="#0A66C2"/><path fill="#fff" d="M9.1 12.6h3.2V23H9.1V12.6ZM10.7 8.1a1.86 1.86 0 1 1 0 3.72 1.86 1.86 0 0 1 0-3.72ZM14.4 12.6h3.06v1.42h.04c.43-.8 1.47-1.65 3.04-1.65 3.25 0 3.85 2.13 3.85 4.9V23h-3.2v-5.08c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V23h-3.13V12.6Z"/></svg>}
function InstagramIcon(){return <svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="instagram-gradient" x1="3" y1="29" x2="29" y2="3" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD521"/><stop offset=".48" stopColor="#F43464"/><stop offset="1" stopColor="#7A39C1"/></linearGradient></defs><rect width="32" height="32" rx="8" fill="url(#instagram-gradient)"/><rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="21.7" cy="10.45" r="1.25" fill="#fff"/></svg>}

export default function Home(){
 const root=useRef<HTMLElement>(null);
 const featured=useRef<HTMLDivElement>(null);
 const [selected,setSelected]=useState<ArchiveKey|null>(null);
 const [lang,setLang]=useState<Lang>("en");
 const [featuredBurst,setFeaturedBurst]=useState(false);
 const t=copy[lang];

 useEffect(()=>{document.documentElement.lang=lang},[lang]);
 useEffect(()=>{const el=featured.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setFeaturedBurst(true);observer.disconnect()}},{threshold:.35});observer.observe(el);return()=>observer.disconnect()},[]);

 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    gsap.from(".legacy-hero-word",{yPercent:115,rotate:2,duration:1.15,stagger:.08,ease:"power4.out"});
    gsap.from(".legacy-hero-meta > *, .legacy-hero-kicker > *",{opacity:0,y:15,duration:.8,delay:.55,stagger:.06});
    gsap.to(".reading-progress",{scaleX:1,ease:"none",scrollTrigger:{trigger:root.current,start:"top top",end:"bottom bottom",scrub:true}});
    gsap.to(".legacy-ticker-track",{xPercent:-50,duration:24,ease:"none",repeat:-1});
    const journey=gsap.timeline({scrollTrigger:{trigger:".opening-journey",start:"top top",end:"bottom bottom",scrub:.35,invalidateOnRefresh:true}});
    const letters=gsap.utils.toArray<HTMLElement>(".hero-letter");
    letters.forEach((letter,i)=>{
      const at=(i%7)*.035;
      journey.to(letter,{z:620,rotationY:(i%3-1)*8,duration:.72,ease:"power2.in"},at)
        .to(letter,{opacity:0,duration:.2,ease:"none"},at+.52);
    });
    journey.to(".legacy-hero-orbit",{z:560,opacity:0,duration:.8,ease:"power2.in"},.08)
      .to(".legacy-hero-kicker,.legacy-hero-meta",{opacity:0,duration:.28},0);
    const toolPlanes=gsap.utils.toArray<HTMLElement>(".tool-depth-plane");
    toolPlanes.forEach((plane,i)=>{
      const at=1+i*2.25;
      journey.fromTo(plane,{autoAlpha:0,z:-1400},{autoAlpha:1,z:0,duration:.62,ease:"power2.out"},at)
        .to(plane,{autoAlpha:1,z:0,duration:1.02,ease:"none"},at+.66)
        .to(plane,{autoAlpha:0,z:1250,duration:.78,ease:"power2.in"},at+1.72);
    });
    gsap.utils.toArray<HTMLElement>(".reveal").forEach(el=>gsap.from(el,{opacity:0,duration:.5,scrollTrigger:{trigger:el,start:"top 96%",once:true}}));
   },root);
   return ()=>ctx.revert();
  });
  return ()=>mm.revert();
 },[]);
 return <main ref={root}>
  <div className="reading-progress" aria-hidden="true"/>
  <a className="skip-link" href="#digital">{t.skip}</a>
  <nav className="legacy-nav"><a href="#top" className="legacy-monogram" aria-label="Rıza Altun home"><img src={assetPath("/riza-altun-logo.png")} alt="Rıza Altun" width="2048" height="682"/></a><div className="legacy-nav-links"><a href="#digital">{t.digital}</a><a href="#graphic">{t.graphic}</a><a href="#contact">{t.contact}</a></div><div className="legacy-nav-actions"><span className="legacy-availability"><i/> {t.available}</span><button type="button" className="language-toggle" onClick={()=>setLang(current=>current==="en"?"tr":"en")} aria-label={lang==="en"?"Türkçe görüntüle":"View in English"} title={lang==="en"?"Türkçe":"English"}><FlagIcon language={lang==="en"?"tr":"en"}/></button></div></nav>
  <div className="opening-journey" id="top"><div className="opening-stage"><header className="legacy-hero">
   <h1 aria-label="Art Design Technology"><span className="legacy-word-mask" aria-hidden="true"><span className="legacy-hero-word">{Array.from("ART").map((letter,i)=><span className="hero-letter" key={i}>{letter}</span>)}</span></span><span className="legacy-word-mask" aria-hidden="true"><span className="legacy-hero-word legacy-outline">{Array.from("DESIGN").map((letter,i)=><span className="hero-letter" key={i}>{letter}</span>)}</span></span><span className="legacy-word-mask" aria-hidden="true"><span className="legacy-hero-word legacy-accent">{Array.from("TECHNOLOGY").map((letter,i)=><span className="hero-letter" key={i}>{letter}</span>)}</span></span></h1>
   <div className="legacy-hero-orbit" aria-hidden="true"><Suspense fallback={null}><HeroOrbit/></Suspense></div>
   <div className="legacy-hero-meta"><p>Graphic Designer <b>·</b> Creative Developer <b>·</b> AI Creative Technologist</p><div className="hero-socials" aria-label="Social profiles"><a href="https://www.linkedin.com/in/rzaaltn/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a><a href="https://www.behance.net/rzaaltun" target="_blank" rel="noreferrer" aria-label="Behance"><BehanceIcon/></a><a href="https://www.instagram.com/rzaaltunn/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon/></a></div><a className="hero-explore" href="#digital">{t.explore} <ArrowDownRight size={18}/></a></div>
  </header><ToolDepth lang={lang}/></div></div>
  <div className="legacy-ticker" aria-hidden="true"><div className="legacy-ticker-track"><span>DESIGN THAT MOVES — CODE THAT COMMUNICATES — PLAYFUL DIGITAL EXPERIENCES — </span><span>DESIGN THAT MOVES — CODE THAT COMMUNICATES — PLAYFUL DIGITAL EXPERIENCES — </span></div></div>
  <section className="digital" id="digital">
   <div className="section-intro reveal"><div className="section-label"><span>{t.section}</span><span>{t.sectionMeta}</span></div><div className="featured-heading"><h2>{t.headline}</h2><div ref={featured} className={`featured-badge-wrap ${featuredBurst?"is-bursting":""}`}><div className="featured-label"><span>{t.featured}</span></div><span className="featured-confetti" aria-hidden="true">{Array.from({length:18},(_,i)=><b key={i} style={{"--burst-x":`${((i%9)-4)*31}px`,"--burst-y":`${(i<9?-1:1)*(62+(i%4)*15)}px`,"--burst-r":`${80+i*47}deg`,"--burst-delay":`${(i%5)*40}ms`} as CSSProperties}/>)}</span></div></div></div>
   {projects.map(p=><article className={`digital-project ${p.className} ${p.id!=="01"?"website-project":""}`} key={p.id} style={{"--project-color":p.color} as CSSProperties}>
    <div className="compact-project-copy"><p className="eyebrow">/{p.id} · {p.id==="01"?t.gameType:t.webType}</p><h3>{p.name} <em>{p.second}</em></h3><p>{p.id==="01"?t.gameDescription:t.webDescription}</p></div>
    <div className="project-stage"><ProjectExperience lang={lang} kind={p.id==="01"?"game":"website"} title={p.name+" "+p.second} description={p.id==="01"?t.gameDescription:t.webDescription} type={p.id==="01"?t.gameType:t.webType} url={p.url}/></div>
   {p.id==="01"&&<PirpirStory lang={lang}/>}</article>)}
   <article className="digital-project website-project reveal"><div className="compact-project-copy"><p className="eyebrow">/03 · {t.rightsType}</p><h3>Epsilon <em>Rights</em></h3><p>{t.rightsDescription}</p></div><div className="project-stage"><ProjectExperience lang={lang} kind="website" title="Epsilon Rights" description={t.rightsDescription} type={t.rightsType} url={assetPath("/demos/epsilon-rights.html")} demo/></div></article>
  </section>
  <section className="legacy-graphic-section" id="graphic"><div className="legacy-section-head reveal"><div><p>02 / Graphic Design</p><h2>{t.archiveTitle}</h2></div><span>{archiveRows.length} {t.archiveMeta}</span></div>
   <div className="legacy-graphic-rows">{archiveRows.map((item)=><button className="legacy-graphic-row reveal" style={{"--row-color":item.color} as CSSProperties} key={item.key} onClick={()=>setSelected(item.key)} aria-label={`${lang==="en"?"Explore":"İncele"} ${lang==="en"?item.titleEn:item.title}`}><span>{item.no}</span><div><strong>{lang==="en"?item.titleEn:item.title}</strong><small>{lang==="en"?item.noteEn:item.note}</small></div><ArrowUpRight/></button>)}</div>
   <p className="legacy-book-note reveal">{t.archiveNote}</p>
  </section>
  <footer className="contact" id="contact"><div className="section-label"><span>{t.start}</span><span>{t.everywhere}</span></div><div className="contact-main reveal"><p>{t.mind}</p><a className="contact-title" href="mailto:design@rizaaltun.com">{t.make}<ArrowUpRight aria-hidden="true"/></a><a className="email" href="mailto:design@rizaaltun.com">design@rizaaltun.com<ArrowUpRight size={20}/></a></div><div className="footer-bottom"><a className="signature" href="#top" aria-label={lang==="en"?"Back to top":"Yukarı dön"}><img src={assetPath("/riza-altun-logo.png")} alt="Rıza Altun" width="2048" height="682"/></a><div className="socials">{[["Behance","https://www.behance.net/rzaaltun"],["LinkedIn","https://www.linkedin.com/in/rzaaltn/"],["GitHub","https://github.com/rizaaltun"],["@rzaaltunn","https://www.instagram.com/rzaaltunn/"]].map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name}<ArrowUpRight size={14}/></a>)}</div><span>© 2026 Rıza Altun</span></div></footer>
  <Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="experience-dialog" style={{position:"fixed",inset:"12px",width:"calc(100vw - 24px)",height:"calc(100dvh - 24px)",maxWidth:"none",maxHeight:"none",transform:"none",translate:"none",margin:0,padding:0,display:"block",overflow:"auto",animation:"none",zIndex:60}}><div className="archive-dialog-heading"><DialogTitle>{lang==="en"?archiveRows.find(item=>item.key===selected)?.titleEn:archiveRows.find(item=>item.key===selected)?.title}</DialogTitle><DialogDescription>Rıza Altun · {t.selected}</DialogDescription></div>{selected&&<Suspense fallback={<div className="archive-loading">{lang==="en"?"Loading collection…":"Koleksiyon yükleniyor…"}</div>}><ArchiveExperience type={selected} lang={lang}/></Suspense>}</DialogContent></Dialog>
 </main>;
}
