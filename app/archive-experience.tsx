"use client";
import {useEffect,useRef,useState} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight,Maximize2,Heart,MessageCircle,Send,Bookmark} from "lucide-react";
import {Dialog,DialogContent,DialogTitle} from "@/components/ui/dialog";
import type {ArchiveKey} from "./archive-data";
import { assetPath } from "./asset-path";

const files=(folder:string,prefix:string,ids:number[])=>ids.map(i=>`/showcase/${folder}/${prefix}-${String(i).padStart(2,"0")}.webp`);
function Lightbox({src,close,lang="en"}:{src:string;close:()=>void;lang?:"en"|"tr"}){
 return <Dialog open onOpenChange={open=>{if(!open)close()}}><DialogContent className="artwork-zoom" style={{position:"fixed",inset:12,width:"calc(100vw - 24px)",height:"calc(100dvh - 24px)",maxWidth:"none",transform:"none",translate:"none",animation:"none",display:"grid",padding:30,background:"#101318",zIndex:90}}><DialogTitle className="sr-only">{lang==="en"?"Enlarged artwork":"Çalışmanın büyük görünümü"}</DialogTitle><img src={assetPath(src)} alt={lang==="en"?"Selected artwork enlarged":"Seçili tasarımın büyük görünümü"}/></DialogContent></Dialog>;
}
function Gallery({images,title,lang="en"}:{images:string[];title:string;lang?:"en"|"tr"}){
 const [focus,setFocus]=useState<string|null>(null);
 return <div className="v10-gallery"><div className="v10-gallery-grid">{images.map((src,i)=><button onClick={()=>setFocus(src)} key={src} aria-label={`${title} ${i+1} ${lang==="en"?"enlarge":"büyüt"}`}><img src={assetPath(src)} alt={`${title} ${i+1}`} loading="lazy"/><span>{String(i+1).padStart(2,"0")}<Maximize2 size={16}/></span></button>)}</div>{focus&&<Lightbox src={focus} close={()=>setFocus(null)} lang={lang}/>}</div>;
}
const issues=["myd-49-tr","myd-50-eng","myd-51-tr","myd-52-tr","myd-53-eng"];
function Editorial({lang}:{lang:"en"|"tr"}){
 const [issue,setIssue]=useState<string|null>(null);
 const shelf=useRef<HTMLDivElement>(null);
 const moveShelf=(e:React.PointerEvent<HTMLDivElement>)=>{if(e.pointerType!=="mouse"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;shelf.current?.style.setProperty("--shelf-x",`${-x*70}px`);shelf.current?.style.setProperty("--shelf-angle",`${x*4}deg`)};
 return <div className={`v10-magazines ${issue?"reading":""}`}>
 <p className="v10-hint">{issue?(lang==="en"?"Drag anywhere on the page to turn it, or use the arrow keys.":"Sayfanın herhangi bir yerinden tutup sola veya sağa sürükle. Ok tuşlarını da kullanabilirsin."):(lang==="en"?"Choose a magazine and turn its pages to explore.":"Bir dergi seç; sayfalarını tutup çevirerek incele.")}</p>
 <div className="magazine-shelf-window" onPointerMove={moveShelf} onPointerLeave={()=>{shelf.current?.style.setProperty("--shelf-x","0px");shelf.current?.style.setProperty("--shelf-angle","0deg")}}><div className="v10-magazine-row" ref={shelf}>{issues.map((id,i)=><button key={id} aria-pressed={issue===id} onClick={()=>setIssue(id)}><img src={assetPath(`/magazines/${id}/pages/00.webp`)} alt={`MYD ${49+i} kapağı`}/><span>MYD {49+i} · {id.endsWith("tr")?"TR":"ENG"}</span></button>)}</div></div>
 {issue&&<div className="v10-magazine-reader"><button className="v10-back" onClick={()=>setIssue(null)}><ArrowLeft size={17}/>{lang==="en"?"All magazines":"Tüm dergiler"}</button><iframe loading="lazy" key={issue} src={assetPath(`/magazines/${issue}/index.html`)} title={`MYD ${issue.slice(4,6)} ${lang==="en"?"page-turn reader":"sayfa çevirme okuyucusu"}`}/></div>}
 </div>;
}
function Catalog({lang}:{lang:"en"|"tr"}){
 return <div className="v10-catalog"><p className="v10-hint">{lang==="en"?"The catalogue opens at the contents page. Drag anywhere on a page, tap an edge, or use the arrow keys to explore it.":"Katalog içindekiler sayfasından açılır. İncelemek için sayfanın herhangi bir yerinden tutup sürükle, kenarına dokun veya ok tuşlarını kullan."}</p><iframe loading="lazy" src={assetPath(`/catalogs/boardbook/index.html?lang=${lang}`)} title={lang==="en"?"Board Book catalogue page-turn reader":"Board Book katalog sayfa çevirme okuyucusu"}/></div>;
}

const digitalVitrine=Array.from({length:63},(_,i)=>String(i+1).padStart(2,"0"));
function DigitalVitrine({lang}:{lang:"en"|"tr"}){
 const [focus,setFocus]=useState<string|null>(null);
 return <div className="v10-digital-vitrin"><p className="v10-hint">{lang==="en"?"A selection of publishing campaigns, banners and digital launch visuals. Tap an image to enlarge it.":"Yayıncılık kampanyaları, bannerlar ve dijital lansman görsellerinden seçki. Büyütmek için görsele dokun."}</p><div className="v10-digital-vitrin-grid">{digitalVitrine.map((id,i)=>{const desktop=`/showcase/digital-vitrin/desktop/${id}.webp`;return <button key={id} onClick={()=>setFocus(desktop)} aria-label={`${lang==="en"?"Enlarge digital design":"Dijital tasarımı büyüt"} ${i+1}`}><picture><source media="(max-width: 800px)" srcSet={assetPath(`/showcase/digital-vitrin/mobile/${id}.webp`)}/><img src={assetPath(desktop)} alt={`${lang==="en"?"Digital publishing design":"Dijital yayıncılık tasarımı"} ${i+1}`} loading="lazy"/></picture><span>{String(i+1).padStart(2,"0")}<Maximize2 size={16}/></span></button>})}</div>{focus&&<Lightbox src={focus} close={()=>setFocus(null)} lang={lang}/>}</div>;
}
const fairs=[
 {name:"Jeff Kinney İstanbul etkinlikleri",nameEn:"Jeff Kinney Istanbul Events",note:"Etkinlik tasarımları ve uygulamaları",noteEn:"Event graphics and applications",cover:"/showcase/jeff/03.webp",images:Array.from({length:8},(_,i)=>`/showcase/jeff/${String(i+1).padStart(2,"0")}.webp`)},
 {name:"Isadora Moon",nameEn:"Isadora Moon",note:"D&R · Etkinlik tasarımı",noteEn:"D&R · Event design",cover:"/showcase/event/isadora-01.webp",images:files("event","isadora",[1,2,3,4,5,6])},
 {name:"Automechanika İstanbul",nameEn:"Automechanika Istanbul",note:"Otomotiv · Stand ve ışıklı pano tasarımları",noteEn:"Automotive · Stand and illuminated panel design",cover:"/showcase/fair-istanbul/panel-05.webp",images:files("fair-istanbul","panel",[5,3,6,8,11,13,15])},
 {name:"Automechanika Buenos Aires",nameEn:"Automechanika Buenos Aires",note:"Otomotiv · Uluslararası fuar iletişimi",noteEn:"Automotive · International fair communication",cover:"/showcase/fair-buenos/buenos-08.webp",images:files("fair-buenos","buenos",[8,1,2,3,4,5,7,9,10,11,12])},
 {name:"SAHA Expo",nameEn:"SAHA Expo",note:"Savunma ve havacılık · Mekânsal grafik",noteEn:"Defense and aerospace · Spatial graphics",cover:"/showcase/fair-saha/wall-01.webp",images:files("fair-saha","wall",[1,2,3])},
 {name:"Sakarya Çocuk Edebiyat Fuarı",nameEn:"Sakarya Children’s Literature Fair",note:"Yayıncılık · Fuar uygulamaları",noteEn:"Publishing · Fair applications",cover:"/showcase/fair-sakarya/photo-01.webp",images:files("fair-sakarya","photo",[1,3,4])},
];
function Exhibition({lang}:{lang:"en"|"tr"}){
 const [chosen,setChosen]=useState<number|null>(null);
 if(chosen!==null)return <div className="v10-fair-detail"><div className="v10-detail-heading"><button className="v10-back" onClick={()=>setChosen(null)}><ArrowLeft size={17}/>{lang==="en"?"Back to fairs and events":"Fuar ve etkinliklere dön"}</button><h3>{lang==="en"?fairs[chosen].nameEn:fairs[chosen].name}</h3><p>{lang==="en"?fairs[chosen].noteEn:fairs[chosen].note}</p></div><Gallery images={fairs[chosen].images} title={lang==="en"?fairs[chosen].nameEn:fairs[chosen].name} lang={lang}/></div>;
 return <div className="v10-fair-selector">{fairs.map((fair,i)=><button key={fair.name} onClick={()=>setChosen(i)} className="v10-fair-entry"><img src={assetPath(fair.cover)} alt="" loading="lazy"/><span className="v10-fair-number">0{i+1}</span><span className="v10-fair-label"><strong>{lang==="en"?fair.nameEn:fair.name}</strong><small>{lang==="en"?fair.noteEn:fair.note}</small></span><ArrowUpRight/></button>)}</div>;
}
function ImageSequence({images,labels,title,lang="en"}:{images:string[];labels?:string[];title:string;lang?:"en"|"tr"}){
 const [index,setIndex]=useState(0),[focus,setFocus]=useState<string|null>(null);
 useEffect(()=>{images.forEach(src=>{const img=new Image();img.src=assetPath(src)})},[images]);
 const move=(delta:number)=>setIndex(v=>(v+delta+images.length)%images.length);
 return <div className="v10-sequence">
 <div className="v10-sequence-bar"><button onClick={()=>move(-1)} aria-label={lang==="en"?"Previous image":"Önceki görsel"}><ArrowLeft size={20}/></button><span aria-live="polite">{labels?.[index]??title} · {index+1} / {images.length}</span><button onClick={()=>move(1)} aria-label={lang==="en"?"Next image":"Sonraki görsel"}><ArrowRight size={20}/></button></div>
 <button className="v10-sequence-image" onClick={()=>setFocus(images[index])} aria-label={lang==="en"?"Enlarge image":"Görseli büyüt"}><img src={assetPath(images[index])} alt={`${title} · ${labels?.[index]??index+1}`}/><Maximize2 size={19}/></button>
 <div className="v10-sequence-thumbs">{images.map((src,i)=><button key={src} aria-pressed={i===index} aria-label={`${lang==="en"?"Image":"Görsel"} ${i+1}`} onClick={()=>setIndex(i)}><img src={assetPath(src)} alt=""/></button>)}</div>
 {focus&&<Lightbox src={focus} close={()=>setFocus(null)} lang={lang}/>}
 </div>;
}
const eventImages=files("event","isadora",[1,2,3,4,5,6]);
function EventStory(){return <div className="v10-event"><div className="v10-short-title"><span>Etkinlik / D&R</span><h3>Isadora Moon</h3></div><ImageSequence images={eventImages} title="Isadora Moon etkinliği"/></div>}

function Campaign({lang}:{lang:"en"|"tr"}){
 const [brand,setBrand]=useState("Metadiag");
 return <div className="social-room"><div className="social-intro"><p>{lang==="en"?"Social Media Design":"Sosyal Medya Tasarımı"}</p><h3>{lang==="en"?<>In the feed.<br/><em>Focused by design.</em></>:<>Akışın içinde.<br/><em>Tasarımın odağında.</em></>}</h3><div className="social-brands">{[["Metadiag",lang==="en"?"Automotive":"Otomotiv"],["Miaport",lang==="en"?"Real estate":"Gayrimenkul"]].map(([name,sector])=><button key={name} aria-pressed={brand===name} onClick={()=>setBrand(name)}>{sector}</button>)}</div><p>{lang==="en"?"Swipe through the posts. Tap an image to enlarge it.":"Gönderileri yana kaydırarak incele. Görseli büyütmek için üzerine dokun."}</p></div><SocialPost key={brand} brand={brand} lang={lang}/></div>;
}
function SocialPost({brand,lang}:{brand:string;lang:"en"|"tr"}){
 const images=brand==="Metadiag"?files("social/metadiag","post",[1,2,3,4,5,6]):files("social","miaport",[1,2,4]);
 const rail=useRef<HTMLDivElement>(null);const [index,setIndex]=useState(0),[focus,setFocus]=useState<string|null>(null);
 const sector=brand==="Metadiag"?"Otomotiv":"Gayrimenkul";
 const select=(i:number)=>rail.current?.scrollTo({left:i*rail.current.clientWidth,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
 return <><article className="instagram-post"><header><span className="instagram-avatar">{brand.slice(0,1)}</span><strong>{brand}</strong><small className="instagram-sector">{lang==="en"?(sector==="Otomotiv"?"Automotive":"Real estate"):sector}</small></header><div className="instagram-picture"><div className="instagram-slides" ref={rail} onScroll={e=>{const el=e.currentTarget;if(el.clientWidth)setIndex(Math.max(0,Math.min(images.length-1,Math.round(el.scrollLeft/el.clientWidth))))}}>{images.map((src,i)=><button key={src} onClick={()=>setFocus(src)} aria-label={`${brand} ${lang==="en"?"post":"gönderi"} ${i+1}`}><img src={assetPath(src)} alt={`${brand} ${lang==="en"?"social media design":"sosyal medya tasarımı"} ${i+1}`} loading="lazy"/></button>)}</div><span className="instagram-count" aria-live="polite">{index+1} / {images.length}</span>{index>0&&<button className="instagram-prev" onClick={()=>select(index-1)} aria-label={lang==="en"?"Previous post":"Önceki gönderi"}><ArrowLeft size={18}/></button>}{index<images.length-1&&<button className="instagram-next" onClick={()=>select(index+1)} aria-label={lang==="en"?"Next post":"Sonraki gönderi"}><ArrowRight size={18}/></button>}</div><div className="instagram-icons" aria-hidden="true"><Heart/><MessageCircle/><Send/><Bookmark/></div><div className="instagram-dots">{images.map((src,i)=><button key={src} aria-label={`${lang==="en"?"Post":"Gönderi"} ${i+1}`} aria-pressed={index===i} onClick={()=>select(i)}/>)}</div><footer><strong>{brand}</strong><span>{lang==="en"?"Selected social media designs":"Sosyal medya tasarım seçkisi"}</span></footer></article>{focus&&<Lightbox src={focus} close={()=>setFocus(null)} lang={lang}/>}</>;
}
type Product={name:string;label:string;cover:string;images:string[];labels:string[];concept?:boolean;description?:string};
const products:Product[]=[
 {name:"ADCO Defter",label:"Kurumsal defter tasarımı",cover:"/showcase/covers/adco-notebook.webp",images:["/showcase/covers/adco-notebook.webp","/showcase/interiors/adco-back.webp","/showcase/interiors/adco-open.webp"],labels:["Ön kapak","Arka kapak","İç sayfalar"]},
 {name:"Altıntaş Defter",label:"Kurumsal defter tasarımı",cover:"/showcase/covers/altintas-notebook.webp",images:["/showcase/covers/altintas-notebook.webp","/showcase/interiors/altintas-back.webp","/showcase/interiors/altintas-open.webp"],labels:["Ön kapak","Arka kapak","İç sayfa"]},
 {name:"Bez Çantalar",label:"ADCO · Altıntaş",cover:"/showcase/covers/tote.webp",images:["/showcase/covers/tote.webp","/showcase/interiors/altintas-tote.webp"],labels:["ADCO","Altıntaş"]},
 {name:"Yılbaşı Kupaları",label:"Üç ürün varyantı",cover:"/showcase/covers/mugs.webp",images:["/showcase/covers/mugs.webp","/showcase/interiors/mugs-02.webp","/showcase/interiors/mugs-03.webp"],labels:["Desenli seri","Karakterli seri","Yeni yıl serisi"]},
 {name:"Duvar Saatleri",label:"ADCO · Kurumsal ürün",cover:"/showcase/covers/clock.webp",images:["/showcase/covers/clock.webp",...files("clock-series","clock",[1,2,3,4,5,6,7,8,10])],labels:["Tasarım 9",...Array.from({length:8},(_,i)=>`Tasarım ${i+1}`),"Tasarım 10"]},
 {name:"Yaka Rozeti",label:"DEİK · Kurumsal aksesuar",cover:"/showcase/covers/pin.webp",images:["/showcase/covers/pin.webp"],labels:["Yaka rozeti"]},
];
const concepts:Product[]=[
 {name:"Sekiz / Zaman",label:"Kol saati · Ürün ve yüzey tasarımı",cover:"/showcase/concepts/selcuk-watch.webp",images:["/showcase/concepts/selcuk-watch.webp"],labels:["Konsept sunumu"],concept:true,description:"Sekiz köşeli yıldız geometrisini çağdaş bir saat kadranına taşıyan bağımsız tasarım araştırması. Metal yüzey, ince geometrik işleme ve koyu petrol mavisi kayış."},
 {name:"Lale / Günlük Ritüel",label:"Porselen · Ambalaj ve koleksiyon",cover:"/showcase/concepts/tulip-porcelain.webp",images:["/showcase/concepts/tulip-porcelain.webp"],labels:["Konsept sunumu"],concept:true,description:"Lale formu ve kobalt çizgilerden yola çıkan bir fincan koleksiyonu. Ürün ve ambalajı birlikte ele alan kültürel hediyelik konsepti."},
 {name:"İz / Müze Koleksiyonu",label:"Defter · Metal ayraç · Hediyelik",cover:"/showcase/concepts/anatolia-stationery.webp",images:["/showcase/concepts/anatolia-stationery.webp"],labels:["Konsept sunumu"],concept:true,description:"Anadolu geometrisini dokunsal kabartma ve metal kesimle buluşturan müze mağazası seti. Defter ve ayraç için ortak bir görsel dil."},
 {name:"Bozkır / Kıpçak",label:"Kol saati · Gravür kadran",cover:"/showcase/concepts/kipcak-watch.webp",images:["/showcase/concepts/kipcak-watch.webp"],labels:["Ürün görünümü"],concept:true,description:"Bozkırın atlı savaşçı figüründen esinlenen gravür kadran, koyu çelik gövde ve bronz detaylar."},
 {name:"Gök / Turkuaz",label:"Kol saati · Mine ve metal",cover:"/showcase/concepts/turquoise-watch.webp",images:["/showcase/concepts/turquoise-watch.webp"],labels:["Ürün görünümü"],concept:true,description:"Turkuaz mine üzerinde geometrik yıldız; fırçalanmış çelik ve deri dokusuyla kurulan bir malzeme dengesi."},
 {name:"Çini / Kahve",label:"Porselen kahve fincanı",cover:"/showcase/concepts/cobalt-coffee.webp",images:["/showcase/concepts/cobalt-coffee.webp"],labels:["Koleksiyon görünümü"],concept:true,description:"Beyaz porselen üzerinde serbest kobalt çizgileri ve lale dokunuşlarıyla kahve ritüeli."},
 {name:"Kemer / Coffee To Go",label:"Kahve bardağı · Ambalaj",cover:"/showcase/concepts/arches-coffee.webp",images:["/showcase/concepts/arches-coffee.webp"],labels:["Ambalaj görünümü"],concept:true,description:"Mimari kemerlerden türetilen grafik ritim; orman yeşili ve krem yüzeyli kahve ambalajı."},
];
function Objects({lang}:{lang:"en"|"tr"}){
 const [chosen,setChosen]=useState<number|null>(null);
 const all=[...products,...concepts];
 if(chosen!==null){const p=all[chosen];return <div className="v10-products-detail"><div className="v10-detail-heading"><button className="v10-back" onClick={()=>setChosen(null)}><ArrowLeft size={17}/>{lang==="en"?"All products":"Tüm ürünler"}</button><h3>{p.name}</h3><p className="product-disclosure">{p.description??(lang==="en"?"Explore the different designs in this product collection.":"Ürün koleksiyonunun farklı tasarımlarını incele.")}</p></div><ImageSequence key={p.name} images={p.images} labels={p.labels} title={p.name} lang={lang}/></div>}
 const card=(p:Product,i:number)=><button key={p.name} onClick={()=>setChosen(i)}><div><img src={assetPath(p.cover)} alt={p.name} loading="lazy"/></div><strong>{p.name}<ArrowUpRight size={22}/></strong><span>{p.label}</span></button>;
 return <div className="v10-products"><p className="product-disclosure">{lang==="en"?"Corporate objects and independent product studies.":"Kurumsal ürünler ve bağımsız tasarım araştırmaları."}</p><div className="v10-product-grid">{products.map(card)}</div><section className="v10-concept-grid"><div className="v10-product-grid">{concepts.map((p,i)=>card(p,i+products.length))}</div></section></div>;
}
export default function ArchiveExperience({type,lang="en"}:{type:ArchiveKey;lang?:"en"|"tr"}){
 if(type==="editorial")return <Editorial lang={lang}/>;
 if(type==="catalog")return <Catalog lang={lang}/>;
 if(type==="exhibition")return <Exhibition lang={lang}/>;
 if(type==="campaign")return <Campaign lang={lang}/>;
 if(type==="objects")return <Objects lang={lang}/>;
 if(type==="digital")return <DigitalVitrine lang={lang}/>;
 if(type==="print")return <Gallery title={lang==="en"?"Advertising design":"İlan tasarımı"} lang={lang} images={[...files("ads","ad",[1,2,3,4,5,6,7,8,10,11,12]),...Array.from({length:7},(_,i)=>`/showcase/new-ads/${String(i+1).padStart(2,"0")}.webp`)]}/>;
 return <Gallery title={lang==="en"?"Book cover design":"Kitap kapağı tasarımı"} lang={lang} images={files("books","book",[1,2,4,5,6,8])}/>;
}
