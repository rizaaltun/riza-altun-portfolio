"use client";

export const toolGroups = [
 {title:"Design & publishing",tools:[["Photoshop","adobephotoshop"],["Illustrator","adobeillustrator"],["InDesign","adobeindesign"],["Figma","figma"],["Lightroom","adobelightroom"],["Canva","canva"]]},
 {title:"Motion & 3D",tools:[["After Effects","adobeaftereffects"],["Blender","blender"],["Unreal Engine","unrealengine"],["Premiere Pro","adobepremierepro"],["Cinema 4D","cinema4d"],["Unity","unity"]]},
 {title:"AI & creation",tools:[["ChatGPT","openai"],["Claude","claude"],["Midjourney","midjourney"],["Runway","runway"],["Gemini","gemini"],["Adobe Firefly","adobefirefly"]]},
];

export default function ToolDepth({lang="en"}:{lang?:"en"|"tr"}){return <div className="tool-depth" aria-label={lang==="en"?"Design and production tools":"Tasarım ve üretim araçları"}>{toolGroups.map((group,i)=><section className="tool-depth-plane" key={group.title}><div className="tool-depth-title"><span>CREATIVE TOOLBOX / 0{i+1}</span><h2>{group.title}</h2></div><div className="tool-depth-logos">{group.tools.map(([name,icon])=><div className="tool-depth-logo" key={name}><img src={`/tool-logos/${icon}.svg`} alt="" width="56" height="56"/><span>{name}</span></div>)}</div></section>)}<p className="tool-depth-hint">{lang==="en"?"Scroll to explore":"Keşfetmek için kaydır"} ↓</p></div>}
