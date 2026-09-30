
(()=>{const root=document.getElementById('myd-free-drag');const pages=window.MYD_PAGES;const count=Math.ceil(pages.length/2);const copy=window.MYD_COPY||{endTitle:'Ön izlemenin sonu',endInfo:'Bu dergi ticari olarak yayımlanmaktadır. Yalnızca seçili sayfalar gösterilmiştir.',open:'Aç →',forward:'İleri →',cover:'Kapak',done:'Seçki tamamlandı',spread:n=>n+' / '+(count-1)+' açılım'};
const volume=root.querySelector('.volume'),stage=root.querySelector('.stage'),prev=root.querySelector('.prev'),next=root.querySelector('.next'),status=root.querySelector('.status'),dialog=root.querySelector('dialog');let position=0,busy=false,drag=null;const leaves=[];const pageImages=[];const pageImage=i=>{if(!pages[i])return null;if(!pageImages[i]){const im=new Image();im.decoding='async';im.src=pages[i].src;pageImages[i]=im}return pageImages[i]};let curlCanvas=null;
function paintCurl(idx,t){
 const w=volume.clientWidth,h=volume.clientHeight,pw=w/2;
 if(!curlCanvas){curlCanvas=document.createElement('canvas');curlCanvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:100;pointer-events:none';volume.append(curlCanvas)}
 if(curlCanvas.width!==Math.round(w*2)||curlCanvas.height!==Math.round(h*2)){curlCanvas.width=Math.round(w*2);curlCanvas.height=Math.round(h*2)}const ctx=curlCanvas.getContext('2d');ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,w,h);
 leaves[idx].style.visibility='hidden';
 // Keep the stationary sheets on their correct side beneath the curling leaf.
 leaves.forEach((l,i)=>{if(i===idx)return;l.style.transition='none';l.style.transform='rotateY('+(i<idx?-180:0)+'deg)';l.style.zIndex=i<idx?i+1:count*2+2-i});
 const n=100,step=pw/n;let x=pw;
 for(let j=0;j<n;j++){
  const u=(j+.5)/n;const angle=-Math.PI*t+.72*Math.sin(Math.PI*t)*Math.sin(Math.PI*u);
  const dx=Math.cos(angle)*step;const nx=x+dx;const lift=Math.sin(Math.PI*t)*Math.sin(Math.PI*u)*h*.026;
  const im=pageImage(idx*2+(dx<0?1:0));const destX=Math.min(x,nx),destW=Math.abs(dx)+.7;
  if(im&&im.complete&&im.naturalWidth){const sourceU=dx<0?1-(j+1)/n:j/n;ctx.drawImage(im,sourceU*im.naturalWidth,0,im.naturalWidth/n,im.naturalHeight,destX,lift,destW,h-lift*1.5)}else{ctx.fillStyle='#f5f3eb';ctx.fillRect(destX,lift,destW,h-lift*1.5)}
  const shade=Math.sin(Math.PI*t)*(.035+.12*Math.sin(Math.PI*u));ctx.fillStyle='rgba(0,0,0,'+shade+')';ctx.fillRect(destX,lift,destW,h-lift*1.5);x=nx;
 }
}

function face(p,back){const f=document.createElement('div');f.className='face'+(back?' back':'');if(p){const im=document.createElement('img');im.src=p.src;im.alt=p.label;im.loading='lazy';im.decoding='async';im.draggable=false;f.append(im)}else{const panel=document.createElement('div');panel.className='paper-end';const title=document.createElement('strong');title.textContent=copy.endTitle;const info=document.createElement('span');info.textContent=copy.endInfo;panel.append(title,info);f.append(panel)}return f}
for(let i=0;i<count;i++){const leaf=document.createElement('div');leaf.className='leaf';leaf.append(face(pages[i*2],false),face(pages[i*2+1],true));volume.append(leaf);leaves.push(leaf)}
position=Math.max(0,Math.min(count,Number.isInteger(window.MYD_START)?window.MYD_START:0));
function layout(){if(curlCanvas){curlCanvas.remove();curlCanvas=null}leaves.forEach(l=>l.style.visibility='');leaves.forEach((l,i)=>{l.style.transition='none';l.style.transform='rotateY('+(i<position?-180:0)+'deg)';l.style.zIndex=i<position?i+1:count*2+2-i});volume.classList.toggle('closed',position===0);prev.disabled=position===0;next.disabled=position===count;next.textContent=position===0?copy.open:copy.forward;status.textContent=position===0?copy.cover:position===count?copy.done:copy.spread(position);root.querySelector('.zoom-button').disabled=position===count}
function animate(dir,start=0){if(busy)return;drag=null;const idx=dir>0?position:position-1;if(idx<0||idx>=count)return;busy=true;volume.classList.remove('closed');const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;const duration=reduce?0:Math.max(140,420*(1-start));const begin=performance.now();function frame(now){const q=duration?Math.min(1,(now-begin)/duration):1;const t=start+(1-start)*(q*q*(3-2*q));paintCurl(idx,dir>0?t:1-t);if(q<1)requestAnimationFrame(frame);else{position+=dir;busy=false;if(curlCanvas){curlCanvas.remove();curlCanvas=null}leaves.forEach(l=>l.style.visibility='');layout()}}requestAnimationFrame(frame)}
prev.onclick=()=>animate(-1);next.onclick=()=>animate(1);
function updateDrag(e){
 if(!drag||e.pointerId!==drag.id)return;
 const dx=e.clientX-drag.x;
 drag.dx=dx;
 if(Math.abs(dx)<3){drag.progress=0;layout();return}
 const dir=dx<0?1:-1,idx=dir>0?position:position-1;
 if(idx<0||idx>=leaves.length){drag.progress=0;layout();return}
 if(drag.idx!==idx)layout();
 drag.dir=dir;drag.idx=idx;drag.progress=Math.min(.98,Math.abs(dx)/Math.max(100,drag.width*.65));
 paintCurl(idx,dir>0?drag.progress:1-drag.progress);
}
stage.onpointerdown=e=>{
 if(busy||drag||e.isPrimary===false||(e.pointerType==='mouse'&&e.button!==0))return;
 e.preventDefault();const r=volume.getBoundingClientRect();
 drag={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,idx:null,dir:e.clientX>r.left+r.width/2?1:-1,width:r.width/2,progress:0};
 stage.style.cursor='grabbing';stage.setPointerCapture(e.pointerId);
};
stage.onpointermove=e=>{if(!drag||e.pointerId!==drag.id)return;e.preventDefault();updateDrag(e)};
function finishDrag(e,cancelled=false){
 if(!drag||e.pointerId!==drag.id)return;
 if(!cancelled)updateDrag(e);
 const d=drag;drag=null;stage.style.cursor='grab';
 if(stage.hasPointerCapture(e.pointerId))stage.releasePointerCapture(e.pointerId);
 if(cancelled){layout();return}
 if(Math.abs(d.dx)>=12&&d.progress>0)animate(d.dir,d.progress);
 else if(Math.abs(d.dx)<3)animate(d.dir);
 else layout();
}
stage.onpointerup=e=>finishDrag(e);
stage.onpointercancel=e=>finishDrag(e,true);
stage.onlostpointercapture=e=>{if(drag&&e.pointerId===drag.id){drag=null;stage.style.cursor='grab';if(!busy)layout()}};
stage.ondragstart=e=>e.preventDefault();
root.onkeydown=e=>{if(dialog.open)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();animate(e.key==='ArrowRight'?1:-1)}};
root.querySelector('.zoom-button').onclick=()=>{const area=dialog.querySelector('.zoom-area');area.replaceChildren();const chosen=position===0?[pages[0]]:pages.slice(position*2-1,position*2+1);chosen.forEach(p=>{const im=document.createElement('img');im.src=p.src;im.alt=p.label;area.append(im)});dialog.showModal()};root.querySelector('.close').onclick=()=>dialog.close();layout();
})();
